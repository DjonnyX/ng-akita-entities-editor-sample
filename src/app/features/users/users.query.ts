import { QueryEntity } from '@datorama/akita';
import { UsersState, UsersStore } from './users.store';
import { Injectable } from '@angular/core';
import IUser from '../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersQuery extends QueryEntity<UsersState, IUser> {
    
    total$ = this.select<number>(state => state.total);

    constructor(protected store: UsersStore) {
        super(store);
    }
}