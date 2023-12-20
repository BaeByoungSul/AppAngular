import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { SapStockComponent } from './sap-stock/sap-stock.component';
import { DbView01Component } from './db-view01/db-view01.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { WeatherComponent } from './weather/weather.component';
import { ChartTestComponent } from './chart-test/chart-test.component';
import { ClipboardTestComponent } from './clipboard-test/clipboard-test.component';

@NgModule({
  declarations: [
    SapStockComponent,
    DbView01Component,
    GoogleMapComponent,
    WeatherComponent,
    ChartTestComponent,
    ClipboardTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    ClipboardModule,
    FlexLayoutModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  exports: []
})
export class MytestModule { 
  
}
