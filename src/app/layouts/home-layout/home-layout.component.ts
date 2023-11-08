import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit, OnDestroy{
  open = true;

  mdq: MediaQueryList;
  mediaQueryListener:()=>void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){
    this.mdq = media.matchMedia('(max-width: 900px)');
    this.mediaQueryListener = () => {
      changeDetectorRef.detectChanges();
      console.log("Match?: ", this.mdq.matches)
    } 
    this.mdq.addEventListener('1111',this.mediaQueryListener);
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.mdq.removeEventListener('1111',this.mediaQueryListener);
    
  }

  sidenavToggle($event:boolean){
    this.open=!this.open;
  }


}
