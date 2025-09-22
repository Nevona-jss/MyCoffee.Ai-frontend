import { create } from 'zustand';

interface HeaderState {
  title?: string;
  showBackButton: boolean;
  backHref?: string;
  showSettingsButton?: boolean;
  setHeader: (config: {
    title?: string;
    showBackButton?: boolean;
    backHref?: string;
    showSettingsButton?: boolean;
  }) => void;
  resetHeader: () => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  title: undefined,
  showBackButton: true,
  backHref: undefined,
  showSettingsButton: false,
  
  setHeader: (config) => set((state) => ({
    ...state,
    // ...{showSettingsButton: false, ...state},
    ...config,
  })),
  
  resetHeader: () => set({
    title: undefined,
    showBackButton: true,
    backHref: undefined,
    showSettingsButton: false,
  }),
}));
