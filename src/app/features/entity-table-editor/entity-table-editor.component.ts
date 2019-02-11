import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MediaObserver } from '@angular/flex-layout';
import { EditEntityDialogComponent, IEditEntityDialogData } from './edit-entity-dialog/edit-entity-dialog.component';
import { IDeleteEntityDialogData, DeleteEntityDialogComponent } from './delete-entity-dialog/delete-entity-dialog.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IColumnData {
  id: string;
  name?: string;
  isService?: boolean;
}

@Component({
  selector: 'app-entity-table-editor',
  templateUrl: './entity-table-editor.component.html',
  styleUrls: ['./entity-table-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTableEditorComponent implements OnInit {

  private _columns: Array<IColumnData>;

  private _columnIds: Array<string>;
  
  private _workingPropsSet: any;

  isMobile$: Observable<boolean>;

  @Input() creatable: boolean;
  
  @Input() pageSizeOptions: Array<number>;
  
  @Input() totalItems: number;
  
  @Input() localization: any;
  
  @Input() collection: Array<any>;

  @Input() set columns(v: Array<IColumnData>) {
    this._columns = v;
    this.resetHelperData(v);
  };

  @Output('add') private _emrAdd = new EventEmitter<any>();

  @Output('changePage') private _emrChangePage = new EventEmitter<{ index: number, size: number }>();
  
  @Output('update') private _emrUpdate = new EventEmitter<any>();
  
  @Output('delete') private _emrDelete = new EventEmitter<number>();

  constructor(private _dialog: MatDialog, private _media: MediaObserver) { }

  ngOnInit() {
    this.changePage({
      pageIndex: 0,
      pageSize: this.pageSizeOptions[0]
    });
    
    this.isMobile$ = this._media.media$.pipe(
      map(v => v.suffix === 'Xs' || v.suffix === 'Sm')
    );
  }

  /**
   * Переопределение вспомогательных объектов
   * - Переопределяет рабочий набор свойств (те которые можно редактировать)
   * - Переопределяет массив идентификаторов колонок
   */
  private resetHelperData(columns: Array<IColumnData>) {
    this._columnIds = columns ? columns.map(v => v.id) : [];

    const workingPropsSet = {};
    columns.forEach(c => {
      // Если идентификатор колонки не равен ID и SERVICE, то свойство попадает в рабочий набор
      if (!c.isService) workingPropsSet[c.id] = '';
    });
    this._workingPropsSet = workingPropsSet;
  }

  /**
   * Добавляет новую сущность
   */
  add(): void {
    const v = normalizeProps(this._workingPropsSet, this._columns, this._workingPropsSet);
    const data: IEditEntityDialogData = {
      buttonApply: this.localization.addDialog.buttonApply,
      buttonCancel: this.localization.addDialog.buttonCancel,
      collection: v
    }
    const dialogRef = this._dialog.open(EditEntityDialogComponent, {
      width: DIALOG_WIDTH,
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return; // отмена
      this._emrAdd.emit(propsArrayToMap(null, result));
    });
  }

  /**
   * Редактирует запрошенную сущность
   */
  edit(value: any): void {
    const v = normalizeProps(value, this._columns, this._workingPropsSet);
    const data: IEditEntityDialogData = {
      buttonApply: this.localization.editDialog.buttonApply,
      buttonCancel: this.localization.editDialog.buttonCancel,
      collection: v
    }
    const dialogRef = this._dialog.open(EditEntityDialogComponent, {
      width: DIALOG_WIDTH,
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return; // отмена
      this._emrUpdate.emit(propsArrayToMap(value.id, result));
    });
  }

  /**
   * Удаляет запрошенную сущность
   */
  delete(value: any): void {
    const data: IDeleteEntityDialogData = {
      ...this.localization.delDialog,
      ...{ message: this.localization.delDialog.message.replace('$1', value.name) }
    }
    const dialogRef = this._dialog.open(DeleteEntityDialogComponent, {
      width: DIALOG_WIDTH,
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return; // отмена
      this._emrDelete.emit(value.id);
    });
  }

  changePage(event) {
    this._emrChangePage.emit({ index: event.pageIndex, size: event.pageSize });
  }

  /**
   * Набор "рабочих" свойств
   */
  get columns(): Array<IColumnData> { return this._columns; }

  /**
   * Массив идентификаторов колонок
   */
  get columnIds(): Array<string> { return this._columnIds; }
}

/**
 * Преобразует map в массив редактируемых свойств, где name - имя свойства и value - его значение
 */
const normalizeProps = (props: any, columns: Array<IColumnData>, refProps?: any): Array<any> => {
  return mapToArrayWorkingProps(props, refProps).map(prop => {
    const c = columns.find(column => column.id === prop.id);
    return {
      ...c, ...prop
    }
  });
}

/**
 * Преобразует map в массив редактируемых свойств, где name - имя свойства и value - его значение
 */
const mapToArrayWorkingProps = (val: any, refProps?: any): Array<{ id: string, value: string }> => {
  const result = [];
  const keys = Object.keys(refProps ? refProps : val);
  keys.forEach(key => {
    if (key) result.push({ id: key, value: val[key] });
  });
  return result;
}

const propsArrayToMap = (id: number, val: Array<{ id: string, value: string }>) => {
  const result = {};
  val.forEach(e => {
    result[e.id] = e.value;
  });
  if (id) result['id'] = id;
  return result;
}

const DIALOG_WIDTH = '350px';