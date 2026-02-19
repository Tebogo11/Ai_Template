import { AmountOfChangeOption } from "@/view/Dashboard/components/MainContent/components/GeneratorForm/components/ToggleSelect/const";
import { create } from "zustand";

export type AccessoriesType = {
  id: string;
  url: string;
};

export enum Season {
  SPRING = "spring",
  SUMMER = "summer",
  AUTUMN = "autumn",
  WINTER = "winter",
}

export type OutfitData = {
  modal: string;
  accessories: AccessoriesType[];
  fit: string;
  event: string;
  themes: string[];
  initial_prompt: string;
};

type GeneratorSetting = {
  outfitId: string | null;
  modal: string | null;
  accessories: AccessoriesType[];
  fit: string;
  amount_of_change: AmountOfChangeOption;
  event: string;
  themes: string[];
  prompt: string;
  previewOutfit?: null | string;
  isGenerating: boolean;
  is_new_outfit: boolean;
  apiError: string | null;
  isGettingValues: boolean;

  setIsGettingValues: (isGettingValues: boolean) => void;
  setAccessories: (data: AccessoriesType[]) => void;
  setModal: (modalData: string | null) => void;
  appendAccessories: (data: AccessoriesType) => void;
  removeAccessories: (id: string) => void;
  setStyleTheme: (data: string[]) => void;
  setFit: (data: string) => void;
  setAmountOfChangeOption: (data: AmountOfChangeOption) => void;
  setPrompt: (data: string) => void;
  setPreviewOutfit: (data: string) => void;
  setIsGenerating: (data: boolean) => void;
  setOutfitId: (data: string | null) => void;
  setIsNewOutfit: (data: boolean) => void;
  setApiError: (data: string | null) => void;
  setSelectedOutfit: (data: OutfitData | null) => void;
  setEvent: (data: string) => void;
};

export const useGeneratorSetting = create<GeneratorSetting>((set) => ({
  modal: null,
  setModal: (modalData: string | null) => {
    set({ modal: modalData });
  },
  accessories: [],
  setAccessories: (accessories: AccessoriesType[]) => {
    set({ accessories });
  },
  appendAccessories: (newAccessories: AccessoriesType) => {
    set((state) => {
      return {
        ...state,
        accessories: [...state.accessories, newAccessories],
      };
    });
  },
  removeAccessories: (id: string) => {
    set((state) => {
      const filteredAccessories = state.accessories.filter(
        (accessory) => accessory.id !== id,
      );
      return {
        ...state,
        accessories: filteredAccessories,
      };
    });
  },
  prompt: "",
  setPrompt: (data: string) => {
    set({ prompt: data });
  },
  previewOutfit: "",
  setPreviewOutfit: (data: string) => {
    set({ previewOutfit: data });
  },
  isGenerating: false,
  setIsGenerating: (data: boolean) => {
    set({ isGenerating: data });
  },
  outfitId: null,
  setOutfitId: (data: string | null) => {
    set({ outfitId: data });
  },
  is_new_outfit: true,
  setIsNewOutfit: (data: boolean) => {
    set({ is_new_outfit: data });
  },
  apiError: null,
  setApiError: (data: string | null) => {
    set({ apiError: data });
  },
  setSelectedOutfit: (data: OutfitData | null) => {
    if (data) {
      set({
        modal: data.modal,
        accessories: data.accessories,
        fit: data.fit,
        themes: data.themes,
        prompt: data.initial_prompt,
      });
    }
  },
  fit: "relaxed",
  setFit: (data: string) => {
    set({ fit: data });
  },
  event: "casual",
  setEvent: (data: string) => {
    set({ event: data });
  },
  themes: [],
  setStyleTheme: (data: string[]) => {
    set({ themes: data });
  },
  isGettingValues: false,
  setIsGettingValues: (data: boolean) => {
    set({ isGettingValues: data });
  },
  amount_of_change: AmountOfChangeOption.None,
  setAmountOfChangeOption: (data: AmountOfChangeOption) => {
    set({ amount_of_change: data });
  },
}));
