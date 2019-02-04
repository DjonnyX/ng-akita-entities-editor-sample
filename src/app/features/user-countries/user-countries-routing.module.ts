import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCountriesComponent } from './user-countries.component';

const routes: Routes = [
  {
    path: '',
    component: UserCountriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCountriesRoutingModule { }
