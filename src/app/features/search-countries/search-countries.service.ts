import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchCountriesService {

  constructor(private _apiService: ApiService) { }

  getUsersByEntry(str: string, size: number) {
    return this._apiService.getUsers({ search: str, slice: { start: 0, end: size } })
    .pipe(
      map(data => data && data.items)
    )
  }

  getCountriesByEntry(str: string, size: number) {
    return this._apiService.getCountries({ search: str, slice: { start: 0, end: size } })
    .pipe(
      map(data => data && data.items)
    )
  }

  hasUser(id: number) {
    return this._apiService.getUsers({ filter: [{id: id}] })
    .pipe(
      map(data => data.items && data.items.length > 0)
    )
  }

  hasCountry(id: number) {
    return this._apiService.getCountries({ filter: [{id: id}] })
    .pipe(
      map(data => data.items && data.items.length > 0)
    )
  }
}
