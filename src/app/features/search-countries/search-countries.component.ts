import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, map, switchMap, filter } from 'rxjs/operators';
import { SearchCountriesService } from './search-countries.service';
import IUser from '../../models/user.model';
import ICountry from '../../models/country.model';
import { ISearchData } from '../user-countries/user-countries.service';

/**
 * Максимальное кол-во элементов в autocomplete'е
 */
const AC_MAX_LENGTH = 8;

const AC_DEBOUNCE = 200;

const VISIT_STATUSES = [
  { value: -1, name: "Любое" },
  { value: 0, name: "Не посещена" },
  { value: 1, name: "Посещена" }
];

const HAS_VISA_STATUSES = [
  { value: -1, name: "Любое" },
  { value: 0, name: "Нет визы" },
  { value: 1, name: "Есть виза" }
];

/**
 * Валидатор пользователя
 * Выполняет запрос к серверу на существование пользователя по заданному id.
 */
class UserValidator {
  static create(service: SearchCountriesService) {
    return (control: AbstractControl) => {
      return of(control.value.id)
        .pipe(
          switchMap(id => service.hasUser(id)),
          map(isExists => isExists ? null : { error: 'Такого пользователя не существует' })
        );
    };
  }
}

/**
 * Валидатор стран
 * Выполняет запрос к серверу на существование страны по заданному id.
 */
class CountryValidator {
  static create(service: SearchCountriesService) {
    return (control: AbstractControl) => {
      return of(control.value)
        .pipe(
          filter(data => data.id),
          switchMap(id => service.hasCountry(id)),
          map(isExists => isExists ? null : { error: 'Такой страны не существует' })
        );
    };
  }
}

@Component({

  selector: 'app-search-countries',
  templateUrl: './search-countries.component.html',
  styleUrls: ['./search-countries.component.scss']
})
export class SearchCountriesComponent implements OnInit {

  @Output('search') _emtrSearch = new EventEmitter<ISearchData>();

  ctrlUser: FormControl;
  ctrlCountry: FormControl;
  ctrlVisited: FormControl;
  ctrlHasVisa: FormControl;
  formGroup: FormGroup;

  visitStatuses = VISIT_STATUSES;
  hasVisitStatuses = HAS_VISA_STATUSES;

  users$: Observable<Array<IUser>>;
  countries$: Observable<Array<ICountry>>;

  constructor(private _formBuilder: FormBuilder, private _searchCountriesService: SearchCountriesService) {
    this.createFormControls();
  }

  /**
   * Создается форма с контролами
   */
  private createFormControls() {
    this.ctrlUser = new FormControl('', [Validators.required], UserValidator.create(this._searchCountriesService));
    this.ctrlCountry = new FormControl('', null, CountryValidator.create(this._searchCountriesService));
    this.ctrlVisited = new FormControl('');
    this.ctrlHasVisa = new FormControl('');

    this.formGroup = this._formBuilder.group({
      ctrlUser: this.ctrlUser,
      ctrlCountry: this.ctrlCountry,
      ctrlVisited: this.ctrlVisited,
      ctrlHasVisa: this.ctrlHasVisa
    });
  }

  /**
   * Селектор отображаемого значения пользователя
   */
  ctrlUserDisplayFn(user?: IUser): string {
    return user ? user.name : undefined;
  }

  /**
   * Селектор отображаемого значения страны
   */
  ctrlCountryDisplayFn(country?: ICountry): string {
    return country ? country.name : undefined;
  }

  ngOnInit() {

    // Выбор значений для автокомплита пользователя
    this.users$ = this.formGroup.get('ctrlUser').valueChanges
      .pipe(
        startWith(null),
        debounceTime(AC_DEBOUNCE),
        distinctUntilChanged(),
        map(val => val || ''),
        switchMap(val => this._searchCountriesService.getUsersByEntry(val, AC_MAX_LENGTH)),
      );

    // Выбор значений для автокомплита стран
    this.countries$ = this.formGroup.get('ctrlCountry').valueChanges
      .pipe(
        startWith(null),
        debounceTime(AC_DEBOUNCE),
        distinctUntilChanged(),
        map(val => val || ''),
        switchMap(val => this._searchCountriesService.getCountriesByEntry(val, AC_MAX_LENGTH))
      );
  }

  search() {
    this._emtrSearch.emit({
      user: this.ctrlUser.value,
      country: this.ctrlCountry.value,
      visited: this.ctrlVisited.value,
      hasVisa: this.ctrlHasVisa.value
    });
  }
}
