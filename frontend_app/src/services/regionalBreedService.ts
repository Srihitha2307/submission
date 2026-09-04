import { REGIONAL_LIVESTOCK_DATA } from '../data/market';

export interface RegionalPriorResult {
  relevance: 'High' | 'Moderate' | 'Low';
  title: string;
  description: string;
  regionalPresenceScore: number;
}

export const regionalBreedService = {
  getRegionalRelevance(breedId: string, _userDistrict = 'Sehore'): RegionalPriorResult {
    const key = breedId.toLowerCase();
    const info = (REGIONAL_LIVESTOCK_DATA.regionalBreedProbabilities as any)[key];

    if (info) {
      return {
        relevance: info.relevance,
        title: `Common in Madhya Pradesh and Central Belt`,
        description: info.note,
        regionalPresenceScore: info.relevance === 'High' ? 0.94 : info.relevance === 'Moderate' ? 0.65 : 0.25
      };
    }

    return {
      relevance: 'Moderate',
      title: 'Moderate Central India Distribution',
      description: 'Breed likelihood can be improved using regional livestock distribution data.',
      regionalPresenceScore: 0.5
    };
  }
};
