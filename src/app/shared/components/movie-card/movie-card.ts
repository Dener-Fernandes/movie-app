import { Component, Input } from '@angular/core';
import { IMovie } from '../../../core/interfaces/movie.interface';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  @Input() movie: IMovie = {
    movieId: 0,
    title: '',
    category: '',
    image: '',
    description: '',
    rating: 0,
    year: 0,
  };
}
