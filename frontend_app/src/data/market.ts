import { MarketPriceSnapshot } from '../types';

export const CURRENT_MARKET_SNAPSHOT: MarketPriceSnapshot = {
  district: 'Sehore',
  state: 'Madhya Pradesh',
  cowMilkPrice: '₹42 – ₹58 / L (Base to A2 Grade)',
  buffaloMilkPrice: '₹62 – ₹78 / L (Based on 6.5–8.0% Fat)',
  greenFodderPrice: '₹2.80 – ₹3.50 / kg',
  dryFodderPrice: '₹7.50 – ₹9.20 / kg (Wheat Bhusa)',
  cattleFeedPrice: '₹24 – ₹28 / kg (20% Protein Mash)',
  lastUpdated: 'Today, 06:00 AM IST',
  isDemoData: true
};

export const REGIONAL_LIVESTOCK_DATA = {
  userLocation: {
    district: 'Sehore',
    state: 'Madhya Pradesh',
    lat: 23.2031,
    lng: 77.0844,
    agroClimaticZone: 'Central Plateau and Hill Region (Malwa Plateau)'
  },
  regionalBreedProbabilities: {
    gir: { relevance: 'High' as const, note: 'Widely reared across Western & Central MP; high genetic presence in Malwa region.' },
    sahiwal: { relevance: 'High' as const, note: 'Common in organized state breeding centres and northern MP.' },
    murrah: { relevance: 'High' as const, note: 'Dominant dairy buffalo across Sehore, Bhopal, and Hoshangabad belt.' },
    red_sindhi: { relevance: 'Moderate' as const, note: 'Present in select state breeding herds and experimental stations.' },
    tharparkar: { relevance: 'Moderate' as const, note: 'Present in drier border tracts of western MP.' },
    vechur: { relevance: 'Low' as const, note: 'Rare in Central India; native to Kerala humid coastal belt.' }
  }
};
