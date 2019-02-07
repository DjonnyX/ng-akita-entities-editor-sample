import { Injectable } from '@angular/core';
import { UsersStore } from './users.store';
import { UsersQuery } from './users.query';
import { ApiService } from 'src/app/services/api.service';
import IUser from './users.model';
import { switchMap, map } from 'rxjs/operators';

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
      .subscribe(newUser =>
        this.updateUsers()
      )
  }

  editUser(user: IUser) {
    return this._apiService.updateUser(user)
      .subscribe(updatedUser => 
        this.updateUsers()
      )
  }

  deleteUser(id: number) {
    return this._apiService.deleteUser(id)
      .subscribe(deletedUser => 
        this.updateUsers()
      )
  }

  updatePageParams(index: number, size: number) {
    this._usersStore.updatePageParams(index, size);
    this.updateUsers()
  }

  private updateUsers() {
    return this.getUsers(this._usersQuery.getValue().pageIndex, this._usersQuery.getValue().pageSize);
  }
}
