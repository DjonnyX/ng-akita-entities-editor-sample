import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import ICountry from 'src/app/models/country.model';
import { CountriesQuery } from './countries.query';
import { CountriesService } from './countries.service';

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
export class CountriesComponent implements OnInit {

  localization = LOCALIZATION;
  tableColumns = TABLE_COLUMNS;

  collection$: Observable<Array<ICountry>>;
  loading$: Observable<boolean>;
  
  constructor(private _usersQuery: CountriesQuery, private _usersServices: CountriesService) { }

  ngOnInit() {
    this.collection$ = this._usersQuery.selectAll();
    this.loading$ = this._usersQuery.selectLoading();

    this.getCollection();
  }

  getCollection() {
    if (this._usersQuery.isPristine) {
      this._usersServices.getCountries();
    }
  }

  addCountry(user: ICountry) {
    this._usersServices.addCountry(user);
  }

  editCountry(user: ICountry) {
    this._usersServices.editCountry(user);
  }

  deleteCountry(id: number) {
    this._usersServices.deleteCountry(id);
  }
}
