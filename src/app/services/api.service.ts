import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import IUser from '../models/user.model';
import ICountry from '../models/country.model';
import { createRequestParams, IRequestParams } from '../utils/srv-request.util';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


const API_URL = '/api/';

enum ApiRouteNames {
  USERS = 'users',
  COUNTRIES = 'countries',
  USER_COUNTRIES = 'user_countries'
}

export class ApiRoutes {
  private static _users = `${API_URL}${ApiRouteNames.USERS}`;
  private static _countries = `${API_URL}${ApiRouteNames.COUNTRIES}`;
  private static _user_countries = `${API_URL}${ApiRouteNames.USER_COUNTRIES}`;

  static get USERS() { return ApiRoutes._users; }
  static get COUNTRIES() { return ApiRoutes._countries; }
  static get USER_COUNTRIES() { return ApiRoutes._user_countries; }
}

interface IUserFilterParams {
  id?: number;
  name?: string;
}

interface ICountryFilterParams {
  id?: number;
  name?: string;
}

interface IUserCountryFilterParams {
  id?: number;
  userId?: number;
  countryId?: number;
  visited?: boolean;
  hasVisa?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  /**
   * Выполняет GET-запрос к json-server'у с параметрами фильтрации, сортировки, etc
   */
  protected get<T, F>(url: string, options: IRequestParams<F>) {
    return this._http.get<Array<F>>(url, {
      params: createRequestParams(options)
    });
  }

  /**
   * Выполняет POST-запрос к json-server'у
   */
  protected post<T, P>(url: string, body: P) {
    return this._http.post<Array<P>>(url, body);
  }

  /**
   * Выполняет PUT-запрос к json-server'у
   */
  protected put<T, P>(url: string, body: P) {
    return this._http.put<Array<P>>(url, body);
  }

  /**
   * Выполняет DELETE-запрос к json-server'у с параметрами фильтрации, сортировки, etc
   */
  protected delete<T, F>(url: string, options: IRequestParams<F>) {
    return this._http.delete<Array<F>>(url, {
      params: createRequestParams(options)
    });
  }

  /**
   * Получение списка пользователей с заданными параметрами фильтрации
   */
  getUsers(filter: IRequestParams<IUserFilterParams>) {
    return this.get<Array<IUser>, IUserFilterParams>(ApiRoutes.USERS, filter);
  }

  /**
   * Создание пользователя
   */
  createUser(user: IUserFilterParams) {
    return this.post<Array<IUser>, IUserFilterParams>(ApiRoutes.USERS, user);
  }

  /**
   * Обновление пользователя
   */
  updateUser(user: IUserFilterParams) {
    return this._http.put<Array<IUser>>(ApiRoutes.USERS, user);
  }

  /**
   * Удаление пользователя
   */
  deleteUser(filter: IUserFilterParams) {
    return this._http.get<Array<IUser>>(ApiRoutes.USERS, {
      params: filter as any
    });
  }

  /**
   * Получение списка городов с заданными параметрами фильтрации
   */
  getCountries(filter: IRequestParams<ICountryFilterParams>) {
    return this.get<Array<ICountry>, ICountryFilterParams>(ApiRoutes.USERS, filter);
  }

  /**
   * Создание города
   */
  createCountry(...countries: Array<ICountryFilterParams>) {
    return this._http.post<Array<IUser>>(ApiRoutes.COUNTRIES, countries);
  }

  /**
   * Обновление города
   */
  updateCountry(...countries: Array<ICountryFilterParams>) {
    return this._http.put<Array<IUser>>(ApiRoutes.COUNTRIES, countries);
  }

  /**
   * Удаление города
   */
  deleteCountry(filter?: ICountryFilterParams) {
    return this._http.get<Array<ICountry>>(ApiRoutes.COUNTRIES, {
      params: filter as HttpParams
    });
  }

  /**
   * Получение списка городов пользователя с заданными параметрами фильтрации
   */
  getUserCountries(filter?: IUserCountryFilterParams) {
    return this._http.get<Array<IUser>>(ApiRoutes.COUNTRIES, {
      params: filter as HttpParams
    });
  }

  /**
   * Создание города пользователя
   */
  createUserCountry(...countries: Array<IUserCountryFilterParams>) {
    return this._http.post<Array<IUser>>(ApiRoutes.COUNTRIES, countries);
  }

  /**
   * Обновление города пользователя
   */
  updateUserCountry(...countries: Array<IUserCountryFilterParams>) {
    return this._http.put<Array<IUser>>(ApiRoutes.COUNTRIES, countries);
  }

  /**
   * Удаление города пользователя
   */
  deleteUserCountry(filter?: IUserCountryFilterParams) {
    return this._http.get<Array<ICountry>>(ApiRoutes.COUNTRIES, {
      params: filter as HttpParams
    });
  }
}
