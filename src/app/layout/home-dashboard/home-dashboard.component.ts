import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubjectService } from '../../_service/subject.service';
import { BoardCardComponent } from '../../_shared/board-card/board-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Chart, registerables } from 'chart.js';
import { BoardTableComponent } from '../../_shared/board-table/board-table.component';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule,
    BoardCardComponent,
    BoardTableComponent
  ],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css'
})
export class HomeDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  isSideMenuOpen = true;

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  cards:{cardBackground:string, cardTitle: string}[] = [ 
    {cardBackground: "#0D6EFD", cardTitle: "Primary Color"},
    {cardBackground: "#f0ad4e", cardTitle: "Warning Color"},
    {cardBackground: "#5cb85c", cardTitle: "Success Color"},
    {cardBackground: "#d9534f", cardTitle: "Danger Color"}
  ]


  subscription: Subscription = new Subscription;
  constructor(
    private subjectService$: SubjectService,
    private cdr: ChangeDetectorRef
  ){
    Chart.register(...registerables)
    // this.subscription = this.subjectService$.isContentResizing$
    // .subscribe((event:{width: number, height:number})=>{
    //   console.log(event);
    //   this.topWidth = event.width - 50;
    //   this.topHeight = event.height - 20;
    //   this.cardHeight = (this.topHeight / 3) -10;
      
    // })

  }
  ngOnInit(): void {
    // console.log(window.innerWidth);
    // console.log(window.innerHeight);
    this.renderChart();
    this.renderChart2();
  }

  ngAfterViewInit(): void {
    // this.topWidth  = window.innerWidth - 373;
    // this.topHeight = window.innerHeight - 158;
    // this.cardHeight = (this.topHeight / 3) - 10;
    // this.cardWidth = this.topWidth;

    // this.cdr.detectChanges();
    //this.screenWidth = window.innerWidth;  
    //this.screenHeight = window.innerHeight; 
    // console.log(this.screenWidth);
    // console.log(this.screenHeight);
    
   // this.setMySize()
    this.cdr.detectChanges();
  }
  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
  renderChart(){
    //const ctx = document.getElementById('myChart');

  new Chart("home-dashboard_1", {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]},
    options: {
      maintainAspectRatio:false,
      scales: {
        y: {
          beginAtZero: true
        }
      }}
    });
  }
  renderChart2(){
    const myChart =  new Chart("home-dashboard_2", {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio:false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  // 브라우저 크기가 1675 넘을때만 Container 크기를 키운다.
  // setMySize(){
  //   if ( this.screenWidth > 1575 ) {
  //     if ( this.isSideMenuOpen){
  //       this.adjustWidth = this.screenWidth -150 ;
  //       console.log('adjust');
        
  //       console.log(this.adjustWidth);
        
  //     }else {
  //       this.adjustWidth = this.screenWidth - 70 ;
  //     } 
  //   }   
  // }
  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event) {
  //      this.screenWidth = (event.target as Window).innerWidth;
  //      this.screenHeight = (event.target as Window).innerHeight;
  //      console.log(this.screenWidth);
       
  //     //this.screenWidth = window.innerWidth;  
  //     //this.screenHeight = window.innerHeight; 

  //     //this.setMySize();
  // }
}
