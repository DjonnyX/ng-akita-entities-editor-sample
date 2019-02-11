import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable, of, merge } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, map, switchMap, filter, combineAll, last, tap, } from 'rxjs/operators';
import { SearchCountriesService } from './search-countries.service';
import IUser from '../../models/user.model';
import ICountry from '../../models/country.model';
import { ISearchData } from '../user-countries/user-countries.service';


/**
 * Вынес, т.к. они хер доступны
 */
enum ValidationStatuses {
  VALID = 'VALID',
  INVALID = 'INVALID',
  PENDING = 'PENDING',
  DISABLED = 'DISABLED'
}

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
      return of(control.value)
        .pipe(
          switchMap(v => v ? service.hasUser(v.id) : of(false)),
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
          switchMap(v => v ? service.hasCountry(v.id) : of(true)),
          map(isExists => isExists ? null : { error: 'Такой страны не существует' })
        );
    };
  }
}

@Component({

  selector: 'app-search-countries',
  templateUrl: './search-countries.component.html',
  styleUrls: ['./search-countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchCountriesComponent {

  @Output('search') _emtrSearch = new EventEmitter<ISearchData>();

  visitStatuses = VISIT_STATUSES;
  
  hasVisitStatuses = HAS_VISA_STATUSES;

  ctrlUser: FormControl;

  ctrlCountry: FormControl;
  
  ctrlVisited: FormControl;
  
  ctrlHasVisa: FormControl;
  
  formGroup: FormGroup;

  isValid$: Observable<boolean>;

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
    this.ctrlVisited = new FormControl(-1);
    this.ctrlHasVisa = new FormControl(-1);

    this.formGroup = this._formBuilder.group({
      user: this.ctrlUser,
      country: this.ctrlCountry,
      visited: this.ctrlVisited,
      hasVisa: this.ctrlHasVisa
    });

    this.formSubscription();
  }

  private formSubscription() {
    // Выбор значений для автокомплита пользователя
    this.users$ = this.ctrlUser.valueChanges.pipe(
      startWith(null),
      debounceTime(AC_DEBOUNCE),
      distinctUntilChanged(),
      map(val => val || ''),
      switchMap(val => this._searchCountriesService.getUsersByEntry(val, AC_MAX_LENGTH)),
    );

    // Выбор значений для автокомплита стран
    this.countries$ = this.ctrlCountry.valueChanges.pipe(
      startWith(null),
      debounceTime(AC_DEBOUNCE),
      distinctUntilChanged(),
      map(val => val || ''),
      switchMap(val => this._searchCountriesService.getCountriesByEntry(val, AC_MAX_LENGTH))
    );

    // Валидация ctrlUser
    const isValidUser = merge(of(ValidationStatuses.INVALID), this.ctrlUser.statusChanges).pipe(map(v => v !== ValidationStatuses.INVALID));
    // Валидация ctrlCountry
    const isValidCountry = merge(of(ValidationStatuses.VALID), this.ctrlCountry.statusChanges).pipe(map(v => v !== ValidationStatuses.INVALID));
    // Валидация формы
    this.isValid$ = of(isValidUser, isValidCountry).pipe(
      combineAll(),
      switchMap(([uv, cv]) => of(uv && cv))
    )
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
  
  search() {
    this._emtrSearch.emit(this.formGroup.value);
  }
}
