import React from 'react';
import { ArrowLeft, Wifi, WifiOff, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { VoiceButton } from './VoiceButton';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showVoice?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  showVoice = true,
  rightAction,
}) => {
  const { goBack, canGoBack, isOffline, setOffline } = useApp();
  const { language, setLanguage } = useLanguage();

  const toggleLang = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const toggleOfflineMode = () => {
    setOffline(!isOffline);
  };

  return (
    <header
      id="app-top-header"
      className="sticky top-0 z-30 bg-[#2D4F1E] text-white px-4 py-3 shadow-xs border-b border-[#1E3514]"
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack && canGoBack ? (
            <button
              id="header-back-btn"
              type="button"
              onClick={goBack}
              aria-label="Go Back"
              className="p-1.5 -ml-1 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : null}

          <div className="min-w-0">
            <h1 className="text-base font-bold tracking-tight text-white leading-tight truncate">
              {title || 'PashuDrishti'}
            </h1>
            {subtitle ? (
              <p className="text-[12px] text-white/70 leading-snug truncate">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {showVoice && <VoiceButton size="sm" />}

          {/* Offline / Online toggle button */}
          <button
            id="offline-toggle-badge"
            type="button"
            onClick={toggleOfflineMode}
            title={isOffline ? 'Offline mode active (Tap to sync)' : 'Online mode (Tap to simulate field offline)'}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
              isOffline
                ? 'bg-amber-500/20 text-amber-200 border-amber-400/40'
                : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20'
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3 h-3 text-amber-300" />
                <span>Offline</span>
              </>
            ) : (
              <>
                <Wifi className="w-3 h-3 text-emerald-300" />
                <span>Online</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <button
            id="lang-toggle-btn"
            type="button"
            onClick={toggleLang}
            title="Toggle Language / भाषा बदलें"
            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
          >
            <Globe className="w-3 h-3 text-emerald-200" />
            <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
          </button>

          {rightAction}
        </div>
      </div>
    </header>
  );
};
