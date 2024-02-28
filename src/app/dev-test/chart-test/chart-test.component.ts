import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { CoinrankingService } from '../../_service/coinranking.service';
import { SubjectService } from '../../_service/subject.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart-test',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './chart-test.component.html',
  styleUrl: './chart-test.component.css'
})
export class ChartTestComponent implements OnInit, OnDestroy {
  subscribe: Subscription = new Subscription;
  
  loading$ = this.subjectService$.isIntervalRefreshing$;
  chart: any = [];
  
  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data:[]=[],
        borderColor: '#3e95cd',
        fill: false,
        label: 'Coin Price',
        backgroundColor: 'rgba(93, 175, 89, 0.1)',
        borderWidth: 3
      }
    ]
  };
  chartOptions: ChartOptions = {
    responsive:true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };
  constructor(
    private coinService$: CoinrankingService,
    private subjectService$: SubjectService
  ){
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.createChart();
    //this.subjectService$.setIntervalRefresh(true);
    this.subscribe= this.coinService$.continousDataStream(9000)
    .subscribe({
      next: (res:any) => {
        //this.snackBar$.info("재조회...", 1000)
        console.log(res);
        this.chart.options = this.chartOptions;
        this.chart.data.labels = res.data.coins.map((coins: any) => coins.name);
        this.chart.data.datasets[0].data = res.data.coins.map((coins: any) => coins.price) ;

        this.chart.update();
        this.subjectService$.setIntervalRefresh(false);
      },
      error: err =>{
        console.log(err.message);
        this.subjectService$.setIntervalRefresh(false);

      },
      complete: () => {
        //this.subjectService$.setIntervalRefresh(false);
      }
    }); 
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  createChart(){
    
    this.chart =  new Chart('chart-test01', {
      // this is the string the constructor was registered at, ie Chart.controllers.MyType
      type: 'line',
      data: this.chartData,
      options: this.chartOptions
    });
  }
}
