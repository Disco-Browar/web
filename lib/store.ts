// lib/store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  name: string;
  pesel?: string;
  region: string;
  interests: string[];
  isLoggedIn: boolean;
};

type AppState = {
  user: User | null;

  setUser: (user: Omit<User, "isLoggedIn">) => void;
  logout: () => void;
  updateInterests: (interests: string[]) => void;
  updateRegion: (region: string) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (userData) =>
        set({
          user: { ...userData, isLoggedIn: true },
        }),

      logout: () => {
        set({ user: null });
        // Przekierowanie po wylogowaniu zrobimy w komponencie, bo w store nie mamy routera
      },

      updateInterests: (interests) =>
        set((state) => ({
          user: state.user ? { ...state.user, interests } : null,
        })),

      updateRegion: (region) =>
        set((state) => ({
          user: state.user ? { ...state.user, region } : null,
        })),
    }),
    { name: "twoj-glos-storage" },
  ),
);
