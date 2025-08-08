import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'etudiants', pathMatch: 'full' },
  {
    path: 'etudiants',
    loadChildren: () => import('./etudiants/etudiants.module').then(m => m.EtudiantsModule)
  },
  { path: '**', redirectTo: 'etudiants' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
