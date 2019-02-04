import { EntityState, StoreConfig, EntityStore } from "@datorama/akita";
import IUserCountry from '../../models/user-country.model';

export interface UserCountriesState extends EntityState<IUserCountry> { }

@StoreConfig({ name: 'user-countries' })
export class UserCountriesStore extends EntityStore<UserCountriesState, IUserCountry> {

    constructor() {
        super();
    }
}