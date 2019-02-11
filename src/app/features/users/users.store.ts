import { EntityState, StoreConfig, EntityStore } from "@datorama/akita";
import { Injectable } from '@angular/core';
import IUser from '../../models/user.model';
import { BaseTableState, BaseTableStore } from 'src/app/states/base-table.store';

export interface UsersState extends BaseTableState<IUser> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users', resettable: true })
export class UsersStore extends BaseTableStore<UsersState, IUser> { }