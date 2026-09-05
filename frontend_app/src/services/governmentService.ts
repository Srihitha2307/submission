import { GovernmentHandoffRecord } from '../types';

export const governmentService = {
  createHandoffRecord(
    breedName: string,
    confidencePercent = 92,
    species: 'Cattle' | 'Buffalo' = 'Cattle'
  ): GovernmentHandoffRecord {
    return {
      id: `bp_${Date.now().toString().slice(-6)}`,
      detectionId: `det_${Date.now()}`,
      confirmedBreed: breedName,
      confidencePercent,
      species,
      sex: 'Female',
      ageCategory: 'Adult (In Milk / 42 Months)',
      tagNumber: `IN-MP-23-${Math.floor(100000 + Math.random() * 900000)}`,
      district: 'Sehore',
      state: 'Madhya Pradesh',
      ownerName: 'Shri Rameshwar Patel',
      readyStatus: 'Ready for Bharat Pashudhan',
      checklist: [
        {
          step: 1,
          title: 'Open Bharat Pashudhan',
          description: 'Launch the official Department of Animal Husbandry & Dairying (DAHD) portal or mobile app.',
          completed: false
        },
        {
          step: 2,
          title: 'Start animal registration',
          description: 'Navigate to "Animal Identification & Traceability" (Ear-tag registration module).',
          completed: false
        },
        {
          step: 3,
          title: 'Enter animal details',
          description: 'Input UID tag number, species (Cattle/Buffalo), sex, age, and owner Aadhaar/registration.',
          completed: false
        },
        {
          step: 4,
          title: 'Select confirmed breed',
          description: `Choose "${breedName}" from the National Breed Master drop-down (verified by PashuSarthi AI at ${confidencePercent}% match).`,
          completed: false
        },
        {
          step: 5,
          title: 'Verify before submitting',
          description: 'Cross-check physical muzzle/ear-tag with registration sheet before final sync.',
          completed: false
        }
      ]
    };
  },

  formatClipboardPayload(record: GovernmentHandoffRecord): string {
    return `--- BHARAT PASHUDHAN REGISTRATION PAYLOAD ---
Tag Number: ${record.tagNumber}
Species: ${record.species}
Confirmed Breed: ${record.confirmedBreed} (PashuSarthi Confidence: ${record.confidencePercent}%)
Sex: ${record.sex}
Age Category: ${record.ageCategory}
Owner: ${record.ownerName}
Location: ${record.district}, ${record.state}
Verification Status: Field Intelligence Pre-verified
------------------------------------------------`;
  },

  prepareRegistrationRecord(params: {
    breedName: string;
    species: string;
    confidence: number;
    tagNumber: string;
    ownerName: string;
    village: string;
    state: string;
  }) {
    return {
      suggestedBreed: params.breedName,
      species: params.species,
      confidence: Math.round(params.confidence * 100),
      tagNumber: params.tagNumber,
      ownerName: params.ownerName,
      villageDistrict: params.village,
      state: params.state,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      status: 'Prepared for Bharat Pashudhan (NDLM)',
    };
  },

  formatSummaryText(record: any): string {
    return `=== BHARAT PASHUDHAN (NDLM) FIELD DOSSIER ===
Tag Number (UID): ${record.tagNumber}
Suggested Breed: ${record.suggestedBreed} (${record.confidence}% match)
Animal Type: ${record.species}
Owner Name: ${record.ownerName}
Village/District: ${record.villageDistrict}, ${record.state}
Field Date: ${record.date}
Verification: Morphological evaluation completed via PashuSarthi.
Notice: Official registration must be logged by an authorized animal husbandry worker.
==============================================`;
  },

  openPortalNotice(): void {
    // Reference url for official portal
    try {
      window.open('https://inaph.nddb.coop', '_blank');
    } catch {
      // ignore
    }
  }
};
