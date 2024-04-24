import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import {Tokens} from "../model/tokens";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

import Swal from "sweetalert2";
import { StorageService } from './storage/storage.service';
export const AUTH_HEADER='authorization';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly ROLES = 'ROLES';
  private loggedUser!: string;
  name: any;
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
  logout() {
    this.doLogoutUser()
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }
  refreshToken() {
    return this.http.post<any>(environment.apiUrl+'/refresh', {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt,tokens.roles);
    }));
  }
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
   doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }
  private doLogoutUser() {
    this.loggedUser = 'null';
    this.removeTokens();
  }
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }
  private storeJwtToken(jwt: string,roles:string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
    localStorage.setItem(this.ROLES,roles);
    localStorage.setItem("username", this.loggedUser);
    localStorage.setItem("id","1");
  }
  private storeTokens(tokens: Tokens,) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    localStorage.setItem(this.ROLES,tokens.roles);
    localStorage.setItem("username", this.loggedUser);
    localStorage.setItem("id","1");

  }

  public getAuthUserDetails() {
    return this.http.get(`${environment.apiUrl}/profile/${localStorage.getItem("username")}`);
  }
  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.ROLES);
    localStorage.removeItem("id");
  }
}
