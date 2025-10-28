import { create } from "zustand";

type AppSetting = {
  theme: string;
  setTheme: (newTheme: "light" | "dark") => void;
  isPreviewPage: boolean;
  setIsPreviewPage: (data: boolean) => void;
  showSubscriptionModal: boolean;
  setShowSubscriptionModal: (data: boolean) => void;
  hasNoCredits?: boolean;
  setHasNoCredits?: (data: boolean) => void;
};

export const useAppSetting = create<AppSetting>((set) => ({
  theme: localStorage.getItem("theme") || "light",
  setTheme: (newTheme: "light" | "dark") => {
    localStorage.setItem("theme", newTheme);
    set({ theme: newTheme });
  },
  isPreviewPage: false,
  setIsPreviewPage: (isPreview) => {
    set({ isPreviewPage: isPreview });
  },
  showSubscriptionModal: false,
  setShowSubscriptionModal: (show) => set({ showSubscriptionModal: show }),
  hasNoCredits: false,
  setHasNoCredits: (hasNoCredits) => set({ hasNoCredits }),
}));
