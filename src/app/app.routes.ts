import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'etudiants',
    loadChildren: () => import('./etudiants/etudiants.module').then(m => m.EtudiantsModule)
  },
  {
    path: '',
    redirectTo: 'etudiants',
    pathMatch: 'full'
  }
];
