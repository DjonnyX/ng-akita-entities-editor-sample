import { Component, OnInit } from '@angular/core';
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
export class UserCountriesComponent implements OnInit {

  tableColumns = TABLE_COLUMNS;
  /**
   * Коллекция в сторе
   */
  collection$: Observable<Array<IUserCountry>>;
  /**
   * Состояние загрузки
   */
  loading$: Observable<boolean>;

  constructor(private _userCountriesQuery: UserCountriesQuery, private _userCountriesService: UserCountriesService) { }

  ngOnInit() {
    this.collection$ = this._userCountriesQuery.selectAll();
    this.loading$ = this._userCountriesQuery.selectLoading();
  }

  changePage(event) {
    this._userCountriesService.updatePageParams(event.index, event.size);
  }

  search(data: ISearchData) {
    this._userCountriesService.getUserCountries(data);
  }
}