import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersQuery } from './users.query';
import { UsersService } from './users.service';
import IUser from '../../models/user.model';
import { IColumnData } from '../entity-table-editor/entity-table-editor.component';

const TABLE_COLUMNS: Array<IColumnData> = [
  // { id: 'id', name: 'id' },
  { id: 'name', name: 'Имя' },
  { id: 'service', isService: true }
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

const PAGE_SIZE_OPTIONS = [5, 10, 20];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {

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
    this._usersServices.addEntity(user);
  }

  editUser(user: IUser) {
    this._usersServices.editEntity(user);
  }

  deleteUser(id: number) {
    this._usersServices.deleteEntity(id);
  }

  ngOnDestroy() {
    this._usersServices.reset();
  }
}
