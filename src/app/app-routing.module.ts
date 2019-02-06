import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const ROUTE_COLLECTION = [{
  route: 'users',
  name: 'пользователи'
}, {
  route: 'countries',
  name: 'Страны'
}, {
  route: 'usercountries',
  name: 'Страны пользователя'
}];

const routes: Routes = [
  {
    path: ROUTE_COLLECTION[0].route,
    loadChildren: './features/users/users.module#UsersModule'
  },
  {
    path: ROUTE_COLLECTION[1].route,
    loadChildren: './features/countries/countries.module#CountriesModule'
  },
  {
    path: ROUTE_COLLECTION[2].route,
    loadChildren: './features/user-countries/user-countries.module#UserCountriesModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
