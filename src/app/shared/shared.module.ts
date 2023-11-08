import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatExpansionModule } from '@angular/material/expansion';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AlertComponent } from './alert/alert.component';
import { Alert2Component } from './alert2/alert2.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuListComponent,
    HomeDashboardComponent,
    ForbiddenComponent,
    NotFoundComponent,
    AlertComponent,
    Alert2Component
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    MenuListComponent,
    HomeDashboardComponent,
    ForbiddenComponent,
    NotFoundComponent,
    AlertComponent,
    Alert2Component
  ]
})
export class SharedModule { }
