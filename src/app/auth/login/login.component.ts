import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../_service/auth.service';
import { SnackbarService } from '../../_service/snackbar.service';
import { User } from '../../_model/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule, 
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  // email = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl("", [Validators.required]);
  loading$ = new BehaviorSubject<boolean>(false);
  
  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email ]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private router$: Router,
    private authService$: AuthService,
    private snackBar$ : SnackbarService,
  ){}
  ngOnInit(): void {
    if(this.authService$.isLoggedIn()){
      //this.router$.navigateByUrl('/huizhou/huizhou-dashboard')
      this.router$.navigateByUrl('/home')
    }
  }
  submit(){
    console.log(this.form.invalid);
    
    if (this.form.invalid) {
      this.snackBar$.error("form is invalid!");
      return;
    }

    this.loading$.next(true);
    this.authService$
      .login(this.form.get('email')?.value, this.form.get('password')?.value)
      .subscribe({
          next: ( res : User) => {
            //console.log(res['mainRoles']);
            console.log(res.mainRoles);
       
            // if(this.authService$.getSelectedMainRole() == 'Huizhou'){
            //   this.router$.navigateByUrl('/huizhou');
            // } else {
            //   this.router$.navigateByUrl('/home');
            // }
            // if ( (res?.mainRoles || [] )[0] == 'Huizhou' ){
            //   this.router$.navigateByUrl('/huizhou');
            // } else {
            //   this.router$.navigateByUrl('/home');
            // }
          },
          error: err =>{
            console.log(err);
            this.loading$.next(false)
            if( typeof err.error === "string" )this.snackBar$.error(err.error);
            else this.snackBar$.error(err.message);
           
            //this.snackBar$.error(err.error);
            
          },
          complete: ()=>{
            this.loading$.next(false)
            
            //this.authService$.setMainRole(this.authService$.getMainRoles()[0])
          }
      });

        // next: (res)=>{
        // console.log(res);
        // this._router.navigateByUrl('/huizhou/huizhou-dashboard')
        // }
        

  }
  emailErrors() {
    // return this.form.get('email')?.hasError('required') ? 'This field is required' :
    //        this.form.get('email')?.hasError('email') ? 'Not a valid email' : ''
    if (this.form.controls['email'].hasError('required')){
      return 'You must enter a value';
    }
    if (this.form.controls['email'].hasError('email')){
      return 'Not a valid email';
    }else { return ''; }

  }
  passwordErrors() {
    if (this.form.controls['password'].hasError('required')){
      return 'You must enter a value';
    } else {return '';}
  
    // return this.form.get('password')?.hasError('required') ? 'This field is required' :
    //        this.form.get('password')?.hasError('email') ? 'Not a valid email' : ''
    // return this.form.get('password')?.hasError('required') ? 'This field is required ' :
    // this.form.get('password')?.hasError('minlength') ? 'This field must be at least 6 characters long ' :
    // this.form.get('password')?.hasError('maxlength') ?  'This field can be max 12 characters long.' :
    // this.form.get('password')?.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';

  }
  getErrorMessage() {
    if (this.form.controls['email'].hasError('required')){
      return 'You must enter a value';
    }
    if (this.form.controls['email'].hasError('email')){
      return 'Not a valid email';
    }
    return '';

    
  }
}
