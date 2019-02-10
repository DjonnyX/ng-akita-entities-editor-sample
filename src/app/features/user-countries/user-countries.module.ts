import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCountriesRoutingModule } from './user-countries-routing.module';
import { UserCountriesComponent } from './user-countries.component';
import { ApiService } from '../../services/api.service';
import { SearchCountriesModule } from '../search-countries/search-countries.module';
import { EntityTableEditorModule } from '../entity-table-editor/entity-table-editor.module';
import { UserCountriesService } from './user-countries.service';

@NgModule({
  declarations: [UserCountriesComponent],
  imports: [
    CommonModule,
    SearchCountriesModule,
    EntityTableEditorModule,
    UserCountriesRoutingModule
  ],
  providers: [ApiService, UserCountriesService]
})
export class UserCountriesModule { }
