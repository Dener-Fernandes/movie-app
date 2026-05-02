import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { IAuthResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/criticweb';

  register(user: IUser): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>(`${this.baseUrl}/authenticate/register`, user)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
