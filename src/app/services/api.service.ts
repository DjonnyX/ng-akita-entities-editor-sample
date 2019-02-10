import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import IUser from '../models/user.model';
import ICountry from '../models/country.model';
import IUserCountry from '../models/user-country.model';
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
  USER_COUNTRIES = 'usercountries'
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
    const opt = createRequestParams(options);
    return this._http.get<T>(url, {
      params: opt,
      observe: 'response'
    }).pipe(
      map(res => ({
          total: Number(res.headers.get('X-Total-Count')),
          items: res.body
        })
      )
    )
  }
  
  /**
   * Получение списка пользователей с заданными параметрами фильтрации
   */
  getUsers(filter?: IRequestParams<IUserFilterParams>) {
    return this.get<Array<IUser>, IUserFilterParams>(ApiRoutes.USERS, filter);
  }

  /**
   * Создание пользователя
   */
  createUser(user: IUser) {
    return this._http.post<IUser>(ApiRoutes.USERS, user);
  }

  /**
   * Обновление пользователя
   */
  updateUser(user: IUser) {
    return this._http.put<IUser>(`${ApiRoutes.USERS}/${user.id}`, user);
  }

  /**
   * Удаление пользователя
   */
  deleteUser(id: number) {
    return this._http.delete<IUser>(`${ApiRoutes.USERS}/${id}`);
  }

  /**
   * Получение списка городов с заданными параметрами фильтрации
   */
  getCountries(filter?: IRequestParams<ICountryFilterParams>) {
    return this.get<Array<ICountry>, ICountryFilterParams>(ApiRoutes.COUNTRIES, filter);
  }

  /**
   * Создание города
   */
  createCountry(country: ICountry) {
    return this._http.post<ICountry>(ApiRoutes.COUNTRIES, country);
  }

  /**
   * Обновление города
   */
  updateCountry(country: ICountry) {
    return this._http.put<ICountry>(`${ApiRoutes.COUNTRIES}/${country.id}`, country);
  }

  /**
   * Удаление города
   */
  deleteCountry(id: number) {
    return this._http.delete<ICountry>(`${ApiRoutes.COUNTRIES}/${id}`);
  }

  /**
   * Получение списка городов пользователя с заданными параметрами фильтрации
   */
  getUserCountries(filter?: IRequestParams<IUserCountryFilterParams>) {
    return this.get<Array<IUserCountry>, IUserFilterParams>(ApiRoutes.USER_COUNTRIES, filter);
  }

  /**
   * Создание города пользователя
   */
  createUserCountry(userCountry: IUserCountry) {
    return this._http.post<IUserCountry>(ApiRoutes.USER_COUNTRIES, userCountry);
  }

  /**
   * Обновление города пользователя
   */
  updateUserCountry(userCountry: IUserCountry) {
    return this._http.put<IUserCountry>(`${ApiRoutes.USER_COUNTRIES}/${userCountry.id}`, userCountry);
  }

  /**
   * Удаление города пользователя
   */
  deleteUserCountry(id: number) {
    return this._http.delete<IUserCountry>(`${ApiRoutes.USER_COUNTRIES}/${id}`);
  }
}
