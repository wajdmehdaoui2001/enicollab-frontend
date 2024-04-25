import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/data-services.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent {
  loginForm!: FormGroup;
  errorMessage!: string;
  
  

  constructor(
    private userService:UserService,
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
  login() {
    this.userService.login(
      this.loginForm.get(['email'])!.value,
      this.loginForm.get(['password'])!.value
    ).subscribe((response) => {
      console.log(response);
      if (StorageService.isAdminLoggedIn()) {
        this.router.navigateByUrl("admin");
      } else if (StorageService.isStudentLoggedIn()) {
        this.router.navigateByUrl("student");
      } else if(StorageService.isTeacherLoggedIn()) {
        this.router.navigateByUrl("teacher/projects");
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
}

