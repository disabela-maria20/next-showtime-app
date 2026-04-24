import axios from 'axios';
import { BannerListResponse, GeoLocationIp } from '../../models';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  },
});

// 🔹 helper genérico
async function handleRequest<T>(promise: Promise<{ data: T }>): Promise<T> {
  try {
    const { data } = await promise;
    return data;
  } catch (error: any) {
    console.error('API error:', error?.response?.data || error.message);
    throw error?.response?.data || new Error('Erro na requisição');
  }
}

// 🌎 GEO
export function getUserGeoLocation(): Promise<GeoLocationIp | null> {
  return handleRequest(axios.get('https://ipinfo.io/json'));
}

// 🎬 MOCK
export function getMockedMovies() {
  return handleRequest(axios.get('/mook.json'));
}

// 🎬 MOVIE
export function getMovieBySlug(slug: string) {
  return handleRequest(api.get(`/movie/get/${slug}`));
}

export function listHomeMovies() {
  return handleRequest(api.get('/movie/list-all'));
}

// 🎯 BANNERS
export function listBanners(): Promise<BannerListResponse> {
  return handleRequest(api.get('/banner/list-all'));
}

export function getHomeBanner() {
  return handleRequest(api.get('/banner-home'));
}

// 🍿 SESSIONS
export function getSessionsByMovieAndCity(slug: string, city: string) {
  return handleRequest(api.get(`/session/get/${slug}`, { params: { city } }));
}

export function getSessionLocationsByMovie(slug: string) {
  return handleRequest(api.get(`/session/location/${slug}`));
}

// 📩 NEWSLETTER
export function createNewsletterSubscription(payload: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return handleRequest(api.post('', payload));
}

// 📩 CONTACT
export function createContactMessage(payload: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return handleRequest(
    axios.post('/save/optin', payload, {
      params: payload,
    })
  );
}
