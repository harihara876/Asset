import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { APIResponse, details, ResponseWithObject } from '../utils/status';
import { configData } from '../utils/config';
import { DB_METADATA, USER_ID, INVALID_USER_ID, CAT_ID, GRADE_ID, SUB_ID } from '../utils/errormsg';
const curriculumDashboardURL = configData.curriculumDashboardModuleMS;

router.post('/getInprogressSubjects', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, DB_METADATA));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, USER_ID));
    }
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.send(new APIResponse(400, INVALID_USER_ID));
    }
    try {
        await axios({
            method: 'post',
            url: `${curriculumDashboardURL}getInprogressSubjects`,
            data: req.body
        }).then((curriculum) => {
            return res.send(new details(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch((error) => {
            return res.send(new APIResponse(error.response.status, error.response.data.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/analytics/getPerformance', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { db_metadata, user_id, cat_id, grade_id, sub_id } = req.body;
        if (!db_metadata) {
            return res.send(new APIResponse(400, DB_METADATA));
        }
        if (!user_id) {
            return res.send(new APIResponse(400, USER_ID));
        }
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.send(new APIResponse(400, INVALID_USER_ID));
        }
        if (!cat_id) {
            return res.send(new APIResponse(400, CAT_ID));
        }
        if (!grade_id) {
            return res.send(new APIResponse(400, GRADE_ID));
        }
        if (!sub_id) {
            return res.send(new APIResponse(400, SUB_ID));
        }
        await axios({
            method: 'post',
            url: `${curriculumDashboardURL}getPerformance`,
            data: req.body
        }).then((performance) => {
            return res.send(new ResponseWithObject(performance.data.status, performance.data.message, performance.data.data));
        }).catch((error) => {
            return res.send(new APIResponse(error.response.status, error.response.data.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/analytics/getEngagement', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { db_metadata, user_id, cat_id, grade_id, sub_id } = req.body;
        if (!db_metadata) {
            return res.send(new APIResponse(400, DB_METADATA));
        }
        if (!user_id) {
            return res.send(new APIResponse(400, USER_ID));
        }
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.send(new APIResponse(400, INVALID_USER_ID));
        }
        if (!cat_id) {
            return res.send(new APIResponse(400, CAT_ID));
        }
        if (!grade_id) {
            return res.send(new APIResponse(400, GRADE_ID));
        }
        if (!sub_id) {
            return res.send(new APIResponse(400, SUB_ID));
        }
        await axios({
            method: 'post',
            url: `${curriculumDashboardURL}getEngagement`,
            data: req.body
        }).then((engagement) => {
            return res.send(new ResponseWithObject(engagement.data.status, engagement.data.message, engagement.data.data));
        }).catch((error) => {
            return res.send(new APIResponse(error.response.status, error.response.data.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/analytics/getProgress', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { db_metadata, user_id, cat_id, grade_id, sub_id } = req.body;
        if (!db_metadata) {
            return res.send(new APIResponse(400, DB_METADATA));
        }
        if (!user_id) {
            return res.send(new APIResponse(400, USER_ID));
        }
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.send(new APIResponse(400, INVALID_USER_ID));
        }
        if (!cat_id) {
            return res.send(new APIResponse(400, CAT_ID));
        }
        if (!grade_id) {
            return res.send(new APIResponse(400, GRADE_ID));
        }
        if (!sub_id) {
            return res.send(new APIResponse(400, SUB_ID));
        }
        await axios({
            method: 'post',
            url: `${curriculumDashboardURL}getProgress`,
            data: req.body
        }).then((progress) => {
            return res.send(new ResponseWithObject(progress.data.status, progress.data.message, progress.data.data));
        }).catch((error) => {
            return res.send(new APIResponse(error.response.status, error.response.data.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

export = router;