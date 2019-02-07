import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCountriesRoutingModule } from './user-countries-routing.module';
import { UserCountriesComponent } from './user-countries.component';
import { UsersService } from '../../states/users/users.service';
import { ApiService } from 'src/app/services/api.service';
import { SearchCountriesModule } from '../search-countries/search-countries.module';

@NgModule({
  declarations: [UserCountriesComponent],
  imports: [
    CommonModule,
    SearchCountriesModule,
    UserCountriesRoutingModule
  ],
  providers: [ApiService, UsersService]
})
export class UserCountriesModule { }
