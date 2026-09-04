import React from 'react';
import { Users, MessageSquare, ChevronRight, TrendingUp, Store, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { communityService } from '../services/communityService';
import { CURRENT_MARKET_SNAPSHOT } from '../data/market';
import { VoiceButton } from '../components/common/VoiceButton';

export const CommunityScreen: React.FC = () => {
  const { navigate } = useApp();
  const { t } = useLanguage();

  const communities = communityService.getCommunities();
  const market = CURRENT_MARKET_SNAPSHOT;

  return (
    <div className="flex-1 pb-24 bg-[#F5F2ED] overflow-y-auto">
      {/* Top Banner */}
      <div className="bg-[#2D4F1E] text-white p-4 pb-6">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/70">
            {t.farmerNetwork}
          </span>
          <VoiceButton />
        </div>
        <h2 className="text-2xl font-black text-white">{t.yourCommunities}</h2>
        <p className="text-xs text-white/70 mt-0.5">{t.farmerNetworkSubtitle}</p>
      </div>

      <div className="px-4 -mt-3 space-y-4">
        {/* Section 15: Market Information Banner */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
              <Store className="w-4 h-4 text-[#2D4F1E]" />
              <span>{t.localMarketUpdates}</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#D4A373]/15 text-[#73481f] px-2 py-0.5 rounded-md border border-[#D4A373]/30">
              {t.demoDataLabel}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs mb-2.5">
            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-400 block text-[11px] font-medium">{t.milkPrice}</span>
              <span className="font-bold text-gray-900 block mt-0.5">{market.cowMilkPrice}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-400 block text-[11px] font-medium">{t.feedPrice}</span>
              <span className="font-bold text-gray-900 block mt-0.5">{market.cattleFeedPrice}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-100">
            <span>
              {market.district}, {market.state}
            </span>
            <span>
              {t.lastUpdated}: {market.lastUpdated}
            </span>
          </div>
        </div>

        {/* Communities List */}
        <div className="space-y-2.5">
          <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 px-1">
            Breed Networks
          </h3>

          {communities.map((comm) => (
            <div
              key={comm.id}
              id={`community-card-${comm.id}`}
              onClick={() => navigate({ name: 'CommunityDetail', communityId: comm.id })}
              className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-[#2D4F1E] transition-colors shadow-xs cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl text-white font-black text-base flex items-center justify-center shrink-0 shadow-xs"
                    style={{ backgroundColor: comm.coverColor }}
                  >
                    {comm.breed.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#2D4F1E] transition-colors">
                      {comm.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                      <span className="flex items-center gap-1 font-semibold text-[#2D4F1E]">
                        <Users className="w-3.5 h-3.5" />
                        {comm.memberCount.toLocaleString()} {t.members}
                      </span>
                      <span>•</span>
                      <span>{comm.activeDiscussions} active discussions</span>
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#2D4F1E] transition-colors shrink-0 mt-2" />
              </div>
              <p className="text-xs text-gray-600 mt-2.5 line-clamp-2 leading-relaxed">
                {comm.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
