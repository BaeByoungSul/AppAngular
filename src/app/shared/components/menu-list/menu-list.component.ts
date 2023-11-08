import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  panelOpenState: boolean = false;
  panelOpenState2: boolean = false;
  //@ViewChild('nav') sidenav: any;
  

  constructor(
    public authService: AuthService,
    private _router : Router
  ){
    // _router.events.subscribe((val)=>{

    //   if(val instanceof NavigationStart){
    //     this.panelOpenState2 = this.panelOpenState;
    //     console.log('22222 ' + this.panelOpenState2);
        
    //   }
    //   if( val instanceof NavigationEnd){
    //     console.log('1111 ' + this.panelOpenState2);
    //     this.panelOpenState = this.panelOpenState2;
    //   }
    // })
  
  }
  ngOnInit(){
    console.log('jancsi ' + Math.random());
  }
}
