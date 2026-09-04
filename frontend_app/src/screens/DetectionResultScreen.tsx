import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  MapPin,
  HelpCircle,
  Eye,
  Wheat,
  GitFork,
  Building2,
  Bookmark,
  Share2,
  RotateCcw,
  Sparkles,
  Info,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { detectionService } from '../services/detectionService';
import { DetectionResult } from '../types';
import { VoiceButton } from '../components/common/VoiceButton';
import { useToast } from '../components/common/Toast';

export const DetectionResultScreen: React.FC = () => {
  const { navigate, toggleSaveBreed, isBreedSaved, activeScenario } = useApp();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [result, setResult] = useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [showHeatmapOverlay, setShowHeatmapOverlay] = useState(false);

  useEffect(() => {
    let mounted = true;
    detectionService
      .detectBreed({}, activeScenario)
      .then((res) => {
        if (mounted) {
          setResult(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [activeScenario]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#F7F6F0]">
        <div className="w-12 h-12 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin mb-4" />
        <h3 className="text-base font-bold text-stone-900">{t.analyzingAnimal}</h3>
        <p className="text-xs text-stone-600 mt-1">Comparing against ICAR-NBAGR morphological records</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex-1 p-6 text-center bg-[#F7F6F0] flex flex-col items-center justify-center">
        <AlertTriangle className="w-10 h-10 text-amber-600 mb-2" />
        <h3 className="text-base font-bold text-stone-900">Detection Unavailable</h3>
        <button
          onClick={() => navigate({ name: 'Identify' })}
          className="mt-4 px-4 py-2 bg-emerald-800 text-white rounded-lg text-sm font-bold"
        >
          {t.tryAgain}
        </button>
      </div>
    );
  }

  // Handle Low Confidence State (Section 9 & 24)
  if (result.status === 'low_confidence') {
    return (
      <div className="flex-1 pb-20 bg-[#F5F2ED] p-4 flex flex-col justify-between">
        <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm text-center">
          <div className="w-14 h-14 rounded-full bg-[#D4A373]/20 border border-[#D4A373]/40 flex items-center justify-center mx-auto mb-3 text-[#B88656]">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#B88656] bg-[#D4A373]/10 px-2 py-0.5 rounded border border-[#D4A373]/20">
            Low Morphological Confidence ({Math.round(result.confidence * 100)}%)
          </span>
          <h2 className="text-xl font-bold text-gray-900 mt-2">{t.unconfidentTitle}</h2>
          <p className="text-xs text-gray-600 mt-2 leading-relaxed">{t.unconfidentDesc}</p>

          <div className="my-4 bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-left space-y-2">
            <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-gray-500" /> Possible causes:
            </h4>
            <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
              <li>Low natural daylight or backlighting cast dark shadows on horns</li>
              <li>Camera angle flattened the spinal hump elevation</li>
              <li>Animal moved during capture</li>
            </ul>
          </div>

          <div className="space-y-2 pt-2">
            <button
              id="low-confidence-try-again-btn"
              type="button"
              onClick={() => navigate({ name: 'Identify' })}
              className="w-full min-h-[48px] bg-[#2D4F1E] hover:bg-[#1E3514] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.tryAgain}</span>
            </button>

            <button
              id="low-confidence-view-guide-btn"
              type="button"
              onClick={() => navigate({ name: 'BreedProfile', breedId: 'gir' })}
              className="w-full min-h-[44px] bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2.5 px-4 rounded-xl border border-gray-300 flex items-center justify-center gap-2"
            >
              <span>{t.viewBreedGuide}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCross = result.status === 'crossbreed';
  const targetBreedId = result.primaryBreed.toLowerCase().includes('murrah') ? 'murrah' : 'gir';
  const isSaved = isBreedSaved(targetBreedId);

  return (
    <div className="flex-1 pb-24 bg-[#F5F2ED] overflow-y-auto">
      {/* Result Status Banner */}
      <div className="bg-[#2D4F1E] text-white p-4 pb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold bg-white/15 text-white px-2.5 py-0.5 rounded-lg border border-white/20">
            {isCross ? t.possibleCrossbreed : t.breedIdentified}
          </span>
          <div className="flex items-center gap-2">
            <VoiceButton />
            <button
              id="save-breed-header-btn"
              type="button"
              onClick={async () => {
                const nowSaved = await toggleSaveBreed(targetBreedId);
                showToast(nowSaved ? t.savedSuccess : t.unsaveBreed);
              }}
              className={`p-1.5 rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-[#D4A373] text-white border-[#D4A373]'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white">{result.primaryBreed}</h2>
            <p className="text-xs text-white/75 mt-0.5">
              {isCross ? 'Estimated Genomic Composite' : 'Indian Indigenous Dairy Breed'}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-[#D4A373]">
              {Math.round(result.confidence * 100)}%
            </span>
            <span className="block text-[10px] text-white/70 uppercase font-bold">
              {t.confidence}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-3 space-y-3.5">
        {/* Likelihood Breakdown & Top Alternatives */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
          <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">
            {t.likelyBreed}
          </h3>

          <div className="space-y-2 mb-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-900 mb-1">
                <span>{result.primaryBreed}</span>
                <span className="text-[#2D4F1E]">{Math.round(result.confidence * 100)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-[#2D4F1E] h-2.5 rounded-full transition-all"
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
            </div>

            {result.alternatives.map((alt) => (
              <div key={alt.breed}>
                <div className="flex justify-between text-xs font-medium text-gray-600 mb-0.5">
                  <span>{alt.breed}</span>
                  <span>{Math.round(alt.confidence * 100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gray-400 h-1.5 rounded-full"
                    style={{ width: `${alt.confidence * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Crossbreed Composition UI if applicable (Section 9) */}
          {result.composition && (
            <div className="mt-3 pt-3 border-t border-gray-100 bg-emerald-50/40 p-3 rounded-xl">
              <h4 className="text-xs font-bold text-[#2D4F1E] mb-1.5">
                {t.compositionEstimate}
              </h4>
              <div className="space-y-1.5">
                {result.composition.map((comp) => (
                  <div key={comp.breed} className="flex items-center justify-between text-xs">
                    <span className="text-gray-700 font-medium">{comp.breed}</span>
                    <span className="font-bold text-[#2D4F1E]">{comp.percentage}%</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-500 mt-2 italic border-t border-emerald-200/40 pt-1.5">
                {t.crossbreedDisclaimer}
              </p>
            </div>
          )}
        </div>

        {/* Section 8: Geo-Prior Fusion UI */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
              <MapPin className="w-4 h-4 text-[#2D4F1E]" />
              <span>{t.regionalMatch}</span>
            </div>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
              {t.regionalRelevanceHigh}
            </span>
          </div>

          <h4 className="text-xs font-bold text-gray-800">{result.regionalMatchTitle}</h4>
          <p className="text-xs text-gray-600 mt-0.5 leading-snug">
            {result.regionalMatchDescription}
          </p>

          <div className="mt-2.5 p-2 bg-gray-50 rounded-lg border border-gray-200 text-[11px] text-gray-600 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
            <span>{t.regionalRelevanceDesc}</span>
          </div>
        </div>

        {/* Section 7: "Why this result?" Visual Indicators */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
          <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-2.5 flex items-center justify-between">
            <span>{t.whyThisResult}</span>
            <span className="text-[10px] text-[#2D4F1E] font-bold">Morphological Keys</span>
          </h3>

          <div className="space-y-2">
            {result.visualIndicators.map((ind, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-[#2D4F1E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900 block">{ind.feature}</span>
                  <span className="text-gray-600 leading-tight">{ind.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Model Attention Preview / Explainability Heatmap Placeholder */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-gray-500" />
              <span>{t.attentionPreviewTitle}</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowHeatmapOverlay(!showHeatmapOverlay)}
              className="text-[11px] font-bold text-[#2D4F1E] underline flex items-center gap-1"
            >
              <Layers className="w-3 h-3" />
              {showHeatmapOverlay ? 'Hide Overlay' : 'Preview Heatmap'}
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-stone-900 h-44 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600&auto=format&fit=crop&q=80"
              alt="Model Attention Focus"
              className="w-full h-full object-cover opacity-80"
            />

            {showHeatmapOverlay && (
              <div
                className="absolute inset-0 pointer-events-none mix-blend-color-burn"
                style={{
                  background:
                    'radial-gradient(circle at 35% 45%, rgba(239, 68, 68, 0.75) 0%, rgba(245, 158, 11, 0.5) 30%, transparent 65%)',
                }}
              />
            )}

            <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-3 pointer-events-none">
              <span className="text-[11px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-lg self-start">
                Feature Weights: Convex Forehead & Horn Base
              </span>
              <span className="text-[10px] text-gray-200 text-center bg-black/60 py-1 px-2 rounded-lg backdrop-blur-xs">
                {result.attentionHeatmapNote}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 text-center">{t.attentionPreviewDesc}</p>
        </div>

        {/* Section 28: "What should the field worker do next?" Workflow Hub */}
        <div className="bg-[#2D4F1E] text-white rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/60">
            Field Actions
          </span>
          <h3 className="text-base font-bold text-white mt-0.5 mb-3">{t.nextActionPrompt}</h3>

          <div className="grid grid-cols-1 gap-2">
            <button
              id="result-view-profile-btn"
              type="button"
              onClick={() => navigate({ name: 'BreedProfile', breedId: targetBreedId })}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-between border border-white/15"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#D4A373]" />
                {t.viewFullProfile}
              </span>
              <span>→</span>
            </button>

            <button
              id="result-view-nutrition-btn"
              type="button"
              onClick={() => navigate({ name: 'Nutrition', breedId: targetBreedId })}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-between border border-white/15"
            >
              <span className="flex items-center gap-2">
                <Wheat className="w-4 h-4 text-amber-300" />
                {t.viewFeedPlan}
              </span>
              <span>→</span>
            </button>

            <button
              id="result-view-crossbreeding-btn"
              type="button"
              onClick={() => navigate({ name: 'Crossbreeding', breedId: targetBreedId })}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-between border border-white/15"
            >
              <span className="flex items-center gap-2">
                <GitFork className="w-4 h-4 text-blue-300" />
                {t.exploreCrossbreeding}
              </span>
              <span>→</span>
            </button>

            <button
              id="result-register-gov-btn"
              type="button"
              onClick={() => navigate({ name: 'GovernmentBridge', breedId: targetBreedId })}
              className="w-full py-3 px-4 rounded-xl bg-[#D4A373] hover:bg-[#c39263] text-white font-bold text-sm flex items-center justify-between shadow-md"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {t.registerInGov}
              </span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
