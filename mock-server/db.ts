import IUser from '../src/app/states/users/users.model';
import ICountries from '../src/app/states/countries/countries.model';
import IUserCountry from '../src/app/states/user-countries/user-countries.model';

const TBL_USERS: Array<IUser> = [];
const TBL_COUNTRIES: Array<ICountries> = [];
const TBL_USER_COUNTRIES: Array<IUserCountry> = [];

/**
 * БД
 */
const db = {
    "users": TBL_USERS,
    "countries": TBL_COUNTRIES,
    "user-countries": TBL_USER_COUNTRIES
}
export default db;