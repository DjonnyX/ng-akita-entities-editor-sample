import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { EntityTableEditorModule } from '../entity-table-editor/entity-table-editor.module';
import { ApiService } from 'src/app/services/api.service';

@NgModule({
  declarations: [CountriesComponent],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    EntityTableEditorModule
  ],
  providers: [ApiService]
})
export class CountriesModule { }
