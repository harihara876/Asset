import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { APIResponse, details, ResponseWithObject } from '../utils/status';
import { configData } from '../utils/config';
import { DB_METADATA, USER_ID, INVALID_USER_ID } from '../utils/errormsg';
const curriculumDashboardURL = configData.curriculumDashboardModuleMS;

interface IProfileId {
    "profileId": string
}

interface IGetCurricilimSubject {
    "categoryId": string,
    "gradeId": string,
    "sub_id": string,
    "userid": string
}

router.get('/getCurriculumSubjects', async (req: Request<{}, {}, {}, IProfileId>, res: Response, next: NextFunction) => {
    let { profileId } = req.query;
    if (!profileId) {
        return res.send(new APIResponse(400, 'profileId id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
        return res.send(new APIResponse(400, 'Invalid profileId'));
    }
    try {
        await axios({
            method: 'get',
            url: `${curriculumDashboardURL}getCurriculumSubjects`,
            data: req.query
        }).then((curriculum) => {
            return res.send(new details(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.get('/getCurriculumSubjectDetails', async (req: Request<{}, {}, {}, IGetCurricilimSubject>, res: Response, next: NextFunction) => {
    let { categoryId, gradeId, sub_id } = req.query;
    if (!categoryId) {
        return res.send(new APIResponse(400, 'categoryId id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.send(new APIResponse(400, 'Invalid categoryId'));
    }
    if (!gradeId) {
        return res.send(new APIResponse(400, 'categoryId id is mandatory'));
    }
    if (!sub_id) {
        return res.send(new APIResponse(400, 'gradeId id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(sub_id)) {
        return res.send(new APIResponse(400, 'sub_id categoryId'));
    }
    try {
        await axios({
            method: 'get',
            url: `${curriculumDashboardURL}getCurriculumSubjectDetails`,
            data: req.query
        }).then((curriculum) => {
            return res.send(new ResponseWithObject(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})
//Create this v2 for push header & total content count information in getSubjectDetails api Response
router.get('/getCurriculumSubjectDetailsV2', async (req: Request<{}, {}, {}, IGetCurricilimSubject>, res: Response, next: NextFunction) => {
    let { categoryId, gradeId, sub_id, userid } = req.query;
    if (!categoryId) {
        return res.send(new APIResponse(400, 'categoryId id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.send(new APIResponse(400, 'Invalid categoryId'));
    }
    if (!gradeId) {
        return res.send(new APIResponse(400, 'categoryId id is mandatory'));
    }
    if (!sub_id) {
        return res.send(new APIResponse(400, 'gradeId id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(sub_id)) {
        return res.send(new APIResponse(400, 'sub_id categoryId'));
    }
    if (!userid) {
        return res.send(new APIResponse(400, 'userid id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(userid)) {
        return res.send(new APIResponse(400, 'Invalid UserId'));
    }
    try {
        await axios({
            method: 'get',
            url: `${curriculumDashboardURL}getCurriculumSubjectDetailsV2`,
            data: req.query
        }).then((curriculum) => {
            return res.send(new ResponseWithObject(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

// APi for disply subjects & curriculum count in dashboard screen
router.get('/getCurriculumSubjectsV2', async (req: Request<{}, {}, {}, IProfileId>, res: Response, next: NextFunction) => {
    let { profileId } = req.query;
    if (!profileId) {
        return res.send(new APIResponse(400, 'profileId id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
        return res.send(new APIResponse(400, 'Invalid profileId'));
    }
    try {
        await axios.get(curriculumDashboardURL + 'getCurriculumSubjectsV2?profileId=' + profileId).then((curriculum) => {
            return res.send(new details(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getCurriculumHeader', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id } = req.body
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
            url: `${curriculumDashboardURL}getCurriculumHeader`,
            data: req.body
        }).then((curriculum) => {
            return res.send(new ResponseWithObject(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch((error) => {
            return res.send(new APIResponse(error.response.status, error.response.data.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getCurriculum', async (req: Request, res: Response, next: NextFunction) => {
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
            url: `${curriculumDashboardURL}getCurriculum`,
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

export = router;