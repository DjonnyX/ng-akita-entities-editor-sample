import { Injectable } from '@angular/core';
import { UsersStore } from './users.store';
import { UsersQuery } from './users.query';
import { ApiService } from 'src/app/services/api.service';
import IUser from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _apiService: ApiService, private _usersStore: UsersStore,
    private _usersQuery: UsersQuery) { }

  getUsers(index: number, limit: number) {
    return this._apiService.getUsers({ paging: { page: index + 1, limit: limit } })
      .subscribe(data => {
        this._usersStore.set(data.items);
        this._usersStore.updateTotalLength(data.total);
      })
  }

  addUser(user: IUser) {
    return this._apiService.createUser(user)
      .subscribe(addedUser => {
        this._usersStore.updateTotalLength(this._usersQuery.getValue().total + 1);
        this._usersStore.add(addedUser);
      })
  }

  editUser(user: IUser) {
    return this._apiService.updateUser(user)
      .subscribe(updatedUser =>
        this._usersStore.update(user.id, updatedUser)
      )
  }

  deleteUser(id: number) {
    return this._apiService.deleteUser(id)
      .subscribe(_ => {
        this._usersStore.updateTotalLength(this._usersQuery.getValue().total - 1);
        this._usersStore.remove(id);
      })
  }

  updatePageParams(index: number, size: number) {
    this._usersStore.updatePageParams(index, size);
    this.updateUsers()
  }

  reset() {
    this._usersStore.reset();
  }

  private updateUsers() {
    return this.getUsers(this._usersQuery.getValue().pageIndex, this._usersQuery.getValue().pageSize);
  }
}
