import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';
import { EtudiantDetailComponent } from './etudiant-detail/etudiant-detail.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    EtudiantFormComponent,
    EtudiantDetailComponent,
    EtudiantListComponent,
    RouterModule.forChild([
      { path: '', component: EtudiantListComponent },
      { path: 'new', component: EtudiantFormComponent },
      { path: ':id', component: EtudiantDetailComponent },
      { path: ':id/edit', component: EtudiantFormComponent }
    ])
  ]
})
export class EtudiantsModule {}
