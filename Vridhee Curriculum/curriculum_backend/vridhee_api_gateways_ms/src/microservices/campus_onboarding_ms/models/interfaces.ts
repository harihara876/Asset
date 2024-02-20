import { ParsedQs } from 'qs';

export interface ICourseQuery {
    "courseSection":string
};

export interface IDesignationQuery extends ParsedQs{
    "flag":string,
    "id":string
};

export interface ICampusQuery {
    "section":string
};

export interface IUserOnboardQuery {
    "name":string,
    "email":string,
    "cont_num":string,
    "gender":string,
    "campus":string,
    "designation": string
};

export interface IGroupQuery {
    "id":string,
    "groupCategory":string
};

export interface IModuleQuery {
    "moduleSection":string
};

export interface ICountryQuery {
    "country_id":string,
    "state_id":string,
    "district_id":string
};