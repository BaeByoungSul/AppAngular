import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-verify-user',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './verify-user.component.html',
  styleUrl: './verify-user.component.css'
})
export class VerifyUserComponent implements OnInit{

  showSuccess: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private authService$: AuthService,
    
  ){}
  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];
    this.authService$.verifyEmail(email, token)
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
}
