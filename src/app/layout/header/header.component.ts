import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SubjectService } from '../../_service/subject.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../_service/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { SnackbarService } from '../../_service/snackbar.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  loading$ = this.subjectService$.isLoginRefreshing$;
  @Output() toggleEvent = new EventEmitter<boolean>();
  isOpened = true;
  constructor(
    public authService$: AuthService,
    private subjectService$: SubjectService,
    private snackBar$ : SnackbarService,
  ){
    console.log(this.authService$.getExpiry());
  }
  ngAfterViewInit() {
  }


  refreshLogin(){
    //this.authService$.refreshAccessTokenAsync();
    this.authService$.refreshAccessToken();
  }
  menuIconClick(){
    console.log('sideNavToggle');
    this.toggleEvent.emit(true);
    //this._sidenavToggle.toggleEmitter.emit(true);
    this.isOpened = !this.isOpened;
    this.subjectService$.sendIconMenuClick(this.isOpened);
  }
  clickMainRole(menuItem : string){
    console.log(menuItem);
    if(menuItem == 'Common' || menuItem == 'Huizhou'){
      this.authService$.setMainRole(menuItem);  
    
    }else {
      this.authService$.setMainRole('Common');
      this.snackBar$.info('해당 기능이 개발되지 않았습니다.')
      //mainRole = 'Common'
      //this.router$.navigate(['/']);
      //this.snackBar$.info('해당 기능이 개발되지 않았습니다.')
    }
    //this.authService$.setMainRole(menuItem);
  }
  clickSubRole(menuItem : string){
    console.log(menuItem);
    this.authService$.setRole(menuItem);
  }
}
