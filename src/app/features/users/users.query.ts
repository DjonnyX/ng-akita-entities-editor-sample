import { QueryEntity } from '@datorama/akita';
import { UsersState, UsersStore } from './users.store';
import IUser from '../../models/user.model';

export class UsersQuery extends QueryEntity<UsersState, IUser> {

    constructor(protected store: UsersStore) {
        super(store);
    }
}