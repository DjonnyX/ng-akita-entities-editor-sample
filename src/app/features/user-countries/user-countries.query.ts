import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UserCountriesState, UserCountriesStore } from './user-countries.store';
import IUserCountry, { IEditableUserCountry } from '../../models/user-country.model';

@Injectable({ providedIn: 'root' })
export class UserCountriesQuery extends QueryEntity<UserCountriesState, IEditableUserCountry> {

    fetchedCollection$ = this.select<boolean>(state => state.fetchedCollection);

    constructor(protected store: UserCountriesStore) {
        super(store);
    }
}