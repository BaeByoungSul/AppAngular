import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../_interceptor/auth.guard';
import { HuizhouDashboardComponent } from './huizhou-dashboard/huizhou-dashboard.component';
import { Khc003Component } from './khc003/khc003.component';
import { Khc001Component } from './khc001/khc001.component';
import { Khc002Component } from './khc002/khc002.component';
import { HomeLayoutComponent } from '../layout/home-layout/home-layout.component';


const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate:[authGuard],
    children: [
      {path: '', component: HuizhouDashboardComponent},
      {path: 'khc001', component: Khc001Component},
      {path: 'khc002', component: Khc002Component},
      {path: 'khc003', component: Khc003Component},
     
    ]
  }
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HuizhouRoutingModule { }
