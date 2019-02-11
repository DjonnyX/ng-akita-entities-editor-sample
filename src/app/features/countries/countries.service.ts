import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import IUser from '../../models/user.model';
import { BaseTableService } from 'src/app/states/base-table.service';
import { CountriesQuery } from './countries.query';
import { CountriesStore } from './countries.store';

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends BaseTableService<CountriesStore, CountriesQuery, IUser> {

  constructor(private _apiService: ApiService, _countriesStore: CountriesStore,
    _countriesQuery: CountriesQuery) {
      super(_countriesStore, _countriesQuery);
    }

    getEntitiesFn(...params) {
      return this._apiService.getCountries(params[0])
    }
    addEntitiesFn(...params) {
      return this._apiService.createCountry(params[0])
    }
    editEntitiesFn(...params) {
      return this._apiService.updateCountry(params[0])
    }
    deleteEntitiesFn(...params) {
      return this._apiService.deleteCountry(params[0])
    }
}