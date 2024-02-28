import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SapApiService {
  private _baseUrl: string = environment.API_BASE_URL;
  constructor(
    private http$: HttpClient
  ) { }

  getSapStock( req:any, params: HttpParams):Observable<any>{

    const headers = new HttpHeaders()
      .set('Content-Type', 'text/json')
      .set('Accept', 'text/json');
      
    return this.http$.post(`${this._baseUrl}/api/Sap/PP0370_JSON`,req,
        {
          headers:headers, 
          params: params, 
          responseType:'json'
        }).pipe(
          map ((res)=>{
            return res;
          })
        );
  }
  getSapStock2( req:any, params: HttpParams):Observable<any>{

    const headers = new HttpHeaders()
      .set('Content-Type', 'text/json')
      .set('Accept', 'text/xml');
      
    return this.http$.post(`${this._baseUrl}/api/Sap/PP0370_XML`,req,
        {
          headers:headers, 
          params: params, 
          responseType:'text'
        }).pipe(
          map ((res)=>{
            return res;
          })
        );
  }
}
