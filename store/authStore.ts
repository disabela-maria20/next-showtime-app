import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;

  login: (user: User, token?: string) => void;
  updateUser: (user: User) => void;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get, api) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,

      login: (user, token) => {
        set((state) => ({
          user,
          token: token ?? state.token,
          isAuthenticated: true,
        }));
      },

      updateUser: (user) => {
        set((state) => ({
          ...state,
          user,
        }));
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        api.persist.clearStorage();
      },

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : (null as any)
      ),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
