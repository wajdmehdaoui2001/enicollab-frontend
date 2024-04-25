import { Injectable } from '@angular/core';


const USER ="User";
const TOKEN="Token";
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  saveUser(user:any){
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user))
    
  }
  saveToken(token:any){
    window.localStorage.getItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }
  static isAdminLoggedIn():boolean{
    if(this.getToken()==null){
      return true;
    }
    const role:string = this.getUserRole();
    return role =="ADMIN";
  }
  static getUserRole(): string {
   const user = this.getUser();
   if(user == null){
    return ``;
   }
   return user.role;
  }
  static getUser(): any {
    const userJson = localStorage.getItem(USER);
    if (userJson !== null) {
      return JSON.parse(userJson);
    } else {
      return null;
      
    }
  }
  static getToken():any {
    return window.localStorage.getItem(TOKEN);
  }
  static isStudentLoggedIn():boolean{ 
    if(this.getToken()==null){
    return true;
  }
  const role:string = this.getUserRole();
  return role =="STUDENT";
}
static isTeacherLoggedIn():boolean{ if(this.getToken()==null){
  return true;
}
const role:any = this.getUserRole();
return role ==null;
}
}
