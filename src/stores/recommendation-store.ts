import { CoffeePreferences, CoffeeData } from '@/types/coffee'
import { create } from 'zustand'

interface RecommendationState {
  preferences: CoffeePreferences;
  setPreferences: (preferences: CoffeePreferences) => void;
}

export const useRecommendationStore = create<RecommendationState>((set) => ({
  preferences: {
    aroma: 1,
    acidity: 1,
    nutty: 1,
    body: 1,
    sweetness: 1,
  },
  setPreferences: (preferences: CoffeePreferences) => set({ preferences }),
}))