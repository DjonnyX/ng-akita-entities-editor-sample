import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UsersQuery } from './users.query';
import { UsersService } from './users.service';
import { Observable, Subscription } from 'rxjs';
import IUser from 'src/app/models/user.model';
import { PageEvent } from '@angular/material';
import { EntityTableEditorComponent } from '../entity-table-editor/entity-table-editor.component';

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
export class UsersComponent implements OnInit, OnDestroy {

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
  collection$: Observable<Array<IUser>>;
  /**
   * Состояние загрузки
   */
  loading$: Observable<boolean>;

  private _subscrTotalLength: Subscription;

  constructor(private _usersQuery: UsersQuery, private _usersServices: UsersService) { }

  ngOnInit() {
    this.collection$ = this._usersQuery.selectAll();
    this.loading$ = this._usersQuery.selectLoading();
    this.totalLength$ = this._usersQuery.total$;

    this._subscrTotalLength = this.totalLength$.subscribe(total => {
      this._table.totalItems = total;
    });
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

  ngOnDestroy() {
    this._subscrTotalLength.unsubscribe();
  }
}
