import React, { useState } from 'react';
import {
  Building2,
  Copy,
  Download,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  FileText,
  User,
  MapPin,
  Tag,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { breedService } from '../services/breedService';
import { governmentService } from '../services/governmentService';
import { VoiceButton } from '../components/common/VoiceButton';
import { useToast } from '../components/common/Toast';

interface GovernmentBridgeScreenProps {
  breedId?: string;
}

export const GovernmentBridgeScreen: React.FC<GovernmentBridgeScreenProps> = ({
  breedId = 'gir',
}) => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const breed = breedService.getBreedById(breedId) || breedService.getAllBreeds()[0];

  const [tagNumber, setTagNumber] = useState('100849204128');
  const [ownerName, setOwnerName] = useState('Rameshwar Singh Patel');
  const [village, setVillage] = useState('Barkheda, Sehore');
  const [state, setState] = useState('Madhya Pradesh');

  const registrationRecord = governmentService.prepareRegistrationRecord({
    breedName: breed.name,
    species: breed.species,
    confidence: 0.92,
    tagNumber,
    ownerName,
    village,
    state,
  });

  const handleCopy = () => {
    const text = governmentService.formatSummaryText(registrationRecord);
    navigator.clipboard?.writeText(text);
    showToast({ message: t.copiedNotice, type: 'success' });
  };

  const handleExportSummary = () => {
    const text = governmentService.formatSummaryText(registrationRecord);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pashu_record_${tagNumber || 'draft'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast({ message: 'Summary dossier exported successfully', type: 'success' });
  };

  const handleOpenPortal = () => {
    governmentService.openPortalNotice();
    showToast({
      message: 'Bharat Pashudhan (inaph.nddb.coop) reference link generated.',
      type: 'info',
    });
  };

  return (
    <div className="flex-1 pb-24 bg-[#F5F2ED] overflow-y-auto">
      {/* Top Banner */}
      <div className="bg-[#2D4F1E] text-white p-4 pb-6">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/70">
            NDLM Bridge
          </span>
          <VoiceButton />
        </div>
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#D4A373]" />
          <span>{t.govBridgeTitle}</span>
        </h2>
        <p className="text-xs text-white/70 mt-0.5">{t.govBridgeSubtitle}</p>
      </div>

      <div className="px-4 -mt-3 space-y-4">
        {/* Statutory Official Handoff Notice (Section 16) */}
        <div className="bg-[#D4A373]/15 rounded-2xl p-3.5 border border-[#D4A373]/30 shadow-xs">
          <div className="flex items-center gap-1.5 text-[#73481f] text-xs font-bold mb-1">
            <ShieldCheck className="w-4 h-4 text-[#B88656] shrink-0" />
            <span>Authorized Field Verification Standard</span>
          </div>
          <p className="text-[11px] text-[#73481f]/90 leading-relaxed font-medium">
            {t.govNotice}
          </p>
        </div>

        {/* Form / Record Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
          <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400">
            Dossier Specifications
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-400 block text-[10px] font-semibold uppercase">
                {t.suggestedBreed}
              </span>
              <span className="font-bold text-gray-900 text-sm mt-0.5 block">{breed.name}</span>
              <span className="text-[10px] text-[#2D4F1E] font-bold">92% Match</span>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-400 block text-[10px] font-semibold uppercase">
                {t.animalType}
              </span>
              <span className="font-bold text-gray-900 text-sm mt-0.5 block">{breed.species}</span>
              <span className="text-[10px] text-gray-400">Bovine (Bos indicus)</span>
            </div>
          </div>

          {/* 12-Digit Tag Input */}
          <div>
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1">
              <Tag className="w-3.5 h-3.5 text-[#2D4F1E]" />
              <span>{t.tagNumberInput}</span>
            </label>
            <input
              type="text"
              maxLength={12}
              value={tagNumber}
              onChange={(e) => setTagNumber(e.target.value)}
              placeholder="e.g. 100849204128"
              className="w-full text-xs font-mono font-bold p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D4F1E] bg-gray-50 text-gray-900"
            />
            <span className="text-[10px] text-gray-400 mt-0.5 block">
              Standard polyurethane yellow ear-tag with 12-digit barcode.
            </span>
          </div>

          {/* Owner & Village */}
          <div className="grid grid-cols-1 gap-2.5 pt-1 text-xs">
            <div>
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5 text-[#2D4F1E]" />
                <span>{t.ownerNameInput}</span>
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none text-gray-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#2D4F1E]" />
                <span>{t.villageDistrictInput}</span>
              </label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons (Section 16) */}
        <div className="space-y-2 pt-1">
          <button
            id="gov-copy-btn"
            type="button"
            onClick={handleCopy}
            className="w-full min-h-[46px] bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs py-2.5 px-4 rounded-xl border border-gray-300 flex items-center justify-center gap-2 shadow-xs"
          >
            <Copy className="w-4 h-4 text-gray-600" />
            <span>{t.copyInformation}</span>
          </button>

          <button
            id="gov-export-btn"
            type="button"
            onClick={handleExportSummary}
            className="w-full min-h-[46px] bg-[#D4A373]/15 hover:bg-[#D4A373]/25 text-[#73481f] font-bold text-xs py-2.5 px-4 rounded-xl border border-[#D4A373]/30 flex items-center justify-center gap-2 shadow-xs"
          >
            <Download className="w-4 h-4 text-[#B88656]" />
            <span>{t.exportSummary}</span>
          </button>

          <button
            id="gov-open-portal-btn"
            type="button"
            onClick={handleOpenPortal}
            className="w-full min-h-[48px] bg-[#2D4F1E] hover:bg-[#1E3514] text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs"
          >
            <ExternalLink className="w-4 h-4 text-[#D4A373]" />
            <span>{t.openPortal}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
