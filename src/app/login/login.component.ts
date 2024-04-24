import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { StorageService } from '../services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  
  

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.authService.login(
      this.loginForm.get(['email'])!.value,
      this.loginForm.get(['password'])!.value
    ).subscribe((response) => {
      console.log(response);
      if (StorageService.isAdminLoggedIn()) {
        this.router.navigateByUrl("admin/dashboard");
      } else if (StorageService.isStudentLoggedIn()) {
        this.router.navigateByUrl("student/dashboard");
      } else if(StorageService.isTeacherLoggedIn()) {
        this.router.navigateByUrl("teacher/dashboard");
      };
    });
    (    error: { status: number; }) => {
      if(error.status ==406){
        this.snackbar.open("User is not active","Close", {
          duration: 5000
        });
      } else {
        this.snackbar.open("Bad credentials","Close",{
          duration:5000
        })
      }
    }

  }
  



  private redirectBasedOnRole() {
    const roles = localStorage.getItem("ROLES");
    if (roles && roles.includes("ADMIN")) {
      this.router.navigate(['/dashboard']);
    } else if (roles && roles.includes("STUDENT")) {
      this.router.navigate(['/etudiants']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
