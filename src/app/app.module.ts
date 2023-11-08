import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { TestLayoutComponent } from './layouts/test-layout/test-layout.component';

import { SharedModule } from './shared/shared.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { AuthModule } from './auth/auth.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MytestModule } from './mytest/mytest.module';
import { Token2Interceptor } from './_service/token2.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    TestLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    MytestModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:Token2Interceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
