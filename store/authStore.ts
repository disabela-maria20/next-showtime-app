import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type User = { id: string; name: string; email: string };

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,

      login: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
