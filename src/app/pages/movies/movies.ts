import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { IMovie, IMoviePage } from '../../core/interfaces/movie.interface';
import { Pagination } from '../../shared/components/pagination/pagination';
import { GenreFilter } from '../../shared/components/genre-filter/genre-filter';
import { MovieCard } from '../../shared/components/movie-card/movie-card';

@Component({
  selector: 'app-movies',
  imports: [Pagination, GenreFilter, MovieCard],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  private movieService = inject(MovieService);

  movies: IMovie[] = [];
  totalItems = 0;
  totalPages = 0;
  currentPage = 0;
  limit = 10;
  loading = false;

  genres = [
    'Ação',
    'Animação',
    'Comédia',
    'Crime',
    'Drama',
    'Fantasia',
    'Ficção Científica',
    'Guerra',
    'Romance',
    'Suspense',
    'Terror',
  ];

  selectedGenres: string[] = [];

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    const offset = this.currentPage * this.limit;

    this.movieService
      .getMovies(offset, this.limit, this.selectedGenres)
      .subscribe({
        next: (response: IMoviePage) => {
          this.movies = response.items;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadMovies();
  }

  onGenresChange(genres: string[]): void {
    console.log('batata', genres);
    this.selectedGenres = genres;
    this.currentPage = 0;
    this.loadMovies();
  }
}
