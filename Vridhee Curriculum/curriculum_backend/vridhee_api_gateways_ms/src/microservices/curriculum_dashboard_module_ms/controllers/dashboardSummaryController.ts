import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { APIResponse, ResponseWithObject } from '../utils/status';
import { configData } from '../utils/config';
import mongoose from 'mongoose';

const dashboardURL = configData.curriculumDashboardModuleMS;

router.get('/getDashboardSummaryData', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.act_type) {
            return res.send(new APIResponse(400, 'act_type is mandatory'));
        }
        if (!req.query.summary_type) {
            return res.send(new APIResponse(400, 'summary_type is mandatory'));
        }
        await axios({
            method: 'get',
            url: `${dashboardURL}getDashboardSummary`,
            data: req.query
        }).then((result) => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.post('/addCurriculamTopicSummary', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { t_id, t_header, t_content, t_body, t_includes } = req.body;
        if (!t_id) {
            return res.send(new APIResponse(400, 't_id is mandatory'));
        }
        const topicSummary = { t_id, t_header, t_content, t_body, t_includes }
        await axios({
            method: 'post',
            url: `${dashboardURL}addCurriculamTopicSummary`,
            data: topicSummary
        }).then((result) => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch((error) => {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.get('/getCurriculumTopicSummary', async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.query.topic_id) {
            return res.send(new APIResponse(400, 'Topic id is mandatory in params'));
        }

        await axios({
            method: 'get',
            url: `${dashboardURL}getCurriculumTopicSummary`,
            data: req.query
        }).then((curriculum) => {
            if (curriculum.data.status == 200) {
                return res.send(new ResponseWithObject(curriculum.data.code, curriculum.data.message, curriculum.data.data));
            } else {
                return res.send(new APIResponse(curriculum.data.status, curriculum.data.message))
            }
        }).catch(error => {
            if (error.response == undefined) {
                return res.status(502).send(new APIResponse(502, error.message))
            }
            else {
                return res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
            }
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})


router.get('/getActorDashboardSummaryData', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, catId, gradeId, subjectId } = req.query
        // if (!req.query.act_type) {
        //     return res.send(new APIResponse(400, 'act_type is mandatory'));
        // }
        if (!user_id) {
            return res.send(new APIResponse(400, 'User Id is mandatory'));
        }
        if (!catId) {
            return res.send(new APIResponse(400, 'Category Id is mandatory'));
        }
        if (!gradeId) {
            return res.send(new APIResponse(400, 'Grade Id is mandatory'));
        }
        if (!subjectId) {
            return res.send(new APIResponse(400, 'Subject Id is mandatory'));
        }
        await axios.get(dashboardURL + 'getActorDashboardSummary?user_id=' + user_id + '&catId=' + catId + '&gradeId=' + gradeId + '&subjectId=' + subjectId).then((actor) => {
            return res.send(new ResponseWithObject(actor.data.status, actor.data.message, actor.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.post('/addActorDashboardSummary', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { actorType } = req.query;
        const { user_id, ttl_cnt, curr_body, ttl_buddy_cnt, hrs_sts, studyplan, activities, collaboration, header, body } = req.body;
        const actorSummaryObj = { user_id, ttl_cnt, curr_body, ttl_buddy_cnt, hrs_sts, studyplan, activities, collaboration, header, body };
        if (!actorType) {
            return res.send(new APIResponse(400, 'actorType is mandatory'));
        }
        if (!user_id) {
            return res.send(new APIResponse(400, 'user_id is mandatory'));
        }
        await axios({
            method: 'post',
            url: `${dashboardURL}addActorDashboardSummary?actorType=${actorType}`,
            data: actorSummaryObj
        }).then((result) => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch((error) => {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.get('/subjectNeedToJoin', async (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.query.user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    
    try {
        await axios({
            method: 'get',
            url: `${dashboardURL}subjectNeedToJoin`,
            data: req.query
        }).then((result) => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.get('/getUserDashboardSummary', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.send(new APIResponse(400, 'User Id is mandatory'));
        }
        await axios.get(dashboardURL + 'getUserDashboardSummary?userId=' + userId).then((dashboard) => {
            return res.send(new ResponseWithObject(dashboard.data.status, dashboard.data.message, dashboard.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

export = router