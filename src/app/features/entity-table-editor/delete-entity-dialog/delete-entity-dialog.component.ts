import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface IDeleteEntityDialogData {
  buttonCancel: string;
  buttonApply: string;
  title: string;
  message: string;
}

@Component({
  selector: 'app-delete-entity-dialog',
  templateUrl: './delete-entity-dialog.component.html',
  styleUrls: ['./delete-entity-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteEntityDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteEntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteEntityDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
