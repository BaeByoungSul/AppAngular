import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbApiService {

  private _baseUrl: string = environment.API_BASE_URL;
  constructor(
    private http$: HttpClient
  ) { }

  getDataSet(req:any) : Observable<any>{
    return this.http$.post(`${this._baseUrl}/api/Db/GetDataSet`,req);
  }
}
