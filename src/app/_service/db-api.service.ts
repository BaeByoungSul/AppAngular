import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbApiService {
  private _baseUrl: string = environment.baseUrl;
  constructor(
    private _http:HttpClient
  ) { }
  
  getDataSet( req:any ):Observable<any>{

    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'text/json')
    //   .set('Accept', 'text/json');
      
    return this._http.post(`${this._baseUrl}/api/Db/GetDataSet`,req);
  }
 
}
