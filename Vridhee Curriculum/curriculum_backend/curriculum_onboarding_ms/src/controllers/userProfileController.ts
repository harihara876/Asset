import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import {
    adduserProfile, updateuserProfile,
    getuserProfile,
    deleteAward,
    deleteProfession,
    deleteEducation,
    updateAward,
    updateProfession,
    updateEducation,
    getuserdata,
    updateUserAwardCertificate,
    updateDbMetadata
} from '../services/userProfileService';
import { APIResponse, ResponseWithObject, Status } from '../utils/status';
import {
    IAddOrResponseUserProfile,
    IProfileIdQuery, IProfileIdAndSectionQuery, ICombinedProfileInterface,
    IAwardsQuery, IProfessionQuery, IEducationQuery, IUpdateAwardQuery,
    IUpdateProfessionQuery, IUpdateEducationQuery, IupdateAwardData,
    IupdateProfession, IupdateEducationData, IUserQuery, IAwardsData
} from '../models/interfaces'
import { noDataAvail, noDataAvailDelete, noDataAvailUpdate } from '../utils/errormsg';
import { actor, userprofile } from '../dbmanager/dbconnection';
import mongoose from 'mongoose';
import { uploadFileIntoS3 } from '../utils/s3Config';
import { addGradeWiseChaptersAndTopics } from '../services/utilService';
import { configData } from '../utils/config';


export const addUserProfile = async (req: Request<{}, IAddOrResponseUserProfile, IAddOrResponseUserProfile, {}>,
    res: Response, next: NextFunction) => {
    try {
        const {
            act_typ, user_id, personal_info, cr_dts, up_dts
        } = req.body;
        const userProfile = { act_typ, user_id, personal_info, cr_dts, up_dts };
        const profile = await adduserProfile(userProfile);
        if (profile) {
            return res.status(201).send(new ResponseWithObject(201, "done", profile));
        } else {
            return res.send(new APIResponse(400, 'Userprofile not created'));
        }
    } catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export const updateUserProfile = async (req: Request<{}, {}, ICombinedProfileInterface, IProfileIdAndSectionQuery>, res: Response, next: NextFunction) => {
    try {
        const { profileId, profileSection } = req.query;
        const updateProfile = await updateuserProfile(req.body, profileId, profileSection);
        if (updateProfile && updateProfile.modifiedCount == 1) {
            if (profileSection === 'learning') {
                const afterProfileUpdate = await userprofile.findOne({ '_id': profileId });
                const { user_id, currCatId, currGradeId, subjectId } = await addGradeWiseChaptersAndTopics(afterProfileUpdate);
                await axios({
                    method: 'post',
                    url: `${configData.curriculumDashboardModuleMS}addGradeWiseChaptersAndTopics`,
                    data: { user_id, currCatId, currGradeId, subjectId }
                })
            }
            return res.status(200).send(new ResponseWithObject(200, "User profile is updated", updateProfile));
        } else if (updateProfile) {
            return res.send(new APIResponse(200, 'User profile is updated'));
        } else {
            return res.send(new APIResponse(400, 'User profile is not updated'));
        }
    } catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export const updateUserAwardsCertificates = async (req: Request<{}, {}, IAwardsData, IProfileIdAndSectionQuery>, res: Response, next: NextFunction) => {
    try {
        const { profileId, profileSection } = req.query;
        const image = req.body.file
        const bodyData = JSON.parse(req.body.data);
        const { cert_name, univ_name, cert_no, cert_url, start_date, end_date } = bodyData
        const s3URL = await uploadFileIntoS3(profileId, image);
        const imageUrl = s3URL.url;
        let awardCertificateObj = {
            awards_certificates: {
                data: [{
                    cert_img: imageUrl,
                    cert_name: cert_name,
                    univ_name: univ_name,
                    cert_no: cert_no,
                    cert_url: cert_url,
                    start_date: start_date,
                    end_date: end_date
                }]

            }
        }
        const updateProfile = await updateUserAwardCertificate(awardCertificateObj, profileId, profileSection);
        if (updateProfile && updateProfile.modifiedCount == 1) {
            return res.status(200).send(new ResponseWithObject(200, "User profile is updated", updateProfile));
        } else if (updateProfile && updateProfile.modifiedCount == 0) {
            return res.send(new APIResponse(400, 'Not updated, because same data has in the database'));
        } else {
            return res.send(new APIResponse(400, 'User profile is not updated'));
        }
    } catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export const getUserProfile = async (req: Request<{}, {}, {}, IProfileIdQuery>, res: Response, next: NextFunction) => {
    try {
        const { profileId } = req.query;
        const profile = await getuserProfile(profileId);
        if (profile) {
            return res.status(200).send(new ResponseWithObject(200, "done", profile));
        } else {
            return res.send(new APIResponse(400, 'User profile not found'));
        }
    } catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export const deleteAwardData = async (req: Request<{}, {}, {}, IAwardsQuery>, res: Response, next: NextFunction) => {
    try {
        let getAwards_id = req.query.awards_id;
        let get_id = req.query._id;

        const updateAward = await deleteAward(getAwards_id, get_id);
        if (updateAward && updateAward.modifiedCount == 1) {
            return res.status(200).send(new ResponseWithObject(200, "Delete Success", updateAward));
        }
        else {
            return res.send(new APIResponse(400, noDataAvailDelete));
        }
    }
    catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export const deleteProfessionalData = async (req: Request<{}, {}, {}, IProfessionQuery>, res: Response, next: NextFunction) => {
    try {
        let getProfession_id = req.query.profession_id;
        let get_id = req.query._id;

        const updateProfession = await deleteProfession(getProfession_id, get_id);
        if (updateProfession && updateProfession.modifiedCount == 1) {
            return res.status(200).send(new ResponseWithObject(200, "Delete Success", updateProfession));
        }
        else {
            return res.send(new APIResponse(400, noDataAvailDelete));
        }
    }
    catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export const deleteEducationalData = async (req: Request<{}, {}, {}, IEducationQuery>, res: Response, next: NextFunction) => {
    try {
        let getEducation_id = req.query.education_id;
        let get_id = req.query._id;

        const updateEducation = await deleteEducation(getEducation_id, get_id);
        if (updateEducation && updateEducation.modifiedCount == 1) {
            return res.status(200).send(new ResponseWithObject(200, "Delete Success", updateEducation));
        }
        else {
            return res.send(new APIResponse(400, noDataAvailDelete));
        }
    }
    catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export const updateAwardData = async (req: any, res: any, next: any) => {
    try {
        const image = req.body.file;
        let imageUrl = '';
        const bodyData = JSON.parse(req.body.data);
        const { awards_id, _id, cert_name, univ_name, cert_no, cert_url, start_date, end_date } = bodyData
        if (image) {
            const s3URL = await uploadFileIntoS3(_id, image);
            imageUrl = s3URL.url;
        }

        let awardObj = { awards_id, _id, imageUrl, cert_name, univ_name, cert_no, cert_url, start_date, end_date }

        const updationAward = await updateAward(awardObj);
        if (updationAward && updationAward.modifiedCount == 1 || updationAward.matchedCount == 1) {
            return res.status(200).send(new ResponseWithObject(200, "Update Success", updationAward));
        }
        else {
            return res.send(new APIResponse(400, noDataAvailUpdate));
        }
    }
    catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export const updateProfessionData = async (req: Request<{}, {}, IupdateProfession, IUpdateProfessionQuery>, res: Response, next: NextFunction) => {
    try {
        const {
            profession_id, _id, comp_id, company_name, design_id, designation, area_exp_id, area_expert, start_date, end_date, achievements, Descr
        } = req.body;

        const professionDetail = { profession_id, _id, comp_id, company_name, design_id, designation, area_exp_id, area_expert, start_date, end_date, achievements, Descr }
        const updationProfession = await updateProfession(professionDetail);
        if (updationProfession && updationProfession.modifiedCount == 1) {
            return res.status(200).send(new ResponseWithObject(200, "Update Success", updationProfession));
        }
        else {
            return res.send(new APIResponse(400, noDataAvailUpdate));
        }
    }
    catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export const updateEducationData = async (req: Request<{}, {}, IupdateEducationData, IUpdateEducationQuery>, res: Response, next: NextFunction) => {
    try {
        const {
            education_id, _id, institute_id, institute_name, curr_cat_id, curr_cat_name, curr_grade_id, curr_grade_name, study_field_id, study_field, start_date, end_date, achievements, desc, grade
        } = req.body;

        const educationDetail = { education_id, _id, institute_id, institute_name, curr_cat_id, curr_cat_name, curr_grade_id, curr_grade_name, study_field_id, study_field, start_date, end_date, achievements, desc, grade }
        const updationEducation = await updateEducation(educationDetail);
        if (updationEducation && updationEducation.modifiedCount == 1) {
            return res.status(200).send(new ResponseWithObject(200, "Update Success", updationEducation));
        }
        else {
            return res.send(new APIResponse(400, noDataAvailUpdate));
        }
    }
    catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export const getUserDetails = async (req: Request<{}, {}, {}, IUserQuery>, res: Response, next: NextFunction) => {
    try {
        let { userId } = req.query

        const user = await getuserdata(userId);

        let getActId = [];

        let actTypes = user[0].act_typ;

        actTypes.forEach((actType) => {
            getActId.push(actType.typ_id);
        });

        let getActTypeNames = await actor.find({ "_id": { "$in": [getActId] } }, { _id: 0, type: 1 });

        let lengthArray = [];

        if (getActTypeNames.some((item) => item.type === 'Learner' || item.type === 'Parent')) {
            let lengths = [
                Object.keys(user[0].personal_info).length,
                Object.keys(user[0].learning.subjects).length
            ]
            lengthArray.push(...lengths);
        }

        else if (getActTypeNames.some((item) => item.type === 'Teacher')) {
            let lengths = [
                Object.keys(user[0].personal_info).length,
                Object.keys(user[0].teaching.subjects).length
            ]
            lengthArray.push(...lengths);
        }

        if (lengthArray.some((length) => length === 0)) {
            res.status(200).send(new ResponseWithObject(400, "Onboarding_not_Completed"));
        } else {
            res.status(200).send(new ResponseWithObject(200, "Onboarding_Completed"))
        }
    }
    catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export const getMentors = async (req: Request, res: Response, next: NextFunction) => {
    const { subjectName } = req.body;
    const MathsMentor = [
        {
            id: "1",
            name: "Suresh macharla",
            text: "Science ProfessorHighly recommended",
            exp: "Holding five years of professional experience",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            id: "2",
            name: "Shekar Gogineni",
            text: "Highly recommended",
            exp: "Holding four years of professional experience",
            image: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];
    const PhysicsMentor = [
        {
            id: "1",
            name: "Vladimir Lupinskiy",
            text: "Highly recommended",
            exp: "Holding Eleven years of Technical experience",
            image: "https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/prn.png"
        },
        {
            id: "2",
            name: "Sneha Kollipara",
            text: "Highly recommended",
            exp: "Holding four years of professional experience",
            image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg"
        }
    ];
    const ChemistryMentor = [
        {
            id: "1",
            name: "Vikas Tomar",
            text: "Science ProfessorHighly recommended",
            exp: "Holding five years of professional experience",
            image: "https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/learnerImage1.jpeg"
        },
        {
            id: "2",
            name: "Arvind Sisodia",
            text: "Highly recommended",
            exp: "Holding four years of professional experience",
            image: "https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/learnerImage2.jpeg"
        }
    ];
    const Mentor = [
        {
            id: "1",
            name: "Shiv Shukla",
            text: "Science ProfessorHighly recommended",
            exp: "Holding fifteen years of professional experience",
            image: "https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/learnerImage3.jpeg"
        },
        {
            id: "2",
            name: "Dipanwita Biswas",
            text: "Highly recommended",
            exp: "Holding four years of professional experience",
            image: "https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/learnerImage4.jpg"
        }
    ];
    if (subjectName === 'Mathematics') {
        return res.status(200).send(new Status(200, MathsMentor));
    } else if (subjectName === 'Physics') {
        return res.status(200).send(new Status(200, PhysicsMentor));
    } else if (subjectName === 'Chemistry') {
        return res.status(200).send(new Status(200, ChemistryMentor));
    } else if (subjectName === 'Semiconductors') {
        return res.status(200).send(new Status(200, Mentor));
    } else {
        return res.send(new APIResponse(400, 'Data not found'));
    }
}

