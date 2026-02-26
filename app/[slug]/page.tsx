// app/filmes/[slug]/page.tsx

import { getMovieBySlug, listHomeMovies } from '@/services/api'
import { Film } from '@/view'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(
  props: PageProps<'/[slug]'>
): Promise<Metadata> {

  const { slug } = await props.params
  const filme = await getMovieBySlug(slug)
  if (!filme) {
    return {
      title: 'Filme não encontrado'
    }
  }

  return {
    title: `Diamond Films - ${filme.movie.title}`,
    description: filme.movie.shortSynopsis,
    openGraph: {
      title: filme.movie.title,
      description: filme.movie.shortSynopsis,
      images: [
        `https://diamondfilms.com.br${filme.movie.bannerDesktop}`
      ]
    }
  }
}

export const dynamic = 'force-dynamic'

export default async function Page(
  props: PageProps<'/[slug]'>
) {
  const { slug } = await props.params

  const filme = await getMovieBySlug(slug)
  if (!filme) notFound()
  return <Film movie={filme} sessions={[]} />
}

export async function generateStaticParams() {
  const posts = await listHomeMovies()
  const releases = posts.releases.map((post: { slug: string }) => ({
    slug: post.slug
  }))
  const streaming = posts.streaming.map((post: { slug: string }) => ({
    slug: post.slug
  }))
  return [...releases, ...streaming]
}