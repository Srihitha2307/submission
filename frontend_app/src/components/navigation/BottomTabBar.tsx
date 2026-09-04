import React from 'react';
import { Home, Scan, Users, User } from 'lucide-react';
import { RootTab } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface BottomTabBarProps {
  currentTab: RootTab;
  onSelectTab: (tab: RootTab) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ currentTab, onSelectTab }) => {
  const { t } = useLanguage();

  const tabs: { id: RootTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: t.tabHome, icon: Home },
    { id: 'identify', label: t.tabIdentify, icon: Scan },
    { id: 'community', label: t.tabCommunity, icon: Users },
    { id: 'profile', label: t.tabProfile, icon: User },
  ];

  return (
    <nav
      id="bottom-tab-bar"
      aria-label="Bottom Navigation"
      className="sticky bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-3 py-1.5 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const IconComponent = tab.icon;
          const isIdentify = tab.id === 'identify';

          if (isIdentify) {
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className="flex flex-col items-center justify-center -mt-5 focus:outline-none group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                    isActive
                      ? 'bg-[#2D4F1E] text-white ring-4 ring-[#EAF1E7]'
                      : 'bg-[#2D4F1E] text-white hover:bg-[#1E3514]'
                  }`}
                >
                  <Scan className="w-6 h-6" />
                </div>
                <span
                  className={`text-[10px] font-bold mt-1 transition-colors ${
                    isActive ? 'text-[#2D4F1E]' : 'text-gray-500'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className="flex flex-col items-center justify-center py-1 px-3 min-w-[64px] min-h-[48px] focus:outline-none transition-colors"
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? 'text-[#2D4F1E] bg-[#F5F2ED]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] tracking-tight ${
                  isActive ? 'text-[#2D4F1E] font-bold' : 'text-gray-400 font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
