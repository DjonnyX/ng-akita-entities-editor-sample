import { EntityState, StoreConfig, EntityStore, ID } from "@datorama/akita";
import ICountry from '../../models/country.model';

export interface CountriesState extends EntityState<ICountry> { }

@StoreConfig({ name: 'countries' })
export class CountriesStore extends EntityStore<CountriesState, ICountry> {

    constructor() {
        super();
    }
}