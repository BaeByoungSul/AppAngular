import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SapApiService {
  private _baseUrl: string = environment.baseUrl;
  constructor(
    private _http:HttpClient
  ) { }

  getSapStock( req:any, params: HttpParams):Observable<any>{

    const headers = new HttpHeaders()
      .set('Content-Type', 'text/json')
      .set('Accept', 'text/json');
      
    return this._http.post(`${this._baseUrl}/api/Sap/PP0370_JSON`,req,
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
      
    return this._http.post(`${this._baseUrl}/api/Sap/PP0370_XML`,req,
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
