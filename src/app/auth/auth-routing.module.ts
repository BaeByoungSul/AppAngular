import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../layouts/home-layout/home-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
      { path: 'register', component: RegisterationComponent},
      { path: "verify-user", component: VerifyUserComponent },
      { path: "forgot-password", component: ForgotPasswordComponent },
      { path: "reset-password", component: ResetPasswordComponent }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
