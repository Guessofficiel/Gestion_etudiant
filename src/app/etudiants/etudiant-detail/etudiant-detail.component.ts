import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Etudiant } from '../models/etudiant.model';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-etudiant-detail',
  templateUrl: './etudiant-detail.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class EtudiantDetailComponent implements OnInit {
  etudiant?: Etudiant;
  loading = false;

  constructor(private route: ActivatedRoute, private es: EtudiantService, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.es.getById(id).subscribe({
        next: e => { this.etudiant = e; this.loading = false; },
        error: () => { alert('Impossible de charger'); this.loading = false; }
      });
    }
  }

  edit() { if (this.etudiant?.id) this.router.navigate(['/etudiants', this.etudiant.id, 'edit']); }
  delete() {
    if (!this.etudiant?.id) return;
    if (!confirm('Confirmer la suppression ?')) return;
    this.es.delete(this.etudiant.id).subscribe({
      next: () => this.router.navigate(['/etudiants']),
      error: () => alert('Suppression échouée')
    });
  }
}
