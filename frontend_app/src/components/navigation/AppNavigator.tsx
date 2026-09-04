import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Header } from '../common/Header';
import { OfflineBanner } from '../common/OfflineBanner';
import { BottomTabBar } from './BottomTabBar';

// Screens
import { HomeScreen } from '../../screens/HomeScreen';
import { IdentifyScreen } from '../../screens/IdentifyScreen';
import { DetectionResultScreen } from '../../screens/DetectionResultScreen';
import { BreedProfileScreen } from '../../screens/BreedProfileScreen';
import { BreedCompareScreen } from '../../screens/BreedCompareScreen';
import { NutritionScreen } from '../../screens/NutritionScreen';
import { CrossbreedingScreen } from '../../screens/CrossbreedingScreen';
import { CommunityScreen } from '../../screens/CommunityScreen';
import { CommunityDetailScreen } from '../../screens/CommunityDetailScreen';
import { GovernmentBridgeScreen } from '../../screens/GovernmentBridgeScreen';
import { SavedBreedsScreen } from '../../screens/SavedBreedsScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';

export const AppNavigator: React.FC = () => {
  const { currentRoute, currentTab, setTab, canGoBack } = useApp();
  const { t } = useLanguage();

  // Screen header configuration
  const getHeaderConfig = () => {
    switch (currentRoute.name) {
      case 'Home':
        return {
          title: 'PashuDrishti',
          subtitle: 'Livestock Breed Intelligence',
          showBack: false,
        };
      case 'Identify':
        return {
          title: t.identifyTitle,
          subtitle: 'Guided Multi-Angle Scanner',
          showBack: canGoBack,
        };
      case 'DetectionResult':
        return {
          title: t.breedIdentified,
          subtitle: 'Morphological Intelligence',
          showBack: true,
        };
      case 'BreedProfile':
        return {
          title: t.breedGuide,
          subtitle: 'Indigenous Breed Dossier',
          showBack: true,
        };
      case 'BreedCompare':
        return {
          title: 'Compare Breeds',
          subtitle: 'Trait & Yield Analysis',
          showBack: true,
        };
      case 'Nutrition':
        return {
          title: t.nutritionPlanTitle,
          subtitle: 'Fodder & Ration Schedule',
          showBack: true,
        };
      case 'Crossbreeding':
        return {
          title: t.crossbreedingTitle,
          subtitle: 'Scientific Breeding Advisory',
          showBack: true,
        };
      case 'Community':
        return {
          title: t.farmerNetwork,
          subtitle: 'Local Keepers & Market',
          showBack: canGoBack,
        };
      case 'CommunityDetail':
        return {
          title: 'Farmer Network',
          subtitle: 'Discussions & Care Advice',
          showBack: true,
        };
      case 'GovernmentBridge':
        return {
          title: 'Official Registration',
          subtitle: 'Bharat Pashudhan Handoff',
          showBack: true,
        };
      case 'SavedBreeds':
        return {
          title: t.savedBreedsTitle,
          subtitle: 'Offline Knowledge Base',
          showBack: true,
        };
      case 'Profile':
        return {
          title: t.profileTitle,
          subtitle: 'Field Assistant & App Settings',
          showBack: canGoBack,
        };
      default:
        return {
          title: 'PashuDrishti',
          subtitle: '',
          showBack: false,
        };
    }
  };

  const headerConfig = getHeaderConfig();

  const renderScreen = () => {
    switch (currentRoute.name) {
      case 'Home':
        return <HomeScreen />;
      case 'Identify':
        return <IdentifyScreen />;
      case 'DetectionResult':
        return <DetectionResultScreen />;
      case 'BreedProfile':
        return <BreedProfileScreen breedId={currentRoute.breedId} />;
      case 'BreedCompare':
        return (
          <BreedCompareScreen
            breedId1={currentRoute.breedId1}
            breedId2={currentRoute.breedId2}
          />
        );
      case 'Nutrition':
        return <NutritionScreen breedId={currentRoute.breedId} />;
      case 'Crossbreeding':
        return <CrossbreedingScreen breedId={currentRoute.breedId} />;
      case 'Community':
        return <CommunityScreen />;
      case 'CommunityDetail':
        return <CommunityDetailScreen communityId={currentRoute.communityId} />;
      case 'GovernmentBridge':
        return <GovernmentBridgeScreen breedId={currentRoute.breedId} />;
      case 'SavedBreeds':
        return <SavedBreedsScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F6F0] overflow-hidden">
      <Header
        title={headerConfig.title}
        subtitle={headerConfig.subtitle}
        showBack={headerConfig.showBack}
      />
      <OfflineBanner />
      <main className="flex-1 overflow-y-auto flex flex-col relative">{renderScreen()}</main>
      <BottomTabBar currentTab={currentTab} onSelectTab={setTab} />
    </div>
  );
};
