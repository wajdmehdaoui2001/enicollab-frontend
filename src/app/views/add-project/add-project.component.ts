import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit{
 
 
  options!: FormGroup;
  errorMessage: string | null = null; 
  roles: any[] = [
    { name: 'Admin', value: 'admin' },
    { name: 'Professor', value: 'pro' },
    { name: 'Student', value: 'etudient' }
  ];

  userForm: FormGroup = new FormGroup({
    
  });

  constructor(private userService: UserService, private fb: FormBuilder) {}

  
  ngOnInit(): void {

  }
  


  
}
