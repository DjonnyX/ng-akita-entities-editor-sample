import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import ICountry from '../../models/country.model';
import { CountriesQuery } from './countries.query';
import { CountriesService } from './countries.service';
import { IColumnData } from '../entity-table-editor/entity-table-editor.component';

const TABLE_COLUMNS: Array<IColumnData> = [
  // { id: 'id', name: 'id' },
  { id: 'name', name: 'Имя' },
  { id: 'service', isService: true }
];

const LOCALIZATION = {
  buttonAdd: "Добавить страну",
  buttonEdit: "редактировать",
  buttonDelete: "удалить",
  delDialog: {
    buttonApply: "Да",
    buttonCancel: "Нет",
    title: "Внимание",
    message: "Вы уверены, что хотите удалить страну \"$1\"?"
  },
  editDialog: {
    buttonApply: "Изменить",
    buttonCancel: "Отменить"
  },
  addDialog: {
    buttonApply: "Создать",
    buttonCancel: "Отменить"
  }
};

const PAGE_SIZE_OPTIONS = [5, 10, 20];

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountriesComponent implements OnInit, OnDestroy {

  localization = LOCALIZATION;

  tableColumns = TABLE_COLUMNS;
  
  pageSizeOptions = PAGE_SIZE_OPTIONS;

  /**
   * Общее количесво элементов в db
   */
  totalLength$: Observable<number>;
  /**
   * Коллекция в сторе
   */
  collection$: Observable<Array<ICountry>>;
  /**
   * Состояние загрузки
   */
  loading$: Observable<boolean>;

  constructor(private _countriesQuery: CountriesQuery, private _countriesServices: CountriesService) { }

  ngOnInit() {
    this.collection$ = this._countriesQuery.selectAll();
    this.loading$ = this._countriesQuery.selectLoading();
    this.totalLength$ = this._countriesQuery.total$;
  }

  changePage(event) {
    this._countriesServices.updatePageParams(event.index, event.size);
  }

  addCountry(country: ICountry) {
    this._countriesServices.addEntity(country);
  }

  editCountry(country: ICountry) {
    this._countriesServices.editEntity(country);
  }

  deleteCountry(id: number) {
    this._countriesServices.deleteEntity(id);
  }

  ngOnDestroy() {
    this._countriesServices.reset();
  }
}
