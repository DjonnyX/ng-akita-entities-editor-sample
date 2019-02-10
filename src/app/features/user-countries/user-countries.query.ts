import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UserCountriesState, UserCountriesStore } from './user-countries.store';
import IUserCountry from '../../models/user-country.model';

@Injectable({ providedIn: 'root' })
export class UserCountriesQuery extends QueryEntity<UserCountriesState, IUserCountry> {

    fetchedCollection$ = this.select<boolean>(state => state.fetchedCollection);

    constructor(protected store: UserCountriesStore) {
        super(store);
    }
}