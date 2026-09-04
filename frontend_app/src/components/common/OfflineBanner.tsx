import React from 'react';
import { WifiOff, Database } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';

export const OfflineBanner: React.FC = () => {
  const { isOffline } = useApp();
  const { t } = useLanguage();

  if (!isOffline) return null;

  return (
    <div
      id="offline-status-banner"
      className="bg-[#D4A373]/20 border-b border-[#D4A373]/30 px-3 py-2 text-xs text-[#73481f] flex items-center justify-between gap-2 shrink-0"
    >
      <div className="flex items-center gap-2 min-w-0">
        <WifiOff className="w-4 h-4 text-[#B88656] shrink-0" />
        <span className="font-medium truncate">{t.offlineNotice}</span>
      </div>
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[#D4A373]/30 text-[#73481f] px-2 py-0.5 rounded-md shrink-0">
        <Database className="w-3 h-3 text-[#B88656]" /> Local Cache
      </span>
    </div>
  );
};
