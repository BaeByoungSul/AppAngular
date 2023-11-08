import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //horizontalPosition: MatSnackBarHorizontalPosition = 'end'; //'start';
  //verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  loading = false;
  
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _snackBar : MatSnackBar
  ){ }

  ngOnInit(): void {
    if(this._authService.isLoggedIn()){
      this._router.navigateByUrl('/huizhou/huizhou-dashboard')
    }
  }

  submit(){
    console.log(this.form.invalid);
    
    if (this.form.invalid) {
      this.openSnackBar("form is invalid!", "Error");
      return;
    }

    this.loading = true;
    this._authService
      .login(this.form.get('email')?.value, this.form.get('password')?.value)
      .subscribe({
          next: res => {
            console.log(res);
    
            this._router.navigateByUrl('/huizhou/huizhou-dashboard')
            this.loading = false;
          },
          error: err =>{
            console.log(err);
            this.openSnackBar(err.error, "Close");
            this.loading = false;
          }
      });

        // next: (res)=>{
        // console.log(res);
        // this._router.navigateByUrl('/huizhou/huizhou-dashboard')
        // }
        

  }

  openSnackBar(message: string, action: string) {
    
    this._snackBar.open(message, action,{
      duration: 60000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      
    });
  }
}


