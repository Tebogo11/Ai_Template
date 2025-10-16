import { create } from "zustand";

export type AccessoriesType = {
  id: string;
  url: string;
};
type GeneratorSetting = {
  outfitId: string | null;
  modal: string | null;
  accessories: AccessoriesType[];
  styleIntensity: string;
  formality: string;
  prompt: string;
  previewOutfit?: string;
  isGenerating: boolean;
  setModal: (modalData: string | null) => void;
  appendAccessories: (data: AccessoriesType) => void;
  removeAccessories: (id: string) => void;
  setStyleIntensity: (data: string) => void;
  setFormality: (data: string) => void;
  setPrompt: (data: string) => void;
  setPreviewOutfit: (data: string) => void;
  setIsGenerating: (data: boolean) => void;
  setOutfitId: (data: string | null) => void;
};

export const useGeneratorSetting = create<GeneratorSetting>((set) => ({
  modal: null,
  setModal: (modalData: string | null) => {
    set({ modal: modalData });
  },
  accessories: [],
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
  previewOutfit: undefined,
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
}));
