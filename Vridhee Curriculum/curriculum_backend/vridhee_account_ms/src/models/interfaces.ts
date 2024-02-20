// Actor Interfaces
export interface IActor {
    "_id": string,
    "type": string,
    "desc": string,
    "seq": number,
    "img_url": string,
    "prf_list": Array<string>,
    "sub_typ": Array<string>,
    "cr_dts": string
}

export interface IActorProfile extends IActor {
    "actorProfileList": Array<string>,
    "actorSubtypeList": Array<string>
}

export interface IActorQuery {
    "actorId": string
}


// Add User Interface
export interface IAddOrResponseUser {
    "act_typ": Array<string>,
    "email": string,
    "user_pwd": string,
    "cont_num": number,
    "disp_name": string,
    "vdisp_name": string,
    "gender": string,
    "dob": string,
    "cr_dts": string,
    "up_dts": string
}

// Add User Profile Interface
export interface IAddOrResponseUserProfile {
    "act_typ": Array<string>,
    "user_id": string,
    "personal_info": {
        "gender": string,
        "dob": string,
        "desc": string
        "vcoins": number
    },
    "cr_dts": string,
    "up_dts": string
}

// Dropdowns Interface
export interface IData {
    "_id": string,
    "name": string,
    "cr_dts": string,
    "up_dts": string
}

// Cirruculum Interface
export interface ICurrData {
    "_id": string,
    "name": string,
    "desc": string,
    "seq": number,
    "grades": Array<String>,
    "cr_dts": string,
    "up_dts": string,
    "study_field": Array<String>
}

export interface IProfileIdQuery {
    "profileId": string
}

// Subjects Parameter Interface
export interface ISubjectsQuery {
    "curr_cat_id": string,
    "curr_grade_id": string
}

// Subjects Interface
export interface ISubjects {
    "_id": string,
    "curr_cat_id": string,
    "curr_grade_id": string,
    "Subject": string,
    "cr_dts": string,
    "up_dts": string
}
export interface IProfileIdAndSectionQuery {
    "profileId": string,
    "profileSection": string
}

// Personal Info Interface
export interface IPersonalInfo {
    "personal_info": {
        "desc": string,
        "dob": string,
        "gender": string
    }
}

// Learning Interest Interface
export interface ILearningInterest {
    "learning": {
        "curr_cat_id": string,
        "curr_cat_name": string,
        "curr_grade_id": string,
        "curr_grade_name": string,
        "subjects": [
            {
                "id": string,
                "name": string,
                "rating": number,
                "no_of_months": number,
                "target_rating": number,
                "have_mentor": string,
                "mentorMailId": string
            }
        ]
    }
}

// Teaching Interest Interface
export interface ITeachingInterest {
    "teaching": {
        "curr_cat_id": string,
        "curr_cat_name": string,
        "curr_grade_id": string,
        "curr_grade_name": string,
        "institute_id": string,
        "institute_name": string,
        "students_count": number,
        "subjects": [
            {
                "id": string,
                "name": string,
                "rating": number,
                "no_of_months": number,
                "target_rating": number,
                "have_mentor": string,
                "mentorMailId": string
            }
        ]
    }
}

// Education Details Interface
export interface IEducationDetails {
    "education_details": {
        "data": [
            {
                "institute_id": string,
                "institute_name": string,
                "curr_cat_id": string,
                "curr_cat_name": string,
                "curr_grade_id": string,
                "curr_grade_name": string,
                "study_field_id": string,
                "study_field": string,
                "start_date": string,
                "end_date": string,
                "achievements": string,
                "desc": string
            }
        ]
    }
}

// Profession Details Interface
export interface IProfessionalDetails {
    "profession_details": {
        "data": [
            {
                "comp_id": string,
                "company_name": string,
                "design_id": string,
                "designation": string,
                "area_exp_id": string,
                "area_expert": string,
                "start_date": string,
                "end_date": string,
                "achievements": string,
                "Descr": string
            }
        ]
    }
}

// Awards & Certificates Interface
export interface IAwardsAndCertificates {
    "awards_certificates": {
        "data": [
            {
                "cert_name": string,
                "univ_name": string,
                "cert_no": string,
                "cert_url": string,
                "start_date": string,
                "end_date": string
            }
        ]
    }
}

// Hobbies & Interest Interface
export interface IHobbiesAndPassion {
    "hobbies_passion": {
        "hobbies": {
            "data": [
                {
                    "name": string,
                    "rating": number,
                    "status": number
                }
            ]
        },
        "passion": {
            "data": [
                {
                    "name": string,
                    "rating": number,
                    "status": number
                }
            ]
        }
    }
}

// Skill & Interest Interface
export interface ISkillAndInterest {
    "skill_interest": {
        "skill": {
            "data": [
                {
                    "name": string,
                    "rating": number,
                    "status": number
                }
            ]
        },
        "interest": {
            "data": [
                {
                    "name": string,
                    "rating": number,
                    "status": number
                }
            ]
        }
    }
}

// Combine(Personal Info,Learning Interest,Teaching Interest,Education Details,Profession Details,
//  Awards & Certificates,Hobbies & Interest,Skill & Interest)
export interface ICombinedProfileInterface extends IPersonalInfo, ILearningInterest,
    ITeachingInterest, IEducationDetails, IProfessionalDetails, IAwardsAndCertificates,
    IHobbiesAndPassion, ISkillAndInterest {

}

export interface ISubject {
    "id": string,
    "name": string,
    "rating": number,
    "no_of_months": number,
    "target_rating": number,
    "have_mentor": string,
    "mentorMailId": string
}

export interface ISubjectList extends Array<ISubject> { }

export interface IEducationDetailList {
    "data": [
        {
            "institute_id": string,
            "institute_name": string,
            "curr_cat_id": string,
            "curr_cat_name": string,
            "curr_grade_id": string,
            "curr_grade_name": string,
            "study_field_id": string,
            "study_field": string,
            "start_date": string,
            "end_date": string,
            "achievements": string,
            "desc": string
        }
    ]
}

export interface IProfessionalDetail {
    "data": [
        {
            "comp_id": string,
            "company_name": string,
            "design_id": string,
            "designation": string,
            "area_exp_id": string,
            "area_expert": string,
            "start_date": string,
            "end_date": string,
            "achievements": string,
            "Descr": string
        }
    ]
}

export interface ISkills {
    "data": [
        {
            "name": string,
            "rating": number,
            "status": number
        }
    ]
}

export interface IAwardsAndCertificateList {
    "data": [
        {
            "cert_name": string,
            "univ_name": string,
            "cert_no": string,
            "cert_url": string,
            "start_date": string,
            "end_date": string
        }
    ]
}

export interface IHobbies {
    "data": [
        {
            "name": string,
            "rating": number,
            "status": number
        }
    ]
}

export interface IPassion {
    "data": [
        {
            "name": string,
            "rating": number,
            "status": number
        }
    ]
}

export interface IInterest {
    "data": [
        {
            "name": string,
            "rating": number,
            "status": number
        }
    ]
}

export interface ILogInUser {
    "userId": string,
    "pwd": string
}

export interface IVerifyOTP {
    "otp": string,
    "ref": string
}

export interface IAwardsQuery {
    "awards_id": string,
    "_id": string
}

export interface IProfessionQuery {
    "profession_id": string,
    "_id": string
}

export interface IEducationQuery {
    "education_id": string,
    "_id": string
}

export interface iEmail {
    "email": string
}

export interface IUpdateAwardQuery {
    "awards_id": string,
    "_id": string,
    "cert_name": string,
    "univ_name": string,
    "cert_no": string,
    "cert_url": string,
    "start_date": Date,
    "end_date": Date
}

export interface IUpdateProfessionQuery {
    "profession_id": string,
    "_id": string,
    "comp_id": string,
    "company_name": string,
    "design_id": string,
    "designation": string,
    "area_exp_id": string,
    "area_expert": string,
    "start_date": Date,
    "end_date": Date,
    "achievements": string,
    "Descr": string
}

export interface IUpdateEducationQuery {
    "education_id": string,
    "_id": string,
    "institute_id": string,
    "institute_name": string,
    "curr_cat_id": string,
    "curr_cat_name": string,
    "curr_grade_id": string,
    "curr_grade_name": string,
    "study_field_id": string,
    "study_field": string,
    "start_date": Date,
    "end_date": Date,
    "achievements": string,
    "desc": string
}

export interface IS3URL {
    personal_info: {
        "image": string
    }
}

export interface IJWTToken {
    jwtAccessToken: string,
    jwtRefreshToken: string,
    expiresin: string,
    reNewJwtAccessToken: string
}

export interface IGoogle {
    id: string,
    accessToken: string,
}

export interface IAuthorization {
    tokenuserid: string,
    apiKey: string,
}

export interface Location {
    user_id: string,
    location: string
}

export interface IUserId {
    "tokenuserid": string,
}