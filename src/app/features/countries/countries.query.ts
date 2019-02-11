import { Injectable } from '@angular/core';
import { CountriesState, CountriesStore } from './countries.store';
import ICountry from '../../models/country.model';
import { BaseTableQuery } from 'src/app/states/base-table.query';

@Injectable({ providedIn: 'root' })
export class CountriesQuery extends BaseTableQuery<CountriesState, ICountry> {
    constructor(protected store: CountriesStore) {
        super(store);
    }
}