import { getNutritionPlanForBreed } from '../data/nutrition';
import { BreedNutritionPlan } from '../types';

export const nutritionService = {
  getNutritionPlan(breedId: string): BreedNutritionPlan {
    return getNutritionPlanForBreed(breedId);
  }
};
