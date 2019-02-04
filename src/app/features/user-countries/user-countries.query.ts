import { QueryEntity } from '@datorama/akita';
import { UserCountriesState, UserCountriesStore } from './user-countries.store';
import IUserCountry from '../../models/user-country.model';

export class UserCountriesQuery extends QueryEntity<UserCountriesState, IUserCountry> {

    constructor(protected store: UserCountriesStore) {
        super(store);
    }
}