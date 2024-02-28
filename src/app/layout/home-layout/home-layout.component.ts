import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LayoutModule } from '../layout.module';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SubjectService } from '../../_service/subject.service';


@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LayoutModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent implements AfterViewInit{
  showSideMenu = true;
  //sideMenuMode :MatDrawerMode = "side";
  sideNavMode: 'side' | 'over' = 'side';
  //@ViewChild('child1',{static:false}) elementView1!: ElementRef ;
  @ViewChild('content',{static:false}) elementView2!: MatSidenavContent ;
  //@ViewChild('content',{static:false}) elementView3!: ElementRef ;
  contentHeight: number = 0;
  contentWidth: number = 0;

  constructor(
    private subjectService$: SubjectService,
    private cdr: ChangeDetectorRef
  ){}
  ngOnInit(){

  }
  ngAfterViewInit() {
    
    // this.contentHeight = this.elementView2.getElementRef().nativeElement.offsetHeight;
    // this.contentWidth = this.elementView2.getElementRef().nativeElement.offsetWidth;
    
    // this.subjectService$.sendMainContentResize({width: this.contentWidth,height: this.contentHeight})
    // this.cdr.detectChanges();
  }

  sidenavToggle($event:boolean){
    this.showSideMenu=!this.showSideMenu;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
      // this.screenWidth = (event.target as Window).innerWidth;
      // this.screenHeight = (event.target as Window).innerHeight;
    console.log(this.elementView2.getElementRef().nativeElement.offsetHeight);
    
      this.contentHeight = this.elementView2.getElementRef().nativeElement.offsetHeight;
      this.contentWidth = this.elementView2.getElementRef().nativeElement.offsetWidth;
     
      this.subjectService$.sendResizeEvent({width: this.contentWidth,height: this.contentHeight})
      
  }

}
