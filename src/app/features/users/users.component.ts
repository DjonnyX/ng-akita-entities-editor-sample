import { Component, OnInit } from '@angular/core';
import { UsersQuery } from '../../states/users/users.query';
import { UsersService } from '../../states/users/users.service';
import { Observable } from 'rxjs';
import IUser from '../../states/users/users.model';

const TABLE_COLUMNS = [
  { id: 'id', name: 'id' },
  { id: 'name', name: 'Имя' },
  { id: 'service' }
];

const LOCALIZATION = {
  buttonAdd: "Добавить пользователя",
  buttonEdit: "редактировать",
  buttonDelete: "удалить",
  delDialog: {
    buttonApply: "Да",
    buttonCancel: "Нет",
    title: "Внимание",
    message: "Вы уверены, что хотите удалить пользователя \"$1\"?"
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
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  localization = LOCALIZATION;
  tableColumns = TABLE_COLUMNS;

  /**
   * Общее количесво элементов в db
   */
  totalLength$: Observable<number>;
  /**
   * Коллекция в сторе
   */
  collection$: Observable<Array<IUser>>;
  /**
   * Состояние загрузки
   */
  loading$: Observable<boolean>;

  constructor(private _usersQuery: UsersQuery, private _usersServices: UsersService) { }

  ngOnInit() {
    this.collection$ = this._usersQuery.selectAll();
    this.loading$ = this._usersQuery.selectLoading();
    this.totalLength$ = this._usersQuery.total$;
  }

  changePage(event) {
    this._usersServices.updatePageParams(event.index, event.size);
  }

  addUser(user: IUser) {
    this._usersServices.addUser(user);
  }

  editUser(user: IUser) {
    this._usersServices.editUser(user);
  }

  deleteUser(id: number) {
    this._usersServices.deleteUser(id);
  }
}
