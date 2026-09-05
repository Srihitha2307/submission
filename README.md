# PashuDrishti

PashuDrishti is a React/Vite frontend for cattle and buffalo breed information, connected to a FastAPI backend and a Keras ResNet50 inference model.

## Architecture

- Frontend: `frontend_app/`, Vite on port `3000`
- Backend: `Backend/backend/`, FastAPI on port `8000`
- Detection: `POST /predict` accepts multipart field `file`
- Model: `model/indian_cattle_resnet50_finetuned.keras`
- Label map: `model/classes.json` (also copied at the repository root)
- Auth and application data: Firebase Admin SDK and Firestore

The frontend reads `VITE_API_BASE_URL` at build time. It defaults to `http://localhost:8000`, so local development works without extra configuration.

## Local setup on Windows

### Prerequisites

- Node.js 18 or newer
- Python 3.10 or newer
- A Firebase service-account JSON file for the backend
- The model artifact in `model/`

### 1. Install frontend dependencies

From the repository root in PowerShell:

```powershell
npm install --prefix frontend_app
Copy-Item frontend_app\.env.example frontend_app\.env.local
```

Keep `VITE_API_BASE_URL=http://localhost:8000` in `frontend_app/.env.local` for local use. Do not commit `.env.local` or API keys.

### 2. Configure the backend

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r Backend\requirements.txt
Copy-Item Backend\.env.example Backend\.env
Copy-Item C:\path\to\serviceAccountKey.json Backend\serviceAccountKey.json
$env:GOOGLE_APPLICATION_CREDENTIALS = "./serviceAccountKey.json"
$env:FIREBASE_PROJECT_ID = "flip-flop-8"
$env:CORS_ORIGINS = "http://localhost:3000,http://127.0.0.1:3000"
```

The backend does not load `Backend/.env` automatically. The environment variables must be exported in the terminal that starts Uvicorn. The service-account file is gitignored and must never be placed in the frontend.

### 3. Start both services

Use two PowerShell terminals from the repository root.

Backend terminal:

```powershell
.\.venv\Scripts\Activate.ps1
$env:GOOGLE_APPLICATION_CREDENTIALS = "./serviceAccountKey.json"
$env:FIREBASE_PROJECT_ID = "flip-flop-8"
$env:CORS_ORIGINS = "http://localhost:3000,http://127.0.0.1:3000"
Set-Location Backend
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Frontend terminal:

```powershell
npm run dev
```

Open `http://localhost:3000`. Check the backend first at `http://localhost:8000/health` and view API details at `http://localhost:8000/docs`.

### 4. Verify image inference

The browser sends the selected image to `POST http://localhost:8000/predict` as `multipart/form-data` with the field name `file`. The API response is:

```json
{
  "breed": "Gir",
  "confidence": 0.91,
  "all_scores": {"Gir": 0.91}
}
```

The current model emits 50 scores, while the checked-in `classes.json` contains 20 labels. The backend deliberately returns HTTP 503 instead of assigning incorrect breed names. Before shipping predictions, add the original 50-class list in model index order or retrain/export a model with 20 outputs matching `classes.json`.

## Production deployment

Deploy the backend and frontend as separate services.

1. Build the backend as a container or deploy it to a Python service with enough memory for TensorFlow and the 216 MB model. Start it with `python -m uvicorn backend.main:app --host 0.0.0.0 --port $PORT`.
2. Store `serviceAccountKey.json` as a platform secret, or use the platform's workload identity. Set `GOOGLE_APPLICATION_CREDENTIALS`, `FIREBASE_PROJECT_ID`, and `CORS_ORIGINS` to the deployed frontend origin.
3. In PowerShell, build the frontend with `$env:VITE_API_BASE_URL="https://your-api.example.com"; npm run build` and host `frontend_app/dist` on a static hosting service.
4. Configure the frontend host's environment/build variable before building. Vite embeds `VITE_API_BASE_URL` into browser JavaScript; changing it after the build has no effect.
5. Test `GET /health`, the authenticated application routes, and `POST /predict` from the deployed frontend. Do not enable prediction traffic until the model/class-list mismatch is resolved.

For a first deployment, a managed container host for FastAPI plus Firebase Hosting or another static host for Vite is the simplest split. Keep the model file in the backend image or mounted private storage, never in the browser bundle.

### Hosting choices

| Option | Frontend | Backend | Notes |
| --- | --- | --- | --- |
| Easiest | Firebase Hosting | Google Cloud Run | Good Firebase integration; deploy the model as a container and set a memory limit suitable for TensorFlow. |
| Simple low-cost prototype | Vercel or Netlify | Render or Railway | Fast to configure; confirm the backend plan has enough RAM and does not sleep during inference. |
| Azure production path | Azure Static Web Apps | Azure Container Apps | Fits the requested Azure deployment path; use managed identity for Firebase/Google access where possible. |
| Full control | Any static host | Fly.io or a VM | Useful when you need persistent model caching, custom scaling, or GPU options. |

Do not deploy the FastAPI service as a serverless function unless the platform supports the TensorFlow package size, cold-start time, and memory requirements. The model is loaded on the first prediction, so a container service is the safer default.

## Useful commands

```powershell
npm run lint   # frontend TypeScript check
npm run build  # frontend production build
```

The backend currently has no dedicated test suite. Its Python modules can be syntax-checked with `python -m compileall Backend\backend`.
