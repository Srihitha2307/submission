import { BreedNutritionPlan } from '../types';

export const NUTRITION_PLANS: Record<string, BreedNutritionPlan> = {
  gir: {
    breedId: 'gir',
    breedName: 'Gir',
    greenFodder: {
      amount: '20 – 25 kg / day',
      examples: ['Napier grass (CO-4)', 'Berseem / Lucerne', 'Maize fodder', 'Sorghum (Jowar)'],
      notes: 'Provide succulent leguminous and non-leguminous green fodder in a 1:2 proportion to maximize milk synthesis.'
    },
    dryFodder: {
      amount: '5 – 7 kg / day',
      examples: ['Wheat straw (Bhusa)', 'Paddy straw', 'Jowar karbi'],
      notes: 'Chop straw into 2–3 cm pieces and treat with 1% brine or urea molasses solution during summer for enhanced palatability.'
    },
    concentrateFeed: {
      amount: '3.5 – 5.0 kg / day',
      examples: ['Compounded cattle feed (Type-II ISI)', 'Cracked maize + Mustard oilcake + Wheat bran'],
      notes: 'Allocate 1.5 kg for body maintenance plus 400 g for every 1 litre of milk produced over 5 L/day.'
    },
    mineralSupplement: {
      amount: '50 – 60 g / day',
      examples: ['Chelated area-specific mineral mixture', 'Trace minerals (Zn, Cu, Co, Mn)'],
      notes: 'Mix into the morning concentrate or offer free-choice mineral lick block in the shed.'
    },
    cleanWater: {
      amount: '60 – 80 litres / day',
      notes: 'Keep fresh, cool drinking water accessible 24 hours. A lactating cow drinks 4–5 litres of water for every litre of milk produced.'
    },
    dailySchedule: [
      {
        timePeriod: 'Morning',
        timeLabel: '05:30 AM – 07:00 AM',
        items: [
          'Feed 50% of daily concentrate ration mixed with 30g mineral mixture',
          'Offer fresh clean water after morning milking',
          'Feed 10–12 kg chopped green fodder'
        ],
        managementTip: 'Milking should be completed calmly before offering dry fodder.'
      },
      {
        timePeriod: 'Afternoon',
        timeLabel: '12:30 PM – 02:00 PM',
        items: [
          'Feed 3–4 kg chopped dry fodder (Wheat or Jowar bhusa)',
          'Check water trough cleanliness; replenish cool water',
          'Provide shade and air circulation during high heat hours'
        ],
        managementTip: 'Avoid direct sun exposure between 11 AM and 3 PM.'
      },
      {
        timePeriod: 'Evening',
        timeLabel: '05:30 PM – 07:00 PM',
        items: [
          'Feed remaining 50% concentrate with remaining mineral mixture',
          'Feed remaining 10–12 kg green fodder mixed with 2–3 kg dry fodder',
          'Final evening watering and clean stall bedding'
        ],
        managementTip: 'Night resting area must be dry and free of dung slurry.'
      }
    ],
    educationalDisclaimer: 'General educational guidance. Actual feeding requirements vary according to age, body weight, lactation stage, health, and workload. Consult a livestock nutritionist or veterinarian for an individualized ration.'
  },
  sahiwal: {
    breedId: 'sahiwal',
    breedName: 'Sahiwal',
    greenFodder: {
      amount: '22 – 28 kg / day',
      examples: ['Berseem (winter)', 'Sorghum & Cowpea (summer)', 'Hybrid Napier'],
      notes: 'High dry matter intake potential. Ensure fresh harvest free from mold and pesticide spray.'
    },
    dryFodder: {
      amount: '6 – 8 kg / day',
      examples: ['Wheat straw', 'Mustard straw', 'Oat hay'],
      notes: 'Mix dry bhusa with chopped green fodder to ensure uniform cud chewing and optimal rumen pH.'
    },
    concentrateFeed: {
      amount: '4.0 – 6.0 kg / day',
      examples: ['Balanced dairy mash (20% CP, 70% TDN)', 'Cottonseed cake + Gram chuni + Rice polish'],
      notes: 'Base 2 kg maintenance + 450 g per litre of milk produced.'
    },
    mineralSupplement: {
      amount: '60 – 75 g / day',
      examples: ['Area-specific mineral mixture with vitamins A, D3, E'],
      notes: 'Ensures strong udder health, high butterfat content, and prompt postpartum heat cycling.'
    },
    cleanWater: {
      amount: '70 – 90 litres / day',
      notes: 'Sahiwal cows have high water turnover; unrestricted ad-libitum access is vital.'
    },
    dailySchedule: [
      {
        timePeriod: 'Morning',
        timeLabel: '05:00 AM – 06:30 AM',
        items: [
          'Half concentrate ration with 35g mineral mixture during or before milking',
          '12–14 kg green fodder after milking',
          'Fresh drinking water'
        ],
        managementTip: 'Maintain regular milking timings to avoid stress.'
      },
      {
        timePeriod: 'Afternoon',
        timeLabel: '01:00 PM – 02:30 PM',
        items: [
          'Offer 4 kg dry straw',
          'Ensure continuous access to drinking water and shade',
          'Inspect teat health'
        ],
        managementTip: 'Keep resting stalls cool with exhaust fans or thatch roof.'
      },
      {
        timePeriod: 'Evening',
        timeLabel: '05:30 PM – 07:00 PM',
        items: [
          'Remaining concentrate ration',
          '12–14 kg green fodder with 2–3 kg straw',
          'Evening watering'
        ],
        managementTip: 'Night bedding must be dry to prevent mastitis.'
      }
    ],
    educationalDisclaimer: 'General educational guidance. Actual feeding requirements vary according to age, body weight, lactation stage, health, and workload. Consult a livestock nutritionist or veterinarian for an individualized ration.'
  },
  murrah: {
    breedId: 'murrah',
    breedName: 'Murrah Buffalo',
    greenFodder: {
      amount: '30 – 40 kg / day',
      examples: ['Egyptian Clover (Berseem)', 'Hybrid Napier', 'Maize silage', 'Subabul leaves'],
      notes: 'Buffaloes have superior fiber degradation in the rumen and consume larger volumes of roughage.'
    },
    dryFodder: {
      amount: '7 – 10 kg / day',
      examples: ['Paddy straw (chopped)', 'Wheat bhusa', 'Cane bagasse'],
      notes: 'Soak coarse straw with molasses water to boost digestive intake.'
    },
    concentrateFeed: {
      amount: '4.5 – 7.0 kg / day',
      examples: ['High-energy buffalo pellet (18% crude protein)', 'Mustard cake + Wheat bran + Crushed barley'],
      notes: 'Provide 2 kg maintenance + 500 g per litre of milk due to high milk fat concentration (7–8%).'
    },
    mineralSupplement: {
      amount: '75 – 90 g / day',
      examples: ['Chelated mineral mixture + Common salt (40g)'],
      notes: 'Vital for preventing silent heat and supporting high calcium turnover during lactation.'
    },
    cleanWater: {
      amount: '90 – 120 litres / day',
      notes: 'Murrah buffaloes need abundant water for drinking plus twice-daily water hosing or wallowing for thermoregulation.'
    },
    dailySchedule: [
      {
        timePeriod: 'Morning',
        timeLabel: '05:00 AM – 07:00 AM',
        items: [
          'Bathe / spray water on buffalo for 15 minutes before morning milking',
          'Feed 50% concentrate with 45g mineral mixture',
          '15–20 kg green fodder'
        ],
        managementTip: 'Cooling before milking triggers optimal oxytocin release.'
      },
      {
        timePeriod: 'Afternoon',
        timeLabel: '12:00 PM – 02:00 PM',
        items: [
          'Allow wallowing in pond or hose down under shade',
          '5–6 kg chopped dry straw',
          'Full access to cool drinking water'
        ],
        managementTip: 'Murrah dark skin absorbs radiant heat rapidly; never tie in direct sun.'
      },
      {
        timePeriod: 'Evening',
        timeLabel: '05:00 PM – 06:30 PM',
        items: [
          'Evening water bath / shower',
          'Remaining 50% concentrate ration',
          '15–20 kg green fodder'
        ],
        managementTip: 'Inspect milk veins and teat sphincter integrity.'
      }
    ],
    educationalDisclaimer: 'General educational guidance. Actual feeding requirements vary according to age, body weight, lactation stage, health, and workload. Consult a livestock nutritionist or veterinarian for an individualized ration.'
  }
};

export function getNutritionPlanForBreed(breedId: string): BreedNutritionPlan {
  if (NUTRITION_PLANS[breedId]) {
    return NUTRITION_PLANS[breedId];
  }
  // Fallback to Gir-like balanced standard Indian dairy cattle plan
  return {
    ...NUTRITION_PLANS.gir,
    breedId,
    breedName: breedId.charAt(0).toUpperCase() + breedId.slice(1)
  };
}
