import React, { useState } from 'react';
import {
  Bookmark,
  Scale,
  Wheat,
  GitFork,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ThermometerSun,
  Droplets,
  HeartHandshake,
  ShieldCheck,
  Building2,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { breedService } from '../services/breedService';
import { VoiceButton } from '../components/common/VoiceButton';
import { useToast } from '../components/common/Toast';

interface BreedProfileScreenProps {
  breedId?: string;
}

export const BreedProfileScreen: React.FC<BreedProfileScreenProps> = ({ breedId = 'gir' }) => {
  const { navigate, toggleSaveBreed, isBreedSaved } = useApp();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [selectedBreedId, setSelectedBreedId] = useState<string>(breedId);
  const breed = breedService.getBreedById(selectedBreedId) || breedService.getAllBreeds()[0];
  const allBreeds = breedService.getAllBreeds();
  const isSaved = isBreedSaved(breed.id);

  const handleSaveToggle = async () => {
    const saved = await toggleSaveBreed(breed.id);
    showToast(saved ? t.savedSuccess : t.unsaveBreed);
  };

  return (
    <div className="flex-1 pb-24 bg-[#F5F2ED] overflow-y-auto">
      {/* Top Banner & Breed Switcher */}
      <div className="bg-[#2D4F1E] text-white p-4 pb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Quick Breed Selector drop-down */}
          <div className="relative inline-block">
            <select
              id="breed-select-dropdown"
              value={breed.id}
              onChange={(e) => setSelectedBreedId(e.target.value)}
              className="bg-white/15 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg border border-white/20 pr-6 appearance-none focus:outline-none"
            >
              {allBreeds.map((b) => (
                <option key={b.id} value={b.id} className="text-gray-900 bg-white">
                  {b.name} ({b.hindiName})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-white/80 absolute right-1.5 top-2.5 pointer-events-none" />
          </div>

          <div className="flex items-center gap-2">
            <VoiceButton />
            <button
              id="breed-profile-save-btn"
              type="button"
              onClick={handleSaveToggle}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
                isSaved
                  ? 'bg-[#D4A373] text-white border-[#D4A373] shadow-xs'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved' : t.saveBreed}</span>
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-black tracking-tight text-white">{breed.name}</h2>
            <span className="text-base text-white/80 font-semibold">{breed.hindiName}</span>
          </div>
          <p className="text-xs text-white/70 mt-0.5">
            {breed.species} • {breed.purpose} • {breed.origin}
          </p>
        </div>
      </div>

      <div className="px-4 -mt-3 space-y-3.5">
        {/* Key Production & Metric Cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
            <div className="flex items-center gap-1.5 text-[#2D4F1E] text-xs font-bold mb-1">
              <Droplets className="w-3.5 h-3.5" />
              <span>{t.milkYield}</span>
            </div>
            <p className="text-base font-black text-gray-900">{breed.milkYield}</p>
            <span className="text-[11px] text-gray-400 block mt-0.5">Per 305-day lactation</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
            <div className="flex items-center gap-1.5 text-[#B88656] text-xs font-bold mb-1">
              <ThermometerSun className="w-3.5 h-3.5" />
              <span>{t.milkFat}</span>
            </div>
            <p className="text-base font-black text-gray-900">{breed.milkFat}</p>
            <span className="text-[11px] text-gray-400 block mt-0.5">High butterfat profile</span>
          </div>
        </div>

        {/* Climate & Temperament */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-gray-400 block font-medium">{t.heatTolerance}</span>
            <span className="font-bold text-[#2D4F1E] flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#2D4F1E]" />
              {breed.heatTolerance}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block font-medium">{t.temperament}</span>
            <span className="font-bold text-gray-800 mt-0.5 block truncate">
              {breed.temperament}
            </span>
          </div>
          <div className="col-span-2 pt-2 border-t border-gray-100">
            <span className="text-gray-400 block font-medium">{t.climateSuitability}</span>
            <span className="font-semibold text-gray-800 mt-0.5 block">
              {breed.climateSuitability}
            </span>
          </div>
        </div>

        {/* Section 10: "Why this breed matters" */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
          <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4F1E] mb-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.whyBreedMatters}</span>
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed font-medium">{breed.whyMatters}</p>
        </div>

        {/* Breed Characteristics */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
          <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">
            {t.breedCharacteristics}
          </h3>
          <div className="space-y-2">
            {breed.characteristics.map((char, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4F1E] shrink-0 mt-0.5" />
                <span>{char}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Suited For & Care Considerations */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
          <div>
            <h4 className="text-xs font-bold text-gray-900 mb-1 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-[#2D4F1E]" />
              <span>{t.bestSuitedFor}</span>
            </h4>
            <p className="text-xs text-gray-600">{breed.bestSuitedFor}</p>
          </div>

          <div className="pt-2.5 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-[#B88656]" />
              <span>{t.careConsiderations}</span>
            </h4>
            <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
              {breed.careConsiderations.map((care, i) => (
                <li key={i}>{care}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Facts Table */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
          <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">
            {t.quickFacts}
          </h3>
          <div className="divide-y divide-gray-100 text-xs">
            {breed.quickFacts.map((fact, idx) => (
              <div key={idx} className="py-2 flex justify-between">
                <span className="text-gray-500">{fact.label}</span>
                <span className="font-semibold text-gray-900">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
          <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#2D4F1E]" />
            <span>{t.regionalDistribution}</span>
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {breed.regionalDistribution.map((state) => (
              <span
                key={state}
                className="px-2.5 py-1 bg-gray-50 text-gray-800 rounded-lg text-xs font-medium border border-gray-200"
              >
                {state}
              </span>
            ))}
          </div>
        </div>

        {/* Action Hub */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            id="profile-compare-btn"
            type="button"
            onClick={() => navigate({ name: 'BreedCompare', breedId1: breed.id })}
            className="min-h-[44px] bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs py-2.5 px-3 rounded-xl border border-gray-300 flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Scale className="w-4 h-4 text-[#2D4F1E]" />
            <span>Compare Breeds</span>
          </button>

          <button
            id="profile-nutrition-btn"
            type="button"
            onClick={() => navigate({ name: 'Nutrition', breedId: breed.id })}
            className="min-h-[44px] bg-[#2D4F1E] hover:bg-[#1E3514] text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Wheat className="w-4 h-4 text-[#D4A373]" />
            <span>{t.viewFeedPlan}</span>
          </button>

          <button
            id="profile-crossbreeding-btn"
            type="button"
            onClick={() => navigate({ name: 'Crossbreeding', breedId: breed.id })}
            className="min-h-[44px] bg-[#D4A373]/15 hover:bg-[#D4A373]/25 text-[#73481f] border border-[#D4A373]/30 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 col-span-1"
          >
            <GitFork className="w-4 h-4 text-[#B88656]" />
            <span>Breeding Advisory</span>
          </button>

          <button
            id="profile-gov-btn"
            type="button"
            onClick={() => navigate({ name: 'GovernmentBridge', breedId: breed.id })}
            className="min-h-[44px] bg-[#D4A373] hover:bg-[#c39263] text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 col-span-1 shadow-xs"
          >
            <Building2 className="w-4 h-4" />
            <span>Gov Registry</span>
          </button>
        </div>
      </div>
    </div>
  );
};
