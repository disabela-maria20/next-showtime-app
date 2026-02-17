'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getUserLocation } from '../api';

type LocationState = {
  city: string | null;
  state: string | null;
  country: string | null;
  loading: boolean;
  fetchLocation: () => Promise<void>;
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      city: null,
      state: null,
      country: null,
      loading: false,
      fetchLocation: async () => {
        if (get().city) return; 
        set({ loading: true });
        try {
          const data = await getUserLocation();          
          if (data) {
            set({
              city: data.city ?? null,
              state: data.regionName ?? null,
              country: data.country ?? null,
              loading: false,
            });
          } else {
            set({ loading: false });
          }
        } catch (error) {
          console.error('Erro ao buscar localização', error);
          set({ loading: false });
        }
      },
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state?.city) {
          state?.fetchLocation();
        }
      },
    }
  )
);
