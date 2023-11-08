import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions,registerables } from 'chart.js';

@Component({
  selector: 'app-test-dashboard',
  templateUrl: './test-dashboard.component.html',
  styleUrls: ['./test-dashboard.component.css']
})
export class TestDashboardComponent implements OnInit {
  
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
  ngOnInit(): void {
    this.renderChart();
    this.renderChart2();
  }
  renderChart(){
    const myChart = document.getElementById('myChart');

    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio:false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
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
}
