import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit, AfterViewInit {
  private _baseUrl: string = environment.API_BASE_URL;
  
  displayedColumns: string[] = ['Date', 'TemperatureC', 'TemperatureF','Summary'  ];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
 
  constructor(
    private http$: HttpClient
  ){}
 
  ngOnInit(): void {
    //this._http.get(`${this._baseUrl}/WeatherForecast/GetWeatherForecast3`,{})  // Roles: Admin
    //this._http.get(`${this._baseUrl}/WeatherForecast/GetWeatherForecast4`,{})  // Roles: Huizhou 
    //this._http.get(`${this._baseUrl}/WeatherForecast/GetWeatherForecast5`,{})  // No Authorize
    //this._http.get(`${this._baseUrl}/WeatherForecast/GetWeatherForecast`,{})  // Roles: Admin, User 
    //this._http.get(`${this._baseUrl}/WeatherForecast/GetWeatherForecast2`,{})  // Roles: User
    
    this.http$.get(`${this._baseUrl}/WeatherForecast/GetWeatherForecast3`,{})  // Roles: User
    .subscribe({
      next: (res:any) => {
        console.log(res);
        
        this.dataSource.data = res;
        //this._loader.hide(); 
      },
      error: err =>{
        console.log(err.message);
        //this.openSnackBar(err.message, "Error");
        //this._loader.hide(); 
      }
    }); 
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
