import { EntityState, StoreConfig, EntityStore, ID } from "@datorama/akita";
import ICountry from '../../models/country.model';
import { Injectable } from '@angular/core';

export interface CountriesState extends EntityState<ICountry> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'countries' })
export class CountriesStore extends EntityStore<CountriesState, ICountry> {

    constructor() {
        super();
    }
}