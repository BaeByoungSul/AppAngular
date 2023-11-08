import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

@Component({
  selector: 'app-huizhou-dashboard',
  templateUrl: './huizhou-dashboard.component.html',
  styleUrls: ['./huizhou-dashboard.component.css']
})
export class HuizhouDashboardComponent implements OnInit ,AfterViewInit{
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;
  
  stackedData!: ChartData;
  stackedOptions!: ChartOptions;

  public chart: any;
  public chart2: any;
   
  cards:{cardBackground:string, cardTitle: string}[] = [ 
              {cardBackground: "#0D6EFD", cardTitle: "Primary Color"},
              {cardBackground: "#f0ad4e", cardTitle: "Warning Color"},
              {cardBackground: "#5cb85c", cardTitle: "Success Color"},
              {cardBackground: "#d9534f", cardTitle: "Danger Color"}
            ]

  constructor(){
    Chart.register(...registerables);
  }
  ngAfterViewInit(): void {
    // this.createChart();
    // this.createChart_Line();
  }
  ngOnInit(): void {
    this.renderChart();
    this.renderChart2();
  }
  renderChart(){
    //const ctx = document.getElementById('myChart');

  new Chart("myChart", {
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
    const myChart =  new Chart("myChart2", {
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
  createChart11(){
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    this.chart = new Chart(this.ctx, {
      type: 'bar',

      data: this.stackedData,
      options: this.stackedOptions,
    });
 
    
    
  }

  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        responsive:true,
        aspectRatio: 2.5
        
      }

    });
  }  
  createChart_Line(){
  
    this.chart2 = new Chart("MyChart2", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        responsive:true,
        aspectRatio:2.5
      }
      
    });
  }
}
