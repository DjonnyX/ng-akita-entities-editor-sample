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

    addEntity(user: E) {
        return this.addEntitiesFn(user)
            .subscribe(newUser =>
                this.updateUsers()
            )
    }

    editEntity(user: E) {
        return this.editEntitiesFn(user)
            .subscribe(updatedUser =>
                this.updateUsers()
            )
    }

    deleteEntity(id: number) {
        return this.deleteEntitiesFn(id)
            .subscribe(deletedUser =>
                this.updateUsers()
            )
    }

    updatePageParams(index: number, size: number) {
        this._store.updatePageParams(index, size);
        this.updateUsers()
    }

    reset() {
        // this._store.resetState();
    }

    private updateUsers() {
        return this.getEntities({index: this._query.getValue().pageIndex, limit: this._query.getValue().pageSize});
    }
}
