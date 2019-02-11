import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import IUserCountry, { IEditableUserCountry } from '../../models/user-country.model';
import { UserCountriesQuery } from './user-countries.query';
import { UserCountriesService, ISearchData } from './user-countries.service';
import { ColumnTypes, IColumnData } from './user-countries-table/user-countries-table.component';

const BUTTON_SAVE_LABEL = 'Применить и сохранить'

const TABLE_COLUMNS: Array<IColumnData> = [
  { id: '_countryName', name: 'Страна', type: ColumnTypes.TEXT },
  { id: '_visited', name: 'Посещенность', type: ColumnTypes.SWITCH },
  { id: '_hasVisa', name: 'Наличие визы', type: ColumnTypes.SWITCH }
];

const PAGE_SIZE_OPTIONS = [5, 10, 20];

@Component({
  selector: 'app-user-countries',
  templateUrl: './user-countries.component.html',
  styleUrls: ['./user-countries.component.scss']
})
export class UserCountriesComponent implements OnInit, OnDestroy {

  tableColumns = TABLE_COLUMNS;

  pageSizeOptions = PAGE_SIZE_OPTIONS;

  buttonSaveLabel = BUTTON_SAVE_LABEL;

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

  save() {
    this._userCountriesService.save().subscribe(v => {
      console.log('Изменения сохранены');
    })
  }

  changeEntity(entity: IEditableUserCountry) {
    this._userCountriesService.updateEntity(entity);
  }

  ngOnDestroy() {
    this._userCountriesService.reset();
  }
}