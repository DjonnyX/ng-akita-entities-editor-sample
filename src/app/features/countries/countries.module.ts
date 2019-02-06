import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CountriesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CountriesRoutingModule
  ]
})
export class CountriesModule { }
