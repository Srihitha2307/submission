/**
 * Data contracts and model types for Livestock Breed Intelligence Application
 */

export type Species = 'Cattle' | 'Buffalo';
export type BreedPurpose = 'Dairy' | 'Draught' | 'Dual-purpose';
export type HeatToleranceLevel = 'Very High' | 'High' | 'Moderate';

export interface Breed {
  id: string;
  name: string;
  hindiName: string;
  species: Species;
  purpose: BreedPurpose;
  origin: string;
  nativeTract: string;
  milkYield: string;
  milkFat: string;
  temperament: string;
  climateSuitability: string;
  heatTolerance: HeatToleranceLevel;
  characteristics: string[];
  whyMatters: string;
  bestSuitedFor: string;
  careConsiderations: string[];
  regionalDistribution: string[];
  quickFacts: { label: string; value: string }[];
  tagColor: string;
  imageUrl?: string;
  imageAccent: string;
}

export interface DetectionAlternative {
  breed: string;
  confidence: number;
}

export interface BreedComposition {
  breed: string;
  percentage: number;
}

export interface VisualIndicator {
  feature: string;
  description: string;
  matched: boolean;
}

export interface QualityCheckItem {
  id: string;
  label: string;
  passed: boolean;
  tip: string;
}

export interface DetectionResult {
  id: string;
  timestamp: number;
  dateFormatted: string;
  status: 'high_confidence' | 'crossbreed' | 'low_confidence';
  primaryBreed: string;
  confidence: number; // 0 to 1
  alternatives: DetectionAlternative[];
  composition: BreedComposition[] | null;
  regionalRelevance: 'High' | 'Moderate' | 'Low';
  regionalMatchTitle: string;
  regionalMatchDescription: string;
  userLocation: string;
  visualIndicators: VisualIndicator[];
  qualityChecks: QualityCheckItem[];
  photos: {
    face?: string;
    side?: string;
    hornHump?: string;
  };
  attentionHeatmapNote: string;
  disclaimer: string;
}

export interface FeedComponent {
  amount: string;
  examples?: string[];
  notes: string;
}

export interface FeedingScheduleItem {
  timePeriod: 'Morning' | 'Afternoon' | 'Evening';
  timeLabel: string;
  items: string[];
  managementTip: string;
}

export interface BreedNutritionPlan {
  breedId: string;
  breedName: string;
  greenFodder: FeedComponent;
  dryFodder: FeedComponent;
  concentrateFeed: FeedComponent;
  mineralSupplement: FeedComponent;
  cleanWater: FeedComponent;
  dailySchedule: FeedingScheduleItem[];
  educationalDisclaimer: string;
}

export interface CrossbreedingOption {
  id: string;
  baseBreed: string;
  sireBreed: string;
  objective: string;
  expectedOutcome: string;
  strengths: string[];
  considerations: string[];
  adaptabilityRetention: string;
  disclaimer: string;
}

export interface Community {
  id: string;
  name: string;
  breed: string;
  species: Species;
  memberCount: number;
  activeDiscussions: number;
  description: string;
  coverColor: string;
}

export interface CommunityPost {
  id: string;
  communityId: string;
  authorName: string;
  authorRole: string;
  authorLocation: string;
  authorAvatarInitials: string;
  timestamp: string;
  category: 'Discussions' | 'Feed Tips' | 'Care' | 'Market' | 'Questions';
  content: string;
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  tags: string[];
}

export interface MarketPriceSnapshot {
  district: string;
  state: string;
  cowMilkPrice: string;
  buffaloMilkPrice: string;
  greenFodderPrice: string;
  dryFodderPrice: string;
  cattleFeedPrice: string;
  lastUpdated: string;
  isDemoData: boolean;
}

export interface GovernmentHandoffRecord {
  id: string;
  detectionId: string;
  confirmedBreed: string;
  confidencePercent: number;
  species: Species;
  sex: 'Female' | 'Male';
  ageCategory: string;
  tagNumber: string;
  district: string;
  state: string;
  ownerName: string;
  readyStatus: 'Ready for Bharat Pashudhan' | 'Synced' | 'Pending Review';
  checklist: {
    step: number;
    title: string;
    description: string;
    completed: boolean;
  }[];
}

export interface UserProfile {
  name: string;
  role: string;
  organization: string;
  district: string;
  state: string;
  language: 'en' | 'hi';
  offlineMode: boolean;
  identificationsCount: number;
  savedBreedsCount: number;
}

export type RootTab = 'home' | 'identify' | 'community' | 'profile';

export type ScreenRoute =
  | { name: 'Home' }
  | { name: 'Identify'; initialStep?: number }
  | { name: 'DetectionResult'; resultId?: string }
  | { name: 'BreedProfile'; breedId: string }
  | { name: 'BreedCompare'; breedId1?: string; breedId2?: string }
  | { name: 'Nutrition'; breedId: string }
  | { name: 'Crossbreeding'; breedId: string }
  | { name: 'Community' }
  | { name: 'CommunityDetail'; communityId: string }
  | { name: 'GovernmentBridge'; detectionId?: string; breedId?: string }
  | { name: 'SavedBreeds' }
  | { name: 'Profile' }
  | { name: 'Settings' }
  | { name: 'Language' };
