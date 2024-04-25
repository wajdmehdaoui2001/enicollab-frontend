import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatieresComponent } from './matieres.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: MatieresComponent
  }
];


@NgModule({
  declarations: [
    MatieresComponent
  ],
  imports:[RouterModule.forChild(routes),CommonModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class MatieresModule { }
