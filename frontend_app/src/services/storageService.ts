/**
 * Storage Service - AsyncStorage Compatible Interface
 * Provides asynchronous key-value persistence.
 * Ready for React Native `@react-native-async-storage/async-storage` replacement.
 */

const STORAGE_PREFIX = '@pashu_drishti_';

export const AsyncStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (typeof window === 'undefined') return null;
      return window.localStorage.getItem(STORAGE_PREFIX + key);
    } catch (e) {
      console.warn('Storage read error:', e);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(STORAGE_PREFIX + key, value);
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (e) {
      console.warn('Storage remove error:', e);
    }
  },

  async clear(): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      const keysToRemove: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => window.localStorage.removeItem(k));
    } catch (e) {
      console.warn('Storage clear error:', e);
    }
  }
};

// Typed helpers for domain entities
export const storageService = {
  async getSavedBreedIds(): Promise<string[]> {
    const raw = await AsyncStorage.getItem('saved_breeds');
    if (!raw) return ['gir', 'sahiwal', 'murrah']; // default saved breeds
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  async saveBreedId(breedId: string): Promise<void> {
    const existing = await this.getSavedBreedIds();
    if (!existing.includes(breedId)) {
      const updated = [...existing, breedId];
      await AsyncStorage.setItem('saved_breeds', JSON.stringify(updated));
    }
  },

  async removeSavedBreedId(breedId: string): Promise<void> {
    const existing = await this.getSavedBreedIds();
    const updated = existing.filter((id) => id !== breedId);
    await AsyncStorage.setItem('saved_breeds', JSON.stringify(updated));
  },

  async isBreedSaved(breedId: string): Promise<boolean> {
    const saved = await this.getSavedBreedIds();
    return saved.includes(breedId);
  },

  async getRecentIdentifications(): Promise<any[]> {
    const raw = await AsyncStorage.getItem('recent_identifications');
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  async saveIdentification(record: any): Promise<void> {
    const history = await this.getRecentIdentifications();
    const updated = [record, ...history.filter((h: any) => h.id !== record.id)].slice(0, 10);
    await AsyncStorage.setItem('recent_identifications', JSON.stringify(updated));
  },

  async getOfflineMode(): Promise<boolean> {
    const raw = await AsyncStorage.getItem('offline_mode');
    return raw === 'true';
  },

  async setOfflineMode(enabled: boolean): Promise<void> {
    await AsyncStorage.setItem('offline_mode', enabled ? 'true' : 'false');
  },

  async getLanguage(): Promise<'en' | 'hi'> {
    const raw = await AsyncStorage.getItem('app_language');
    return raw === 'hi' ? 'hi' : 'en';
  },

  async setLanguage(lang: 'en' | 'hi'): Promise<void> {
    await AsyncStorage.setItem('app_language', lang);
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.clear();
  }
};
