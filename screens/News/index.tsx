import { Noticia } from '@/services/models';
import React from 'react'
interface NewsProps {
  noticias: Noticia[];
}
const News = ({noticias}: NewsProps) => {
    console.log(noticias);
    
  return (
    <div>
      
    </div>
  )
}

export default News
