export default interface IUserCountry {
    id: number;
    userId: number;
    countryId: number;
    visited?: boolean;
    hasVisa?: boolean;
}

export interface IEditableUserCountry extends IUserCountry {
    _countryName?: string;
    _visited?: boolean;
    _hasVisa?: boolean;
}