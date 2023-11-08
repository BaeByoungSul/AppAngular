import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { TestLayoutComponent } from './layouts/test-layout/test-layout.component';
import { HomeDashboardComponent } from './shared/components/home-dashboard/home-dashboard.component';
import { ForbiddenComponent } from './shared/forbidden/forbidden.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AngularComponent } from './study/angular/angular.component';
import { FileViewerComponent } from './study/file-viewer/file-viewer.component';
import { SapStockComponent } from './mytest/sap-stock/sap-stock.component';
import { DbView01Component } from './mytest/db-view01/db-view01.component';
import { GoogleMapComponent } from './mytest/google-map/google-map.component';
import { WeatherComponent } from './mytest/weather/weather.component';
import { ChartTestComponent } from './mytest/chart-test/chart-test.component';



const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children:[
      { path:'home-dashboard', component: HomeDashboardComponent },
      { path:'mytest/dbview01', component: DbView01Component},
      { path:'mytest/sapstock', component: SapStockComponent},
      { path:'mytest/googlemap', component: GoogleMapComponent},
      { path:'mytest/authtest', component: WeatherComponent},
      { path:'mytest/charttest', component: ChartTestComponent},
      { path:'stduy2/fileview/:id', component: FileViewerComponent},
      { path: '', redirectTo:'home-dashboard', pathMatch:'full'  },
       {path:'forbidden/:id', component: ForbiddenComponent},
    ]
  },
  {
    path:'study2',
    component: HomeLayoutComponent,
    children:[
      { path:'aaa',    component: ForbiddenComponent },
      { path:'bbb',    component: NotFoundComponent }
    ]
  },
  {
    path:'auth',
    loadChildren: ()=>import('./auth/auth.module').then((m)=>m.AuthModule)
  },
  {
    path:'study',
    loadChildren: ()=>import('./study/study.module').then((m)=>m.StudyModule)
  },
  {
    path:'huizhou',
    loadChildren: ()=>import('./huizhou/huizhou.module').then((m)=>m.HuizhouModule)
  },
  {
    path:'file',
    loadChildren: ()=>import('./file/file.module').then((m)=>m.FileModule)
  },
  
  {path:'forbidden', component: ForbiddenComponent},
  {path:'**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
