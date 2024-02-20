import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { APIResponse, ResponseWithObject } from '../utils/status';
import { configData } from '../utils/config';
import { noMentors } from '../utils/errormsg';

const dashboardURL = configData.curriculumDashboardModuleMS;

router.post('/insertActorVCoin', async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, db_metadata } = req.query;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'UserId is mandatory'));
    }
    if (!req.body.user_id) {
        return res.send(new APIResponse(400, 'User_id in body is mandatory'));
    }
    if (!req.body.activity_id) {
        return res.send(new APIResponse(400, 'activity_id in body is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}addActorVCoin?user_id=${user_id}&db_metadata=${db_metadata}`,
            data: req.body
        }).then(vCoin => {
            return res.send(new ResponseWithObject(vCoin.data.status, vCoin.data.message, vCoin.data.data));
        }).catch(error => {
            if (error && error.response.data && error.response.data.status === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new APIResponse(400, error.message));
            }
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.put('/updateActorVCoin', async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, db_metadata } = req.query;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'UserId is mandatory'));
    }
    if (!req.body.user_id) {
        return res.send(new APIResponse(400, 'User_id in body is mandatory'));
    }
    if (!req.body.activity_id) {
        return res.send(new APIResponse(400, 'activity_id in body is mandatory'));
    }
    try {
        await axios({
            method: 'put',
            url: `${dashboardURL}updateActorVCoin?user_id=${user_id}&db_metadata=${db_metadata}`,
            data: req.body
        }).then(vCoin => {
            return res.send(new ResponseWithObject(vCoin.data.status, vCoin.data.message, vCoin.data.data));
        }).catch(error => {
            if (error && error.response.data && error.response.data.status === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new APIResponse(400, error.message));
            }
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.get('/getMentorsList', async (req: Request, res: Response, next: NextFunction) => {
    const { subjectId } = req.query;
    if (!subjectId) {
        return res.send(new APIResponse(400, 'Subject Id is mandatory'));
    }
    try {
        await axios({
            method: 'get',
            url: `${dashboardURL}getMentorsList?subjectId=${subjectId}`,
        }).then(mentors => {
            return res.send(new ResponseWithObject(mentors.data.status, mentors.data.message, mentors.data.data));
        }).catch(error => {
            if (error && error.response.data && error.response.data.status === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new APIResponse(400, noMentors));
            }
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.post('/addPGCampus', async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, db_metadata } = req.query;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'UserId is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}addPGCampus?user_id=${user_id}&db_metadata=${db_metadata}`,
            data: req.body
        }).then(pgCampus => {
            return res.send(new ResponseWithObject(pgCampus.data.status, pgCampus.data.message, pgCampus.data.data));
        }).catch(error => {
            if (error && error.response.data && error.response.data.status === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new APIResponse(400, error.message));
            }
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

export = router