import { create } from "zustand";

type AppSetting = {
  theme: string;
  setTheme: (newTheme: "light" | "dark") => void;
};

export const useAppSetting = create<AppSetting>((set) => ({
  theme: localStorage.getItem("theme") || "light",
  setTheme: (newTheme: "light" | "dark") => {
    localStorage.setItem("theme", newTheme);
    set({ theme: newTheme });
  },
}));
