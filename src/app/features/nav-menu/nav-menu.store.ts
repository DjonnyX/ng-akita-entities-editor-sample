import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { INavRoute } from './nav-menu.component';

export interface INavMenuState {
    /**
     * Возвращает состояние открытия навигационного меню
     */
    isSidenavOpen: boolean;
    /**
     * Возвращает запрошенное состояние открытия навигационного меню.
     * Если <code>hasBackDrop = false</code>, то <code>isSideNavOpen = false<code>
     */
    isSidenavRequestStatus: boolean;
    /**
     * Возвращает <code>true</code>, если sideNav может скрываться
     */
    hasBackdrop: boolean;

    routeCollection: Array<INavRoute>;

    currentRoute: INavRoute;
}

const initialState: INavMenuState = {
    isSidenavOpen: false,
    isSidenavRequestStatus: false,
    hasBackdrop: false,
    routeCollection: null,
    currentRoute: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'navmenu' })
export class NavMenuStore extends Store<INavMenuState> {

    constructor() {
        super(initialState);
    }

    updateSideNavHasBackdrop(value: boolean) {
        this.update({ hasBackdrop: value });
    }

    updateSideNavRequestedStatus(status: boolean) {
        this.update({ isSidenavRequestStatus: status });
    }

    updateSideNavStatus(status: boolean) {
        this.update({ isSidenavOpen: status });
    }

    updateRouteCollection(collection: Array<INavRoute>) {
        this.update({ routeCollection: collection });
    }

    updateCurrentRoute(route: INavRoute) {
        this.update({ currentRoute: route });
    }
}