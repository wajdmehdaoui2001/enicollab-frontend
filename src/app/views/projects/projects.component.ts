import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  projets: any;

  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.getAllProjets();
  }
  getAllProjets(){
    this.userService.getProjets().subscribe((res)=>{
      console.log(res);
      this.projets=res;
    })
  }



}
