# AGENTS.md — PashuSarthi (flipflop8)

Cattle/buffalo breed identification app: React+Vite+Tailwind frontend (AI Studio) + FastAPI backend (Firebase/Firestore) + Keras ResNet50 model.

## Commands

- **Frontend dev:** `npm run dev` (root delegates to `frontend_app`; Vite on `0.0.0.0:3000`).
- **Frontend typecheck (lint):** `npm run lint` — actually `tsc --noEmit` (no ESLint).
- **Backend deps:** `pip install -r Backend/requirements.txt`.
- **Backend run:** from the repo root, `uvicorn backend.main:app --reload` **with CWD = `Backend/`** so the `backend.*` imports resolve.
- **Seed Firestore data:** `python Backend/seed_reference_data.py` (CWD = `Backend/`).
- **Mint a test Firebase bearer token:** `python Backend/backend/get_token.py` (CWD = `Backend/`, needs `serviceAccountKey.json`).
- **Local full-stack run:** terminal 1 `npm run dev` (frontend :3000); terminal 2 `uvicorn backend.main:app --reload` (CWD = `Backend/`). The backend **will not boot** without `Backend/serviceAccountKey.json` (Firebase init runs at import); `/predict` runs only after the app starts.

## Environment / secrets

- **Backend does NOT autoload `.env`** (no python-dotenv). Export in the shell or run uvicorn with them in scope:
  `GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json` and `FIREBASE_PROJECT_ID` (see `Backend/.env.example`).
- Place `Backend/serviceAccountKey.json` (service-account key, **gitignored**, not in repo).
- **Frontend** needs `GEMINI_API_KEY` (AI Studio injects at runtime from the Secrets panel; README says use `.env.local`, but the repo also ships a committed `frontend_app/.env` — don't rely on either for real keys).
- `Backend/firebase.json` runs emulators at auth:`9099`, firestore:`8080`, storage:`9199`, UI:`4000`. `.env.example` shows the emulator host toggles — uncomment (and export) when running offline against emulators.

## Architecture notes

- Root `package.json` scripts (`dev`, `build`, `preview`, `lint`) are thin wrappers around `frontend_app` (`npm --prefix frontend_app run ...`).
- Frontend services talk to the backend at `http://localhost:8000` (see `src/services/detectionService.ts`).
- **Inference endpoint (`POST /predict`, public):** Accepts `multipart/form-data` with a `file: UploadFile` field and returns `{"breed": str, "confidence": float, "all_scores": {str: float}}`. Implemented in `Backend/backend/model_service.py` (lazy-loads TF + the `.keras` model on first call only); registered on the app in `Backend/backend/main.py`. The frontend `detectionService.detectBreed` calls `http://localhost:8000/predict`, so no frontend HTTP change was needed (only its TS arity was fixed). **Operational guard:** `model_service._score_to_result` fails loud — if `model output dim != len(classes.json)` it raises and `/predict` returns **HTTP 503** with a clear message rather than returning a wrong breed name. So `/predict` is "ready" but currently label-blocked by the data mismatch above.
- **⚠️ Model/classes mismatch (real, verified at runtime):** `model/indian_cattle_resnet50_finetuned.keras` was trained on the Kaggle "indian-cattle-image-dataset" and its final `Dense` layer outputs **50** classes. The repo only ships `classes.json` with **20** breeds, and there is no class-index artifact in the repo, on disk, or in the `.keras` archive — so index→breedname cannot be derived safely. `model_service._score_to_result` therefore **fails loud**: if `model output dim != len(classes.json)` it raises and `/predict` returns **HTTP 503** with a message, instead of silently returning a wrong breed. Confirmed by loading the real model (216 MB) on this machine. To actually ship predictions, the real 50-breed class list (in alphabetical order matching Keras `image_dataset_from_directory`) must be added, or a 20-class head must be retrained. `classes.json` lives at both repo root and `model/` (identical, 20 entries, alphabetical).
- Firestore document IDs for breeds/communities are **lowercased** (routes call `.lower()`); `get_*_feed_plan`/`get_*_breeding_advice` fall back to hardcoded defaults when a doc is missing.
- Auth is Firebase **Bearer ID Token** (verified via `firebase_admin`), not API keys. The `verify_firebase_token` dependency is applied per-route; `/health`, `/`, and `/predict` are public.
- RBAC is Firestore-driven: `routes_community.remove_post` requires `role == "admin"` (checked via `users/{uid}.role`), not a hardcoded allowlist.

## Data notes

- `classes.json` (root **and** `model/`) lists **20** prediction breeds (Amritmahal … Tharparkar); the seed script only seeds 3 (Gir, Sahiwal, Murrah). They are intentionally different datasets — do not assume parity.
- `model/model.py` is a Colab notebook; it has a self-referential bug at line 77 (`load_model(...)` is called before the model is fully defined), but the trained `.keras` artifact is what matters; don't re-run it as-is.
- Frontend Vite config disables HMR/file-watching when `DISABLE_HMR=true` (AI Studio optimization). Leave it unset locally for live reload.
- `@` path alias maps to the `frontend_app` root (both `vite.config.ts` and `tsconfig.json`); import via `@/...` is valid.

## Style conventions

- No formatters/linters configured for the backend Python (PEP 8 defaults observed). Frontend uses Prettier-style formatting enforced only by `tsc`.
- Prefer preserving existing structure; do not add comments unless asked.
