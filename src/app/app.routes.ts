import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'squad',
    loadComponent: () => import('./pages/squad/squad').then((m) => m.Squad),
  },
  {
    path: 'players/:name',
    loadComponent: () =>
      import('./pages/players/player-detail/player-detail').then((m) => m.PlayerDetail),
  },
  {
    path: 'calendar',
    loadComponent: () => import('./pages/calendar/calendar').then((m) => m.Calendar),
  },
  {
    path: 'training',
    loadComponent: () => import('./pages/training/training').then((m) => m.Training),
  },
  {
    path: 'statistics',
    loadComponent: () => import('./pages/statistics/statistics').then((m) => m.Statistics),
  },
  {
    path: 'club',
    loadComponent: () => import('./pages/club/club').then((m) => m.Club),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
