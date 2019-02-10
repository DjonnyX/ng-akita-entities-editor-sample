import { QueryEntity } from '@datorama/akita';
import { BaseTableStore, BaseTableState } from './base-table.store';

export class BaseTableQuery<S extends BaseTableState, E> extends QueryEntity<S, E> {
    
    total$ = this.select<number>((state: any) => state.total);

    constructor(protected store: any) {
        super(store);
    }
}