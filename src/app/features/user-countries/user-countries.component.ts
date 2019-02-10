import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import IUserCountry from '../../models/user-country.model';
import { UserCountriesQuery } from './user-countries.query';
import { UserCountriesService, ISearchData } from './user-countries.service';

const TABLE_COLUMNS = [
  { id: 'countryName', name: 'Страна' },
  { id: 'visited', name: 'Посещенность' },
  { id: 'hasVisa', name: 'Наличие визы' }
];

@Component({
  selector: 'app-user-countries',
  templateUrl: './user-countries.component.html',
  styleUrls: ['./user-countries.component.scss']
})
export class UserCountriesComponent implements OnInit, OnDestroy {

  tableColumns = TABLE_COLUMNS;
  /**
   * Коллекция в сторе
   */
  collection$: Observable<Array<IUserCountry>>;
  /**
   * Состояние загрузки
   */
  loading$: Observable<boolean>;

  fetchedCollection$: Observable<boolean>;

  constructor(private _userCountriesQuery: UserCountriesQuery, private _userCountriesService: UserCountriesService) { }

  ngOnInit() {
    this.fetchedCollection$ = this._userCountriesQuery.fetchedCollection$;
    this.collection$ = this._userCountriesQuery.selectAll();
    this.loading$ = this._userCountriesQuery.selectLoading();
  }

  search(data: ISearchData) {
    this._userCountriesService.getUserCountries(data);
  }

  ngOnDestroy() {
    this._userCountriesService.reset();
  }
}