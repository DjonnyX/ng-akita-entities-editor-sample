import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCountriesRoutingModule } from './user-countries-routing.module';
import { UserCountriesComponent } from './user-countries.component';

@NgModule({
  declarations: [UserCountriesComponent],
  imports: [
    CommonModule,
    UserCountriesRoutingModule
  ]
})
export class UserCountriesModule { }
