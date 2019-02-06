import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ApiService } from 'src/app/services/api.service';
import { EntityTableEditorModule } from '../entity-table-editor/entity-table-editor.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    EntityTableEditorModule
  ],
  providers: [ApiService]
})
export class UsersModule { }
