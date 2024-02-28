import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../_service/auth.service';
import { SnackbarService } from '../../_service/snackbar.service';

@Component({
  selector: 'app-forgot-password',
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
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  document$ = inject(DOCUMENT) // 
  resetPasswordUrl = '';
  loading$ = new BehaviorSubject<boolean>(false);
  isSubmitOk = false;

  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])
  })
  constructor(
    private authService$: AuthService,
    private snackBar$ : SnackbarService,
  ){
    this.resetPasswordUrl = this.document$.location.origin +'/home/auth/reset-password'
  }
  onSubmit(){
    if (this.form.invalid) {
      this.snackBar$.error("form is invalid!");
      return;
    }

    this.isSubmitOk = false;
    this.loading$.next(true);
    var email = this.form.controls.email.value!;
    

    this.authService$.forgotPassword(email, this.resetPasswordUrl)
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
}
