import { StoreConfig } from "@datorama/akita";
import { Injectable } from '@angular/core';
import ICountry from '../../models/country.model';
import { BaseTableState, BaseTableStore } from 'src/app/states/base-table.store';

export interface CountriesState extends BaseTableState<ICountry> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users', resettable: true })
export class CountriesStore extends BaseTableStore<CountriesState, ICountry> { }