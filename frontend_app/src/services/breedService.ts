import { BREEDS_DATA } from '../data/breeds';
import { Breed } from '../types';

export const breedService = {
  getAllBreeds(): Breed[] {
    return BREEDS_DATA;
  },

  getBreedById(id: string): Breed | undefined {
    return BREEDS_DATA.find((b) => b.id.toLowerCase() === id.toLowerCase());
  },

  searchBreeds(query: string): Breed[] {
    const q = query.trim().toLowerCase();
    if (!q) return BREEDS_DATA;
    return BREEDS_DATA.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.hindiName.includes(q) ||
        b.origin.toLowerCase().includes(q) ||
        b.species.toLowerCase().includes(q) ||
        b.regionalDistribution.some((reg) => reg.toLowerCase().includes(q))
    );
  },

  getBreedsBySpecies(species: 'Cattle' | 'Buffalo'): Breed[] {
    return BREEDS_DATA.filter((b) => b.species === species);
  }
};
