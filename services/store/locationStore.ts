'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getUserGeoLocation } from '../api';

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

type GeoLocationData = {
  city?: string;
  regionName?: string;
  region?: string;
};

type Consent = 'accepted' | 'denied' | null;

type LocationState = {
  city: string | null;
  state: string | null;
  region: string | null;

  consent: Consent;
  consentExpiresAt: number | null;

  loading: boolean;
  setCity: (city: string | null) => void;
  setState: (state: string | null) => void;
  fetchLocation: () => Promise<void>;
  acceptConsent: () => void;
  denyConsent: () => void;
  resetConsent: () => void;
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      city: null,
      state: null,
      region: null,

      consent: null,
      consentExpiresAt: null,

      loading: false,

      setCity: (city: string | null) => {
        set({ city });
      },

      setState: (state: string | null) => {
        set({ state });
      },

      fetchLocation: async () => {
        const { consent, city, loading } = get();

        if (consent !== 'accepted') return;
        if (city) return;
        if (loading) return;

        set({ loading: true });

        try {
          const data = (await getUserGeoLocation()) as GeoLocationData;

          set({
            city: data?.city ?? null,
            state: data?.regionName ?? null,
            region: data?.region ?? null,
            loading: false,
          });

        } catch (error) {
          console.error('Erro ao buscar localização', error);
          set({ loading: false });
        }
      },

      acceptConsent: () => {
        set({
          consent: 'accepted',
          consentExpiresAt: Date.now() + SEVEN_DAYS,
        });

        get().fetchLocation();
      },

      denyConsent: () => {
        set({
          consent: 'denied',
          consentExpiresAt: Date.now() + SEVEN_DAYS,
        });
      },

      resetConsent: () => {
        set({
          consent: null,
          consentExpiresAt: null,
          city: null,
          state: null,
          region: null,
        });
      },
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        if (!state) return;

        const expired =
          !state.consentExpiresAt ||
          Date.now() > state.consentExpiresAt;

        if (expired) {
          state.resetConsent();
          return;
        }

        if (state.consent === 'accepted') {
          state.fetchLocation();
        }
      },
    }
  )
);