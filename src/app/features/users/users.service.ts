import { Injectable } from '@angular/core';
import { UsersStore } from './users.store';
import { UsersQuery } from './users.query';
import { ApiService } from 'src/app/services/api.service';
import IUser from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _apiService: ApiService, private _usersStore: UsersStore,
    private _usersQuery: UsersQuery) { }

  getUsers() {
    this._apiService.getUsers()
      .subscribe(collection => {
        this._usersStore.set(collection);
      })
  }

  addUser(user: IUser) {
    this._apiService.createUser(user)
      .subscribe(newUser => {
        this.getUsers();
      })
  }

  editUser(user: IUser) {
    this._apiService.updateUser(user)
      .subscribe(updatedUser => {
        this.getUsers();
      })
  }

  deleteUser(id: number) {
    this._apiService.deleteUser(id)
      .subscribe(deletedUser => {
        this.getUsers();
      })
  }
}
