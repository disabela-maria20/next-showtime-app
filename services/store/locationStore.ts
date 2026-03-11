'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getUserGeoLocation } from '../api';

type GeoLocationData = {
  city?: string;
  regionName?: string;
  region?: string;
};

type LocationState = {
  city: string | null;
  state: string | null;
  region: string | null;
  loading: boolean;
  fetchLocation: () => Promise<void>;
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      city: null,
      state: null,
      region: null,
      loading: false,
      fetchLocation: async () => {
        if (get().city) return;
        set({ loading: true });
        try {
          const data = await getUserGeoLocation() as GeoLocationData;          
          if (data) {
            set({
              city: data.city ?? null,
              state: data.regionName ?? null,
              region: data.region ?? null,
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
