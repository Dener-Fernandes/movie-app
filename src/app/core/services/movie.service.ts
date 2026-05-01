import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMoviePage } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/criticweb';

  getMovies(
    offset = 0,
    limit = 10,
    genres: string[] = [],
  ): Observable<IMoviePage> {
    let params = new HttpParams().set('offset', offset).set('limit', limit);

    if (genres.length > 0) {
      genres.forEach((genre) => {
        params = params.append('category', genre);
      });
    }

    return this.http.get<IMoviePage>(`${this.baseUrl}/movie`, { params });
  }
}
