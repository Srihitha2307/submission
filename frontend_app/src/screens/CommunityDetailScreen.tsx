import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Plus,
  Send,
  MapPin,
  Tag,
  Clock,
  Sparkles,
  Users,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { communityService } from '../services/communityService';
import { Community, CommunityPost } from '../types';
import { VoiceButton } from '../components/common/VoiceButton';
import { useToast } from '../components/common/Toast';

interface CommunityDetailScreenProps {
  communityId?: string;
}

type TabCategory = 'Discussions' | 'Feed Tips' | 'Care' | 'Market' | 'Questions';

export const CommunityDetailScreen: React.FC<CommunityDetailScreenProps> = ({
  communityId = 'gir-farmers',
}) => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [community, setCommunity] = useState<Community | undefined>(
    communityService.getCommunityById(communityId)
  );
  const [activeCategory, setActiveCategory] = useState<TabCategory>('Discussions');
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedTag, setSelectedTag] = useState<TabCategory>('Feed Tips');

  const categories: TabCategory[] = ['Discussions', 'Feed Tips', 'Care', 'Market', 'Questions'];

  useEffect(() => {
    loadPosts();
  }, [communityId, activeCategory]);

  const loadPosts = async () => {
    const list = await communityService.getPostsForCommunity(communityId, activeCategory);
    setPosts(list);
  };

  const handleLike = async (postId: string) => {
    const updated = await communityService.toggleLike(postId);
    if (updated) {
      setPosts((prev) => prev.map((p) => (p.id === postId ? updated : p)));
    }
  };

  const handleCreatePost = async () => {
    if (!postContent.trim()) return;
    await communityService.createPost({
      communityId,
      authorName: 'Sunil Verma',
      authorRole: 'Livestock Field Assistant',
      authorLocation: 'Sehore, MP',
      authorAvatarInitials: 'SV',
      category: selectedTag,
      content: postContent.trim(),
      tags: [`#${selectedTag.replace(/\s+/g, '')}`, '#FieldObservation'],
    });

    setPostContent('');
    setShowCreateModal(false);
    showToast({ message: 'Post shared with local farmer network', type: 'success' });
    loadPosts();
  };

  if (!community) {
    return (
      <div className="flex-1 p-6 text-center">
        <p className="text-stone-600">Community not found.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 pb-24 bg-[#F5F2ED] overflow-y-auto">
      {/* Community Header */}
      <div className="bg-[#2D4F1E] text-white p-4 pb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/70">
            {community.breed} Community Hub
          </span>
          <VoiceButton />
        </div>
        <h2 className="text-2xl font-black text-white">{community.name}</h2>
        <p className="text-xs text-white/70 mt-0.5 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[#D4A373]" />
          <span>{community.memberCount.toLocaleString()} Verified Keepers</span>
        </p>
      </div>

      {/* Tabs Row (Section 14: Discussions, Feed Tips, Care, Market, Questions) */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 overflow-x-auto no-scrollbar shadow-xs">
        <div className="flex items-center gap-1.5 px-3 py-2.5 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                activeCategory === cat
                  ? 'bg-[#2D4F1E] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Create Post Prompt Card */}
        <div
          onClick={() => setShowCreateModal(true)}
          className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:border-[#2D4F1E] transition-colors"
        >
          <div className="flex items-center gap-2.5 flex-1">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#2D4F1E] font-bold text-xs flex items-center justify-center">
              SV
            </div>
            <span className="text-xs text-gray-400 font-medium truncate">
              {t.postPlaceholder}
            </span>
          </div>
          <button
            type="button"
            className="p-1.5 rounded-full bg-[#D4A373]/15 text-[#73481f] font-bold text-xs flex items-center gap-1 px-3 border border-[#D4A373]/30"
          >
            <Plus className="w-3.5 h-3.5 text-[#B88656]" />
            <span>Post</span>
          </button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-3">
          {posts.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 text-xs text-gray-500">
              No posts found in {activeCategory}. Tap "Post" above to start the discussion!
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-2.5"
              >
                {/* Author row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-800 font-black text-xs flex items-center justify-center border border-gray-200 shrink-0">
                      {post.authorAvatarInitials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{post.authorName}</h4>
                      <p className="text-[11px] text-gray-400 flex items-center gap-1">
                        <span>{post.authorRole}</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{post.authorLocation}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#2D4F1E] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <p className="text-xs text-gray-700 leading-relaxed font-normal">{post.content}</p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {post.tags.map((tg) => (
                      <span key={tg} className="text-[10px] font-semibold text-gray-400">
                        {tg}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer / Reactions */}
                <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 font-bold transition-colors ${
                        post.isLiked ? 'text-[#2D4F1E]' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    <div className="flex items-center gap-1.5 font-medium">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.commentsCount} replies</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.timestamp}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-gray-900 mb-1">{t.createPost}</h3>
            <p className="text-xs text-gray-500 mb-3">Posting to {community.name}</p>

            <div className="mb-3">
              <label className="text-[11px] font-bold text-gray-600 block mb-1">Topic</label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedTag(c)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
                      selectedTag === c
                        ? 'bg-[#2D4F1E] text-white border-[#2D4F1E]'
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={4}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Type your question, seasonal fodder observation, or care tip..."
              className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D4F1E] bg-gray-50 mb-3 text-gray-900"
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleCreatePost}
                disabled={!postContent.trim()}
                className="flex-1 py-2.5 px-3 bg-[#2D4F1E] hover:bg-[#1E3514] text-white font-bold text-xs rounded-xl shadow disabled:opacity-50"
              >
                Publish Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
