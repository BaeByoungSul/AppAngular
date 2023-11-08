import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../layouts/home-layout/home-layout.component';
import { HuizhouDashboardComponent } from './huizhou-dashboard/huizhou-dashboard.component';
import { TestDashboardComponent } from './test-dashboard/test-dashboard.component';
import { ForbiddenComponent } from '../shared/forbidden/forbidden.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { authGuard } from '../_service/auth.guard';
import { roleGuard } from '../_service/role.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      // { path: 'huizhou-dashboard', component: HuizhouDashboardComponent, 
      //   canActivate:[authGuard, roleGuard],data:{role:'Huizhou'}
      // },
      { 
        path: 'huizhou-dashboard', 
        component: HuizhouDashboardComponent ,
        canActivate:[authGuard, roleGuard],data:{role:'Admin'}
      },
      
      //{ path: 'huizhou-dashboard', component: TestDashboardComponent},
      { path: '', redirectTo: '/huizhou/huizhou-dashboard', pathMatch: 'full'},
      { path:'forbidden', component: ForbiddenComponent },
      { path:'**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HuizhouRoutingModule { }
