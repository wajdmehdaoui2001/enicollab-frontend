import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProjectComponent } from './add-project.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: AddProjectComponent
  }
];
@NgModule({
  declarations: [
    AddProjectComponent
  ],

    imports:[RouterModule.forChild(routes),CommonModule,ReactiveFormsModule],
    exports: [RouterModule]
  
})
export class AddProjectModule { }
