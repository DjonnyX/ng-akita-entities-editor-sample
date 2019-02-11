import { Query } from '@datorama/akita';
import { INavMenuState, NavMenuStore } from './nav-menu.store';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NavMenuQuery extends Query<INavMenuState> {

    currentRouteName$ = this.select(state => state.currentRoute ? state.currentRoute.name : '');

    sidenavOpen$ = this.select(state => state.isSidenavOpen);
    
    sidenavHasBackdrop$ = this.select(state => state.hasBackdrop);
    
    roteCollection$ = this.select(state => state.routeCollection);

    constructor(protected store: NavMenuStore) {
        super(store);
    }
}