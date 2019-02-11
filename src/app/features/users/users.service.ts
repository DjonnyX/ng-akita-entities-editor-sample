import { Injectable } from '@angular/core';
import { UsersStore } from './users.store';
import { UsersQuery } from './users.query';
import { ApiService } from 'src/app/services/api.service';
import IUser from '../../models/user.model';
import { BaseTableService } from 'src/app/states/base-table.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseTableService<UsersStore, UsersQuery, IUser> {

  constructor(private _apiService: ApiService, _usersStore: UsersStore,
    _usersQuery: UsersQuery) {
      super(_usersStore, _usersQuery);
    }

    getEntitiesFn(...params) {
      return this._apiService.getUsers(params[0])
    }

    addEntitiesFn(...params) {
      return this._apiService.createUser(params[0])
    }

    editEntitiesFn(...params) {
      return this._apiService.updateUser(params[0])
    }
    
    deleteEntitiesFn(...params) {
      return this._apiService.deleteUser(params[0])
    }
}
