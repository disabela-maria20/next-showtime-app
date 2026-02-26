import axios from 'axios'
import { BannerListResponse } from '../models'
import { log } from 'console'


export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    token: process.env.NEXT_PUBLIC_API_TOKEN
  }
})

export async function getUserGeoLocation() {
  const { data } = await axios.get('https://ipinfo.io/json')
  return data
}

export async function getMockedMovies() {
  const { data } = await axios.get('/mook.json')
  return data
}

export async function getMovieBySlug(slug: string) {
  const { data } = await api.get(`/movie/get/${slug}`)
  return data
}

export async function listHomeMovies() {
  const { data } = await api.get('/movie/list-all')
  return data
}

export async function listBanners(): Promise<BannerListResponse> {
  const { data } = await api.get('/banner/list-all')
  return data
}

export async function getHomeBanner() {
  const { data } = await api.get('/banner-home')
  return data
}

export async function getSessionsByMovieAndCity(
  slug: string,
  city: string
) {
  const { data } = await api.get(`/session/get/${slug}`, {
    params: { city }
  })
  return data
}

export async function getSessionLocationsByMovie(slug: string) {
  const { data } = await api.get(`/session/location/${slug}`)
  return data
}

export async function createNewsletterSubscription(payload: {
  name: string
  email: string
  phone: string
  url: string
}) {
  return api.post('/save/optin', payload)
}

export async function createContactMessage(payload: {
  name: string
  email: string
  phone: string
  message: string
}) {
  return axios.post(
    `/save/optin?name=${payload.name}&email=${payload.email}&phone=${payload.phone}&message=${payload.message}`,
    {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message
    }
  )
}