import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Injectable, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, window } from 'rxjs';
import { SnackbarService } from '../../_service/snackbar.service';
import { AuthService } from '../../_service/auth.service';

// @Injectable()
// export class FormErrorService {
//   errorMap: { [key: string]: (c: FormControl, name: string) => string } = {
//     'required': (c: FormControl, name: string) => `${name} is required`,
//     'email': (c: FormControl, name: string) => `${c.value} is not a valid email`,
//     'max': (c: FormControl, name: string) => `${name} must be equal to or less than `,
//   }

//   mapErrors(control: FormControl, name: string): string[] {
//     return Object.keys(control.errors || {})
//       .map(key => this.errorMap[key](control, name));
//   }
// }

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, MatIconModule, MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  document$ = inject(DOCUMENT) // 
  verifyUserUrl = '';
  loading$ = new BehaviorSubject<boolean>(false);
  isSubmitOk = false;

  //Basically it needs to be more than 8 characters, 
  //contain at least 1 upper case, and contain at least 1 symbol.
  //abcdEfg@# 
  form = new FormGroup({
    email: new FormControl("",[Validators.required, Validators.email]),
    passwordGroup : new FormGroup({
      password: new FormControl("", [
        Validators.required, Validators.minLength(6), Validators.maxLength(12),
        //Validators.pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})"))
      ]),
      confirmPassword: new FormControl("", [Validators.required])
      }, {validators: this.matchValidator('password', 'confirmPassword') }),
    firstName: new FormControl(null, [Validators.required, Validators.maxLength(20)] ),
    lastName: new FormControl(null,  [Validators.required, Validators.maxLength(20)]),
    displayName: new FormControl(null, [Validators.required, Validators.maxLength(20)])
  })
  constructor(
    private authService$: AuthService,
    private snackBar$ : SnackbarService,
    
    // public readonly errorService: FormErrorService
  ) {
    console.log(this.document$);
    console.log(this.document$.location.origin);
    this.verifyUserUrl = this.document$.location.origin +'/home/auth/verify-user'
   }

  getErrorMsg(ctrlName: string){
    const ctrl = this.form.get(ctrlName);

    var maxLengthValue ;//= ctrl?.hasError('maxlength') ? ctrl.errors?.["maxlength"]["requiredLength"] : 0;
    var minLengthValue ;//= ctrl?.hasError('minlength') ? ctrl.errors?.["minlength"]["requiredLength"] : 0;
    
    if (ctrl?.hasError('maxlength')) {
      maxLengthValue = ctrl.errors?.["maxlength"]["requiredLength"];
    }
    if (ctrl?.hasError('minlength')) {
      maxLengthValue = ctrl.errors?.["minlength"]["requiredLength"];
    }
    
    return ctrl?.hasError('required') ?  'This field is required ' :
           ctrl?.hasError('pattern')  ? 'This field needs to be at least nine characters, one uppercase letter and at least 1 symbol' :
           ctrl?.hasError('email') ? 'Not a valid email' :
           ctrl?.hasError('minlength') ? `This field must be at least ${minLengthValue} characters long ` :
           ctrl?.hasError('maxlength') ?  `This field can be max ${maxLengthValue} characters long.` : '';
//           ctrl?.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }

  private matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      //const formGroup = controls as FormGroup
      const valueOfControlA = controls.get(controlName)?.value
      const valueOfControlB = controls.get(matchingControlName)?.value
//console.log(formGroup);
      if (valueOfControlA === valueOfControlB) {
        return null
      } else {
        return { mustMatch: true }
      }
    }
  }
  onSubmit(){
    if (this.form.invalid) {
      this.snackBar$.error("form is invalid!");
      return;
    }

    this.isSubmitOk = false;
    this.loading$.next(true);
    console.log(this.verifyUserUrl);
    
    var body = {
      email: this.form.controls.email.value!  ,
      password: this.form.controls.passwordGroup.controls.password.value!,
      confirmPassword:this.form.controls.passwordGroup.controls.confirmPassword.value!,
      firstName: this.form.controls.firstName.value!  ,
      lastName: this.form.controls.lastName.value!  ,
      displayName: this.form.controls.displayName.value!,
      verifyUserUrl: this.verifyUserUrl
    }

    this.authService$.register(body)
      .subscribe({
        next: res => {
          console.log(res);
          //this._router.navigateByUrl('/auth/login')
          //this.snackBar$.success('Please check your email for password verify instructions');
          this.isSubmitOk = true;
        },
        error: (err) =>{
          console.log(err);
          // connection error 때문에
          if( typeof err.error === "string" )this.snackBar$.error(err.error);
          else this.snackBar$.error(err.message);
         
          this.loading$.next(false)
        },
        complete: () => {
          this.loading$.next(false)
        }        
      });
  }




  /// 아래는 테스트....

  errors_bak2(ctrl: FormControl): string {
    
    //console.log(ctrl);
    //const maxLen = ctrl.errors?['max']['max'];
    var maxLengthValue = ctrl.hasError('maxlength') ? ctrl.errors?.["maxlength"]["requiredLength"] : 0;
    var minLengthValue = ctrl.hasError('minlength') ? ctrl.errors?.["minlength"]["requiredLength"] : 0;

    //ctrl.hasError('maxlength') ?  maxLengthValue= ctrl.errors?.["maxlength"]["requiredLength"] : null;
    //ctrl.hasError('minlength') ?  minLengthValue= ctrl.errors?.["minlength"]["requiredLength"] : null;
    
    // if ( ctrl.hasError('maxlength') ){
    //   maxLengthValue =  ctrl.errors?.["maxlength"]["requiredLength"]
    //   console.log(maxLengthValue );
    // }
    return ctrl.hasError('required') ? 'This field is required ' :
    ctrl.hasError('minlength') ? `This field must be at least ${minLengthValue} characters long ` :
    ctrl.hasError('maxlength') ?  `This field can be max ${maxLengthValue} characters long.` :
    ctrl.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';


    
  }

  errors_bak(ctrl: FormControl): string[] {
    console.log(ctrl);
    
    return ctrl.errors ? Object.keys(ctrl.errors) : [];
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
    var mycontrols = this.form.controls.passwordGroup.controls.password
   // console.log(mycontrols.errors);
    
    return mycontrols.hasError('required') ? 'This field is required ' :
           mycontrols.hasError('minlength') ? 'This field must be at least 6 characters long ' :
           mycontrols.hasError('maxlength') ?  'This field can be max 12 characters long.' :
           mycontrols.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';

    // return this.form.controls.passwordGroup.controls.password.hasError('required') ? 'This field is required' :
    //        this.form.controls.passwordGroup.controls.password.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }


 
  
}
