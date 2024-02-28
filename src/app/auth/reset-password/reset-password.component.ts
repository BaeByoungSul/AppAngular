import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ResetPassword } from '../../_model/reset-password';
import { AuthService } from '../../_service/auth.service';
import { SnackbarService } from '../../_service/snackbar.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
  loading$ = new BehaviorSubject<boolean>(false);
  isSubmitOk = true;
  private token: string = '';
  private email: string = '';

  form = new FormGroup({
    password: new FormControl("", [
      Validators.required, Validators.minLength(6), Validators.maxLength(12),
      //Validators.pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})"))
    ]),
    confirmPassword: new FormControl("", [Validators.required])
    },{validators: this.matchValidator('password', 'confirmPassword') 
  })
  
  constructor(
    private route: ActivatedRoute,
    private authService$: AuthService,
    private snackBar$ : SnackbarService
  ){}
  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
  }
  onSubmit(){
    if (this.form.invalid) {
      this.snackBar$.error("form is invalid!");
      return;
    }

    this.isSubmitOk = false;
    this.loading$.next(true);

    const resetPass: ResetPassword = {
      password: this.form.controls.password.value!,
      confirmPassword: this.form.controls.confirmPassword.value!,
      token: this.token,
      email: this.email
    }
    this.authService$.resetPassword(resetPass)
      .subscribe({
        next: (_) => this.isSubmitOk = true,
        error: (err) => {
          //this.errorMessage = err.message;
          this.snackBar$.error(err.error);
          this.loading$.next(false)
        },
        complete: () => {
          this.loading$.next(false)
        }  
      })
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
}
