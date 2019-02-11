import { BaseTableStore } from './base-table.store';
import { BaseTableQuery } from './base-table.query';
import { Observable } from 'rxjs';

export class BaseTableService<S extends BaseTableStore<any, any> = any, Q extends BaseTableQuery<any, any> = any, E = any> {

    constructor(protected _store: S,
        protected _query: Q) { }

    protected getEntitiesFn(params: any): Observable<any> { return null; }
    protected addEntitiesFn(params: any): Observable<any> { return null; }
    protected editEntitiesFn(params: any): Observable<any> { return null; }
    protected deleteEntitiesFn(params: any): Observable<any> { return null; }

    getEntities(params: {index: number, limit: number}) {
        return this.getEntitiesFn({ paging: { page: params.index + 1, limit: params.limit } })
            .subscribe(data => {
                this._store.set(data.items);
                this._store.updateTotalLength(data.total);
            })
    }

    addEntity(entity: E) {
        return this.addEntitiesFn(entity)
            .subscribe(newEntity => {
                this._store.updateTotalLength(this._query.getValue().total + 1);
                this._store.add(newEntity);
            })
    }

    editEntity(entity: E) {
        return this.editEntitiesFn(entity)
            .subscribe(updatedEntity =>
                this._store.update((entity as any).id, updatedEntity)
            )
    }

    deleteEntity(id: number) {
        return this.deleteEntitiesFn(id)
            .subscribe(_ => {
                this._store.updateTotalLength(this._query.getValue().total - 1);
                this._store.remove(id);
              })
    }

    updatePageParams(index: number, size: number) {
        this._store.updatePageParams(index, size);
        this.updateUsers()
    }

    reset() {
        this._store.reset();
    }

    private updateUsers() {
        return this.getEntities({index: this._query.getValue().pageIndex, limit: this._query.getValue().pageSize});
    }
}
