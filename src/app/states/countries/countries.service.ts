import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CountriesStore } from './countries.store';
import ICountry from './countries.model';
import { CountriesQuery } from './countries.query';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private _apiService: ApiService, private _countriesStore: CountriesStore,
    private _countriesQuery: CountriesQuery) { }

  getCountries(index: number, limit: number) {
    return this._apiService.getCountries({ paging: { page: index + 1, limit: limit } })
      .subscribe(data => {
        this._countriesStore.set(data.items);
        this._countriesStore.updateTotalLength(data.total);
      })
  }

  addCountry(country: ICountry) {
    return this._apiService.createCountry(country)
      .subscribe(newCountry =>
        this.updateCountries()
      )
  }

  editCountry(country: ICountry) {
    return this._apiService.updateCountry(country)
      .subscribe(updatedCountry =>
        this.updateCountries()
      )
  }

  deleteCountry(id: number) {
    return this._apiService.deleteCountry(id)
      .subscribe(deletedCountry =>
        this.updateCountries()
      )
  }

  updatePageParams(index: number, size: number) {
    this._countriesStore.updatePageParams(index, size);
    this.updateCountries()
  }

  private updateCountries() {
    return this.getCountries(this._countriesQuery.getValue().pageIndex, this._countriesQuery.getValue().pageSize);
  }
}
