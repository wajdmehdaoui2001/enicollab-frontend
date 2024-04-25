import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User'; // User model
import { UserService } from '../../services/data-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormArray} from '@angular/forms';


@Component({
  selector: 'app-tables',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit{
 
 
  options!: FormGroup;
  errorMessage: string | null = null; 
  roles: any[] = [
    { name: 'Admin', value: 'admin' },
    { name: 'Professor', value: 'pro' },
    { name: 'Student', value: 'etudient' }
  ];

  userForm: FormGroup = new FormGroup({
    // Initialize your form controls here
  });

  constructor(private userService: UserService, private fb: FormBuilder) {}

  
  ngOnInit(): void {

  }
  


  
}
