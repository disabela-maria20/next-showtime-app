export interface NoticiaItem {
  id: string | number;
  category: {
    slug: string;
    label: string;
  };
  content: {
    title: string;
    description: string;
  };
}

export interface HeroNewsSectionProps {
  portalName?: string;
  mainTitle: string;
  mainDescription: string;
  secondTitle: string;
  secondDescription: string[];
  movieReleaseDate: string;
  movieTitle: string;
  movieImageUrl: string;
  noticias: NoticiaItem[];
  onBuyTicket?: () => void;
  className?: string;
}
