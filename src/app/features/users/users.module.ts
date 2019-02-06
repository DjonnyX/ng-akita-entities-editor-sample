import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    UsersRoutingModule,
  ],
  providers: [ApiService]
})
export class UsersModule { }
