import { DetectionResult } from '../types';
import { regionalBreedService } from './regionalBreedService';

export type DetectionScenario = 'gir_purebred' | 'crossbreed_sahiwal_jersey' | 'low_confidence' | 'murrah_buffalo';

export const detectionService = {
  /**
   * Simulates breed detection pipeline.
   * NOTE: ML model inference (TFLite / ONNX) and CNN execution will replace this in production.
   * Do NOT implement PyTorch, TF or Grad-CAM here.
   */
  async detectBreed(
    photos: { face?: string; side?: string; hornHump?: string },
    scenario: DetectionScenario = 'gir_purebred'
  ): Promise<DetectionResult> {
    // Realistic field inference delay
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const timestamp = Date.now();
    const id = `det_${timestamp}`;
    const dateFormatted = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    if (scenario === 'crossbreed_sahiwal_jersey') {
      return {
        id,
        timestamp,
        dateFormatted,
        status: 'crossbreed',
        primaryBreed: 'Sahiwal × Jersey Cross',
        confidence: 0.84,
        alternatives: [
          { breed: 'Pure Sahiwal', confidence: 0.11 },
          { breed: 'Holstein Cross', confidence: 0.05 }
        ],
        composition: [
          { breed: 'Sahiwal (Indigenous Zebu)', percentage: 70 },
          { breed: 'Jersey (European Dairy)', percentage: 30 }
        ],
        regionalRelevance: 'High',
        regionalMatchTitle: 'High Regional Crossbred Density',
        regionalMatchDescription: 'Sahiwal × Jersey crossbreds are actively promoted under state dairy improvement programs across MP.',
        userLocation: 'Sehore, Madhya Pradesh',
        visualIndicators: [
          { feature: 'Hump Prominence', description: 'Moderate hump height, blending European and Zebu features', matched: true },
          { feature: 'Coat Pigmentation', description: 'Fawn-reddish tint consistent with Jersey-Sahiwal crossing', matched: true },
          { feature: 'Udder Conformation', description: 'Enlarged dairy capacity typical of crossbred F1/F2 generations', matched: true },
          { feature: 'Ear Carriage', description: 'Semi-horizontal alert ears, not fully pendulous', matched: true }
        ],
        qualityChecks: [
          { id: 'q1', label: 'Image sharpness and focus', passed: true, tip: 'Good daylight lighting' },
          { id: 'q2', label: 'Torso & head profile visibility', passed: true, tip: 'Clear side silhouette' },
          { id: 'q3', label: 'Fresh field photo verified', passed: true, tip: 'Valid metadata timestamp' }
        ],
        photos,
        attentionHeatmapNote: 'Visual explanation will be connected to the detection model later.',
        disclaimer: 'Breed composition is an estimate and should be verified by a qualified livestock professional before official registration.'
      };
    }

    if (scenario === 'low_confidence') {
      return {
        id,
        timestamp,
        dateFormatted,
        status: 'low_confidence',
        primaryBreed: 'Indeterminate Indigenous Cattle',
        confidence: 0.44,
        alternatives: [
          { breed: 'Non-descript Desi', confidence: 0.36 },
          { breed: 'Malvi', confidence: 0.22 },
          { breed: 'Nimari', confidence: 0.18 }
        ],
        composition: null,
        regionalRelevance: 'Moderate',
        regionalMatchTitle: 'Regional Non-Descript Diversity',
        regionalMatchDescription: 'Visual morphological markers are partially occluded or ambiguous.',
        userLocation: 'Sehore, Madhya Pradesh',
        visualIndicators: [
          { feature: 'Horn Contour', description: 'Horn tips occluded by background or shadows', matched: false },
          { feature: 'Hump Structure', description: 'Angle of photo flattens withers elevation', matched: false },
          { feature: 'Coat Pattern', description: 'Mixed mottled coat without diagnostic purebred markers', matched: false }
        ],
        qualityChecks: [
          { id: 'q1', label: 'Image sharpness and focus', passed: false, tip: 'Motion blur or low illumination detected' },
          { id: 'q2', label: 'Torso & head profile visibility', passed: true, tip: 'Head visible' },
          { id: 'q3', label: 'Fresh field photo verified', passed: true, tip: 'Fresh capture' }
        ],
        photos,
        attentionHeatmapNote: 'Visual explanation will be connected to the detection model later.',
        disclaimer: 'Unable to confidently identify a pure breed. Try capturing a clearer side profile under direct natural daylight.'
      };
    }

    if (scenario === 'murrah_buffalo') {
      const geo = regionalBreedService.getRegionalRelevance('murrah');
      return {
        id,
        timestamp,
        dateFormatted,
        status: 'high_confidence',
        primaryBreed: 'Murrah',
        confidence: 0.89,
        alternatives: [
          { breed: 'Nili-Ravi', confidence: 0.07 },
          { breed: 'Bhadawari', confidence: 0.04 }
        ],
        composition: null,
        regionalRelevance: geo.relevance,
        regionalMatchTitle: geo.title,
        regionalMatchDescription: geo.description,
        userLocation: 'Sehore, Madhya Pradesh',
        visualIndicators: [
          { feature: 'Curled Horns', description: 'Tightly coiled spiral horns curving inwards', matched: true },
          { feature: 'Jet Black Skin', description: 'Deep melanin skin coat with soft sheen', matched: true },
          { feature: 'Wedge Conformation', description: 'Deep dairy flank and well-developed milk vessel', matched: true },
          { feature: 'Compact Neck', description: 'Clean throatline without excessive dewlap', matched: true }
        ],
        qualityChecks: [
          { id: 'q1', label: 'Image sharpness and focus', passed: true, tip: 'Excellent focus' },
          { id: 'q2', label: 'Torso & head profile visibility', passed: true, tip: 'Full animal frame captured' },
          { id: 'q3', label: 'Fresh field photo verified', passed: true, tip: 'Field-verified capture' }
        ],
        photos,
        attentionHeatmapNote: 'Visual explanation will be connected to the detection model later.',
        disclaimer: 'Result based on visual morphological analysis. Confirm with physical ear tag and breed registry records.'
      };
    }

    // Default: High-confidence Gir (92%)
    const geo = regionalBreedService.getRegionalRelevance('gir');
    return {
      id,
      timestamp,
      dateFormatted,
      status: 'high_confidence',
      primaryBreed: 'Gir',
      confidence: 0.92,
      alternatives: [
        { breed: 'Sahiwal', confidence: 0.05 },
        { breed: 'Red Sindhi', confidence: 0.03 }
      ],
      composition: null,
      regionalRelevance: geo.relevance,
      regionalMatchTitle: 'Common in Gujarat and surrounding regions',
      regionalMatchDescription: 'Your region: Madhya Pradesh. Regional relevance: High. Breed likelihood is enhanced using regional livestock distribution data.',
      userLocation: 'Sehore, Madhya Pradesh',
      visualIndicators: [
        { feature: 'Forehead Structure', description: 'Convex, dome-shaped broad forehead', matched: true },
        { feature: 'Horn Curvature', description: 'Horns curve backwards and downward in crescent shape', matched: true },
        { feature: 'Ear Form', description: 'Long pendulous leaf-like ears with curled tip', matched: true },
        { feature: 'Hump Position', description: 'Prominent, rounded muscular hump over withers', matched: true },
        { feature: 'Dewlap & Sheath', description: 'Voluminous, loose skin folds under the neck', matched: true }
      ],
      qualityChecks: [
        { id: 'q1', label: 'Image sharpness and focus', passed: true, tip: 'Clear contrast and edges' },
        { id: 'q2', label: 'Torso & head profile visibility', passed: true, tip: 'Full side profile and head in frame' },
        { id: 'q3', label: 'Fresh field photo verified', passed: true, tip: 'Direct outdoor capture' }
      ],
      photos,
      attentionHeatmapNote: 'Visual explanation will be connected to the detection model later.',
      disclaimer: 'Visual morphological analysis indicates Gir with 92% confidence. Register with Bharat Pashudhan for official ear-tag linkage.'
    };
  }
};
