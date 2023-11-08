import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() toggleEvent = new EventEmitter<boolean>();
  
  constructor(
    public authService: AuthService
  ){}

  logout(){
    this.authService.logout();
  }

  menuIconClick(){
    console.log('sideNavToggle');
    this.toggleEvent.emit(true);
    //this._sidenavToggle.toggleEmitter.emit(true);
  }
  clickMainRole(menuItem : string){
    console.log(menuItem);
    this.authService.setMainRole(menuItem);
  }
  clickSubRole(menuItem : string){
    console.log(menuItem);
    this.authService.setRole(menuItem);
  }
  refreshLogin(){
    
    this.authService.refreshAccessTokenAsync();
  }
}
