import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EtudiantService } from '../services/etudiant.service';
import { Etudiant } from '../models/etudiant.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etudiant-form',
  templateUrl: './etudiant-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class EtudiantFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private es: EtudiantService
  ) {
    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      filiere: [''],
      dateNaissance: [''],
      telephone: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const p = params.get('id');
      if (p) {
        this.id = +p;
        this.es.getById(this.id).subscribe(e => this.form.patchValue(e));
      }
    });
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;
    const payload: Etudiant = this.form.value;
    if (this.id) {
      payload.id = this.id;
      this.es.update(payload).subscribe({
        next: () => { this.router.navigate(['/etudiants']); },
        error: () => { alert('Erreur mise à jour'); this.submitting = false; }
      });
    } else {
      this.es.create(payload).subscribe({
        next: () => { this.router.navigate(['/etudiants']); },
        error: () => { alert('Erreur création'); this.submitting = false; }
      });
    }
  }
}
