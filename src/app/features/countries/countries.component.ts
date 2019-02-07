import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import ICountry from 'src/app/models/country.model';
import { CountriesQuery } from './countries.query';
import { CountriesService } from './countries.service';
import { EntityTableEditorComponent } from '../entity-table-editor/entity-table-editor.component';

const TABLE_COLUMNS = [
  { id: 'id', name: 'id' },
  { id: 'name', name: 'Имя' },
  { id: 'service' }
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

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, OnDestroy {

  @ViewChild('table') private _table: EntityTableEditorComponent;

  localization = LOCALIZATION;
  tableColumns = TABLE_COLUMNS;

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
  
  private _subscrTotalLength: Subscription;

  constructor(private _countriesQuery: CountriesQuery, private _countriesServices: CountriesService) { }

  ngOnInit() {
    this.collection$ = this._countriesQuery.selectAll();
    this.loading$ = this._countriesQuery.selectLoading();
    this.totalLength$ = this._countriesQuery.total$;

    this._subscrTotalLength = this.totalLength$.subscribe(total => {
      this._table.totalItems = total;
    });
  }

  changePage(event) {
    this._countriesServices.updatePageParams(event.index, event.size);
  }

  addCountry(country: ICountry) {
    this._countriesServices.addCountry(country);
  }

  editCountry(country: ICountry) {
    this._countriesServices.editCountry(country);
  }

  deleteCountry(id: number) {
    this._countriesServices.deleteCountry(id);
  }

  ngOnDestroy() {
    this._subscrTotalLength.unsubscribe();
  }
}
