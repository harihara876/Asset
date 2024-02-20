import mongoose from 'mongoose'
import moment from 'moment';
import { lookup, userprofile } from '../dbmanager/dbconnection';
import {
    verifySubjects, verifyEducationalDetails, verifySkills, verifyProfessionalDetails,
    verifyAwardsAndCertificates, verifyHobbies, verifyPassion, verifyInterest
} from './utilService';
import {
    IAddOrResponseUserProfile, ICombinedProfileInterface,
    IUpdateAwardQuery, IUpdateEducationQuery, IUpdateProfessionQuery, IS3URL
} from '../models/interfaces';

const adduserProfile = async (userProfileObj: IAddOrResponseUserProfile) => {
    try {
        userProfileObj.cr_dts = new Date().toISOString();
        userProfileObj.up_dts = new Date().toISOString();
        userProfileObj.personal_info.vcoins = 10;
        const userProfile = await userprofile.create(userProfileObj);
        return userProfile;
    } catch (error) {
        throw Error('add user details ' + error.message)
    }
}

const updateuserProfile = async (body: ICombinedProfileInterface, profileId: string, profileSection: string) => {
    try {
        const query: any = { '_id': profileId };
        const existingProfile = await userprofile.findOne(query);
        let profileObj: any = {};
        if (profileSection === 'personal_info') {
            profileObj['personal_info'] = { ...existingProfile.personal_info };
            profileObj['personal_info'] = body.personal_info;
        } else if (profileSection === 'learning') {
            profileObj['learning'] = body.learning;
            profileObj['learning']['up_dts'] = moment().utc().toISOString();
            const subjectList = await verifySubjects(
                profileSection,
                body.learning.curr_cat_id,
                body.learning.curr_grade_id,
                body.learning.subjects);
            profileObj['learning']['subjects'] = [...existingProfile.learning.subjects, ...subjectList];
            profileObj['learning']['vcoins'] = 20;
        } else if (profileSection === 'teaching') {
            profileObj['teaching'] = body.teaching;
            profileObj['teaching']['up_dts'] = moment().utc().toISOString();
            const subjectList = await verifySubjects(
                profileSection,
                body.teaching.curr_cat_id,
                body.teaching.curr_grade_id,
                body.teaching.subjects);
            profileObj['teaching']['subjects'] = [...existingProfile.teaching.subjects, ...subjectList];
            profileObj['teaching']['vcoins'] = 20;
        } else if (profileSection === 'education_details') {
            profileObj['education_details'] = {
                up_dts: moment().utc().toISOString()
            };;
            const eduDetails = await verifyEducationalDetails(body.education_details);
            profileObj['education_details']['data'] = [...existingProfile.education_details.data, ...eduDetails];
            profileObj['education_details']['vcoins'] = 20;
        } else if (profileSection === 'profession_details') {
            profileObj['profession_details'] = {
                up_dts: moment().utc().toISOString()
            };;
            const profDetails = await verifyProfessionalDetails(body.profession_details);
            profileObj['profession_details']['data'] = [...existingProfile.profession_details.data, ...profDetails];
            profileObj['profession_details']['vcoins'] = 20;
        } else if (profileSection === 'awards_certificates') {
            profileObj['awards_certificates'] = {
                up_dts: moment().utc().toISOString()
            };;
            const awardsAndCertificates = await verifyAwardsAndCertificates(body.awards_certificates);
            profileObj['awards_certificates']['data'] = [...existingProfile.awards_certificates.data, ...awardsAndCertificates];
            profileObj['awards_certificates']['vcoins'] = 20;
        } else if (profileSection === 'hobbies_passion') {
            profileObj['hobbies_passion'] = {
                up_dts: moment().utc().toISOString()
            };
            const hobbies = await verifyHobbies(body.hobbies_passion.hobbies);
            profileObj['hobbies_passion']['hobbies'] = {}
            profileObj['hobbies_passion']['hobbies']['data'] = [...existingProfile.hobbies_passion.hobbies.data, ...hobbies];
            const passion = await verifyPassion(body.hobbies_passion.passion);
            profileObj['hobbies_passion']['passion'] = {}
            profileObj['hobbies_passion']['passion']['data'] = [...existingProfile.hobbies_passion.passion.data, ...passion];
        } else if (profileSection === 'skill_interest') {
            profileObj['skill_interest'] = {
                up_dts: moment().utc().toISOString()
            };
            const skills = await verifySkills(body.skill_interest.skill);
            profileObj['skill_interest']['skill'] = {}
            profileObj['skill_interest']['skill']['data'] = [...existingProfile.skill_interest.skill.data, ...skills];
            const interest = await verifyInterest(body.skill_interest.interest);
            profileObj['skill_interest']['interest'] = {}
            profileObj['skill_interest']['interest']['data'] = [...existingProfile.skill_interest.interest.data, ...interest];
        }
        const profileUpdate = await userprofile.updateOne(query, profileObj);
        return profileUpdate;
    } catch (error) {
        console.log(error)
        throw Error('update profile details ' + error.message)
    }
}

const getuserProfile = async (profileId: string) => {
    try {
        const userProfile = await userprofile.findOne({ _id: profileId });
        return userProfile;
    } catch (error) {
        throw Error('add user details ' + error.message)
    }
}

export const deleteAward = async (getAwards_id: string, get_id: string) => {
    try {
        const awardupdate = await userprofile.updateOne({ _id: get_id }, {
            $pull: {
                "awards_certificates.data": {
                    _id: getAwards_id
                }
            }
        }
        )
        return awardupdate;
    }
    catch (error) {
        throw Error('deleteAward ' + error.message)
    }
}

export const deleteProfession = async (getProfession_id: string, get_id: string) => {
    try {
        const professionupdate = await userprofile.updateOne({ _id: get_id }, {
            $pull: {
                "profession_details.data": {
                    _id: getProfession_id
                }
            }
        }
        )
        return professionupdate;
    }
    catch (error) {
        throw Error('deleteProfession ' + error.message)
    }
}

export const deleteEducation = async (getEducation_id: string, get_id: string) => {
    try {
        const educationupdate = await userprofile.updateOne({ _id: get_id }, {
            $pull: {
                "education_details.data": {
                    _id: getEducation_id
                }
            }
        }
        )
        return educationupdate;
    }
    catch (error) {
        throw Error('deleteProfession ' + error.message)
    }
}

export const updateAward = async (awardObj: IUpdateAwardQuery) => {
    try {
        const awardUpdation = await userprofile.updateOne({
            "_id": awardObj._id,
            "awards_certificates.data._id": awardObj.awards_id
        },
            {
                $set: {
                    "awards_certificates.data.$.cert_name": awardObj.cert_name,
                    "awards_certificates.data.$.univ_name": awardObj.univ_name,
                    "awards_certificates.data.$.cert_no": awardObj.cert_no,
                    "awards_certificates.data.$.cert_url": awardObj.cert_url,
                    "awards_certificates.data.$.start_date": awardObj.start_date,
                    "awards_certificates.data.$.end_date": awardObj.end_date
                }
            }
        )
        return awardUpdation;
    }
    catch (error) {
        throw Error('updateAward ' + error.message)
    }
}


export const updateProfession = async (professionObj: IUpdateProfessionQuery) => {
    try {
        const professionUpdation = await userprofile.updateOne({
            "_id": professionObj._id,
            "profession_details.data._id": professionObj.profession_id
        },
            {
                $set: {
                    "profession_details.data.$.comp_id": professionObj.comp_id,
                    "profession_details.data.$.company_name": professionObj.company_name,
                    "profession_details.data.$.design_id": professionObj.design_id,
                    "profession_details.data.$.designation": professionObj.designation,
                    "profession_details.data.$.area_exp_id": professionObj.area_exp_id,
                    "profession_details.data.$.area_expert": professionObj.area_expert,
                    "profession_details.data.$.start_date": professionObj.start_date,
                    "profession_details.data.$.end_date": professionObj.end_date,
                    "profession_details.data.$.achievements": professionObj.achievements,
                    "profession_details.data.$.Descr": professionObj.Descr
                }
            }
        )
        return professionUpdation;
    }
    catch (error) {
        throw Error('updateProfession ' + error.message)
    }
}

export const updateEducation = async (educationObj: IUpdateEducationQuery) => {
    try {
        const educationUpdation = await userprofile.updateOne({
            "_id": educationObj._id,
            "education_details.data._id": educationObj.education_id
        },
            {
                $set: {
                    "education_details.data.$.institute_id": educationObj.institute_id,
                    "education_details.data.$.institute_name": educationObj.institute_name,
                    "education_details.data.$.curr_cat_id": educationObj.curr_cat_id,
                    "education_details.data.$.curr_cat_name": educationObj.curr_cat_name,
                    "education_details.data.$.curr_grade_id": educationObj.curr_grade_id,
                    "education_details.data.$.curr_grade_name": educationObj.curr_grade_name,
                    "education_details.data.$.study_field_id": educationObj.study_field_id,
                    "education_details.data.$.study_field": educationObj.study_field,
                    "education_details.data.$.start_date": educationObj.start_date,
                    "education_details.data.$.end_date": educationObj.end_date,
                    "education_details.data.$.achievements": educationObj.achievements,
                    "education_details.data.$.desc": educationObj.desc
                }
            }
        )
        return educationUpdation;
    }
    catch (error) {
        throw Error('updateEducation ' + error.message)
    }
}

const updateProfileWithS3Url = async (body: IS3URL, profileId: string, profileSection: string) => {
    try {
        const query: any = { '_id': profileId };
        let existingProfile = await userprofile.findOne(query);
        let profileObj: any = {};
        if (profileSection === 'personal_info') {
            existingProfile.personal_info.image = body.personal_info.image;
            profileObj['personal_info'] = { ...existingProfile.personal_info };
            // profileObj['personal_info'] = body.personal_info;
        }
        const profileUpdate = await userprofile.updateOne(query, profileObj);
        return profileUpdate;
    } catch (error) {
        console.log(error)
        throw Error('update profile details ' + error.message)
    }
}

export { adduserProfile, updateuserProfile, getuserProfile,updateProfileWithS3Url }