import mongoose from 'mongoose'
import moment from 'moment';
import {
    lookup, newsubject, userprofile, userdetail, currCategory, subjects, instituiton, company, designation,
    areaExpert, certification, university
} from '../dbmanager/dbconnection';
import {
    verifySubjects, verifyEducationalDetails, verifySkills, verifyProfessionalDetails,
    verifyAwardsAndCertificates, verifyHobbies, verifyPassion, verifyInterest
} from './utilService';
import { getlookupbyname } from './lookupservice';
import { IAddOrResponseUserProfile, ICombinedProfileInterface, IUpdateAwardQuery, IUpdateEducationQuery, IUpdateProfessionQuery, IUserQuery } from '../models/interfaces';
import { configData } from '../utils/config';
import { count } from 'console';

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
            if (body.personal_info.disp_name || body.personal_info.vdisp_name) {
                await userdetail.updateOne({ _id: existingProfile.user_id },
                    {
                        $set: {
                            disp_name: body.personal_info.disp_name,
                            vdisp_name: body.personal_info.vdisp_name
                        }
                    })
            }
            // profileObj['personal_info'] = { ...existingProfile.personal_info };
            // profileObj['personal_info'] = body.personal_info;
            profileObj['personal_info'] = { ...existingProfile.personal_info, ...body.personal_info };
        } else if (profileSection === 'learning') {
            profileObj['learning'] = body.learning;
            profileObj['learning']['up_dts'] = moment().utc().toISOString();
            const subjectList = await verifySubjects(
                profileSection,
                body.learning.curr_cat_id,
                body.learning.curr_grade_id,
                body.learning.subjects);
            profileObj['learning']['subjects'] = [...subjectList];
            profileObj['learning']['vcoins'] = 20;
        } else if (profileSection === 'teaching') {
            profileObj['teaching'] = body.teaching;
            profileObj['teaching']['up_dts'] = moment().utc().toISOString();
            const subjectList = await verifySubjects(
                profileSection,
                body.teaching.curr_cat_id,
                body.teaching.curr_grade_id,
                body.teaching.subjects);
            profileObj['teaching']['subjects'] = [...subjectList];
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
            profileObj['hobbies_passion']['hobbies']['data'] = [...hobbies];
            const passion = await verifyPassion(body.hobbies_passion.passion);
            profileObj['hobbies_passion']['passion'] = {}
            profileObj['hobbies_passion']['passion']['data'] = [...passion];
        } else if (profileSection === 'skill_interest') {
            profileObj['skill_interest'] = {
                up_dts: moment().utc().toISOString()
            };
            const skills = await verifySkills(body.skill_interest.skill);
            profileObj['skill_interest']['skill'] = {}
            profileObj['skill_interest']['skill']['data'] = [...skills];
            const interest = await verifyInterest(body.skill_interest.interest);
            profileObj['skill_interest']['interest'] = {}
            profileObj['skill_interest']['interest']['data'] = [...interest];
        }
        const profileUpdate = await userprofile.updateOne(query, profileObj);
        return profileUpdate;
    } catch (error) {
        console.log(error)
        throw Error('update profile details ' + error.message)
    }
}

const updateUserAwardCertificate = async (body, profileId, profileSection) => {
    try {
        const query: any = { '_id': profileId };
        const existingProfile = await userprofile.findOne(query);
        let profileObj: any = {};
        if (profileSection === 'awards_certificates') {
            profileObj['awards_certificates'] = {
                up_dts: moment().utc().toISOString()
            };;
            const awardsAndCertificates = await verifyAwardsAndCertificates(body.awards_certificates);
            profileObj['awards_certificates']['data'] = [...existingProfile.awards_certificates.data, ...awardsAndCertificates];
            profileObj['awards_certificates']['vcoins'] = 20;
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
        // const userProfile = await userprofile.findOne({ _id: profileId })
        const userProfile = await userprofile.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(profileId)
                }
            },
            {
                $lookup: {
                    from: "userdetail",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "userdetails"
                }
            },
            {
                $unwind: { path: "$userdetails" }
            },
            {
                $project: {
                    _id: 1,
                    act_typ: 1,
                    user_id: 1,
                    personal_info: 1,
                    learning: 1,
                    teaching: 1,
                    education_details: 1,
                    profession_details: 1,
                    awards_certificates: 1,
                    skill_interest: 1,
                    hobbies_passion: 1,
                    "userdetails.email": 1,
                    "userdetails.disp_name": 1,
                    "userdetails.vdisp_name": 1
                }
            }
        ])
        let img;
        if (userProfile[0].personal_info.image) {
            if (userProfile[0].personal_info.image.includes('https')) {
                img = userProfile[0].personal_info.image;
            } else {
                img = configData.s3BaseUrl + userProfile[0].personal_info.image;
            }
        } else {
            img = '';
        }
        userProfile[0].personal_info.image = img;
        let userProfileDetails = await addingNames(userProfile[0])
        return userProfileDetails;
    } catch (error) {
        console.log(error)
        throw Error('get user profile ' + error.message)
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

export const updateAward = async (awardObj: any) => {
    try {
        const awardUpdation = await userprofile.updateOne({
            "_id": awardObj._id,
            "awards_certificates.data._id": awardObj.awards_id
        },
            {
                $set: {
                    "awards_certificates.data.$.cert_img": awardObj.imageUrl,
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
                    "education_details.data.$.desc": educationObj.desc,
                    "education_details.data.$.grade": educationObj.grade
                }
            }
        )
        return educationUpdation;
    }
    catch (error) {
        throw Error('updateEducation ' + error.message)
    }
}

export const getuserdata = async (userId: string) => {
    try {
        const getUser = await userprofile.find({ user_id: userId })
        return getUser;
    }
    catch (error) {
        throw Error('getuserdata ' + error.message)
    }
}

const addingNames = async (profileObj) => {
    profileObj = { ...profileObj }
    if (profileObj.learning) {
        if (profileObj.learning.curr_cat_id) {
            profileObj.learning = { ...profileObj.learning }
            const { currCatName, currGradeName } = await findCurrCatGradeName(profileObj.learning.curr_cat_id, profileObj.learning.curr_grade_id)
            profileObj.learning.curr_cat_name = currCatName;
            profileObj.learning.curr_grade_name = currGradeName;
            profileObj.learning.subjects = await findSubjectNames(profileObj.learning.subjects)
        }
    }
    if (profileObj.teaching) {
        if (profileObj.teaching.curr_cat_id) {
            profileObj.teaching = { ...profileObj.teaching };
            const { currCatName, currGradeName } = await findCurrCatGradeName(profileObj.teaching.curr_cat_id, profileObj.teaching.curr_grade_id)
            profileObj.teaching.curr_cat_name = currCatName;
            profileObj.teaching.curr_grade_name = currGradeName;
            profileObj.teaching.institute_name = await findInstituteName(profileObj.teaching.institute_id);
            profileObj.teaching.subjects = await findSubjectNames(profileObj.teaching.subjects);
        }
    }
    if (profileObj.education_details) {
        if (profileObj.education_details.data.length) {
            profileObj.education_details = { ...profileObj.education_details }
            profileObj.education_details.data = await educationDetails(profileObj.education_details.data)
        }
    }
    if (profileObj.profession_details) {
        if (profileObj.profession_details.data.length) {
            profileObj.profession_details = { ...profileObj.profession_details }
            profileObj.profession_details.data = await professionDetails(profileObj.profession_details.data)
        }
    }
    if (profileObj.awards_certificates) {
        if (profileObj.awards_certificates.data.length) {
            profileObj.awards_certificates = { ...profileObj.awards_certificates }
            profileObj.awards_certificates.data = await awardDetails(profileObj.awards_certificates.data)
        }
    }
    if (profileObj.skill_interest) {
        profileObj.skill_interest = { ...profileObj.skill_interest }
        if (profileObj.skill_interest.skill.data.length) {
            profileObj.skill_interest.skill.data = await skillsData(profileObj.skill_interest.skill.data)
        }
        if (profileObj.skill_interest.interest.data.length) {
            profileObj.skill_interest.interest.data = await interestsData(profileObj.skill_interest.interest.data)
        }
    }
    if (profileObj.hobbies_passion) {
        profileObj.hobbies_passion = { ...profileObj.hobbies_passion }
        if (profileObj.hobbies_passion.hobbies.data.length) {
            profileObj.hobbies_passion.hobbies.data = await hobbiesData(profileObj.hobbies_passion.hobbies.data)
        }
        if (profileObj.hobbies_passion.passion.data.length) {
            profileObj.hobbies_passion.passion.data = await passionsData(profileObj.hobbies_passion.passion.data)
        }
    }
    if (profileObj.personal_info) {
        profileObj.personal_info = { ...profileObj.personal_info }
        const languageName = await personInfoData(profileObj.personal_info.pref_language)
        profileObj.personal_info.pref_languageName = languageName[0]
    }
    return profileObj;
}

const findCurrCatGradeName = async (catId, gradeId) => {
    const category = await currCategory.findOne({
        _id: catId
    })
    const grade = category.grades.filter(grade => {
        return grade.id = gradeId
    })
    return { currCatName: category.name, currGradeName: grade[0].val }
}

const findSubjectNames = async (subjectsArray) => {
    let finalSubArray = [];
    for (let subject of subjectsArray) {
        subject = { ...subject }
        const subjectsData = await newsubject.findOne({
            _id: subject.id
        })
        subject.name = subjectsData.name;
        finalSubArray.push(subject)
    }
    return finalSubArray
}

const findInstituteName = async (instituteId) => {
    let instituitonRecord = await instituiton.findOne({
        _id: instituteId
    })
    return instituitonRecord.name
}

const educationDetails = async (data) => {
    let boardDataFromLookup = await getlookupbyname('board')
    let educationData = [];
    for (let education of data) {
        education = { ...education }
        education.institute_name = await findInstituteName(education.institute_id);
        const { currCatName, currGradeName } = await findCurrCatGradeName(education.curr_cat_id, education.curr_grade_id)
        education.curr_cat_name = currCatName;
        education.curr_grade_name = currGradeName;
        let boardData = boardDataFromLookup[0].data.filter(board => {
            if (education.study_field_id === board.id) {
                return board;
            }
        })
        education.study_field = boardData[0].name;
        educationData.push(education)
    }
    return educationData
}

const professionDetails = async (data) => {
    let professionData = [];
    for (let profession of data) {
        profession = { ...profession };
        let companyInfo = await company.findOne({
            _id: profession.comp_id
        })
        profession.company_name = companyInfo.name;
        let designationInfo = await designation.findOne({
            _id: profession.design_id
        })
        profession.designation = designationInfo.name;
        let areaExpertInfo = await areaExpert.findOne({
            _id: profession.area_exp_id
        })
        profession.area_expert = areaExpertInfo.name
        professionData.push(profession)
    }
    return professionData
}

const awardDetails = async (data) => {
    let awardsData = [];
    for (let award of data) {
        award = { ...award };
        let certificateInfo = await certification.findOne({
            _id: award.cert_id
        })
        award.cert_name = certificateInfo.name;
        let universityInfo = await university.findOne({
            _id: award.univ_id
        })
        award.univ_name = universityInfo.name
        awardsData.push(award)
    }
    return awardsData;
}

const skillsData = async (data) => {
    let skillsDataFromLookup = await getlookupbyname('Skills')
    let skillsData = [];
    for (let skill of data) {
        skill = { ...skill }
        let skillData = skillsDataFromLookup[0].data.filter(skillInfo => {
            if (skill.id === skillInfo.id) {
                return skillInfo;
            }
        })
        skill.name = skillData[0].name
        skillsData.push(skill)
    }
    return skillsData
}

const interestsData = async (data) => {
    let interestsDataFromLookup = await getlookupbyname('Interest')
    let interestsData = [];
    for (let interest of data) {
        interest = { ...interest }
        let interestData = interestsDataFromLookup[0].data.filter(interestInfo => {
            if (interest.id === interestInfo.id) {
                return interestInfo;
            }
        })
        interest.name = interestData[0].name
        interestsData.push(interest)
    }
    return interestsData
}

const hobbiesData = async (data) => {
    let hobbiesDataFromLookup = await getlookupbyname('Hobbies')
    let hobbiesData = [];
    for (let hobbie of data) {
        hobbie = { ...hobbie }
        let hobbieData = hobbiesDataFromLookup[0].data.filter(hobbieInfo => {
            if (hobbie.id === hobbieInfo.id) {
                return hobbieInfo;
            }
        })
        hobbie.name = hobbieData[0].name
        hobbiesData.push(hobbie)
    }
    return hobbiesData
}

const passionsData = async (data) => {
    let passionsDataFromLookup = await getlookupbyname('Passion')
    let passionsData = [];
    for (let passion of data) {
        passion = { ...passion }
        let passionData = passionsDataFromLookup[0].data.filter(passionInfo => {
            if (passion.id === passionInfo.id) {
                return passionInfo;
            }
        })
        passion.name = passionData[0].name
        passionsData.push(passion)
    }
    return passionsData
}

const personInfoData = async (data) => {
    let personInfoDataFromLookup = await getlookupbyname('language')
    let lookupdata = personInfoDataFromLookup[0].data
    let languageName = [];
    for(let i = 0; i < lookupdata.length; i++) {
        if(lookupdata[i].id === data){
            languageName.push(lookupdata[i].name)
        }
    }
    return languageName;
}


export const updateDbMetadata = async(profileId) => {
    try {
        let metaDataIds: any = [];
        const dbMetadata = await userprofile.find({});
        for(let i = 0; i < dbMetadata.length; i++){
            let ZerodbMetadata =  dbMetadata[i].db_metadata.length;
            if(ZerodbMetadata === 0){
                metaDataIds.push(dbMetadata[i]._id)
            }
        }
        console.log(metaDataIds);

        const metaResult = await userprofile.updateMany(
            {
                "_id": {$in: [metaDataIds]}
            },
            {
                $push: {
                    "db_metadata": {
                        $each: [
                            {
                                "db_id" : 1,
                                "collection_id" : "654b2b2fb8dd6093d5989019",
                            },
                            {
                                "db_id" : 2,
                                "collection_id" : "654b2b8eb8dd6093d598903d",
                            },
                            {
                                "db_id" : 3,
                                "collection_id" : "654b2bd6b8dd6093d5989061",
                            },
                            {
                                "db_id" : 4,
                                "collection_id" : "654b2c1eb8dd6093d5989085",
                            },
                            {
                                "db_id" : 5,
                                "collection_id" : "654b2c86b8dd6093d59890a9",
                            },
                            {
                                "db_id" : 6,
                                "collection_id" : "654b2cb8b8dd6093d59890cd",
                            },
                            {
                                "db_id" : 7,
                                "collection_id" : "654b2cf8b8dd6093d59890f1",
                            },
                            {
                                "db_id" : 8,
                                "collection_id" : "654b2d2fb8dd6093d5989115",
                            },
                            {
                                "db_id" : 9,
                                "collection_id" : "654b2d6db8dd6093d5989139",
                            },
                            {
                                "db_id" : 10,
                                "collection_id" : "654b2dbfb8dd6093d598915d",
                            },
                            {
                                "db_id" : 11,
                                "collection_id" : "654b2dedb8dd6093d5989181",
                            },
                            {
                                "db_id" : 12,
                                "collection_id" : "654b2e1fb8dd6093d59891a5",
                            },
                            {
                                "db_id" : 13,
                                "collection_id" : "654b2e4db8dd6093d59891c9",
                            },
                            {
                                "db_id" : 14,
                                "collection_id" : "654b2e7ab8dd6093d59891ed",
                            },
                            {
                                "db_id" : 15,
                                "collection_id" : "654b2eafb8dd6093d5989211",
                            },
                            {
                                "db_id" : 16,
                                "collection_id" : "654b2f21b8dd6093d5989259",
                            },
                            {
                                "db_id" : 17,
                                "collection_id" : "654b2f65b8dd6093d598927d",
                            },
                            {
                                "db_id" : 18,
                                "collection_id" : "654b2f99b8dd6093d59892a1",
                            },
                            {
                                "db_id" : 19,
                                "collection_id" : "6566cb9ff2343e677e143d9f",
                            },
                            {
                                "db_id" : 20,
                                "collection_id" : "656d5a15d3e186b0fd2a94ae",
                            },
                            {
                                "db_id" : 21,
                                "collection_id" : "656d807ad3e186b0fd2a94d2",
                            },
                            {
                                "db_id" : 22,
                                "collection_id" : "657017d41687c3c39ee7e00e",
                            },
                            {
                                "db_id" : 23,
                                "collection_id" : "657018591687c3c39ee7e078",
                            },
                            {
                                "db_id" : 24,
                                "collection_id" : "657019c31687c3c39ee7e09c",
                            },
                            {
                                "db_id" : 25,
                                "collection_id" : "65701af11687c3c39ee7e0e3",
                            }
                        ]
                    }
                }
            }
        )
        return metaResult;
    } catch (error) {
        throw Error('updateDbMetadata ' + error.message)
    }
}


export { adduserProfile, updateuserProfile, getuserProfile, updateUserAwardCertificate }