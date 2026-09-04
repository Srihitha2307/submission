import React, { useState } from 'react';
import {
  Wheat,
  Droplets,
  Clock,
  AlertTriangle,
  Sparkles,
  ChevronDown,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { nutritionService } from '../services/nutritionService';
import { breedService } from '../services/breedService';
import { VoiceButton } from '../components/common/VoiceButton';

interface NutritionScreenProps {
  breedId?: string;
}

export const NutritionScreen: React.FC<NutritionScreenProps> = ({ breedId = 'gir' }) => {
  const { t } = useLanguage();
  const [selectedBreedId, setSelectedBreedId] = useState(breedId);

  const plan = nutritionService.getNutritionPlan(selectedBreedId);
  const allBreeds = breedService.getAllBreeds();

  return (
    <div className="flex-1 pb-24 bg-[#F5F2ED] overflow-y-auto">
      {/* Top Banner */}
      <div className="bg-[#2D4F1E] text-white p-4 pb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/70">
            {t.nutritionPlanTitle}
          </span>
          <VoiceButton />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-white/70 block">{t.recommendedFor}</span>
            <h2 className="text-2xl font-black text-white">{plan.breedName}</h2>
          </div>

          <div className="relative inline-block">
            <select
              value={selectedBreedId}
              onChange={(e) => setSelectedBreedId(e.target.value)}
              className="bg-white/15 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg border border-white/20 pr-6 appearance-none focus:outline-none"
            >
              {allBreeds.map((b) => (
                <option key={b.id} value={b.id} className="text-gray-900 bg-white">
                  {b.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-white/80 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="px-4 -mt-3 space-y-3.5">
        {/* Educational Disclaimer Box (Section 13) */}
        <div className="bg-[#D4A373]/15 rounded-2xl p-3.5 border border-[#D4A373]/30 shadow-xs">
          <div className="flex items-center gap-1.5 text-[#73481f] text-xs font-bold mb-1">
            <AlertTriangle className="w-4 h-4 text-[#B88656] shrink-0" />
            <span>{t.nutritionDisclaimerTitle}</span>
          </div>
          <p className="text-[11px] text-[#73481f]/90 leading-relaxed font-medium">
            {plan.educationalDisclaimer}
          </p>
        </div>

        {/* Daily Feeding Overview */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
          <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400">
            {t.dailyFeedingOverview} (Per Adult Milking Cow)
          </h3>

          {/* Green Fodder */}
          <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#2D4F1E] flex items-center gap-1.5">
                <Wheat className="w-4 h-4 text-[#2D4F1E]" />
                {t.greenFodder}
              </span>
              <span className="text-xs font-black text-[#2D4F1E] bg-emerald-100/70 px-2 py-0.5 rounded-md">
                {plan.greenFodder.amount}
              </span>
            </div>
            <p className="text-[11px] text-gray-600 mb-1.5">{plan.greenFodder.notes}</p>
            <div className="flex flex-wrap gap-1">
              {plan.greenFodder.examples?.map((ex, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium bg-white text-[#2D4F1E] px-2 py-0.5 rounded-md border border-emerald-200/70"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>

          {/* Dry Fodder */}
          <div className="p-3 rounded-xl bg-[#D4A373]/10 border border-[#D4A373]/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#73481f] flex items-center gap-1.5">
                <Wheat className="w-4 h-4 text-[#B88656]" />
                {t.dryFodder}
              </span>
              <span className="text-xs font-black text-[#73481f] bg-[#D4A373]/20 px-2 py-0.5 rounded-md">
                {plan.dryFodder.amount}
              </span>
            </div>
            <p className="text-[11px] text-gray-600 mb-1.5">{plan.dryFodder.notes}</p>
            <div className="flex flex-wrap gap-1">
              {plan.dryFodder.examples?.map((ex, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium bg-white text-[#73481f] px-2 py-0.5 rounded-md border border-[#D4A373]/30"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>

          {/* Concentrate Feed */}
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-gray-900">
                {t.concentrateFeed}
              </span>
              <span className="text-xs font-black text-gray-900 bg-gray-200 px-2 py-0.5 rounded-md">
                {plan.concentrateFeed.amount}
              </span>
            </div>
            <p className="text-[11px] text-gray-600 mb-1.5">{plan.concentrateFeed.notes}</p>
            <div className="flex flex-wrap gap-1">
              {plan.concentrateFeed.examples?.map((ex, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium bg-white text-gray-800 px-2 py-0.5 rounded-md border border-gray-300"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>

          {/* Mineral Supplement & Water in 2 columns */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs">
              <span className="font-bold text-gray-800 block mb-0.5">
                {t.mineralSupplement}
              </span>
              <span className="font-black text-[#2D4F1E] block text-sm">
                {plan.mineralSupplement.amount}
              </span>
              <p className="text-[10px] text-gray-500 mt-1 leading-tight">
                {plan.mineralSupplement.notes}
              </p>
            </div>

            <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-200 text-xs">
              <span className="font-bold text-blue-950 flex items-center gap-1 mb-0.5">
                <Droplets className="w-3.5 h-3.5 text-blue-700" />
                {t.cleanWater}
              </span>
              <span className="font-black text-blue-900 block text-sm">
                {plan.cleanWater.amount}
              </span>
              <p className="text-[10px] text-blue-800/80 mt-1 leading-tight">
                {plan.cleanWater.notes}
              </p>
            </div>
          </div>
        </div>

        {/* Morning, Afternoon, Evening Feeding Schedule Cards (Section 13) */}
        <div className="space-y-2.5">
          <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 px-1">
            Daily Feeding Routine
          </h3>

          {plan.dailySchedule.map((sched, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#2D4F1E]" />
                  <h4 className="text-xs font-bold text-gray-900 uppercase">
                    {sched.timePeriod === 'Morning'
                      ? t.morningFeed
                      : sched.timePeriod === 'Afternoon'
                      ? t.afternoonFeed
                      : t.eveningFeed}
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  {sched.timeLabel}
                </span>
              </div>

              <div className="space-y-1.5 mb-2.5">
                {sched.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4F1E] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-start gap-1.5 text-[11px] text-gray-500">
                <Info className="w-3 h-3 text-gray-400 shrink-0 mt-0.5" />
                <span>Tip: {sched.managementTip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
