
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Etudiant } from "../../model/Etudiant.model";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private backendHost = "http://localhost:8091";

  constructor(private http: HttpClient) {}

  // Retrieve a single student by ID
  getEtudiant(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.backendHost}/api/admin/students`);
  }

  // Update a student
  updateEtudiant(etudiant: Etudiant): Observable<any> {
    return this.http.put(`${this.backendHost}/edit/{id}${etudiant.id}`, etudiant);
  }

  // Delete a student by ID
  deleteEtudiant(id: number): Observable<any> {
    return this.http.delete(`${this.backendHost}/delete/${id}`);
  }
 
}
