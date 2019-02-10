import { EntityState, EntityStore } from "@datorama/akita";

export interface BaseTableState<E = any> extends EntityState<E> {
    pageIndex: number;
    pageSize: number;
    total: number;
    hasEntity: boolean;
}

const initialState: BaseTableState = {
    pageIndex: 0,
    pageSize: 0,
    total: 0,
    hasEntity: false
}

/**
 * Базовое хранилище для сущностей таблиц с пагинацией
 */
export class BaseTableStore<S extends BaseTableState<E> = any, E = any> extends EntityStore<S, E> {

    constructor(initialState: S) {
        super(initialState);
    }
    
    updateTotalLength(total: number) {
        this.updateRoot({total: total} as any);
    }

    updatePageParams(index: number, size: number) {
        this.updateRoot({pageIndex: index, pageSize: size} as any);
    }

    updateHasUser(status: boolean) {
        this.updateRoot({hasEntity: status} as any);
    }

    resetState() {
        this.set(initialState)
    }
}