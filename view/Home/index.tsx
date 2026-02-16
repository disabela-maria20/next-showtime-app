'use client'
import useIsMobile from '@/hooks/useIsMobile'
import React from 'react'
import mook from './mook.json'
const Home = () => {
  const { isMobile, isLoading } = useIsMobile()
  return (
    <main>
      <section>
        {isMobile ?
        <img src={mook.bannerMobile.src} alt={mook.bannerMobile.alt} className='w-full' />
        :
        <img src={mook.bannerDesktop.src} alt={mook.bannerDesktop.alt} className='w-full' />
        }
      </section>
    </main>
  )
}

export default Home
