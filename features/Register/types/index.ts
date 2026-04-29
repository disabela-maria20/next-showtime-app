export type FavoriteGenre =
  | 'acao'
  | 'aventura'
  | 'comedia'
  | 'drama'
  | 'romance'
  | 'suspense'
  | 'terror'
  | 'documentario'
  | 'shows';

export interface SignUpRequest {
  email: string;
  password: string;
  'repeat-password': string;
  name: string;
  phone: string;
  favoriteGenres: FavoriteGenre[];
}
