export default interface IUserCountry {
    id: number;
    userId: number;
    countryId: number;
    visited?: boolean;
    hasVisa?: boolean;
}