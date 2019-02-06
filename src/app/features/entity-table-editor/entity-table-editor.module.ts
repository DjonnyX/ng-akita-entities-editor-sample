import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatPaginatorModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule } from '@angular/material';
import { EntityTableEditorComponent } from './entity-table-editor.component';
import { EditEntityDialogComponent } from './edit-entity-dialog/edit-entity-dialog.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeleteEntityDialogComponent } from './delete-entity-dialog/delete-entity-dialog.component';

@NgModule({
  declarations: [
    EntityTableEditorComponent,
    EditEntityDialogComponent,
    DeleteEntityDialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
    FlexLayoutModule
  ],
  entryComponents: [EditEntityDialogComponent, DeleteEntityDialogComponent],
  exports: [EntityTableEditorComponent]
})
export class EntityTableEditorModule { }
