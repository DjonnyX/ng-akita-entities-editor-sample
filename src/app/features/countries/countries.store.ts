import { EntityState, StoreConfig, EntityStore } from "@datorama/akita";
import { Injectable } from '@angular/core';
import ICountry from '../../models/country.model';

export interface CountriesState extends EntityState<ICountry> {
    pageIndex: number;
    pageSize: number;
    total: number;
}

const initialState: CountriesState = {
    pageIndex: 0,
    pageSize: 0,
    total: 0
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'countries' })
export class CountriesStore extends EntityStore<CountriesState, ICountry> {

    constructor() {
        super(initialState);
    }

    updateTotalLength(total: number) {
        this.updateRoot({total: total});
    }

    updatePageParams(index: number, size: number) {
        this.updateRoot({pageIndex: index, pageSize: size});
    }
}