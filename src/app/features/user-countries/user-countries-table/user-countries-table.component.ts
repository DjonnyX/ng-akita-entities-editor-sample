import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTable, MatSlideToggleChange } from '@angular/material';
import IUserCountry, { IEditableUserCountry } from '../../../models/user-country.model';
import { Observable } from 'rxjs';

export interface IColumnData {
  id: string;
  name?: string;
  type?: ColumnTypes;
}

export enum ColumnTypes {
  TEXT = 'text',
  SWITCH = 'switch'
}

@Component({
  selector: 'app-user-countries-table',
  templateUrl: './user-countries-table.component.html',
  styleUrls: ['./user-countries-table.component.scss']
})
export class UserCountriesTableComponent implements OnInit {

  private _columns: Array<IColumnData>;

  private _columnIds: Array<string>;

  private _collection: Array<IUserCountry>;

  @ViewChild(MatTable) private _table: MatTable<any>;

  @ViewChild(MatPaginator) private _paginator: MatPaginator;

  @ViewChild(MatSort) private _sort: MatSort;

  dataSource: MatTableDataSource<IUserCountry>;

  @Input() pageSizeOptions: Array<number>;

  @Input() totalItems: number;
  
  @Input() set collection(v: Array<IUserCountry>) {
    if (this._collection === v) return;

    this._collection = v;
    this.bindCollection();
  };

  @Input() set columns(v: Array<IColumnData>) {
    if (this._columns === v) return;

    this._columns = v;
    this._columnIds = v ? v.map(v => v.id) : [];
  };

  @Output('change') private _emtrChange = new EventEmitter<IEditableUserCountry>();

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.dataSource.paginator = this._paginator;
    this.dataSource.sort = this._sort;
    this._table.dataSource = this.dataSource;
  }

  hasSwitchContent(column: IColumnData) {
    return column.type === ColumnTypes.SWITCH;
  }

  changeEntityPropValue(e: MatSlideToggleChange, el: IEditableUserCountry, prop: string) {
    this._emtrChange.emit({...el, ...{[prop]: e.checked}});
  }

  private bindCollection() {
    this.dataSource.data = this._collection;
    // Не совсем верный подход в данном компоненте, но на "скорую руку" подойдет
    // и будет работать в этом примере.
    this._table.dataSource = this.dataSource;
  }

  get columns(): Array<IColumnData> { return this._columns; }

  get columnIds(): Array<string> { return this._columnIds; }
}