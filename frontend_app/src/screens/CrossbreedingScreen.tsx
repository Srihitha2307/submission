import React, { useState } from 'react';
import {
  GitFork,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  ChevronDown,
  ShieldCheck,
  Building2,
  Info,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { crossbreedingService } from '../services/crossbreedingService';
import { breedService } from '../services/breedService';
import { VoiceButton } from '../components/common/VoiceButton';
import { useToast } from '../components/common/Toast';

interface CrossbreedingScreenProps {
  breedId?: string;
}

export const CrossbreedingScreen: React.FC<CrossbreedingScreenProps> = ({ breedId = 'sahiwal' }) => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [selectedBreedId, setSelectedBreedId] = useState(breedId);
  const [showVetModal, setShowVetModal] = useState(false);

  const options = crossbreedingService.getBreedingOptions(selectedBreedId);
  const allBreeds = breedService.getAllBreeds();
  const currentBreed = breedService.getBreedById(selectedBreedId) || allBreeds[1];

  const handleConsultVet = () => {
    setShowVetModal(true);
  };

  return (
    <div className="flex-1 pb-24 bg-[#F5F2ED] overflow-y-auto">
      {/* Top Banner */}
      <div className="bg-[#2D4F1E] text-white p-4 pb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/70">
            {t.crossbreedingTitle}
          </span>
          <VoiceButton />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-white/70 block">{t.detectedBreed}</span>
            <h2 className="text-2xl font-black text-white">{currentBreed.name}</h2>
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
        {/* Statutory Breeding Disclaimer (Section 12) */}
        <div className="bg-[#D4A373]/15 rounded-2xl p-3.5 border border-[#D4A373]/30 shadow-xs">
          <div className="flex items-center gap-1.5 text-[#73481f] text-xs font-bold mb-1">
            <AlertTriangle className="w-4 h-4 text-[#B88656] shrink-0" />
            <span>State Breeding Policy Advisory</span>
          </div>
          <p className="text-[11px] text-[#73481f]/90 leading-relaxed font-medium">
            {t.breedingDisclaimer}
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 px-1">
            {t.crossbreedingSubtitle}
          </h3>

          {options.map((opt) => (
            <div
              key={opt.id}
              className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-2.5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4F1E] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Scientific Match
                  </span>
                  <h4 className="text-base font-bold text-gray-900 mt-1">
                    {opt.baseBreed} × {opt.sireBreed}
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#D4A373]/15 text-[#73481f] flex items-center justify-center shrink-0">
                  <GitFork className="w-4 h-4 text-[#B88656]" />
                </div>
              </div>

              {/* Potential Objective */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase block mb-0.5">
                  {t.potentialObjective}
                </span>
                <p className="text-xs text-gray-800 font-medium">{opt.objective}</p>
              </div>

              {/* Expected Outcome */}
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/70">
                <span className="text-[11px] font-bold text-[#2D4F1E] uppercase block mb-0.5">
                  {t.expectedObjective}
                </span>
                <p className="text-xs text-[#2D4F1E] font-semibold">{opt.expectedOutcome}</p>
                <span className="text-[11px] text-[#2D4F1E]/80 mt-1 block">
                  Adaptability retention: {opt.adaptabilityRetention}
                </span>
              </div>

              {/* Strengths */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase block mb-1">
                  {t.strengthsTitle}
                </span>
                <div className="space-y-1">
                  {opt.strengths.map((str, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4F1E] shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Considerations */}
              <div className="pt-2 border-t border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase block mb-1">
                  Field Considerations
                </span>
                <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                  {opt.considerations.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>

              {/* Consult Vet Officer CTA */}
              <button
                id={`consult-vet-btn-${opt.id}`}
                type="button"
                onClick={handleConsultVet}
                className="w-full min-h-[44px] bg-[#2D4F1E] hover:bg-[#1E3514] text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs"
              >
                <PhoneCall className="w-4 h-4 text-[#D4A373]" />
                <span>{t.consultVetOfficer}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Consult Vet Modal */}
      {showVetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#2D4F1E]">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">District Veterinary Officer</h3>
                <p className="text-xs text-gray-500">Sehore District AI Coordination</p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">AI Technician Line:</span>
                <span className="font-bold text-gray-900">+91 7562 224810</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Kisan Call Center:</span>
                <span className="font-bold text-[#2D4F1E]">1800-180-1551 (Toll-free)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">State Semen Bank:</span>
                <span className="font-bold text-gray-900">Bhopal Central Station</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-600 mb-4 leading-relaxed">
              Always request cryopreserved straws with barcode pedigree traceability for certified
              pedigree improvement.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowVetModal(false)}
                className="flex-1 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowVetModal(false);
                  showToast({ message: 'Connecting to veterinary directory...', type: 'info' });
                }}
                className="flex-1 py-2.5 px-3 bg-[#2D4F1E] hover:bg-[#1E3514] text-white font-bold text-xs rounded-xl shadow"
              >
                Dial Office
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
