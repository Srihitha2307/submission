import io
import json
import threading
from pathlib import Path
from typing import List, Tuple

from fastapi import APIRouter, File, HTTPException, UploadFile

router = APIRouter()

_lock = threading.Lock()
_model = None
_class_names: List[str] = None

IMG_SIZE = (224, 224)


def _repo_root() -> Path:
    # This file lives at <repo>/Backend/backend/model_service.py
    return Path(__file__).resolve().parents[2]


def _classes_path() -> Path:
    # Prefer the class list shipped next to the model artifact; fall back to root.
    repo_root = _repo_root()
    for candidate in (repo_root / "model" / "classes.json", repo_root / "classes.json"):
        if candidate.exists():
            return candidate
    raise FileNotFoundError("classes.json not found (checked model/ and repo root).")


def _model_path() -> Path:
    path = _repo_root() / "model" / "indian_cattle_resnet50_finetuned.keras"
    if not path.exists():
        raise FileNotFoundError(
            f"Inference model artifact missing at {path}. "
            "Expected the trained ResNet50 .keras file under model/."
        )
    return path


def _load_assets() -> Tuple[object, List[str]]:
    """Lazily load the trained Keras model + class index. Imports TensorFlow
    only on first call so backend boot stays fast and the app still starts if
    the model artifact is absent."""
    global _model, _class_names
    if _model is not None and _class_names is not None:
        return _model, _class_names
    with _lock:
        if _model is None:
            import tensorflow as tf  # heavy import, deferred
            with open(_classes_path(), "r", encoding="utf-8") as fh:
                loaded_names = json.load(fh)
            _model = tf.keras.models.load_model(str(_model_path()))
            # Freeze the class list the model will be mapped against. We validate
            # alignment with the model's real output size in _score_to_result.
            _class_names = list(loaded_names)
    return _model, _class_names


def _preprocess(contents: bytes):
    """Decode image bytes -> float32 tensor ready for ResNet50, shape (1,224,224,3)."""
    import numpy as np
    import tensorflow as tf
    from PIL import Image

    img = Image.open(io.BytesIO(contents)).convert("RGB").resize(IMG_SIZE)
    arr = np.asarray(img, dtype=np.float32)
    processed = tf.keras.applications.resnet50.preprocess_input(arr)
    return np.expand_dims(processed, axis=0)


def _score_to_result(preds, class_names: List[str]) -> dict:
    """Map raw model probabilities to the public API contract.

    Contract expected by the frontend (detectionService.detectBreed):
      {"breed": str, "confidence": float, "all_scores": {str: float}}
    """
    import numpy as np

    preds = np.asarray(preds).ravel()
    n_out = int(preds.shape[0])
    n_names = len(class_names)
    if n_out != n_names:
        # Fail loud. Mapping the model's argmax via an unrelated/shorter name
        # list would silently return the WRONG breed.
        raise ValueError(
            f"Model output size ({n_out}) does not match class list size ({n_names}). "
            f"Cannot label predictions safely. classes.json has {n_names} breeds."
        )
    idx = int(np.argmax(preds))
    all_scores = {class_names[i]: float(preds[i]) for i in range(n_names)}
    return {
        "breed": class_names[idx],
        "confidence": float(preds[idx]),
        "all_scores": all_scores,
    }


def infer(contents: bytes) -> dict:
    """Public, Firebase-free inference entry point (used by the /predict route
    below and by direct tests)."""
    model, class_names = _load_assets()
    processed = _preprocess(contents)
    preds = model.predict(processed, verbose=0)[0]
    return _score_to_result(preds, class_names)


@router.post("/predict")
def predict(file: UploadFile = File(...)):
    """POST multipart/form-data with field `file` -> image.
    Returns {"breed": str, "confidence": float, "all_scores": {str: float}}.

    Note: inference is intentionally NOT auth-gated so the local dev frontend
    (detectionService.ts) can call http://localhost:8000/predict directly.
    """
    try:
        contents = file.file.read()
        return infer(contents)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=503, detail=str(exc))
    except ValueError as exc:
        raise HTTPException(status_code=503, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Inference failed: {exc}")
