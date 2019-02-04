import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: './features/users/users.module#UsersModule'
  },
  {
    path: 'countries',
    loadChildren: './features/countries/countries.module#CountriesModule'
  },
  {
    path: 'user-countries',
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
