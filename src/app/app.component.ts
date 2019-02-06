import { Component, NgZone, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { akitaDevtools } from '@datorama/akita';
import { ROUTE_COLLECTION } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  routeCollection = Array.from(ROUTE_COLLECTION);

  constructor(private _ngZone: NgZone) {
    if (!environment.production) {
      akitaDevtools(_ngZone);
    }
  }
}
