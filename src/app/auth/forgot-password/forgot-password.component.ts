import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LogarithmicScale } from 'chart.js';
import { AlertService } from 'src/app/_service/alert.service';
import { Alert2Service } from 'src/app/_service/alert2.service';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center'; //'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  loading = false;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email ])
  });

  constructor(
    private _auth : AuthService,
    private _snackBar : MatSnackBar
  ){

  }
  submit(){
    // reset alerts on submit
    //this.alertService.clear();
    
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    //this.alertService.clear();
    this._auth.forgotPassword(this.form.get('email')?.value)
        .subscribe({
            next: () =>{ 
              console.log('1221312');
              this.openSnackBar('Please check your email for password reset instructions', "Close");
              this.loading = false;
            },
            error: error => {
              console.log(error);
              this.openSnackBar(error.error, "Close");
              this.loading = false;
            }
        });
  }

  openSnackBar(message: string, action: string) {
    
    this._snackBar.open(message, action,{
      duration: 60000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass:  ['mat-toolbar', 'mat-primary']
    });
  }
}
