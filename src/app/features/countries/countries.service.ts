import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CountriesStore } from './countries.store';
import { CountriesQuery } from './countries.query';
import ICountry from 'src/app/models/country.model';

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
      .subscribe(addedCountry => {
        this._countriesStore.updateTotalLength(this._countriesQuery.getValue().total + 1);
        this._countriesStore.add(addedCountry);
      })
  }

  editCountry(country: ICountry) {
    return this._apiService.updateCountry(country)
      .subscribe(updatedCountry =>
        this._countriesStore.update(country.id, updatedCountry)
      )
  }

  deleteCountry(id: number) {
    return this._apiService.deleteCountry(id)
      .subscribe(_ => {
        this._countriesStore.updateTotalLength(this._countriesQuery.getValue().total - 1);
        this._countriesStore.remove(id);
      })
  }

  updatePageParams(index: number, size: number) {
    this._countriesStore.updatePageParams(index, size);
    this.updateCountries();
  }

  reset() {
    this._countriesStore.reset();
  }

  private updateCountries() {
    return this.getCountries(this._countriesQuery.getValue().pageIndex, this._countriesQuery.getValue().pageSize);
  }
}
