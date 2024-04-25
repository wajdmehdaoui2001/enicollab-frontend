import { Component,OnInit  } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/data-services.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-teachers-admin',
  templateUrl: './teachers-admin.component.html',
  styleUrls: ['./teachers-admin.component.css']
})
export class TeachersAdminComponent implements OnInit  {
  data:any=[];
  users: User[] = [];
  searchControl = new FormControl();
 teachers:any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllTeachers();
  }
  getAllTeachers(){
    this.userService.getTeachers().subscribe((res)=>{
      console.log(res);
      this.teachers=res;
    })
  }
 

    
  




}
