import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProjetsService} from "../../../services/projets/projets.service";
import {Projet} from "../../../model/Projet.model";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-projet.component.html',
  styleUrls: ['./new-projet.component.css']
})
export class NewProjetComponent implements OnInit {
handleLogout() {
  this.auth.logout();
  this.roles = null;
  this.router.navigateByUrl("/login");
}
  newProjetFormGroup!: FormGroup
roles: any;

  constructor(private fb: FormBuilder, public projetsService: ProjetsService,private auth: AuthService, private router:Router) {
  }
  ngOnInit(): void {
    this.newProjetFormGroup = this.fb.group({
      intitule: this.fb.control("",[Validators.required,Validators.minLength(4)]),
      description: this.fb.control(""),
      path: this.fb.control(""),
      stage: this.fb.control(null)
    });
  }

    handleSaveCustomer() {
      let projet: Projet = this.newProjetFormGroup.value;
      this.projetsService.saveProjet(projet).subscribe({
        next : data => {
          alert("Projet has been successfully saved !!")
          this.newProjetFormGroup.reset()
          this.router.navigateByUrl("/projets")
        }, error : err => {
          console.log(err)
        }
      });


    }

}
