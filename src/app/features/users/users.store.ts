import { EntityState, StoreConfig, EntityStore } from "@datorama/akita";
import IUser from '../../models/user.model';

export interface UsersState extends EntityState<IUser> { }

@StoreConfig({ name: 'users' })
export class UsersStore extends EntityStore<UsersState, IUser> {

    constructor() {
        super();
    }
}