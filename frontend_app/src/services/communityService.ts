import { COMMUNITIES_DATA } from '../data/communities';
import { INITIAL_POSTS } from '../data/posts';
import { Community, CommunityPost } from '../types';
import { AsyncStorage } from './storageService';

const POSTS_STORAGE_KEY = 'community_posts';

export const communityService = {
  getCommunities(): Community[] {
    return COMMUNITIES_DATA;
  },

  getCommunityById(id: string): Community | undefined {
    return COMMUNITIES_DATA.find((c) => c.id === id);
  },

  async getAllPosts(): Promise<CommunityPost[]> {
    const raw = await AsyncStorage.getItem(POSTS_STORAGE_KEY);
    if (!raw) {
      return INITIAL_POSTS;
    }
    try {
      const stored = JSON.parse(raw);
      // Merge with initial if needed
      return stored;
    } catch {
      return INITIAL_POSTS;
    }
  },

  async getPostsForCommunity(
    communityId: string,
    category?: CommunityPost['category']
  ): Promise<CommunityPost[]> {
    const all = await this.getAllPosts();
    let filtered = all.filter((p) => p.communityId === communityId);
    if (category && category !== 'Discussions') {
      filtered = filtered.filter((p) => p.category === category);
    }
    return filtered;
  },

  async createPost(post: Omit<CommunityPost, 'id' | 'timestamp' | 'likes' | 'commentsCount'>): Promise<CommunityPost> {
    const all = await this.getAllPosts();
    const newPost: CommunityPost = {
      ...post,
      id: `post_${Date.now()}`,
      timestamp: 'Just now',
      likes: 1,
      commentsCount: 0,
      isLiked: true
    };
    const updated = [newPost, ...all];
    await AsyncStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updated));
    return newPost;
  },

  async toggleLike(postId: string): Promise<CommunityPost | null> {
    const all = await this.getAllPosts();
    const idx = all.findIndex((p) => p.id === postId);
    if (idx === -1) return null;

    const target = all[idx];
    const isLiked = !target.isLiked;
    const likes = isLiked ? target.likes + 1 : Math.max(0, target.likes - 1);
    const updatedPost = { ...target, isLiked, likes };

    all[idx] = updatedPost;
    await AsyncStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(all));
    return updatedPost;
  }
};
