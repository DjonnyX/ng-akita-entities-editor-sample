import { UsersState, UsersStore } from './users.store';
import { Injectable } from '@angular/core';
import IUser from '../../models/user.model';
import { BaseTableQuery } from 'src/app/states/base-table.query';

@Injectable({
    providedIn: 'root'
})
export class UsersQuery extends BaseTableQuery<UsersState, IUser> {
    constructor(protected store: UsersStore) {
        super(store);
    }
}