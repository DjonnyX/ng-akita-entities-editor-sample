import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UserCountriesState, UserCountriesStore } from './user-countries.store';
import IUserCountry from '../../states/user-countries/user-countries.model';

@Injectable({ providedIn: 'root' })
export class UserCountriesQuery extends QueryEntity<UserCountriesState, IUserCountry> {

    constructor(protected store: UserCountriesStore) {
        super(store);
    }
}