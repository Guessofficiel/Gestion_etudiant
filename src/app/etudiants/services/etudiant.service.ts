import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Etudiant } from '../models/etudiant.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EtudiantService {
  private baseUrl = `${environment.apiUrl}/etudiants`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  create(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(this.baseUrl, etudiant).pipe(catchError(this.handleError));
  }

  update(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.baseUrl}/${etudiant.id}`, etudiant).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API error', error);
    return throwError(() => error);
  }
}
