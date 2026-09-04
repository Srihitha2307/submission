import React from 'react';
import {
  MapPin,
  Sparkles,
  Bookmark,
  Wheat,
  BookOpen,
  GitFork,
  Users,
  Building2,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { VoiceButton } from '../components/common/VoiceButton';

export const HomeScreen: React.FC = () => {
  const { navigate, recentIdentifications, isOffline, activeScenario, setActiveScenario } = useApp();
  const { t } = useLanguage();

  const usefulFeatures = [
    {
      id: 'feed-nutrition',
      title: t.feedNutrition,
      desc: 'Ration schedules & fodder balance',
      icon: Wheat,
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      action: () => navigate({ name: 'Nutrition', breedId: 'gir' }),
    },
    {
      id: 'breed-guide',
      title: t.breedGuide,
      desc: 'Indigenous cattle & buffalo library',
      icon: BookOpen,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      action: () => navigate({ name: 'BreedProfile', breedId: 'gir' }),
    },
    {
      id: 'crossbreeding',
      title: t.crossbreeding,
      desc: 'Scientific breeding advisories',
      icon: GitFork,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      action: () => navigate({ name: 'Crossbreeding', breedId: 'sahiwal' }),
    },
    {
      id: 'community',
      title: t.farmerCommunity,
      desc: 'Connect with local breeders & feed tips',
      icon: Users,
      color: 'bg-stone-100 text-stone-800 border-stone-200',
      action: () => navigate({ name: 'Community' }),
    },
    {
      id: 'government',
      title: t.governmentRegistry,
      desc: 'Handoff to Bharat Pashudhan',
      icon: Building2,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      action: () => navigate({ name: 'GovernmentBridge', breedId: 'gir' }),
    },
  ];

  return (
    <div className="flex-1 pb-16 bg-[#F5F2ED]">
      {/* Welcome Header */}
      <section className="bg-[#2D4F1E] text-white pt-5 pb-8 px-4 border-b border-[#1E3514]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-white/70 font-medium mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{t.locationLabel}</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {t.greeting}
            </h2>
            <p className="text-sm text-white/80 mt-0.5">{t.subGreeting}</p>
          </div>
          <VoiceButton />
        </div>

        {/* Status pill */}
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/10 text-white border border-white/15">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {isOffline ? t.availableOffline : t.onlineBadge}
          </span>
          <span className="text-xs text-white/60">ICAR-NBAGR aligned</span>
        </div>
      </section>

      <div className="px-4 -mt-4 space-y-4">
        {/* Main Sleek CTA Card */}
        <div className="bg-[#2D4F1E] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/60 bg-white/10 px-2 py-0.5 rounded">
              Multi-Angle Scan
            </span>
          </div>

          <h3 className="text-lg font-bold leading-tight mb-1">{t.mainCtaIdentify}</h3>
          <p className="text-xs text-white/75 leading-relaxed">
            Guided 3-angle capture (face, lateral profile, horn structure) for morphological breed intelligence.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <button
              id="home-main-identify-btn"
              type="button"
              onClick={() => navigate({ name: 'Identify' })}
              className="w-full min-h-[44px] bg-white text-[#2D4F1E] hover:bg-gray-100 active:bg-gray-200 font-bold text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4 text-[#2D4F1E]" />
              <span>Start Identification</span>
            </button>

            <button
              id="home-secondary-saved-btn"
              type="button"
              onClick={() => navigate({ name: 'SavedBreeds' })}
              className="w-full min-h-[38px] bg-white/10 hover:bg-white/20 active:bg-white/25 text-white font-medium text-xs py-2 px-4 rounded-xl border border-white/20 flex items-center justify-center gap-2 transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{t.secondaryCtaSaved}</span>
            </button>
          </div>
        </div>

        {/* Demo Scenario Selector for Evaluator */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#D4A373]" />
              Evaluator Demo Mode Switcher
            </span>
            <span className="text-[10px] text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded font-bold">
              Mock Engine
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mb-2">
            Switch simulation scenario before running detection:
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setActiveScenario('gir_purebred')}
              className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeScenario === 'gir_purebred'
                  ? 'bg-[#2D4F1E] text-white border-[#1E3514] shadow-xs'
                  : 'bg-[#F5F2ED] text-gray-800 border-gray-200 hover:bg-gray-100'
              }`}
            >
              🐄 Gir Purebred (92%)
            </button>
            <button
              type="button"
              onClick={() => setActiveScenario('crossbreed_sahiwal_jersey')}
              className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeScenario === 'crossbreed_sahiwal_jersey'
                  ? 'bg-[#2D4F1E] text-white border-[#1E3514] shadow-xs'
                  : 'bg-[#F5F2ED] text-gray-800 border-gray-200 hover:bg-gray-100'
              }`}
            >
              🧬 Sahiwal × Jersey
            </button>
            <button
              type="button"
              onClick={() => setActiveScenario('murrah_buffalo')}
              className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeScenario === 'murrah_buffalo'
                  ? 'bg-[#2D4F1E] text-white border-[#1E3514] shadow-xs'
                  : 'bg-[#F5F2ED] text-gray-800 border-gray-200 hover:bg-gray-100'
              }`}
            >
              🐃 Murrah Buffalo (89%)
            </button>
            <button
              type="button"
              onClick={() => setActiveScenario('low_confidence')}
              className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeScenario === 'low_confidence'
                  ? 'bg-[#D4A373] text-white border-[#B88656] shadow-xs'
                  : 'bg-[#F5F2ED] text-gray-800 border-gray-200 hover:bg-gray-100'
              }`}
            >
              ⚠️ Low Confidence
            </button>
          </div>
        </div>

        {/* Recent Identifications */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">
              {t.recentIdentifications}
            </h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              View All
            </span>
          </div>

          <div className="space-y-2">
            {recentIdentifications.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  navigate({
                    name: 'BreedProfile',
                    breedId: item.breed.toLowerCase().includes('murrah') ? 'murrah' : 'gir',
                  })
                }
                className="bg-white rounded-xl p-3 border border-gray-100 flex items-center justify-between shadow-xs hover:border-[#2D4F1E] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-gray-100 text-[#2D4F1E] font-black text-sm flex items-center justify-center">
                    {item.breed.toLowerCase().includes('murrah') ? '🐃' : '🐄'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#2D4F1E] transition-colors">
                        {item.breed}
                      </h4>
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                        {Math.round(item.confidence * 100)}% Confidence
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium">
                      {item.timeLabel} • {item.location}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#2D4F1E]" />
              </div>
            ))}
          </div>
        </section>

        {/* Useful for you / Field Guides */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">
              {t.usefulForYou}
            </h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Field Tools
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {usefulFeatures.slice(0, 4).map((feat, idx) => {
              const isAccent = idx % 2 === 0;
              return (
                <div
                  key={feat.id}
                  onClick={feat.action}
                  className={`p-3 rounded-xl border transition-all cursor-pointer group ${
                    isAccent
                      ? 'bg-[#D4A373]/10 border-[#D4A373]/25 hover:border-[#D4A373]'
                      : 'bg-[#2D4F1E]/5 border-[#2D4F1E]/15 hover:border-[#2D4F1E]'
                  }`}
                >
                  <p
                    className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                      isAccent ? 'text-[#B88656]' : 'text-[#2D4F1E]'
                    }`}
                  >
                    {feat.title}
                  </p>
                  <p className="text-xs font-bold text-gray-900 line-clamp-1">{feat.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Full-width government bridge card */}
          <div
            onClick={usefulFeatures[4].action}
            className="mt-2 bg-white rounded-xl p-3 border border-gray-200 hover:border-[#2D4F1E] flex items-center justify-between shadow-xs transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#2D4F1E]/10 flex items-center justify-center text-[#2D4F1E] shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#2D4F1E] transition-colors">
                  {usefulFeatures[4].title}
                </h4>
                <p className="text-[11px] text-gray-500">{usefulFeatures[4].desc}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#2D4F1E]" />
          </div>
        </section>

        {/* Verification Footnote */}
        <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-start gap-2.5 text-xs text-gray-600">
          <ShieldCheck className="w-4 h-4 text-[#2D4F1E] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            Designed for field workers and veterinary assistants. Prepares standardized
            livestock records for the National Digital Livestock Mission (NDLM).
          </p>
        </div>
      </div>
    </div>
  );
};
