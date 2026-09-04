import { CrossbreedingOption } from '../types';

export const CROSSBREEDING_DATA: Record<string, CrossbreedingOption[]> = {
  sahiwal: [
    {
      id: 'sahiwal_hf',
      baseBreed: 'Sahiwal',
      sireBreed: 'Holstein Friesian (HF)',
      objective: 'Significantly improve milk yield volume while retaining tropical disease and heat resistance from Sahiwal dam line.',
      expectedOutcome: 'Lactation yield uplift of 50–90% (avg 3,200–4,500 L/lactation) with 3.8–4.2% fat.',
      adaptabilityRetention: 'High when exotic inheritance is capped at 50% to 62.5%.',
      strengths: [
        'Substantial daily milk volume gain suitable for commercial milk routes',
        'Stronger resistance to tick-borne theileriosis than pure HF',
        'High calf vigor and rapid maturity (first calving at 28–32 months)'
      ],
      considerations: [
        'Requires well-ventilated shed and misting fans during peak May-June summer',
        'F1 crossbred females must be backcrossed or stabilized according to State Breeding Policy',
        'Higher demand for balanced green fodder and regular mineral supplementation'
      ],
      disclaimer: 'Breeding recommendations should only be acted upon after consultation with a qualified veterinarian or livestock breeding officer. Local breeding policies and animal health conditions must be considered.'
    },
    {
      id: 'sahiwal_pure_upgrade',
      baseBreed: 'Sahiwal (or Non-Descript Indigenous)',
      sireBreed: 'Progeny Tested Pure Sahiwal Bull (Cryopreserved Semen)',
      objective: 'Selective breed upgrading to preserve pure Indian germplasm, ensure superior A2 milk certification, and zero summer heat stress.',
      expectedOutcome: 'Generational yield improvement up to 2,800–3,500 L with 4.8–5.2% high butterfat.',
      adaptabilityRetention: '100% Native Heat & Drought Immunity.',
      strengths: [
        'Zero vulnerability to exotic viral infections or heat prostration',
        'Command premium prices for purebred breeding stock and A2 dairy products',
        'Thrives on local straws and low-cost farm bypass supplements'
      ],
      considerations: [
        'Milking response requires gentle handling and maternal bonding',
        'Inter-calving interval is slightly longer than European crosses without sound heat detection'
      ],
      disclaimer: 'Breeding recommendations should only be acted upon after consultation with a qualified veterinarian or livestock breeding officer. Local breeding policies and animal health conditions must be considered.'
    }
  ],
  gir: [
    {
      id: 'gir_jersey',
      baseBreed: 'Gir',
      sireBreed: 'Jersey (Pedigree Semen)',
      objective: 'Elevate milk yield and early age at first calving while preserving high fat test and hardy grazing temperament.',
      expectedOutcome: 'Lactation yield: 2,800–3,800 L with superior butterfat (4.6–5.0%).',
      adaptabilityRetention: 'Very Good. Jersey crosses adapt better to Indian heat than HF crosses.',
      strengths: [
        'High fat content ideal for traditional milk pricing metrics',
        'Medium animal frame size reduces total maintenance feed overhead',
        'Good leg conformation and heat tolerance'
      ],
      considerations: [
        'Crossbred calves need timely colostrum and vaccination against blackquarter',
        'Check that local Artificial Insemination (AI) centre uses certified disease-free straws'
      ],
      disclaimer: 'Breeding recommendations should only be acted upon after consultation with a qualified veterinarian or livestock breeding officer. Local breeding policies and animal health conditions must be considered.'
    },
    {
      id: 'gir_pure_upgrade',
      baseBreed: 'Gir',
      sireBreed: 'Progeny Tested Pure Gir (National Dairy Development Board Certified)',
      objective: 'Conservation and breed purification for high-yielding indigenous elite dairy herds.',
      expectedOutcome: 'Long-term herd elevation to 3,000+ L/lactation of pure A2 milk.',
      adaptabilityRetention: '100% Uncompromised Zebu Resilience.',
      strengths: [
        'Exceptional resistance to Indian ectoparasites (ticks, flies)',
        'Superior heat dissipation via convex forehead and extensive dewlap',
        'High commercial demand for purebred heifers'
      ],
      considerations: [
        'Utilize only registered high-genetic-merit bull semen from recognized semen stations'
      ],
      disclaimer: 'Breeding recommendations should only be acted upon after consultation with a qualified veterinarian or livestock breeding officer. Local breeding policies and animal health conditions must be considered.'
    }
  ]
};

export function getCrossbreedingOptions(breedId: string): CrossbreedingOption[] {
  if (CROSSBREEDING_DATA[breedId]) {
    return CROSSBREEDING_DATA[breedId];
  }
  // Fallback to Sahiwal options as standard reference
  return CROSSBREEDING_DATA.sahiwal;
}
