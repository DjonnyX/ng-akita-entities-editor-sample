import { QueryEntity } from '@datorama/akita';
import { CountriesState, CountriesStore } from './countries.store';
import ICountry from '../../models/country.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CountriesQuery extends QueryEntity<CountriesState, ICountry> {

    collection$ = this.select(state => state.collection);

    constructor(protected store: CountriesStore) {
        super(store);
    }
}