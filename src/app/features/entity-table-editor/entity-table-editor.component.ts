import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { EditEntityDialogComponent, IEditEntityDialogData } from './edit-entity-dialog/edit-entity-dialog.component';
import { MediaObserver } from '@angular/flex-layout';
import { IDeleteEntityDialogData, DeleteEntityDialogComponent } from './delete-entity-dialog/delete-entity-dialog.component';

interface IColumn {
  id: string,
  name: string
}

enum ColumnTypes {
  ID = 'id',
  SERVICE = 'service'
}

@Component({
  selector: 'app-entity-table-editor',
  templateUrl: './entity-table-editor.component.html',
  styleUrls: ['./entity-table-editor.component.scss']
})
export class EntityTableEditorComponent implements OnInit {

  private _columns: Array<IColumn>;
  private _columnIds: Array<string>;
  private _workingPropsSet: any;

  @Input() totalItems: number;
  @Input() localization: any;
  @Input() collection: Array<any>;
  @Input() set columns(v: Array<IColumn>) {
    this._columns = v;
    this.resetHelperData(v);
  };

  @Output('add') private _emrAdd = new EventEmitter<any>();
  @Output('changePage') private _emrChangePage = new EventEmitter<{index: number, size: number}>();
  @Output('update') private _emrUpdate = new EventEmitter<any>();
  @Output('delete') private _emrDelete = new EventEmitter<number>();

  constructor(private _dialog: MatDialog, private _media: MediaObserver) { }

  ngOnInit() {
    this.changePage({
      pageIndex: 0,
      pageSize: 5});
  }

  /**
   * Переопределение вспомогательных объектов
   * - Переопределяет рабочий набор свойств (те которые можно редактировать)
   * - Переопределяет массив идентификаторов колонок
   */
  private resetHelperData(columns: Array<IColumn>) {
    this._columnIds = columns ? columns.map(v => v.id) : [];

    const workingPropsSet = {};
    columns.forEach(c => {
      // Если идентификатор колонки не равен ID и SERVICE, то свойство попадает в рабочий набор
      if (c.id !== ColumnTypes.ID && c.id !== ColumnTypes.SERVICE) workingPropsSet[c.id] = '';
    });
    this._workingPropsSet = workingPropsSet;
  }

  /**
   * Добавляет новую сущность
   */
  add(): void {
    const v = normalizeProps(this._workingPropsSet, this._columns);
    const data: IEditEntityDialogData = {
      buttonApply: this.localization.addDialog.buttonApply,
      buttonCancel: this.localization.addDialog.buttonCancel,
      collection: v
    }
    const dialogRef = this._dialog.open(EditEntityDialogComponent, {
      width: '350px',
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
    const v = normalizeProps(value, this._columns);
    const data: IEditEntityDialogData = {
      buttonApply: this.localization.editDialog.buttonApply,
      buttonCancel: this.localization.editDialog.buttonCancel,
      collection: v
    }
    const dialogRef = this._dialog.open(EditEntityDialogComponent, {
      width: '350px',
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
      ...{message: this.localization.delDialog.message.replace('$1', value.name)}
    }
    const dialogRef = this._dialog.open(DeleteEntityDialogComponent, {
      width: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return; // отмена
      this._emrDelete.emit(value.id);
    });
  }

  changePage(event) {
    this._emrChangePage.emit({index: event.pageIndex, size: event.pageSize});
  }

  /**
   * Набор "рабочих" свойств
   */
  get columns(): Array<IColumn> { return this._columns; }

  /**
   * Массив идентификаторов колонок
   */
  get columnIds(): Array<string> { return this._columnIds; }

  get isMobile() { return this._media.isActive('xs') || this._media.isActive('sm')}
}

/**
 * Преобразует map в массив редактируемых свойств, где name - имя свойства и value - его значение
 */
const normalizeProps = (props: any, columns: Array<IColumn>): Array<{ id: string, value: string, name: string }> => {
  return mapToArrayWorkingProps(props).map(prop => {
    return {
      ...prop, ...{ name: columns.find(column => column.id === prop.id).name }
    }
  });
}

/**
 * Преобразует map в массив редактируемых свойств, где name - имя свойства и value - его значение
 */
const mapToArrayWorkingProps = (val: any): Array<{ id: string, value: string }> => {
  const result = [];
  const keys = Object.keys(val);
  keys.forEach(key => {
    if (key !== ColumnTypes.ID && key !== ColumnTypes.SERVICE) result.push({ id: key, value: val[key] });
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