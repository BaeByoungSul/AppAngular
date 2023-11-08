import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/_service/auth.service';
import { LoadingService } from 'src/app/_service/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, AfterViewInit{
  private _baseUrl: string = environment.baseUrl;
  
  displayedColumns: string[] = ['Date', 'TemperatureC', 'TemperatureF','Summary'  ];
  // //displayedColumns: string[] = ['yymm', 'plant', 'process'  ];
  //dataSource!: any[];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center'; //'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(
    private _loader: LoadingService,
    private _snackBar : MatSnackBar,
    private _http: HttpClient,
    private _auth: AuthService
  ){}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
     //const accessToken = this._auth.getToken();
    // const refreshToken = JSON.parse( this._auth.getRefreshToken() )    ;

//     //console.log( new Date());
//     const _now = new Date( );
//     console.log(refreshToken.Expires);
//     if(_now < refreshToken.Expires){
//       console.log('refresh Token Expired');
      
//     }

// console.log(accessToken);
// console.log(refreshToken);

    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // // withCredentials: true
    // };
    // this._http.post('https://172.20.105.36:12000/api/Auth/RefreshToken',
    //       { accessToken: accessToken, refreshToken: refreshToken.Token }, httpOptions)
    //       .subscribe({
    //         next: res => {
    //           console.log(res);
    //         },
    //         error: err =>{
    //           console.log(err);
    //           this.openSnackBar(err.error.message, "Error");
    //         }
    //     });

    // console.log('1111112');
    
    //this._auth.refreshAccessToken();
    // this._auth.testAsyncFunction()
    // .then(res => {
    //   console.log(res);
    // });
    await this._auth.refreshAccessTokenAsync();

    //this._http.get(`${this._baseUrl}/WeatherForecast/GetWeatherForecast`,{})  // Roles: Admin, User 
    this._http.get(`${this._baseUrl}/WeatherForecast/GetWeatherForecast2`,{})  // Roles: User
    //this._http.get(`${this._baseUrl}/WeatherForecast/GetWeatherForecast3`,{})  // Roles: Admin
    //this._http.get(`${this._baseUrl}/WeatherForecast/GetWeatherForecast4`,{})  // Roles: Huizhou 
    //this._http.get(`${this._baseUrl}/WeatherForecast/GetWeatherForecast5`,{})  // No Authorize
    .subscribe({
      next: (res:any) => {
        console.log(res);
        
        this.dataSource.data = res;
        this._loader.hide(); 
      },
      error: err =>{
        console.log(err.message);
        this.openSnackBar(err.message, "Error");
        this._loader.hide(); 
      }
  });  
   
  // this._http.get('https://172.20.105.36:12000/WeatherForecast',{})
  //   .pipe( map((res: any)=> {
  //         console.log(res);
  //         return res;
  //         // var result :  any[] = []
  //         // Object.values(res.Table).forEach((tablerow:any) => {
  //         //   //names.push(building.name);
  //         //   console.log(tablerow);
          
  //         //   result.push({
  //         //     date: tablerow.YYMM, 
  //         //     plant: tablerow.PLANT, 
  //         //     process: tablerow.PROCESS,
  //         //     sprocess: tablerow.SPROCESS,
  //         //     citem: tablerow.CITEM,
  //         //     ctype: tablerow.CTYPE,
  //         //     begin_qty: tablerow.BEGIN_QTY,
  //         //     ipgo_qty: tablerow.IPGO_QTY,
  //         //     chgo_qty: tablerow.CHGO_QTY,
  //         //     end_qty: tablerow.END_QTY
  //         //   })
  //         // });
  //         // return result;
          
  //       }
  //   )).subscribe(
  //      data => { 
  //       //console.log(data);
  //       this.dataSource.data = data;
  //       //this.dataSource = new MatTableDataSource(data);
  //     }

  //    );
  }
  openSnackBar(message: string, action: string) {
    
    this._snackBar.open(message, action,{
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }
}
