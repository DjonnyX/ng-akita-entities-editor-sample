import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCountriesRoutingModule } from './user-countries-routing.module';
import { UserCountriesComponent } from './user-countries.component';
import { ApiService } from '../../services/api.service';
import { SearchCountriesModule } from '../search-countries/search-countries.module';
import { UserCountriesService } from './user-countries.service';
import { MatTableModule, MatSlideToggleModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatSortModule } from '@angular/material';
import { UserCountriesTableComponent } from './user-countries-table/user-countries-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserCountriesComponent,
    UserCountriesTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SearchCountriesModule,
    UserCountriesRoutingModule,
    MatTableModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule
  ],
  providers: [ApiService, UserCountriesService],
  exports: [UserCountriesTableComponent]
})
export class UserCountriesModule { }
