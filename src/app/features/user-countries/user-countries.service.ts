import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map, catchError, combineAll } from 'rxjs/operators';
import { of } from 'rxjs';
import IUser from '../../models/user.model';
import ICountry from '../../models/country.model';
import IUserCountry from '../../models/user-country.model';
import { UserCountriesStore } from './user-countries.store';

export interface ISearchData {
  user: IUser;
  country: ICountry;
  visited: number;
  hasVisa: number;
}

/**
 * Нормализация фильтра для выборки user-countries
 */
function normalizeUcFilter(filter: ISearchData) {
  const f = {};
  if (filter.user) f['userId'] = filter.user.id;
  if (filter.country) f['countryId'] = filter.country.id;
  if (filter.hasOwnProperty('visited') && filter.visited !== -1) f['visited'] = Boolean(filter.visited);
  if (filter.hasOwnProperty('hasVisa') && filter.hasVisa !== -1) f['hasVisa'] = Boolean(filter.hasVisa);
  return { filter: [f] };
}
/**
 * Нормализация фильтра для выборки countries
 */
function normalizeCFilter(filter: ISearchData) {
  return filter.country ? { filter: [{ id: filter.country.id }] } : null;
}


@Injectable({
  providedIn: 'root'
})
export class UserCountriesService {

  constructor(private _apiService: ApiService, private _store: UserCountriesStore) { }

  getUserCountries(filterData: ISearchData) {
    const ucFilter = normalizeUcFilter(filterData);
    const cFilter = normalizeCFilter(filterData);

    const countries = this._apiService.getCountries(cFilter).pipe(
      map(data => data.items),
      catchError(err => of([] as Array<ICountry>))
    );
    const userCountries = this._apiService.getUserCountries(ucFilter).pipe(
      map(data => data.items),
      catchError(err => of([] as Array<IUserCountry>))
    );

    return of(countries, userCountries)
      .pipe(
        combineAll()
      ).subscribe(([c, uc]) => {
        const collection = normalize(c as ICountry[], uc as IUserCountry[]);
        this._store.set(collection);
      })
  }

  updatePageParams(index: number, size: number) {
    this._store.updatePageParams(index, size);
  }
}

function normalize(c: ICountry[], uc: IUserCountry[]): IUserCountry[] {
  const mapC = c.map(v => v.id);
  const mapUc = uc.map(v => v.id);
  if (!mapC) null;

  let tmpId = Number.MIN_SAFE_INTEGER;

  return mapC.map((id, i) => {
    const ucIndex = mapUc.indexOf(id);
    return (ucIndex === -1 ? {
      id: ++tmpId, // id < 0 будет означать, что запись в db не создана
      countryId: c[i].id,
      countryName: c[i].name,
      visited: false,
      hasVisa: false
    } : uc[ucIndex]) as IUserCountry;
  })
}