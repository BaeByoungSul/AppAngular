import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

import { Loader } from '@googlemaps/js-api-loader';
import { CommonModule } from '@angular/common';
// const loader = new Loader({
//   apiKey: environment.googleMapKey,
//   version: "weekly",
//   libraries: ["places"]
// });

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.css'
})
export class GoogleMapComponent implements OnInit {
  apiKey: string = environment.googleMapKey;
  
  loader = new Loader({
    apiKey: this.apiKey,
    version: "weekly",
    libraries: ["places"]
  });
  //center = {lat: 36.119485, lng: 128.5734};
  mapOptions = {
    center: {lat: 36.119485, lng: 128.5734},
    zoom: 8
  };

  
  constructor(){  }

  ngOnInit(): void {
    this.loader
    .importLibrary('maps')
    .then((google)=>{
      console.log('loaded');
      new google.Map(document.getElementById('map')!, this.mapOptions);
    })
    .catch((e) => {
      // do something
    });
    ;
  }
}
