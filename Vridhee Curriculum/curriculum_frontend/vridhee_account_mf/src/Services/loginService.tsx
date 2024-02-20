import axios from 'axios';
import IUser from '../Models/IUser';
import React from 'react';

import configJson from "vridhee_common_component_mf/configJson";

const API_GATEWAY_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.apiGatewayUrl : configJson.server.apiGatewayUrl

export class LoginService {

    private static baseURL: string | undefined = API_GATEWAY_URL;

    public static getActors() {
        let UserURL: string = `${this.baseURL}/api/account/getActors`;
        return axios.get(UserURL);
    }

    public static getActorProfileDetails(id: string) {
        let UserURL: string = `${this.baseURL}/api/account/getActorProfileDetails?actorId=${id}`;
        return axios.get(UserURL);
    }

    public static Login(data: IUser) {
        let UserURL: string = `${this.baseURL}/api/account/login`;
        let body = {
            "userId": data.name,
            "pwd": data.password
        }
        return axios.post(UserURL, body);
    }

    public static userdetails(body: any) {
        let UserURL: string = `${this.baseURL}/api/account/userdetails`;
        return axios.post(UserURL, body);
    }

    public static signup(body: any) {
        let UserURL: string = `${this.baseURL}/api/account/signup`;
        return axios.post(UserURL, body);
    }

    public static sendOtpForEmailVerification(body: IUser) {
        let UserURL: string = `${this.baseURL}/api/account/sendOtpForEmailVerification`;
        return axios.post(UserURL, body);
    }

    public static forgetPassword(body: IUser) {
        let UserURL: string = `${this.baseURL}/api/account/forgetPassword`;
        return axios.post(UserURL, body);
    }

    public static verifyOTP(body: IUser) {
        let UserURL: string = `${this.baseURL}/api/account/verifyOTP`;
        return axios.post(UserURL, body);
    }

    public static setPassword(body: IUser) {
        let UserURL: string = `${this.baseURL}/api/account/setPassword`;
        return axios.post(UserURL, body);
    }

    public static googleAuthentication(actType: any, type: string) {
        let UserURL: string = `${this.baseURL}/api/account/oauth/google?act_typ=${actType}&type=${type}`;
        return axios.get(UserURL);
    }

    public static checkEmailAndContactNumber(body: any) {
        let UserURL: string = `${this.baseURL}/api/account/checkEmailAndContactNumber`;
        return axios.post(UserURL, body);
    }

    public static userVerify(id: string | null) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('authorizationToken')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/userVerify?userId=${id}`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getDashboardSummaryData(act_type: string | null, summary_type: number) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms/getDashboardSummaryData?act_type=${act_type}&summary_type=${summary_type}`;
        return axios.get(UserURL);
    }

    public static getCampusUserRelation(body: any) {
        let UserURL: string = `${this.baseURL}/api/campus_onboarding_ms/getCampusUserRelation`;
        return axios.post(UserURL, body);
    }

    public static getUsersCount() {
        let UserURL: string = `${this.baseURL}/api/account/getUsersCount`;
        return axios.get(UserURL);
    }

    public static checkIsUserLogin() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('authorizationToken')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/account/checkIsUserLogin`;
        return axios.post(UserURL,{}, { 'headers': headers });
    }

    public static getToken(body:any) {
        const headers = {
            // 'Authorization': `Bearer ${localStorage.getItem('authorizationToken')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/account/getToken`;
        return axios.post(UserURL,body, { 'headers': headers });
    }

}
