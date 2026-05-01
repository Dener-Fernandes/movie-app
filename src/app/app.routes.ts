import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/movies/movies').then((m) => m.Movies),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
