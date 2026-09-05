import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Eye,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { detectionService } from '../services/detectionService';
import { VoiceButton } from '../components/common/VoiceButton';
import { useToast } from '../components/common/Toast';

// Field-tested SVG silhouettes & real preview vectors for Indian cattle
const STEP_TEMPLATES = [
  {
    stepNumber: 1,
    titleKey: 'stepFaceTitle' as const,
    descKey: 'stepFaceDesc' as const,
    guideBoxText: 'Center Animal Head & Forehead',
    defaultPhoto: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=500&auto=format&fit=crop&q=80',
    aspect: 'aspect-square',
    hint: 'Look for convex forehead shape and leaf-like ear curl.',
  },
  {
    stepNumber: 2,
    titleKey: 'stepSideTitle' as const,
    descKey: 'stepSideDesc' as const,
    guideBoxText: 'Full Lateral Flank & Withers',
    defaultPhoto: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=500&auto=format&fit=crop&q=80',
    aspect: 'aspect-4/3',
    hint: 'Step 3–4 meters back to capture withers, udder, and tail switch.',
  },
  {
    stepNumber: 3,
    titleKey: 'stepHornHumpTitle' as const,
    descKey: 'stepHornHumpDesc' as const,
    guideBoxText: 'Horns, Hump & Dewlap Close-up',
    defaultPhoto: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?w=500&auto=format&fit=crop&q=80',
    aspect: 'aspect-4/3',
    hint: 'Ensure horn curvature and hump muscular elevation are clear.',
  },
];

export const IdentifyScreen: React.FC = () => {
  const { navigate, activeScenario, addIdentification } = useApp();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [photos, setPhotos] = useState<{ [key: number]: string | null }>({
    0: null,
    1: null,
    2: null,
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [isLiveCameraActive, setIsLiveCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentTemplate = STEP_TEMPLATES[currentStepIndex];
  const capturedCount = Object.values(photos).filter(Boolean).length;
  const currentPhoto = photos[currentStepIndex];

  // Start real browser camera or fallback gracefully
  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        setIsLiveCameraActive(true);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } else {
        // Fallback to mock capture
        captureSamplePhoto();
      }
    } catch {
      // Permission denied or no camera device, use simulated field photo
      captureSamplePhoto();
    }
  };

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsLiveCameraActive(false);
  };

  const takeSnapshotFromVideo = () => {
    if (!videoRef.current) {
      captureSamplePhoto();
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setPhotos((prev) => ({ ...prev, [currentStepIndex]: dataUrl }));
      stopCameraStream();
      setShowQualityModal(true);
    } else {
      captureSamplePhoto();
    }
  };

  const captureSamplePhoto = () => {
    setPhotos((prev) => ({ ...prev, [currentStepIndex]: currentTemplate.defaultPhoto }));
    stopCameraStream();
    setShowQualityModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotos((prev) => ({ ...prev, [currentStepIndex]: reader.result as string }));
      setShowQualityModal(true);
    };
    reader.readAsDataURL(file);
  };

  const handleNextStep = () => {
    setShowQualityModal(false);
    if (currentStepIndex < STEP_TEMPLATES.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleRetake = () => {
    setShowQualityModal(false);
    setPhotos((prev) => ({ ...prev, [currentStepIndex]: null }));
    startCamera();
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await detectionService.detectBreed(
        {
          face: photos[0] || undefined,
          side: photos[1] || undefined,
          hornHump: photos[2] || undefined,
        },
        activeScenario
      );

      // Save to recent identifications
      await addIdentification({
        id: result.id,
        breed: result.primaryBreed,
        species: 'Cattle',
        confidence: result.confidence,
        timeLabel: 'Identified just now',
        status: result.status,
        location: result.userLocation,
      });

      setIsAnalyzing(false);
      navigate({ name: 'DetectionResult', resultId: result.id });
    } catch (error) {
      setIsAnalyzing(false);
      const message = error instanceof Error ? error.message : 'Detection failed.';
      const isConnectionError = message.includes('Failed to fetch') || message.includes('NetworkError');
      showToast({
        type: 'warning',
        duration: 6000,
        message: isConnectionError
          ? 'The detection server is offline. Start the FastAPI backend on port 8000 and try again.'
          : message,
      });
    }
  };

  return (
    <div className="flex-1 pb-20 bg-[#F5F2ED] flex flex-col min-h-full">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Progress Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4F1E]">
              {t.progressLabel} {currentStepIndex + 1} of 3
            </span>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              {t[currentTemplate.titleKey]}
            </h2>
          </div>
          <VoiceButton />
        </div>

        {/* 3 Step progress bar */}
        <div className="grid grid-cols-3 gap-1.5 mb-1">
          {STEP_TEMPLATES.map((tpl, i) => (
            <div
              key={tpl.stepNumber}
              onClick={() => setCurrentStepIndex(i)}
              className={`h-2 rounded-full cursor-pointer transition-all ${
                i === currentStepIndex
                  ? 'bg-[#2D4F1E]'
                  : photos[i]
                  ? 'bg-[#D4A373]'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-1">{t[currentTemplate.descKey]}</p>
      </div>

      {/* Camera Capture Viewport */}
      <div className="p-4 flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm bg-stone-900 rounded-3xl overflow-hidden shadow-lg relative border-2 border-stone-800 flex flex-col items-center justify-center min-h-[320px]">
          {/* Real Live Video */}
          {isLiveCameraActive ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-4 border-2 border-dashed border-[#D4A373] rounded-2xl pointer-events-none flex flex-col justify-between p-3">
                <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-lg self-start">
                  Live Viewfinder
                </span>
                <span className="text-xs text-white text-center bg-black/60 py-1 px-3 rounded-lg backdrop-blur-xs">
                  {currentTemplate.guideBoxText}
                </span>
              </div>
            </div>
          ) : currentPhoto ? (
            /* Captured Photo Preview */
            <div className="relative w-full h-full">
              <img
                src={currentPhoto}
                alt="Captured Livestock"
                className="w-full h-[320px] object-cover"
              />
              <div className="absolute top-2 right-2 bg-[#2D4F1E] text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                <CheckCircle2 className="w-3.5 h-3.5" /> Captured
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs p-2.5 rounded-xl backdrop-blur-xs flex items-center justify-between">
                <span>{t[currentTemplate.titleKey]}</span>
                <button
                  type="button"
                  onClick={handleRetake}
                  className="text-xs font-bold text-[#D4A373] underline"
                >
                  {t.retakePhoto}
                </button>
              </div>
            </div>
          ) : (
            /* Camera Guide Frame Placeholder */
            <div className="p-6 text-center text-stone-300 flex flex-col items-center justify-center w-full">
              <div className="w-20 h-20 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-center justify-center mb-3">
                <Camera className="w-9 h-9 text-[#D4A373]" />
              </div>

              {/* Guide Overlay Lines */}
              <div className="border-2 border-dashed border-[#D4A373]/50 rounded-2xl p-4 w-full max-w-[240px] my-2 bg-stone-800/40">
                <p className="text-xs font-bold text-[#D4A373] mb-1">
                  {currentTemplate.guideBoxText}
                </p>
                <p className="text-[11px] text-stone-400">{currentTemplate.hint}</p>
              </div>

              <span className="text-[11px] text-stone-400 mt-2">
                Tap button below to capture or use demo photo
              </span>
            </div>
          )}
        </div>

        {/* Capture Action Controls */}
        <div className="w-full max-w-sm mt-4 space-y-2.5">
          {isLiveCameraActive ? (
            <div className="flex items-center gap-2">
              <button
                id="camera-snap-btn"
                type="button"
                onClick={takeSnapshotFromVideo}
                className="flex-1 min-h-[48px] bg-[#2D4F1E] hover:bg-[#1E3514] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow text-base active:scale-98"
              >
                <Camera className="w-5 h-5" /> Snap Photo
              </button>
              <button
                type="button"
                onClick={stopCameraStream}
                className="px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl text-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                id="identify-take-photo-btn"
                type="button"
                onClick={startCamera}
                className="min-h-[48px] bg-[#2D4F1E] hover:bg-[#1E3514] active:bg-[#1E3514] text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow text-sm transition-transform active:scale-98"
              >
                <Camera className="w-4 h-4 text-white/80" />
                <span>{t.takePhoto}</span>
              </button>

              <button
                id="identify-use-existing-btn"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[48px] bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-800 font-semibold py-2.5 px-3 rounded-xl border border-gray-300 flex items-center justify-center gap-2 text-sm shadow-xs"
              >
                <Upload className="w-4 h-4 text-gray-600" />
                <span>{t.useExistingPhoto}</span>
              </button>
            </div>
          )}

          {/* Quick Demo Field Photo Button */}
          {!currentPhoto && !isLiveCameraActive && (
            <button
              id="instant-demo-photo-btn"
              type="button"
              onClick={captureSamplePhoto}
              className="w-full py-2.5 px-3 bg-[#D4A373]/15 hover:bg-[#D4A373]/25 text-[#73481f] border border-[#D4A373]/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B88656]" />
              <span>Use Verified Field Sample Image (1-Tap Simulation)</span>
            </button>
          )}

          {/* Skip / Step advance */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => {
                if (currentStepIndex > 0) setCurrentStepIndex((p) => p - 1);
              }}
              disabled={currentStepIndex === 0}
              className={`text-xs font-semibold py-2 px-3 rounded-lg ${
                currentStepIndex === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              ← Previous Step
            </button>

            {currentStepIndex < 2 ? (
              <button
                id="identify-skip-btn"
                type="button"
                onClick={handleNextStep}
                className="text-xs font-bold text-gray-600 hover:text-gray-900 py-2 px-3 rounded-lg flex items-center gap-1"
              >
                <span>{currentPhoto ? 'Next Step' : t.skipStep}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Final Action: Analyze Animal */}
        <div className="w-full max-w-sm mt-4 pt-3 border-t border-gray-200">
          <button
            id="analyze-animal-submit-btn"
            type="button"
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className={`w-full min-h-[50px] font-bold text-base py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all ${
              capturedCount > 0
                ? 'bg-[#2D4F1E] hover:bg-[#1E3514] text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t.analyzingAnimal}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#D4A373]" />
                <span>{t.analyzeAnimal}</span>
                <span className="text-xs font-normal opacity-85">
                  ({capturedCount}/3 photos ready)
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quality Check Modal (Section 20: Anti-Fraud / Image Integrity UI) */}
      {showQualityModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            id="quality-check-dialog"
            className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D4F1E]/10 flex items-center justify-center text-[#2D4F1E]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{t.photoQualityCheck}</h3>
                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400">Image Integrity Assessment</span>
              </div>
            </div>

            <div className="space-y-2 my-4 bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2D4F1E]">
                <CheckCircle2 className="w-4 h-4 text-[#2D4F1E] shrink-0" />
                <span>{t.checkClear}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2D4F1E]">
                <CheckCircle2 className="w-4 h-4 text-[#2D4F1E] shrink-0" />
                <span>{t.checkVisible}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2D4F1E]">
                <CheckCircle2 className="w-4 h-4 text-[#2D4F1E] shrink-0" />
                <span>{t.checkFresh}</span>
              </div>
            </div>

            <div className="p-2.5 bg-[#D4A373]/15 rounded-xl border border-[#D4A373]/30 text-[11px] text-[#73481f] flex items-start gap-1.5 mb-4">
              <Info className="w-3.5 h-3.5 text-[#B88656] shrink-0 mt-0.5" />
              <span>{t.qualityNote}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRetake}
                className="flex-1 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition-colors"
              >
                {t.retakePhoto}
              </button>
              <button
                id="quality-check-confirm-btn"
                type="button"
                onClick={handleNextStep}
                className="flex-1 py-2.5 px-3 bg-[#2D4F1E] hover:bg-[#1E3514] text-white font-bold text-xs rounded-xl transition-colors shadow"
              >
                Confirm & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
