# Technology Stack

## Product

**PashuDrishti** is a cattle and buffalo breed identification and livestock information application. It combines a browser-based user interface, a Python API, Firebase services, and a computer-vision model.

## Frontend

- **Language:** TypeScript
- **UI library:** React 19
- **Build and development server:** Vite 6
- **Styling:** Tailwind CSS 4 with `@tailwindcss/vite`
- **Icons:** Lucide React
- **Animation:** Motion
- **AI client package:** `@google/genai`
- **Runtime:** Modern web browsers
- **Development URL:** `http://localhost:3000`

### Frontend structure

- `frontend_app/src/screens/` contains application screens.
- `frontend_app/src/components/` contains reusable UI components.
- `frontend_app/src/context/` contains React context providers.
- `frontend_app/src/services/` contains API and application services.
- `frontend_app/src/types/` contains shared TypeScript contracts.

### Frontend configuration

- `VITE_API_BASE_URL` controls the FastAPI origin.
- It defaults to `http://localhost:8000` for local development.
- `GEMINI_API_KEY` is used by frontend AI Studio features where configured.
- Vite environment values are embedded at build time and must not contain private server credentials.

## Backend

- **Language:** Python
- **Web framework:** FastAPI
- **ASGI server:** Uvicorn
- **Request validation:** Pydantic
- **Multipart uploads:** `python-multipart`
- **Development URL:** `http://localhost:8000`
- **API documentation:** `/docs` and `/redoc`
- **Health endpoint:** `GET /health`

### Backend structure

- `Backend/backend/main.py` creates the FastAPI application and registers routers.
- `Backend/backend/model_service.py` exposes the public `POST /predict` inference endpoint.
- `Backend/backend/routes_users_animals.py` handles users and animal records.
- `Backend/backend/routes_predictions.py` handles prediction-related application routes.
- `Backend/backend/routes_community.py` handles community functionality and moderation.
- `Backend/backend/firebase_setup.py` initializes Firebase Admin and Firestore access.

## AI and computer vision

- **Machine-learning framework:** TensorFlow CPU 2.16 or newer
- **Model format:** Keras `.keras`
- **Model architecture:** Fine-tuned ResNet50
- **Image processing:** Pillow and NumPy
- **Input size:** 224 x 224 pixels
- **Preprocessing:** ResNet50 `preprocess_input`
- **Model file:** `model/indian_cattle_resnet50_finetuned.keras`
- **Class labels:** `classes.json`

The model is loaded lazily on the first prediction request so the API can start without immediately loading TensorFlow. The endpoint accepts an image as multipart form data using the field name `file` and returns:

```json
{
  "breed": "breed-name",
  "confidence": 0.91,
  "all_scores": {
    "breed-name": 0.91
  }
}
```

### Current model limitation

The trained model currently emits 50 output scores, while the available `classes.json` contains 20 labels. The backend rejects this mismatch with HTTP 503 instead of assigning potentially incorrect breed names. Production inference requires the original 50-class label list in model index order or a model retrained with the 20 available labels.

## Firebase and data services

- **Firebase Admin SDK:** Server-side Firebase integration
- **Firestore:** User profiles, animal records, breed reference data, community data, and roles
- **Firebase Authentication:** Bearer Firebase ID Tokens
- **Firebase Storage:** Available for application media workflows
- **Firebase Emulator Suite:** Auth `9099`, Firestore `8080`, Storage `9199`, Emulator UI `4000`

The backend requires a Firebase service-account credential at `Backend/serviceAccountKey.json` unless a different credential mechanism is configured. This file must remain private and must not be bundled into the frontend.

## Security and access control

- Public endpoints: `/`, `/health`, and `/predict`
- Protected routes use Firebase Bearer ID Token verification.
- Community moderation uses Firestore-backed roles.
- CORS origins are configured through the backend `CORS_ORIGINS` environment variable.
- Secrets are supplied through environment variables or the deployment platform's secret manager.

## Development tooling

- **Package manager:** npm
- **JavaScript typecheck:** `npm run lint` runs `tsc --noEmit`.
- **Frontend production build:** `npm run build`
- **Python syntax check:** `python -m compileall Backend\backend`
- **Path alias:** `@` maps to `frontend_app/`.
- **Environment templates:** `frontend_app/.env.example` and `Backend/.env.example`

## Runtime requirements

- Node.js 18 or newer
- Python 3.10 or newer
- Enough memory to load TensorFlow and the approximately 216 MB model artifact
- Firebase project configuration for the backend
- The Keras model and compatible class-label mapping

## Deployment technologies

The frontend can be hosted as static Vite output on Firebase Hosting, Firebase Static Hosting, Vercel, Netlify, or Azure Static Web Apps.

The backend should run as a long-lived Python container or service, such as Google Cloud Run, Azure Container Apps, Render, Railway, Fly.io, or a virtual machine. A container service is preferred because TensorFlow installation, model loading, memory usage, and cold starts can exceed typical serverless-function limits.
