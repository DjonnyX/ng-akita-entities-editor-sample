import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatOptionModule, MatSelectModule, MatAutocompleteModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchCountriesService } from './search-countries.service';
import { ApiService } from '../../services/api.service';
import { SearchCountriesComponent } from './search-countries.component';

@NgModule({
  declarations: [SearchCountriesComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, SearchCountriesService],
  exports: [SearchCountriesComponent]
})
export class SearchCountriesModule { }
