type User = {
  id: string;
  email: string;
  plan: "basic" | "pro" | "none" | "free";
  credits: number;
};
import { create } from "zustand";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  hasSubscription: boolean;
  setHasSubscription: (hasSub: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  hasSubscription: false,
  setHasSubscription: (hasSub) => set({ hasSubscription: hasSub }),
}));
