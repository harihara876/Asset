import express, { Request, Response, NextFunction } from 'express';
import axios from "axios";
import { configData } from '../utils/config';
import { APIResponse, ResponseWithObject } from "../utils/status";
import router from "./commonVridheeCurriculumController";
import multer from 'multer';
const upload = multer();

const dashboardURL = configData.curriculumDashboardModuleMS;
console.log("axios url>>", dashboardURL)


router.post('/getCollaborationCount', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id } = req.query;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}getCollaborationCount?user_id=${user_id}&db_metadata=${db_metadata}`,
            data: req.body
    }).then(async currActivity => {
            return res.send(new ResponseWithObject(currActivity.data.status, currActivity.data.message, currActivity.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.get('/getActorCurrContentActivity', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id, subjectId, chapterId, topicId } = req.query;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    try {
        await axios({
            method: 'get',
            url: `${dashboardURL}getActorCurrContentActivity?user_id=${user_id}&db_metadata=${db_metadata}&subjectId=${subjectId}&chapterId=${chapterId}&topicId=${topicId}`,
    }).then(async contentActivity => {
            return res.send(new ResponseWithObject(contentActivity.data.status, contentActivity.data.message, contentActivity.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.get('/getActorFeedPost', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id } = req.query;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    try {
        await axios({
            method: 'get',
            url: `${dashboardURL}getActorFeedPost?user_id=${user_id}&db_metadata=${db_metadata}`,
    }).then(async feedPost => {
            return res.send(new ResponseWithObject(feedPost.data.status, feedPost.data.message, feedPost.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.put('/updateActorEContentCurrActivity', async (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.summaryObj.user_id && !req.body.currActObj.user_id){
        return res.send(new APIResponse(400, 'user_id is mandatory in both objects'));
    }
    if(!req.body.summaryObj.db_metadata && !req.body.currActObj.db_metadata){
        return res.send(new APIResponse(400, 'db_metadata is mandatory in both objects'));
    }
    if(!req.body.summaryObj.subjectId && !req.body.currActObj.subjectId){
        return res.send(new APIResponse(400, 'subjectId is mandatory in both objects'));
    }
    if(!req.body.summaryObj.chapterId && !req.body.currActObj.chapterId){
        return res.send(new APIResponse(400, 'user_id is mandatory in both objects'));
    }
    if(!req.body.summaryObj.topicId && !req.body.currActObj.topicId){
        return res.send(new APIResponse(400, 'user_id is mandatory in both objects'));
    }
    try {
        await axios({
            method: 'put',
            url: `${dashboardURL}updateActorEContentCurrActivity`,
            data: req.body
    }).then(async currActivity => {
            return res.send(new ResponseWithObject(currActivity.data.status, currActivity.data.message, currActivity.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, "No Data Available to Update"));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.get('/getActorFeedPost', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id } = req.query;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    try {
        await axios({
            method: 'get',
            url: `${dashboardURL}getActorFeedPost?user_id=${user_id}&db_metadata=${db_metadata}`,
    }).then(async feedPost => {
            return res.send(new ResponseWithObject(feedPost.data.status, feedPost.data.message, feedPost.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getCourseContentV1', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, userId } = req.query;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!userId) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!req.body.userId) {
        return res.send(new APIResponse(400, 'User Id in body is mandatory'));
    }
    if (!req.body.subjectId) {
        return res.send(new APIResponse(400, 'subject Id in body is mandatory'));
    }
    if (!req.body.catId) {
        return res.send(new APIResponse(400, 'CatId in body is mandatory'));
    }
    if (!req.body.gradeId) {
        return res.send(new APIResponse(400, 'Grade Id in body is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}getCourseContentV1?userId=${userId}&db_metadata=${db_metadata}`,
            data: req.body
    }).then(async courseContent => {
            return res.send(new ResponseWithObject(courseContent.data.status, courseContent.data.message, courseContent.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addActorFeedPost', upload.single('image'), async (req: any, res: any, next: any) => {
    let bodyData = { file: req.file, data: req.body.data }
    if (!bodyData.data) {
        return res.send(new APIResponse(400, 'Data is required'));
    } 
    if (!bodyData.file) {
        return res.send(new APIResponse(400, "Image is Mandatory"));
    }
    try {
        await axios.post(dashboardURL + 'addActorFeedPost', bodyData).then(async feedPost => {
            return res.send(new ResponseWithObject(feedPost.data.status, feedPost.data.message, feedPost.data.data));
        }).catch(function (error) {
            console.log(error)
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.get('/getLeaderBoard', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { db_metadata, userId, subjectId } = req.query;
        if (!req.query.userId) {
            return res.send(new APIResponse(400, 'User Id is mandatory'));
        }
        if (!req.query.db_metadata) {
            return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
        }
        if (!req.query.subjectId) {
            return res.send(new APIResponse(400, 'Subject Id is mandatory'));
        }
        await axios({
            method: 'get',
            url: `${dashboardURL}getLeaderBoard?userId=${userId}&db_metadata=${db_metadata}&subjectId=${subjectId}`,
        }).then(async leaderBoard => {
            return res.send(new ResponseWithObject(leaderBoard.data.status, leaderBoard.data.message, leaderBoard.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.response.data.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

export = router