import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCountriesRoutingModule } from './user-countries-routing.module';
import { UserCountriesComponent } from './user-countries.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [UserCountriesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    UserCountriesRoutingModule
  ]
})
export class UserCountriesModule { }
