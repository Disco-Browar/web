// lib/store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  name: string;
  pesel?: string;
  region: string;
  interests: string[]; // tablica
  industries: string[]; // ← ZMIENIONE NA MNOGĄ
  isLoggedIn: boolean;
};

type AppState = {
  user: User | null;
  token: string | null;

  setAuth: (token: string, userData: any) => void;
  logout: () => void;

  updateInterests: (interests: string[]) => void;
  updateRegion: (region: string) => void;
  updateIndustries: (industries: string[]) => void; // ← ZMIENIONA NA MNOGĄ
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setAuth: (token: string, userData: any) => {
        const interests =
          typeof userData.interests === "string"
            ? userData.interests.split(",").map((i: string) => i.trim())
            : Array.isArray(userData.interests)
              ? userData.interests
              : [];

        const industries =
          typeof userData.industries === "string"
            ? userData.industries.split(",").map((i: string) => i.trim())
            : Array.isArray(userData.industries)
              ? userData.industries
              : [];

        set({
          token,
          user: {
            id: String(userData.id),
            name: userData.name,
            pesel: userData.pesel,
            region: userData.region,
            interests,
            industries, // ← dodane
            isLoggedIn: true,
          },
        });
      },

      logout: () => {
        set({ user: null, token: null });
      },

      updateInterests: (interests) =>
        set((state) => ({
          user: state.user ? { ...state.user, interests } : null,
        })),

      updateRegion: (region) =>
        set((state) => ({
          user: state.user ? { ...state.user, region } : null,
        })),

      // ← NOWA AKCJA (mnoga)
      updateIndustries: (industries) =>
        set((state) => ({
          user: state.user ? { ...state.user, industries } : null,
        })),
    }),
    { name: "twoj-glos-storage" },
  ),
);
