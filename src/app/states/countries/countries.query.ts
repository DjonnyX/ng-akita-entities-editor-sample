import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { CountriesState, CountriesStore } from './countries.store';
import ICountry from './countries.model';

@Injectable({ providedIn: 'root' })
export class CountriesQuery extends QueryEntity<CountriesState, ICountry> {

    total$ = this.select<number>(state => state.total);

    constructor(protected store: CountriesStore) {
        super(store);
    }
}