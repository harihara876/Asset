import axios from 'axios';

interface Ieducation {
    education_id: string
    _id: string
    institute_id: string
    institute_name: string
    curr_cat_id: string
    curr_cat_name: string
    curr_grade_id: string
    curr_grade_name: string
    study_field_id: string
    study_field: string
    start_date: string
    end_date: string
    achievements: string
    desc: string
}

interface Iprofession {
    profession_id: string
    _id: string
    comp_id: string
    company_name: string
    design_id: string
    designation: string
    area_exp_id: string
    area_expert: string
    start_date: string
    end_date: string
    achievements: string
    Descr: string
}

interface Iawards {
    awards_id: string
    _id: string
    cert_name: string
    univ_name: string
    cert_no: string
    cert_url: string
    start_date: string
    end_date: string
}

import configJson from "vridhee_common_component_mf/configJson";

const API_GATEWAY_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.apiGatewayUrl : configJson.server.apiGatewayUrl

export class OnboardingService {
    private static baseURL: string | undefined = API_GATEWAY_URL;

    public static getActorProfileDetails(id: string) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/account/getActorProfileDetails?actorId=${id}`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getActors() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/account/getActors`;
        return axios.get(UserURL);
    }

    public static getCurriculumTypes() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getCurriculumTypes`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getCompaniesList() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getCompaniesList`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getDesignationList() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getDesignationList`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getarea_ExpertList() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getareaExpertList`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getSubjectsdropdown(catId: string, gradeId: string) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getSubjectsdropdown?_id=${catId}&id=${gradeId}`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getLocations() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getLookUpDetails?name=location`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getLanguages() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getLookUpDetails?name=language`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getSkills() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getLookUpDetails?name=Skills`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getInterests() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getLookUpDetails?name=Interest`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getHobbies() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getLookUpDetails?name=Hobbies`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getPassion() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getLookUpDetails?name=Passion`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getCertficationList() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getCertficationList`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getUniversityList() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getUniversityList`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static updateUserprofile(profileId: string | null, profileSection: string, body: any) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/userprofile?profileId=${profileId}&profileSection=${profileSection}`;
        return axios.put(UserURL, body, { 'headers': headers });

    }

    public static async getProfileData(profileId: string | null) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/userprofile?profileId=${profileId}`;
        return await axios.get(UserURL, { 'headers': headers });
    }

    public static getInstitutionList() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getInstitutionList`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static deleteAwardDetails(awardsId: string, id: string) {
        const params = {
            awards_id: awardsId,
            _id: id
        }
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/deleteAwardDetails?awards_id=${awardsId}&_id=${id}`;
        return axios.put(UserURL, params, { 'headers': headers });
    }

    public static deleteProfessionalDetails(professionId: string, id: string) {
        const params = {
            profession_id: professionId,
            _id: id
        }
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/deleteProfessionalDetails?profession_id=${professionId}&_id=${id}`;
        return axios.put(UserURL, params, { 'headers': headers });
    }

    public static deleteEducationDetails(educationId: string, id: string) {
        const params = {
            education_id: educationId,
            _id: id
        }
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/deleteEducationDetails?education_id=${educationId}&_id=${id}`;
        return axios.put(UserURL, params, { 'headers': headers });
    }

    public static updateAwardDetails(body: any) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/updateAwardDetails`;
        return axios.put(UserURL, body, { 'headers': headers });
    }
    // Iprofession
    public static updateProfessionalDetails(body: any) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/updateProfessionalDetails`;
        return axios.put(UserURL, body, { 'headers': headers });
    }
    // Ieducation
    public static updateEducationalDetails(body: any) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/updateEducationalDetails`;
        return axios.put(UserURL, body, { 'headers': headers });
    }

    public static getGradesdropdown(id: string) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getGradesdropdown?_id=${id}`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static userVerify(id: string | null) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/userVerify?userId=${id}`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static awardsUpdateUserprofile(profileId: string | null, profileSection: string, body: any) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/userprofile/awardsCertificates?profileId=${profileId}&profileSection=${profileSection}`;
        return axios.put(UserURL, body, { 'headers': headers });
    }

    public static location(body: any) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/account/location`;
        return axios.post(UserURL, body, { 'headers': headers });
    }

    public static getStudyField() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getLookUpDetails?name=board`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getMentors(sub_name: string) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getMentors?subjectName=${sub_name}`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static checkIsUserLogin() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/account/checkIsUserLogin`;
        return axios.post(UserURL,{}, { 'headers': headers });
    }

    public static syncGmailContacts(email: string) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/syncGmailContacts`;
        return axios.post(UserURL, {"email": email}, { 'headers': headers });
    }

    public static getGmailContacts() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'tokenuserid': localStorage.getItem('Tokenuserid')
        }
        const body = {
            "user_id": localStorage.getItem('Tokenuserid'),
            "db_metadata": 26
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getConnections`;
        return axios.post(UserURL,body, { 'headers': headers })
    }

    public static getToken(body:any) {
        const headers = {
            // 'Authorization': `Bearer ${localStorage.getItem('authorizationToken')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/account/getToken`;
        return axios.post(UserURL, body, { 'headers': headers });
    }

}

