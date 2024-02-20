import { Request, Response, NextFunction } from 'express'
import {
    findUserProfile, findCurriculumSubjects, findCurriculumSubjectDetails,
    findCurriculumSubjectsV2, findCurriculumSubjectDetailsV2, getCurriculumHeaderCount, curriculumData
} from "../services/curriculumSubjectsService";
import { APIResponse, APIResponseWithdetails, ResponseWithObject } from "../utils/status";
import { noDataAvail, noMetaDataAvail, usrNotExistsErrMsg } from '../utils/errormsg';
import { findDbMetaDataDetails, getUserNameProfImg } from '../services/userActivity';

export async function getCurriculumSubjects(req: Request, res: Response, next: NextFunction) {
    try {
        const { profileId } = req.body
        const userProfile = await findUserProfile(profileId)
        if (userProfile && userProfile.learning.subjects.length) {
            const curriculumSubjects = await findCurriculumSubjects(userProfile.learning);
            console.log(curriculumSubjects)
            return res.status(200).send(new APIResponseWithdetails(200, "done", curriculumSubjects));
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select atleast one curriculum'));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function getCurriculumSubjectDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const { categoryId, gradeId, sub_id } = req.body
        const curriculumSubjectDetails = await findCurriculumSubjectDetails(categoryId, gradeId, sub_id)
        if (curriculumSubjectDetails) {
            return res.status(200).send(new APIResponseWithdetails(200, "done", curriculumSubjectDetails));
        } else {
            return res.status(400).send(new APIResponse(400, 'Curriculum not found'));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}
//Create this v2 for push header & total content count information in getSubjectDetails api Response
export async function getCurriculumSubjectDetailsV2(req: Request, res: Response, next: NextFunction) {
    try {
        const { categoryId, gradeId, sub_id, userid } = req.body
        const currObj = { categoryId, gradeId, sub_id, userid };
        let db_metadata = '27';
        const activityDBMetaDataInfo = await findDbMetaDataDetails(currObj.userid, db_metadata);
        let dbName = activityDBMetaDataInfo[0].db_name;
        let collectionName = activityDBMetaDataInfo[0].act_collection[0].name;
        const curriculumSubjectDetails = await findCurriculumSubjectDetailsV2(dbName, collectionName, currObj)
        if (curriculumSubjectDetails) {
            return res.status(200).send(new APIResponseWithdetails(200, "done", curriculumSubjectDetails));
        } else {
            return res.status(400).send(new APIResponse(400, 'Curriculum not found'));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

// APi for disply subjects & curriculum count in dashboard screen
export async function getCurriculumSubjectsV2(req: Request, res: Response, next: NextFunction) {
    try {
        const { profileId } = req.query
        const userProfile = await findUserProfile(profileId)
        if (userProfile && userProfile.learning.subjects.length) {
            const curriculumSubjects: any = await findCurriculumSubjectsV2(userProfile.learning, userProfile.user_id);
            if (curriculumSubjects.subjectsData) {
                return res.status(400).send(new APIResponse(201, noDataAvail));
            } else {
                return res.status(200).send(new APIResponseWithdetails(200, "done", curriculumSubjects));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select atleast one curriculum'));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function getCurriculumHeader(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata } = req.body
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, noMetaDataAvail));
        }
        const dbName = dbMetaDataInfo[0].db_name;
        const collectionName = dbMetaDataInfo[0].act_collection[0].name;
        const curriculumHeaderCount = await getCurriculumHeaderCount(user_id, dbName, collectionName)
        if (curriculumHeaderCount) {
            return res.status(200).send(new ResponseWithObject(200, "done", curriculumHeaderCount));
        } else {
            return res.status(400).send(new APIResponse(201, noDataAvail));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function getCurriculum(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata } = req.body
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, noMetaDataAvail));
        }
        const dbName = dbMetaDataInfo[0].db_name;
        const collectionName = dbMetaDataInfo[0].act_collection[0].name;
        const userResult = await getUserNameProfImg(user_id);
        if (!userResult.length) {
            return res.status(400).send(new APIResponse(400, usrNotExistsErrMsg));
        }
        let curriculum = await curriculumData(user_id, dbName, collectionName, userResult[0].learning);
        if (curriculum && curriculum.length) {
            return res.status(200).send(new APIResponseWithdetails(200, "done", curriculum));
        } else {
            return res.status(400).send(new APIResponse(201, noDataAvail));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}