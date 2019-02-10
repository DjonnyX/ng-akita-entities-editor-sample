import { EntityState, StoreConfig, EntityStore } from "@datorama/akita";
import { Injectable } from '@angular/core';
import IUserCountry from '../../models/user-country.model';

export interface UserCountriesState extends EntityState<IUserCountry> {
    pageIndex: number;
    pageSize: number;
    total: number;
    hasUser: boolean;
    fetchedCollection: boolean;
}

const initialState: UserCountriesState = {
    pageIndex: 0,
    pageSize: 0,
    total: 0,
    fetchedCollection: false,
    hasUser: false
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user_countries', resettable: true })
export class UserCountriesStore extends EntityStore<UserCountriesState, IUserCountry> {

    constructor() {
        super(initialState);
    }
    
    updateTotalLength(total: number) {
        this.updateRoot({total: total});
    }

    updatePageParams(index: number, size: number) {
        this.updateRoot({pageIndex: index, pageSize: size});
    }

    updateHasUser(status: boolean) {
        this.updateRoot({hasUser: status});
    }

    updateFetchedCollection(status: boolean) {
        this.updateRoot({fetchedCollection: status});
    }
}