import { Component } from '@angular/core';

import { UserService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {

  students: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllStudents();
  }
  getAllStudents(){
    this.userService.getStudents().subscribe((res)=>{
      console.log(res);
      this.students=res;
    })
  }}
