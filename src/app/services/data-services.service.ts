// src/app/user.service.ts
import { Injectable , Inject, forwardRef } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/User'; // Assume you have a User model class
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
export const AUTH_HEADER='authorization';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private JWT_TOKEN = 'JWT_TOKEN';
  



  constructor(private http: HttpClient,private router:Router, private storage:StorageService) {}
  login( email: string, password: string ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(environment.apiUrl+'/authenticate', {email,password},{observe: 'response'})
    .pipe(
    
      tap(____ =>this.log("User Authentication")),
      map((res:HttpResponse<any>)=>{
        this.storage.saveUser(res.body);
        const tokenLength=res.headers.get(AUTH_HEADER)?.length;
        const bearerToken=res.headers.get(AUTH_HEADER)?.substring(7,tokenLength);
        this.storage.saveToken(bearerToken);
        return res;
      }),
    );
      
  }
  log(message: string){
    console.log(message);
  }
  getTeachers(): Observable<User[]> {
   
    const basicAuthHeader = 'Basic ' + btoa('admin@test.com:admin'); // Remplacez 'username' et 'password' par vos identifiants

    
    const headers = new HttpHeaders({
      
      'Authorization': basicAuthHeader
    });

    
    return this.http.get<any>(environment.apiUrl + '/api/admin/teachers', { headers: headers });
  }

  getStudents(): Observable<any> {
   
    const basicAuthHeader = 'Basic ' + btoa('admin@test.com:admin'); // Remplacez 'username' et 'password' par vos identifiants

    
    const headers = new HttpHeaders({
      
      'Authorization': basicAuthHeader
    });

    
    return this.http.get<any>(environment.apiUrl + '/api/admin/students', { headers: headers });
  }
  getProjets(): Observable<any> {
   
    const basicAuthHeader = 'Basic ' + btoa('admin@test.com:admin'); // Remplacez 'username' et 'password' par vos identifiants

    
    const headers = new HttpHeaders({
      
      'Authorization': basicAuthHeader
    });

    
    return this.http.get<any>(environment.apiUrl + '/api/teacher/projets', { headers: headers });
  }
  postProject(){}
}
