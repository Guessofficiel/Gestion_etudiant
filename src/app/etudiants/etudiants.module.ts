import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';
import { EtudiantDetailComponent } from './etudiant-detail/etudiant-detail.component';

@NgModule({
  declarations: [
    EtudiantListComponent,
    EtudiantFormComponent
    // ❌ Ne pas mettre EtudiantDetailComponent ici car standalone
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EtudiantDetailComponent, // ✅ Importer le standalone component
    RouterModule.forChild([
      { path: '', component: EtudiantListComponent },
      { path: 'new', component: EtudiantFormComponent },
      { path: ':id', component: EtudiantDetailComponent },
      { path: ':id/edit', component: EtudiantFormComponent }
    ])
  ]
})
export class EtudiantsModule {}
