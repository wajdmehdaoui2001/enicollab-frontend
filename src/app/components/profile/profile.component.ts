import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Etudiant } from 'src/app/model/Etudiant.model';
import { EtudiantService } from 'src/app/services/etudiant/etudiant.service';
import { jwtDecode } from "jwt-decode";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  student: Etudiant | undefined;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getAuthUserDetails().subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
    // const studentId = localStorage.getItem('studentId'); // Assuming you store the student ID in localStorage upon login
    // if (studentId) {
    //   this.etudiantService.getEtudiant(Number(studentId)).subscribe(
    //     (student) => {
    //       this.student = student;
    //     },
    //     (error) => {
    //       console.error('Error fetching student data:', error);
    //     }
    //   );
    // } else {
    //   console.error('Student ID not found in localStorage');
    // }
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  handleProfile() {
    // Check if the current route is not "/profile" before navigating
    if (this.router.url !== '/profile') {
      this.router.navigateByUrl("/profile");
    }
  }

  Edit() {
    // Check if the current route is not "/edit-etudiant/1" before navigating
    if (this.router.url !== '/edit-etudiant/1') {
      this.router.navigateByUrl("/edit-etudiant/1");
    }
  }

  handleLogout() {
    // You might want to add a confirmation dialog or any additional logic here before logging out
    this.router.navigateByUrl("/login");
  }
}
