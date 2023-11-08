import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent {
  //horizontalPosition: MatSnackBarHorizontalPosition = 'center'; //'start';
  //verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  loading = false;

  //fieldRequired: string = "This field is required"
  
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
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
    firstName: new FormControl(null, Validators.maxLength(20)),
    lastName: new FormControl(null, Validators.maxLength(20)),
    displayName: new FormControl(null, Validators.maxLength(20))
  });

  constructor(
    private _auth     : AuthService,
    private _router   : Router,
    private _snackBar : MatSnackBar
  ){}

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
  emailErrors() {
    return this.form.get('email')?.hasError('required') ? 'This field is required' :
           this.form.get('email')?.hasError('email') ? 'Not a valid emailaddress' :
           this.form.get('email')?.hasError('pattern') ? 'Not a valid emailaddress' :''
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
  // passwordGroupErrors(){
  //   return this.form.controls.passwordGroup.hasError('mustMatch') ? 'Passwords must match' : '' ;
  // }
  checkPassword(control:any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  
  submit(){
    console.log(this.form.invalid);
    
    if (this.form.invalid) {
      this.openSnackBar("form is invalid!", "Error");
      return;
    }

    this.loading = true;
    var body = {
      email: this.form.controls.email.value!  ,
      password: this.form.controls.passwordGroup.controls.password.value!,
      confirmPassword:this.form.controls.passwordGroup.controls.confirmPassword.value!,
      firstName: this.form.controls.firstName.value!  ,
      lastName: this.form.controls.lastName.value!  ,
      displayName: this.form.controls.displayName.value!
    }

    this._auth
      .register(body)
      .subscribe({
          next: res => {
            console.log(res);
            //this._router.navigateByUrl('/auth/login')
            this.openSnackBar('Please check your email for password verify instructions', "Close");
            this.loading = false;
          },
          error: err =>{
            console.log(err);
            this.openSnackBar(err.error, "Error");
            this.loading = false;
          }
      });

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
      verticalPosition: 'bottom'
    });
  }
}
