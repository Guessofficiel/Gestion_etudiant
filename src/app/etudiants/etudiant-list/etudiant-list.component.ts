import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Etudiant } from '../models/etudiant.model';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html'
})
export class EtudiantListComponent implements OnInit {
  etudiants: Etudiant[] = [];
  loading = false;
  error = '';

  constructor(private es: EtudiantService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.loading = true;
    this.es.getAll().subscribe({
      next: data => { this.etudiants = data; this.loading = false; },
      error: err => { this.error = 'Impossible de charger'; this.loading = false; }
    });
  }

  view(id?: number) { if (id) this.router.navigate(['/etudiants', id]); }
  edit(id?: number) { if (id) this.router.navigate(['/etudiants', id, 'edit']); }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('Confirmer la suppression ?')) return;
    this.es.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert('Suppression échouée')
    });
  }
}
