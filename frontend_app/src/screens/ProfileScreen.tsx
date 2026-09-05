import React from 'react';
import {
  User,
  Globe,
  Database,
  MapPin,
  ShieldCheck,
  Award,
  Trash2,
  ExternalLink,
  HelpCircle,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { storageService } from '../services/storageService';
import { VoiceButton } from '../components/common/VoiceButton';
import { useToast } from '../components/common/Toast';

export const ProfileScreen: React.FC = () => {
  const { savedBreedIds, isOffline, setOffline, navigate } = useApp();
  const { language, setLanguage, t } = useLanguage();
  const { showToast } = useToast();

  const handleResetData = async () => {
    await storageService.clearAll();
    showToast({ message: 'Local cache refreshed to initial defaults', type: 'info' });
  };

  return (
    <div className="flex-1 pb-24 bg-[#F5F2ED] overflow-y-auto">
      {/* Top Banner */}
      <div className="bg-[#2D4F1E] text-white p-4 pb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/70">
            Worker Identity
          </span>
          <VoiceButton />
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white text-[#2D4F1E] font-black text-xl flex items-center justify-center shadow-md border-2 border-[#D4A373]">
            SV
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Sunil Verma</h2>
            <p className="text-xs text-white/80">Livestock Field Assistant (LFA)</p>
            <div className="flex items-center gap-1 text-[11px] text-white/70 mt-0.5">
              <MapPin className="w-3 h-3 text-[#D4A373]" />
              <span>Sehore, Madhya Pradesh</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-3 space-y-4">
        {/* Certification Badge Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#D4A373]/15 text-[#73481f] flex items-center justify-center shrink-0 border border-[#D4A373]/30">
            <Award className="w-5 h-5 text-[#B88656]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">National Livestock Mission</h4>
            <span className="text-[11px] text-gray-500 font-mono block">
              Operator ID: IN-MP-2024-8841
            </span>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400">
              Preferences & Localization
            </span>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {/* Language Switch */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#2D4F1E]" />
                <div>
                  <h4 className="font-bold text-gray-900">{t.languageSetting}</h4>
                  <span className="text-gray-400 text-[11px]">Primary field interface</span>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    language === 'en'
                      ? 'bg-[#2D4F1E] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    language === 'hi'
                      ? 'bg-[#2D4F1E] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  हिन्दी
                </button>
              </div>
            </div>

            {/* Offline Cache Mode */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-[#2D4F1E]" />
                <div>
                  <h4 className="font-bold text-gray-900">Offline Field Database</h4>
                  <span className="text-gray-400 text-[11px]">
                    {savedBreedIds.length} Breeds cached ({savedBreedIds.length * 0.8} MB)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOffline(!isOffline)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                  isOffline
                    ? 'bg-[#D4A373]/20 text-[#73481f] border-[#D4A373]/40'
                    : 'bg-emerald-50 text-[#2D4F1E] border-emerald-200'
                }`}
              >
                {isOffline ? 'Simulating Offline' : 'Online'}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400">
              Institutional Framework
            </span>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            <div className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#2D4F1E]" />
                <span className="text-gray-800 font-medium">ICAR-NBAGR Registered Indigenous Breeds</span>
              </div>
              <span className="text-[10px] font-bold text-[#2D4F1E] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Verified
              </span>
            </div>

            <div className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-[#2D4F1E]" />
                <span className="text-gray-800 font-medium">Bharat Pashudhan (inaph.nddb.coop)</span>
              </div>
              <span className="text-[10px] text-gray-400">Portal Link</span>
            </div>
          </div>
        </div>

        {/* Local Storage & Cache Maintenance */}
        <div className="p-2">
          <button
            id="profile-reset-cache-btn"
            type="button"
            onClick={handleResetData}
            className="w-full py-2.5 text-xs text-gray-400 hover:text-gray-700 font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Demo Local Storage Cache</span>
          </button>
        </div>

        {/* App Version Stamp */}
        <div className="text-center text-gray-400 text-[11px] pb-4">
          <p className="font-semibold text-gray-600">PashuSarthi v1.0.4</p>
          <p>Livestock Breed Intelligence & Field Assistant</p>
        </div>
      </div>
    </div>
  );
};
