import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CountriesStore } from './countries.store';
import ICountry from 'src/app/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private _apiService: ApiService, private _countriesStore: CountriesStore) { }

  getCountries() {
    this._apiService.getCountries()
    .subscribe(collection => {
      this._countriesStore.set(collection);
    })
  }

  addCountry(country: ICountry) {
    this._apiService.createCountry(country)
      .subscribe(newUser => {
        this.getCountries();
      })
  }

  editCountry(country: ICountry) {
    this._apiService.updateCountry(country)
      .subscribe(updatedCountry => {
        this.getCountries();
      })
  }

  deleteCountry(id: number) {
    this._apiService.deleteCountry(id)
      .subscribe(deletedCountry => {
        this.getCountries();
      })
  }
}
