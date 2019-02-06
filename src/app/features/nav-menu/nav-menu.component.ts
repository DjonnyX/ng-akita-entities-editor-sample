import { Component, ViewChild, OnInit, OnDestroy, Input } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, last, map, takeLast, tap } from 'rxjs/operators';
import { NavMenuQuery } from './nav-menu.query';
import { NavMenuService } from './nav-menu.service';

export interface INavRoute {
  route: string;
  name: string;
}

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') private _sidenav: MatSidenav;

  @Input() set routeCollection(val: Array<INavRoute>) {
    this._navMenuService.setRouteCollection(val);
  }

  private _subscriptionSidenavStatus: Subscription;
  private _subscriptionRouteChange: Subscription;

  currentRouteName$: Observable<string>;
  sidenavOpen$: Observable<boolean>;
  sidenavHasBackdrop$: Observable<boolean>;
  roteCollection$: Observable<Array<INavRoute>>;

  constructor(private _media: MediaObserver, private _navMenuQuery: NavMenuQuery,
    private _navMenuService: NavMenuService, private _router: Router) { }

  ngOnInit() {
    this.currentRouteName$ = this._navMenuQuery.currentRouteName$;
    this.sidenavOpen$ = this._navMenuQuery.sidenavOpen$;
    this.sidenavHasBackdrop$ = this._navMenuQuery.sidenavHasBackdrop$;
    this.roteCollection$ = this._navMenuQuery.roteCollection$;

    // Подписка на изменение медиа-состояния
    this._media.media$.subscribe(mChange => {
      const isMobile = mChange.suffix === 'Xs' || mChange.suffix === 'Sm';
      this._navMenuService.setHasBackdrop(isMobile);
    })

    // Открывает/закрывает панель навигации
    this._subscriptionSidenavStatus = this.sidenavOpen$.subscribe(val => {
      if (val) return this._sidenav.open();
      this._sidenav.close();
    })

    // Выделяется текущий маршрут
    this._subscriptionRouteChange = this._router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      )
      .subscribe(url =>
        this.roteCollection$.pipe(
          tap(),
          map(routes => routes.find(route => {
            return `/${route.route}` === url;
          }))
        ).subscribe(route => {
          this._navMenuService.setCurrentRoute(route);
        })
      );
  }

  closeSidenav() {
    this._navMenuService.setSideNavState(false);
  }

  openSidenav() {
    this._navMenuService.setSideNavState(true);
  }

  toggleSidenav() {
    this._navMenuService.toggleSideNavState();
  }

  ngOnDestroy() {
    this._subscriptionSidenavStatus.unsubscribe();
    this._subscriptionRouteChange.unsubscribe();
  }
}
