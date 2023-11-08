import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';

enum EmailStatus {
  Verifying,
  Failed
}

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {
  showSuccess: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private _snackBar : MatSnackBar
  ){  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];
    
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });
    
    this.authService.verifyEmail(email, token)
    //.pipe(first())
    .subscribe({
        next: (_) => this.showSuccess = true,
        error: (err) => {
            console.log(err);
            this.showError = true;
            this.errorMessage = err.error
        }
    });
  }
  openSnackBar(message: string, action: string) {
    
    this._snackBar.open(message, action,{
      duration: 60000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      
    });
  }
}
