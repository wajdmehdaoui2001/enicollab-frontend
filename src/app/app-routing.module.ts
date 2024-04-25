import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorsComponent } from './layouts/visitors/visitors.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ProfComponent } from './layouts/prof/prof.component';
import { StudentComponent } from './layouts/student/student.component';
import { LoginComponent } from './layouts/login/login.component';

const routes: Routes = [
 
  {path:'admin' , component:AdminComponent,
  children: [
    { path: '', loadChildren: () => import('./views/dashboard-admin/dashboard-admin.module').then(m => m.DashboardAdminModule) },
    { path: 'tables', loadChildren: () => import('./views/tables/tables.module').then(m => m.TablesModule) },
    { path: 'teachers', loadChildren: () => import('./views/teachers-admin/teachers-admin.module').then(m => m.TeachersAdminModule) },
   
    { path: 'add-form', loadChildren: () => import('./views/add-form/add-form.module').then(m => m.AddFormModule) }


  ]
  
  },
  {path:'login' , component:VisitorsComponent},
  {path:'teacher' , component:ProfComponent,
  children: [
    { path: 'projects', loadChildren: () => import('./views/projects/projects.module').then(m => m.ProjectsModule) },
    { path: 'matieres', loadChildren: () => import('./views/matieres/matieres.module').then(m => m.MatieresModule) },
    { path: 'add-project', loadChildren: () => import('./views/add-project/add-project.module').then(m => m.AddProjectModule) }


  ]
  
  },
  {path:'student', component:StudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}