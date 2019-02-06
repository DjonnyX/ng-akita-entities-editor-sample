import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface IEditEntityDialogData {
  buttonCancel: string;
  buttonApply: string;
  collection: Array<{
    id: string;
    value: string;
    name: string;
  }>
}

@Component({
  selector: 'app-edit-entity-dialog',
  templateUrl: './edit-entity-dialog.component.html',
  styleUrls: ['./edit-entity-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditEntityDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditEntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEditEntityDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
