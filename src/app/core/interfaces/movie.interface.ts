export interface IMovie {
  movieId: number;
  title: string;
  category: string;
  image: string;
  description: string;
  rating: number;
  year: number;
}

export interface IMoviePage {
  totalItems: number;
  currentPage: number;
  limit: number;
  totalPages: number;
  items: IMovie[];
}
