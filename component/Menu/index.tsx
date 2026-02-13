"use client";
import React from 'react';
import text from '../../services/localization/pt.json'
import { useLocationStore } from '@/services/store/locationStore';

const Menu = () => {
   const city = useLocationStore((s) => s.city);
  const state = useLocationStore((s) => s.state);
  const loading = useLocationStore((s) => s.loading);

  console.log(city, state, loading);
  
  return (
    <div className="container m-auto px-7">
      <section className="w-full bg-gray-800 text-white flex items-center justify-between">
        <div>
           <img src={text.menu.logo.src} alt={text.menu.logo.alt} />
        </div>
        <div>
          s
        </div>
      </section>
    </div>
  );
};

export default Menu;
