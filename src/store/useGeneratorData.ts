import { useQuery } from "convex/react";
import { create } from "zustand";
import { api } from "../../convex/_generated/api";

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
  style_intensity: number;
  formality: number;
  initial_prompt: string;
};

type GeneratorSetting = {
  outfitId: string | null;
  modal: string | null;
  accessories: AccessoriesType[];
  styleIntensity: string;
  formality: string;
  prompt: string;
  previewOutfit?: null | string;
  isGenerating: boolean;
  season: Season;
  is_new_outfit: boolean;
  apiError: string | null;
  setAccessories: (data: AccessoriesType[]) => void;
  setModal: (modalData: string | null) => void;
  appendAccessories: (data: AccessoriesType) => void;
  removeAccessories: (id: string) => void;
  setStyleIntensity: (data: string) => void;
  setFormality: (data: string) => void;
  setPrompt: (data: string) => void;
  setPreviewOutfit: (data: string) => void;
  setIsGenerating: (data: boolean) => void;
  setOutfitId: (data: string | null) => void;
  setSeason: (data: Season) => void;
  setIsNewOutfit: (data: boolean) => void;
  setApiError: (data: string | null) => void;
  setSelectedOutfit: (data: OutfitData | null) => void;
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
  styleIntensity: "50",
  setStyleIntensity: (data: string) => {
    set({ styleIntensity: data });
  },
  formality: "50",
  setFormality: (data: string) => {
    set({ formality: data });
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
  season: Season.SPRING,
  setSeason: (data: Season) => {
    set({ season: data });
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
        styleIntensity: String(data.style_intensity),
        formality: String(data.formality),
        prompt: data.initial_prompt,
      });
    }
  },
}));
