import { EntityState, StoreConfig, EntityStore } from "@datorama/akita";
import { Injectable } from '@angular/core';
import IUser from '../../models/user.model';

export interface UsersState extends EntityState<IUser> {
    pageIndex: number;
    pageSize: number;
    total: number;
}

const initialState: UsersState = {
    pageIndex: 0,
    pageSize: 0,
    total: 0
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UsersStore extends EntityStore<UsersState, IUser> {

    constructor() {
        super(initialState);
    }

    updateTotalLength(total: number) {
        this.updateRoot({total: total});
    }

    updatePageParams(index: number, size: number) {
        this.updateRoot({pageIndex: index, pageSize: size});
    }
}