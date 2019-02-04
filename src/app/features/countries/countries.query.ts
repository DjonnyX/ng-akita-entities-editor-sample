import { QueryEntity } from '@datorama/akita';
import { CountriesState, CountriesStore } from './countries.store';
import ICountry from '../../models/country.model';

export class CountriesQuery extends QueryEntity<CountriesState, ICountry> {

    constructor(protected store: CountriesStore) {
        super(store);
    }
}