import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from 'src/app/_model/user';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  showSuccess: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';
  
  private token: string = '';
  private email: string = '';
  loading = false;


  form = new FormGroup({
    passwordGroup: new FormGroup({
      password: new FormControl("", 
        [Validators.required, 
          // this.checkPassword, 
          Validators.minLength(6), 
          Validators.maxLength(12) ]),
      confirmPassword: new FormControl("", 
        [Validators.required, 
          // this.checkPassword, 
          Validators.minLength(6), 
          Validators.maxLength(12) ]),
    }, {
      validators: this.controlValuesAreEqual('password', 'confirmPassword')
    }),
  });

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private _snackBar : MatSnackBar
  ){ }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
  }

  checkValidation(input: string){
    const validation = this.form.get(input)?.invalid && 
                      (this.form.get(input)?.dirty || this.form.get(input)?.touched)
    return validation;
  }
  checkGroupValidation(){
    const validation = this.form.controls.passwordGroup.invalid && 
                       this.form.controls.passwordGroup.hasError('mustMatch') &&
                       this.form.controls.passwordGroup.controls.confirmPassword.dirty &&
                      (this.form.controls.passwordGroup.dirty || 
                       this.form.controls.passwordGroup.touched)
   //console.log(validation);
    return validation;
  }
  passwordErrors() {
    var mycontrols = this.form.controls.passwordGroup.controls.password
    console.log(mycontrols.errors);
    
    return mycontrols.hasError('required') ? 'This field is required ' :
           mycontrols.hasError('minlength') ? 'This field must be at least 6 characters long ' :
           mycontrols.hasError('maxlength') ?  'This field can be max 12 characters long.' :
           mycontrols.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';

    // return this.form.controls.passwordGroup.controls.password.hasError('required') ? 'This field is required' :
    //        this.form.controls.passwordGroup.controls.password.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }
  confirmPasswordErrors() {
    var mycontrols = this.form.controls.passwordGroup.controls.confirmPassword
    return mycontrols.hasError('required') ? 'This field is required ' :
           mycontrols.errors?.['minlength'] ? 'This field must be at least 6 characters long ' :
           mycontrols.errors?.['maxlength'] ?  'This field can be max 12 characters long.' :
           mycontrols.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';

  }    
  onSubmit() {
    // password: this.form.controls.passwordGroup.controls.password.value!,
    // confirmPassword:this.form.controls.passwordGroup.controls.confirmPassword.value!,
    const resetPass: ResetPassword = {
      password: this.form.controls.passwordGroup.get('password')?.value!,
      confirmPassword: this.form.controls.passwordGroup.get('confirmPassword')?.value!,
      token: this.token,
      email: this.email
    }
    this.authService.resetPassword(resetPass)
      .subscribe({
        next: (_) => this.showSuccess = true,
        error: (err: HttpErrorResponse) => {
          this.showError = true;
          //this.errorMessage = err.message;
          this.openSnackBar(err.message, "Close");
        }
      })

  }
  private controlValuesAreEqual(controlNameA: string, controlNameB: string): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const formGroup = controls as FormGroup
      const valueOfControlA = formGroup.get(controlNameA)?.value
      const valueOfControlB = formGroup.get(controlNameB)?.value
console.log(formGroup);

      if (valueOfControlA === valueOfControlB) {
        return null
      } else {
        return { mustMatch: true }
      }
    }
  }
  openSnackBar(message: string, action: string) {
    
    this._snackBar.open(message, action,{
      duration: 60000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      
    });
  }
}
