import IUser from '../src/app/models/user.model';
import ICountries from '../src/app/models/country.model';
import IUserCountry from '../src/app/models/user-country.model';

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