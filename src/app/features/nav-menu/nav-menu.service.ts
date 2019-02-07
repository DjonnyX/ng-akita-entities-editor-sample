import { Injectable } from '@angular/core';
import { NavMenuStore } from './nav-menu.store';
import { NavMenuQuery } from './nav-menu.query';
import { INavRoute } from './nav-menu.component';

@Injectable({
  providedIn: 'root'
})
export class NavMenuService {

  constructor(private _navMenuStore: NavMenuStore, private _navMenuQuery: NavMenuQuery) {}

  /**
   * Устанавлиивает значение backdrop'а
   */
  setHasBackdrop(value: boolean) {
    this._navMenuStore.updateSideNavHasBackdrop(value);
    this.checkSideNavStatus();
  }

  /**
   * Открывает/закрывает меню
   */
  setSideNavState(status: boolean) {
    this._navMenuStore.updateSideNavRequestedStatus(status);
    this.checkSideNavStatus();
  }

  /**
   * Возвращает коллекцию маршрутов
   */
  setRouteCollection(collection: Array<INavRoute>) {
    this._navMenuStore.updateRouteCollection(collection);
  }

  /**
   * Возвращает текущий маршрут
   */
  setCurrentRoute(route: INavRoute) {
    this._navMenuStore.updateCurrentRoute(route);
  }

  /**
   * Переключает состояние SideNav'a на противоположное
   */
  toggleSideNavState() {
    const reqSideNavStatus = this._navMenuQuery.getValue().isSidenavRequestStatus;
    this._navMenuStore.updateSideNavRequestedStatus(!reqSideNavStatus);
    this.checkSideNavStatus();
  }

  /**
   * Тут идет проверка статуса
   * Если backdrop = false, то навигационное меню "прячется" в любом случае
   */
  private checkSideNavStatus() {
    const reqSideNavStatus = this._navMenuQuery.getValue().isSidenavRequestStatus;
    const hasBackdrop = this._navMenuQuery.getValue().hasBackdrop;
    this._navMenuStore.updateSideNavStatus(hasBackdrop ? reqSideNavStatus : true);
  }
}