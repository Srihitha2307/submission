import React, { useState } from 'react';
import { Scale, ArrowRightLeft, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { breedService } from '../services/breedService';
import { VoiceButton } from '../components/common/VoiceButton';

interface BreedCompareScreenProps {
  breedId1?: string;
  breedId2?: string;
}

export const BreedCompareScreen: React.FC<BreedCompareScreenProps> = ({
  breedId1 = 'gir',
  breedId2 = 'sahiwal',
}) => {
  const { navigate } = useApp();
  const { t } = useLanguage();

  const [id1, setId1] = useState(breedId1);
  const [id2, setId2] = useState(breedId2);

  const allBreeds = breedService.getAllBreeds();
  const breed1 = breedService.getBreedById(id1) || allBreeds[0];
  const breed2 = breedService.getBreedById(id2) || allBreeds[1];

  const categories = [
    { label: t.origin, val1: breed1.origin, val2: breed2.origin },
    { label: t.milkYield, val1: breed1.milkYield, val2: breed2.milkYield, highlight: true },
    { label: t.milkFat, val1: breed1.milkFat, val2: breed2.milkFat, highlight: true },
    { label: t.heatTolerance, val1: breed1.heatTolerance, val2: breed2.heatTolerance },
    { label: t.climateSuitability, val1: breed1.climateSuitability, val2: breed2.climateSuitability },
    { label: t.temperament, val1: breed1.temperament, val2: breed2.temperament },
  ];

  return (
    <div className="flex-1 pb-24 bg-[#F5F2ED] overflow-y-auto">
      <div className="bg-[#2D4F1E] text-white p-4 pb-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/70">
            Breed Comparison
          </span>
          <VoiceButton />
        </div>
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#D4A373]" />
          <span>{breed1.name} vs {breed2.name}</span>
        </h2>
        <p className="text-xs text-white/70 mt-0.5">
          Comparative field evaluation of milk traits, adaptability and origin.
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Selectors Bar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-xs flex items-center gap-2">
          <div className="flex-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
              Breed A
            </label>
            <select
              value={id1}
              onChange={(e) => setId1(e.target.value)}
              className="w-full bg-gray-50 text-gray-900 text-xs font-bold p-2 rounded-xl border border-gray-200 focus:outline-none"
            >
              {allBreeds.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="p-2 rounded-full bg-[#D4A373]/15 text-[#73481f] mt-3 shrink-0">
            <ArrowRightLeft className="w-4 h-4 text-[#B88656]" />
          </div>

          <div className="flex-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
              Breed B
            </label>
            <select
              value={id2}
              onChange={(e) => setId2(e.target.value)}
              className="w-full bg-gray-50 text-gray-900 text-xs font-bold p-2 rounded-xl border border-gray-200 focus:outline-none"
            >
              {allBreeds.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table / Cards */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="grid grid-cols-2 bg-[#2D4F1E]/5 p-3.5 border-b border-gray-200 text-center">
            <div className="border-r border-gray-200 pr-2">
              <h3 className="text-sm font-black text-[#2D4F1E]">{breed1.name}</h3>
              <span className="text-[11px] text-[#2D4F1E]/80 font-medium">{breed1.hindiName}</span>
            </div>
            <div className="pl-2">
              <h3 className="text-sm font-black text-[#2D4F1E]">{breed2.name}</h3>
              <span className="text-[11px] text-[#2D4F1E]/80 font-medium">{breed2.hindiName}</span>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {categories.map((cat, i) => (
              <div key={i} className="p-3.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block text-center mb-1.5">
                  {cat.label}
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div
                    className={`p-2.5 rounded-xl ${
                      cat.highlight
                        ? 'bg-emerald-50/70 border border-emerald-200/80 font-bold text-[#2D4F1E]'
                        : 'text-gray-800 font-medium bg-gray-50/50'
                    }`}
                  >
                    {cat.val1}
                  </div>
                  <div
                    className={`p-2.5 rounded-xl ${
                      cat.highlight
                        ? 'bg-[#D4A373]/15 border border-[#D4A373]/30 font-bold text-[#73481f]'
                        : 'text-gray-800 font-medium bg-gray-50/50'
                    }`}
                  >
                    {cat.val2}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            id="compare-view-profiles-btn"
            type="button"
            onClick={() => navigate({ name: 'BreedProfile', breedId: breed1.id })}
            className="w-full min-h-[46px] bg-[#2D4F1E] hover:bg-[#1E3514] text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs"
          >
            <span>View Complete {breed1.name} Dossier</span>
          </button>
        </div>
      </div>
    </div>
  );
};
