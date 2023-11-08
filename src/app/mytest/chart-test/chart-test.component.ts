import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { CoinrankingService } from 'src/app/_service/coinranking.service';
import { LoadingService } from 'src/app/_service/loading.service';

@Component({
  selector: 'app-chart-test',
  templateUrl: './chart-test.component.html',
  styleUrls: ['./chart-test.component.css']
})
export class ChartTestComponent implements OnInit, OnDestroy {
  loading$ = this._loader.loading$;
  subscribe: Subscription = new Subscription;

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

  result: any;
  coinPrice: any;
  coinName: any;
  chart: any = [];
  
  
  constructor(
    private _coinService: CoinrankingService,
    private _loader: LoadingService
  ){
    Chart.register(...registerables);
  }
  
  ngOnDestroy(): void {
    console.log("onDestroy");
    
    this.subscribe.unsubscribe();
  }
  ngOnInit(): void {

    this.createChart();
    this.subscribe = this._coinService.continousDataStream(10000)
      .subscribe((res: any) => {
        console.log(res);
        this.result = res;
        this.coinPrice = this.result.data.coins.map((coins: any) => coins.price);
        this.coinName = this.result.data.coins.map((coins: any) => coins.name);

        this.chart.data.labels = [];
        //this.chart.data.datasets = [{ data: [] }];
        this.chart.data = this.chartData;
        this.chart.options = this.chartOptions;

        this.chart.data.labels = this.coinName;
        //this.chart.data.datasets = [{ data: this.coinPrice }];
        this.chart.data.datasets[0].data = this.coinPrice ;

        this.chart.update();
        //this.addData(this.chart, this.coinName,this.coinPrice);
       
      })

      // setTimeout(() => {
      //   console.log('unsubscribe');
        
      //   subscribe.unsubscribe()
      // }, 30000);
  }
  createChart(){
    
    this.chart =  new Chart('myChart', {
      // this is the string the constructor was registered at, ie Chart.controllers.MyType
      type: 'line',
      data: this.chartData,
      options: this.chartOptions
    });


    // this.chart = new Chart('myChart', {
    //   type:'line',
    //   data:{
    //     labels:[]=[],
    //     datasets:[{
    //       data:[]=[],
    //       borderColor: '#3e95cd',
    //       fill: false,
    //       label: 'Coin Price',
    //       backgroundColor: 'rgba(93, 175, 89, 0.1)',
    //       borderWidth: 3,
    //     }
    //     ]
    //   },
    //   options: {
    //     responsive:true,
    //     maintainAspectRatio: false,
    //     scales: {
    //       y: {
    //         beginAtZero: true,

    //       }
    //     }
        
    //   }
    // })

  }
  // addData(chart:any, label:any, newData:any) {
  //   chart.data.labels.push(label);
   
  //   chart.data.datasets.forEach((dataset:any) => {
  //       dataset.data.push(newData);
  //   });
  //   chart.update();
  // }
  // removeData(chart:any) {
  //   chart.data.labels.pop();
  //   chart.data.datasets.forEach((dataset:any) => {
  //       dataset.data.pop();
  //   });
  //   chart.update();
  // }


  ngOnInit2(): void {
    this._coinService.cryptoData()
      .subscribe((res: any) => {
        console.log(res);
        this.result = res;
        this.coinPrice = this.result.data.coins.map((coins: any) => coins.price);
        this.coinName = this.result.data.coins.map((coins: any) => coins.name);

        this.chart = new Chart('canvas', {
          type:'line',
          data: {
            labels: this.coinName,
            datasets:[
              {
                data:this.coinPrice,
                borderColor: '#3e95cd',
                fill: false,
                label: 'Coin Price',
                backgroundColor: 'rgba(93, 175, 89, 0.1)',
                borderWidth: 3,
              }]},
            options: {
              responsive:true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,

                }
              }
              
            }
        })
      })
  }


}
