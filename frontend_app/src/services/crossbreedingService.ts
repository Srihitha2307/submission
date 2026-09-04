import { getCrossbreedingOptions } from '../data/crossbreeding';
import { CrossbreedingOption } from '../types';

export const crossbreedingService = {
  getBreedingOptions(breedId: string): CrossbreedingOption[] {
    return getCrossbreedingOptions(breedId);
  }
};
