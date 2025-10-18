import { create } from "zustand";
export type WardrobeStore = {
  title: string;
  wardrobeId: null | string;
  outfitIds: string[];
  addOutfitId: (id: string) => void;
  removeOutfitId: (id: string) => void;
  clearOutfitIds: () => void;
  setTitle: (title: string) => void;
  setWardrobeId: (data: string) => void;
};

export const useWardrobeStore = create<WardrobeStore>((set) => ({
  title: "",
  outfitIds: [],
  addOutfitId: (id: string) =>
    set((state) => ({ outfitIds: [...state.outfitIds, id] })),
  removeOutfitId: (id: string) =>
    set((state) => ({
      outfitIds: state.outfitIds.filter((outfitId) => outfitId !== id),
    })),
  clearOutfitIds: () => set({ outfitIds: [] }),
  setTitle: (title: string) => set({ title }),
  setWardrobeId: (wardrobeId: string) => set({ wardrobeId }),
  wardrobeId: "",
}));
