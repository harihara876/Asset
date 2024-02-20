import axios from 'axios';
import configJson from "../config"

const API_GATEWAY_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.apiGatewayUrl : configJson.server.apiGatewayUrl

export default class DashboardService {

    private static baseURL: string | undefined = API_GATEWAY_URL;


    public static async getProfileData(profileId: string | null) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/userprofile?profileId=${profileId}`;
        return await axios.get(UserURL, { 'headers': headers });
    }

    public static logout() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/account/logout`;
        return axios.post(UserURL,{}, { 'headers': headers });
    }

    public static checkIsUserLogin() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/account/checkIsUserLogin`;
        return axios.post(UserURL,{}, { 'headers': headers });
    }

}