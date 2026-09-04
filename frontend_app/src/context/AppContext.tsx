import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ScreenRoute, RootTab } from '../types';
import { storageService } from '../services/storageService';

interface AppContextType {
  // Navigation
  currentTab: RootTab;
  setTab: (tab: RootTab) => void;
  currentRoute: ScreenRoute;
  navigate: (route: ScreenRoute) => void;
  goBack: () => void;
  canGoBack: boolean;

  // Offline State
  isOffline: boolean;
  setOffline: (offline: boolean) => Promise<void>;

  // Saved Breeds
  savedBreedIds: string[];
  toggleSaveBreed: (breedId: string) => Promise<boolean>;
  isBreedSaved: (breedId: string) => boolean;

  // Recent Identifications
  recentIdentifications: any[];
  addIdentification: (record: any) => Promise<void>;

  // Demo state shortcuts
  activeScenario: 'gir_purebred' | 'crossbreed_sahiwal_jersey' | 'low_confidence' | 'murrah_buffalo';
  setActiveScenario: (scenario: 'gir_purebred' | 'crossbreed_sahiwal_jersey' | 'low_confidence' | 'murrah_buffalo') => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<RootTab>('home');
  const [routeStack, setRouteStack] = useState<ScreenRoute[]>([{ name: 'Home' }]);
  const [isOffline, setIsOfflineState] = useState<boolean>(false);
  const [savedBreedIds, setSavedBreedIds] = useState<string[]>(['gir', 'sahiwal', 'murrah']);
  const [recentIdentifications, setRecentIdentifications] = useState<any[]>([
    {
      id: 'recent-1',
      breed: 'Gir',
      species: 'Cattle',
      confidence: 0.92,
      timeLabel: 'Identified today',
      status: 'high_confidence',
      location: 'Sehore, MP'
    },
    {
      id: 'recent-2',
      breed: 'Murrah',
      species: 'Buffalo',
      confidence: 0.88,
      timeLabel: 'Yesterday',
      status: 'high_confidence',
      location: 'Sehore, MP'
    }
  ]);
  const [activeScenario, setActiveScenario] = useState<'gir_purebred' | 'crossbreed_sahiwal_jersey' | 'low_confidence' | 'murrah_buffalo'>('gir_purebred');

  // Load persistence
  useEffect(() => {
    storageService.getOfflineMode().then(setIsOfflineState);
    storageService.getSavedBreedIds().then((ids) => {
      if (ids && ids.length) setSavedBreedIds(ids);
    });
    storageService.getRecentIdentifications().then((recents) => {
      if (recents && recents.length) {
        setRecentIdentifications(recents);
      }
    });
  }, []);

  const currentRoute = routeStack[routeStack.length - 1] || { name: 'Home' };

  const navigate = useCallback((route: ScreenRoute) => {
    setRouteStack((prev) => [...prev, route]);
    // sync tab if direct tab route
    if (route.name === 'Home') setCurrentTab('home');
    else if (route.name === 'Identify') setCurrentTab('identify');
    else if (route.name === 'Community') setCurrentTab('community');
    else if (route.name === 'Profile') setCurrentTab('profile');
  }, []);

  const goBack = useCallback(() => {
    setRouteStack((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.slice(0, -1);
      const top = next[next.length - 1];
      if (top.name === 'Home') setCurrentTab('home');
      else if (top.name === 'Identify') setCurrentTab('identify');
      else if (top.name === 'Community') setCurrentTab('community');
      else if (top.name === 'Profile') setCurrentTab('profile');
      return next;
    });
  }, []);

  const setTab = useCallback((tab: RootTab) => {
    setCurrentTab(tab);
    if (tab === 'home') {
      setRouteStack([{ name: 'Home' }]);
    } else if (tab === 'identify') {
      setRouteStack([{ name: 'Identify' }]);
    } else if (tab === 'community') {
      setRouteStack([{ name: 'Community' }]);
    } else if (tab === 'profile') {
      setRouteStack([{ name: 'Profile' }]);
    }
  }, []);

  const setOffline = async (offline: boolean) => {
    setIsOfflineState(offline);
    await storageService.setOfflineMode(offline);
  };

  const toggleSaveBreed = async (breedId: string): Promise<boolean> => {
    const isSaved = savedBreedIds.includes(breedId);
    let updated: string[];
    if (isSaved) {
      updated = savedBreedIds.filter((id) => id !== breedId);
      await storageService.removeSavedBreedId(breedId);
    } else {
      updated = [...savedBreedIds, breedId];
      await storageService.saveBreedId(breedId);
    }
    setSavedBreedIds(updated);
    return !isSaved;
  };

  const isBreedSaved = (breedId: string) => savedBreedIds.includes(breedId);

  const addIdentification = async (record: any) => {
    const updated = [record, ...recentIdentifications.filter((r) => r.id !== record.id)].slice(0, 10);
    setRecentIdentifications(updated);
    await storageService.saveIdentification(record);
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setTab,
        currentRoute,
        navigate,
        goBack,
        canGoBack: routeStack.length > 1,
        isOffline,
        setOffline,
        savedBreedIds,
        toggleSaveBreed,
        isBreedSaved,
        recentIdentifications,
        addIdentification,
        activeScenario,
        setActiveScenario
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
