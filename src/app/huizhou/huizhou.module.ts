import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

import { HuizhouRoutingModule } from './huizhou-routing.module';
import { HuizhouDashboardComponent } from './huizhou-dashboard/huizhou-dashboard.component';
import { CardViewComponent } from './card-view/card-view.component';
import { WeatherComponent } from './weather/weather.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { TestDashboardComponent } from './test-dashboard/test-dashboard.component';


@NgModule({
  declarations: [
    HuizhouDashboardComponent,
    CardViewComponent,
    WeatherComponent,
    TableFilterComponent,
    TestDashboardComponent
  ],
  imports: [
    CommonModule,
    HuizhouRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule, 
    MatSortModule,
    MatDividerModule
    
  ],
  exports: [
    HuizhouDashboardComponent
  ]
})
export class HuizhouModule { }
