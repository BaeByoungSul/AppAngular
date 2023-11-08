import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, mergeMap } from 'rxjs';

//const apiKey = 'coinrankingc032026f93e3b94c047c89523ca837327c4dac81e1070686';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'X-My-Custom-Header': `${apiKey}`,
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CoinrankingService {
  private baseUrl = 'https://api.coinranking.com/v2/coins';
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
  constructor(
    private _http: HttpClient
  ) { }
  
  cryptoData(){
    const url = `${this.proxyUrl}${this.baseUrl}`;
    
    return this._http
      .get(this.baseUrl, httpOptions)
      // .toPromise()
      // .then((data) => {
      //   return data;
      // });
  }
  // getDataSetInterval( req:any ):Observable<any>{

  //   // const headers = new HttpHeaders()
  //   //   .set('Content-Type', 'text/json')
  //   //   .set('Accept', 'text/json');
    

    
  //   return this._http
  //     .post(`${this._baseUrl}/api/Db/GetDataSet`,req)
  //     ;
  // }
  continousDataStream(_interval=5000): Observable<any> {
    return interval(_interval).pipe(mergeMap(_ => {
        return this._http.get(this.baseUrl, httpOptions)
    }));
  }
}
