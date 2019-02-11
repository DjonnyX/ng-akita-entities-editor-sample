import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTable, MatSlideToggleChange, Sort } from '@angular/material';
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

  private _collection: Array<IEditableUserCountry>;

  @ViewChild(MatTable) private _table: MatTable<any>;

  @ViewChild(MatPaginator) private _paginator: MatPaginator;

  @ViewChild(MatSort) private _sort: MatSort;

  dataSource: MatTableDataSource<IUserCountry>;

  @Input() pageSizeOptions: Array<number>;

  @Input() totalItems: number;

  @Input() set collection(v: Array<IUserCountry>) {
    if (this._collection === v) return;
    
    this._collection = v;
    this.updateData();
  };

  @Input() set columns(v: Array<IColumnData>) {
    if (this._columns === v) return;
    this._columns = v;
    this._columnIds = v ? v.map(v => v.id) : [];
  };

  sortedCollection: Array<IUserCountry>;

  @Output('change') private _emtrChange = new EventEmitter<IEditableUserCountry>();

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.dataSource.paginator = this._paginator;
    this.dataSource.sort = this._sort;
    this._table.dataSource = this.sortedCollection;
  }

  hasSwitchContent(column: IColumnData) {
    return column.type === ColumnTypes.SWITCH;
  }

  changeEntityPropValue(e: MatSlideToggleChange, el: IEditableUserCountry, prop: string) {
    this._emtrChange.emit({ ...el, ...{ [prop]: e.checked } });
  }

  updateData() {
    this.sortData(this._sort);
    this._table.dataSource = this.sortedCollection;
  }

  sortData(sort: Sort) {
    const data = Array.from(this._collection);
    if (!sort.active || sort.direction === '') return this.sortedCollection = data;

    this.sortedCollection = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case '_countryName': return compare(a._countryName, b._countryName, isAsc);
        case '_visited': return compare(Number(a.visited), Number(b.visited), isAsc);
        case '_hasVisa': return compare(Number(a.hasVisa), Number(b.hasVisa), isAsc);
        default: return 0;
      }
    });
  }

  get columns(): Array<IColumnData> { return this._columns; }

  get columnIds(): Array<string> { return this._columnIds; }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}