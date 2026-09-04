import React from 'react';
import { Bookmark, WifiOff, ChevronRight, Droplets, Trash2, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { breedService } from '../services/breedService';
import { VoiceButton } from '../components/common/VoiceButton';
import { useToast } from '../components/common/Toast';

export const SavedBreedsScreen: React.FC = () => {
  const { navigate, savedBreedIds, toggleSaveBreed } = useApp();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const allBreeds = breedService.getAllBreeds();
  const savedBreeds = allBreeds.filter((b) => savedBreedIds.includes(b.id));

  const handleRemove = async (e: React.MouseEvent, breedId: string) => {
    e.stopPropagation();
    await toggleSaveBreed(breedId);
    showToast({ message: t.unsaveBreed, type: 'info' });
  };

  return (
    <div className="flex-1 pb-24 bg-[#F5F2ED] overflow-y-auto">
      {/* Top Banner */}
      <div className="bg-[#2D4F1E] text-white p-4 pb-6">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/70">
            Field Knowledge Base
          </span>
          <VoiceButton />
        </div>
        <h2 className="text-2xl font-black text-white">{t.savedBreedsTitle}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D4A373] bg-[#D4A373]/20 px-2 py-0.5 rounded-md border border-[#D4A373]/30">
            <WifiOff className="w-3 h-3" />
            {t.availableOffline}
          </span>
          <span className="text-xs text-white/70">
            {savedBreeds.length} Breeds cached locally
          </span>
        </div>
      </div>

      <div className="px-4 -mt-3 space-y-3">
        {savedBreeds.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">{t.noSavedBreeds}</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Save breeds while online so you can access feeding, yield, and breeding guidelines
              without cellular reception.
            </p>
            <button
              type="button"
              onClick={() => navigate({ name: 'BreedProfile', breedId: 'gir' })}
              className="px-4 py-2.5 bg-[#2D4F1E] hover:bg-[#1E3514] text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Explore Indigenous Breeds
            </button>
          </div>
        ) : (
          savedBreeds.map((breed) => (
            <div
              key={breed.id}
              onClick={() => navigate({ name: 'BreedProfile', breedId: breed.id })}
              className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-[#2D4F1E] transition-colors shadow-xs cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#2D4F1E]/10 text-[#2D4F1E] font-black text-base flex items-center justify-center border border-[#2D4F1E]/20 shrink-0">
                    {breed.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#2D4F1E] transition-colors">
                        {breed.name}
                      </h4>
                      <span className="text-xs text-gray-400 font-medium">
                        ({breed.hindiName})
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {breed.species} • {breed.origin}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2D4F1E] mt-1">
                      <Droplets className="w-3 h-3 text-[#2D4F1E]" />
                      {breed.milkYield}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleRemove(e, breed.id)}
                    title="Remove from offline cache"
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#2D4F1E]" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
