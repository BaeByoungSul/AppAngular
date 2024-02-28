import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, mergeMap } from 'rxjs';
import { SubjectService } from './subject.service';

@Injectable({
  providedIn: 'root'
})
export class CoinrankingService {
  private baseUrl = 'https://api.coinranking.com/v2/coins';
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'X-My-Custom-Header': `${apiKey}`,
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(
    private http$: HttpClient,
    private loader$: SubjectService
  ) { }

  cryptoData(){
    const url = `${this.proxyUrl}${this.baseUrl}`;
    
    return this.http$
      .get(this.baseUrl, this.httpOptions)
      // .toPromise()
      // .then((data) => {
      //   return data;
      // });
  }
  continousDataStream(_interval=5000): Observable<any> {
    return interval(_interval).pipe(mergeMap(_ => {
        this.loader$.setIntervalRefresh(true);
        return this.http$.get(this.baseUrl, this.httpOptions)
    }));
  }
}
