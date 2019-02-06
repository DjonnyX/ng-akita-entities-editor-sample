import { EntityState, StoreConfig, EntityStore } from "@datorama/akita";
import IUser from '../../models/user.model';
import { Injectable } from '@angular/core';

export interface UsersState extends EntityState<IUser> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UsersStore extends EntityStore<UsersState, IUser> {

    constructor() {
        super();
    }
}