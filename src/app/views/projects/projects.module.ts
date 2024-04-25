import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from '../add-form/add-form.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  }
];
@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports:[RouterModule.forChild(routes),CommonModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class ProjectsModule { }
