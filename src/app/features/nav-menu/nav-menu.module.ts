import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu.component';
import { MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  exports: [NavMenuComponent]
})
export class NavMenuModule { }
