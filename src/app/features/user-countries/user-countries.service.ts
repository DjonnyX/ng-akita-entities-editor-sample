import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map, catchError, combineAll, switchMap, filter, mergeMap } from 'rxjs/operators';
import { of, from, iif } from 'rxjs';
import IUser from '../../models/user.model';
import ICountry from '../../models/country.model';
import IUserCountry, { IEditableUserCountry } from '../../models/user-country.model';
import { UserCountriesStore } from './user-countries.store';
import { UserCountriesQuery } from './user-countries.query';

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

  constructor(private _apiService: ApiService, private _store: UserCountriesStore, private _query: UserCountriesQuery) { }

  updateEntity(entity: IEditableUserCountry) {
    this._store.update(entity.id, entity);
  }

  createUserCountry(data: IUserCountry) {
    return this._apiService.createUserCountry(data)
  }

  updateUserCountry(data: IUserCountry) {
    return this._apiService.updateUserCountry(data);
  }

  save() {
    return from(this._query.getAll()).pipe(
      filter(e => e._visited !== e.visited || e._hasVisa !== e.hasVisa),
      mergeMap(
        (uc: IEditableUserCountry) =>
          iif(() => uc.id < 0,
            // создание
            of(uc).pipe(
              map(e => createEntityFrom(e, false)),
              switchMap(e => this.createUserCountry(e)),
              map(e => {
                this._store.add({ ...uc, ...e })
                this._store.remove(uc.id);
              })
            ),
            // редактирование
            of(uc).pipe(
              map(e => createEntityFrom(e)),
              switchMap(e => this.updateUserCountry(e)),
              map(e => this._store.update(uc.id, { ...uc, e }))
            )
          )
      )
    )
  }

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

    return of(countries, userCountries, of(filterData.user.id))
      .pipe(
        combineAll()
      ).subscribe(([c, uc, userId]) => {
        const collection = normalize(c as ICountry[], uc as IUserCountry[], userId as number);
        this._store.set(collection);
        this._store.updateFetchedCollection(true);
      })
  }

  updatePageParams(index: number, size: number) {
    this._store.updatePageParams(index, size);
  }

  reset() {
    this._store.reset();
  }
}

function normalize(c: ICountry[], uc: IUserCountry[], userId: number): IEditableUserCountry[] {
  const mapUc = uc.map(v => v.countryId);

  let tmpId = Number.MIN_SAFE_INTEGER;

  return c.map((country, i) => {
    const ucIndex = mapUc.indexOf(country.id);
    if (ucIndex === -1) {
      return {
        id: ++tmpId, // id < 0 будет означать, что запись в db не создана
        userId: userId,
        countryId: c[i].id,
        _countryName: c[i].name,
        _visited: false, // Это служебное поле, которое будет изменяться контролами,
        // далее значение будет сравниваться с "visited" и если они не равны,
        // то этот элемент будет помечен для сохранения
        visited: false,
        _hasVisa: false, // Это служебное поле, которое будет изменяться контролами,
        // далее значение будет сравниваться с "hasVisa" и если они не равны,
        // то этот элемент будет помечен для сохранения
        hasVisa: false
      }
    }
    const original = uc[ucIndex] as IEditableUserCountry;
    original['_countryName'] = c[i].name;
    original['_visited'] = original.visited;
    original['_hasVisa'] = original.hasVisa;
    return original;
  })
}

function createEntityFrom(source: any, includeId: boolean = true): IUserCountry {
  const data: any = {
    userId: source.userId,
    countryId: source.countryId,
    visited: source._visited,
    hasVisa: source._hasVisa
  }
  if (includeId) data.id = source.id;
  return data;
}