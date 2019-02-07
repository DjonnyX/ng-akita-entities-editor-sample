import { EntityState, StoreConfig, EntityStore } from "@datorama/akita";
import { Injectable } from '@angular/core';
import IUserCountry from '../../states/user-countries/user-countries.model';

export interface UserCountriesState extends EntityState<IUserCountry> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user-countries' })
export class UserCountriesStore extends EntityStore<UserCountriesState, IUserCountry> {

    constructor() {
        super();
    }
}