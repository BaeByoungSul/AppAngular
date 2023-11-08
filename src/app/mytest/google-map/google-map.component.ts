import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit{
  apiKey: string = 'AIzaSyBb5jBpNLfyeBqj_tjhB1r4sexvqUVZx6s'
  apiLoaded: Observable<boolean>;

  options: google.maps.MapOptions = {
    center: {lat: 36.119485, lng: 128.5734},
    zoom: 8
  };
  
  center: google.maps.LatLngLiteral = {lat: 36.119485, lng: 128.5734};
  zoom = 8;

  //private _http: HttpClient;

  constructor(
    private _http : HttpClient
    //private handler: HttpBackend
  ){ 
   // this._http = new HttpClient(handler)
    
    this.apiLoaded = this._http.jsonp(`https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`, 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)
      ),
    );
  }

  ngOnInit(): void {

  }

  
}
