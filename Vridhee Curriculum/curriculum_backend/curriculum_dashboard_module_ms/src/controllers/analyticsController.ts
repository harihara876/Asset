import { Request, Response, NextFunction } from 'express'
import { APIResponse, APIResponseWithdetails, ResponseWithObject } from "../utils/status";
import { noDataAvail, noMetaDataAvail, usrNotExistsErrMsg } from '../utils/errormsg';
import { findDbMetaDataDetails, getUserNameProfImg } from '../services/userActivity';
import { userInprogressCurriculum, performance, progress, engagement } from '../services/analyticsService';

export async function getInprogressSubjects(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata } = req.body;
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
        const curriculum = await userInprogressCurriculum(user_id, dbName, collectionName, userResult[0].learning);
        if (curriculum && curriculum.length) {
            return res.status(200).send(new APIResponseWithdetails(200, "done", curriculum));
        } else {
            return res.status(400).send(new APIResponse(201, noDataAvail));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function getPerformance(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata, cat_id, grade_id, sub_id } = req.body;
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, noMetaDataAvail));
        }
        const dbName = dbMetaDataInfo[0].db_name;
        const collectionName = dbMetaDataInfo[0].act_collection[0].name;
        const performanceData = await performance(user_id, dbName, collectionName, cat_id, grade_id, sub_id);
        if (performanceData && performanceData.status == 200) {
            return res.status(200).send(new ResponseWithObject(200, "done", performanceData.data));
        } else {
            return res.status(400).send(new APIResponse(400, noDataAvail));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function getEngagement(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata, cat_id, grade_id, sub_id } = req.body;
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, noMetaDataAvail));
        }
        const dbName = dbMetaDataInfo[0].db_name;
        const collectionName = dbMetaDataInfo[0].act_collection[0].name;
        const engagementData = await engagement(user_id, dbName, collectionName, cat_id, grade_id, sub_id);
        if (engagementData && engagementData.status == 200) {
            return res.status(200).send(new ResponseWithObject(200, "done", engagementData.data));
        } else {
            return res.status(400).send(new APIResponse(400, noDataAvail));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function getProgress(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata, cat_id, grade_id, sub_id } = req.body;
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, noMetaDataAvail));
        }
        const dbName = dbMetaDataInfo[0].db_name;
        const collectionName = dbMetaDataInfo[0].act_collection[0].name;
        const progressData = await progress(user_id, dbName, collectionName, cat_id, grade_id, sub_id);
        if (progressData && progressData.status == 200) {
            return res.status(200).send(new ResponseWithObject(200, "done", progressData.data));
        } else {
            return res.status(400).send(new APIResponse(400, noDataAvail));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}