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

interface LocationState {
  city: string | null;
  state: string | null;
  region: string | null;
  consent: Consent;
  consentExpiresAt: number | null;
  loading: boolean;
  error: string | null;
  
  setCity: (city: string | null) => void;
  setState: (state: string | null) => void;
  fetchLocation: () => Promise<void>;
  acceptConsent: () => void;
  denyConsent: () => void;
  resetConsent: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      city: null,
      state: null,
      region: null,
      consent: null,
      consentExpiresAt: null,
      loading: false,
      error: null,

      setCity: (city) => set({ city }),
      setState: (state) => set({ state }),

      fetchLocation: async () => {
        const { consent, city, loading } = get();

        if (consent !== 'accepted') {
          console.log('Consentimento não aceito');
          return;
        }
        
        if (city) {
          console.log('Localização já carregada');
          return;
        }
        
        if (loading) {
          console.log('Busca em andamento');
          return;
        }

        set({ loading: true, error: null });

        try {
          const data = await getUserGeoLocation() as GeoLocationData;
          
          set({
            city: data?.city ?? null,
            state: data?.regionName ?? null,
            region: data?.region ?? null,
            loading: false,
            error: null,
          });

        } catch (error) {
          console.error('Erro ao buscar localização:', error);
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Erro ao buscar localização' 
          });
        }
      },

      acceptConsent: () => {
        set({
          consent: 'accepted',
          consentExpiresAt: Date.now() + SEVEN_DAYS,
          error: null,
        });

        // Delay para garantir que o estado foi atualizado
        setTimeout(() => {
          get().fetchLocation();
        }, 0);
      },

      denyConsent: () => {
        set({
          consent: 'denied',
          consentExpiresAt: Date.now() + SEVEN_DAYS,
          city: null,
          state: null,
          region: null,
        });
      },

      resetConsent: () => {
        set({
          consent: null,
          consentExpiresAt: null,
          city: null,
          state: null,
          region: null,
          error: null,
        });
      },
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => localStorage),
      
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        const expired = !state.consentExpiresAt || Date.now() > state.consentExpiresAt;

        if (expired) {
          return {
            consent: null,
            consentExpiresAt: null,
            city: null,
            state: null,
            region: null,
            error: null,
          };
        }

        // Não chamar fetchLocation aqui - será feito pelo useEffect no componente
        return state;
      },
    }
  )
);