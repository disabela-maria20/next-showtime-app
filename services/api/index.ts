import axios from 'axios';
import {
  BannerListResponse,
  FullMovieProps,
  GeoLocationIp,
  Movie,
} from '../../models';
import { api, handleRequest } from '../http';

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

export function listHomeMovies(): Promise<FullMovieProps> {
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

export function postfavoritesMovieId(id: number) {
  return handleRequest(api.post(`/partner/user/favorites/${id}`));
}

export function getfavoritesMovie(): Promise<Movie[]> {
  return handleRequest(api.get(`/partner/user/favorites`));
}
