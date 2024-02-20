import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { APIResponse, ResponseWithObject, Status } from '../utils/status';
import axios from 'axios';
import { configData } from '../utils/config';
import mongoose from 'mongoose';
import { languages } from '../utils/languages';
import multer from 'multer';
import { COLLABARATION_ID, COLLABARATION_STATUS, DB_METADATA, SUB_ID, USER_ID } from '../utils/errormsg';
const upload = multer();

const dashboardURL = configData.curriculumDashboardModuleMS;
console.log("axios url>>", dashboardURL)

// let methods: any[];
let language = "";

router.use(async (req, res, next) => {

    let params = req.query;
    // console.log("req.query>>",req.query)
    let url = req.originalUrl.split('/');
    // console.log("req.originalUrl.split>>", url)
    if (params.langType && languages.hasOwnProperty(String(params.langType))) {

        language = languages[String(params.langType)];
        console.log("language>>", language)
        // next();
    }

    if (language) {
        next();
    } else {
        console.log("next>>", language)
        return next();
    }
});

router.post('/actorContentLikeDislike', async (req: Request, res: Response, next: NextFunction) => {
    const { sts, content_type_id, level_id, content_level_object_id } = req.body;
    //ex lookup master collection content id
    console.log("req.body>>", language)
    if (!content_type_id) {
        return res.send(new APIResponse(400, 'Content id is mandatory'));
    }
    //ex lookup master collection level id
    if (!level_id) {
        return res.send(new APIResponse(400, 'Level is mandatory'));
    }
    //ex ai-econtent level 1 object id
    if (!content_level_object_id) {
        return res.send(new APIResponse(400, 'Content Level Object id is mandatory'));
    }
    // if (!sts) {
    //     return res.send(new APIResponse(400, 'Status is mandatory'));
    // }
    if (!language) {
        return res.send(new APIResponse(400, 'Language Type is mandatory'));
    }

    const errorMessage = validateData(req.body, res);
    if (errorMessage) {
        return errorMessage;
    }
    try {
        await axios.post(dashboardURL + `${language}/actorContentLikeDislike`, req.body).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.post('/videoLikeDislike', async (req: Request, res: Response, next: NextFunction) => {
    const { video_id } = req.body;
    //ex lookup master collection level id
    if (!video_id) {
        return res.send(new APIResponse(400, 'Video Id is mandatory'));
    }
    if (!language) {
        return res.send(new APIResponse(400, 'Language Type is mandatory'));
    }

    const errorMessage = validateData(req.body, res);
    if (errorMessage) {
        return errorMessage;
    }
    try {
        await axios.post(dashboardURL + `${language}/videoLikeDislike`, req.body).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.post('/actorEContentFeedback', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id, t_id, f_text } = req.body;
    const userId = req.headers['tokenuserid'];
    if (userId != user_id) {
        return res.send(new APIResponse(401, 'Unauthorized'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    if (!f_text) {
        return res.send(new APIResponse(400, 'Feedback is mandatory'));
    }
    try {
        await axios.post(dashboardURL + 'actorEContentFeedback', req.body).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.get('/getActorEContentFeedback', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, t_id } = req.query;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    try {
        await axios.post(dashboardURL + 'getActorEContentFeedback', req.query).then(async result => {
            return res.send(new Status(result.data.status, result.data.details));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/actorContentNote', async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, db_metadata, t_id, n_text, content_type_id, level_id } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    if (!n_text) {
        return res.send(new APIResponse(400, 'Note text is mandatory'));
    }

    try {
        await axios.post(dashboardURL + 'actorContentNote', req.body).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/actorRevisionLikeDislike', async (req: Request, res: Response, next: NextFunction) => {
    const { sts } = req.body;

    if (!sts) {
        return res.send(new APIResponse(400, 'Status is mandatory'));
    }

    const errorMessage = validateData(req.body, res);
    if (errorMessage) {
        return errorMessage;
    }
    try {
        await axios.post(dashboardURL + 'actorRevisionLikeDislike', req.body).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.get('/getActorContentNote', async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.query.user_id;
    const db_metadata = req.query.db_metadata;
    const t_id = req.query.t_id;

    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }

    try {
        await axios.get(dashboardURL + 'getContentNote?user_id=' + user_id + '&db_metadata=' + db_metadata + '&t_id=' + t_id).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addActorVideoNote', async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, db_metadata, t_id, n_text } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    if (!n_text) {
        return res.send(new APIResponse(400, 'Note text is mandatory'));
    }

    try {
        await axios.post(dashboardURL + 'actorVideoNote', req.body).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/actorVideoFeedback', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id, t_id, f_text, v_id } = req.body;
    const userId = req.headers['tokenuserid'];
    if (userId != user_id) {
        return res.send(new APIResponse(401, 'Unauthorized'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    if (!f_text) {
        return res.send(new APIResponse(400, 'Feedback is mandatory'));
    }
    if (!v_id) {
        return res.send(new APIResponse(400, 'Video Id is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}actorVideoFeedback`,
            data: req.body
        }).then((result) => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.get('/getActorVideoNote', async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.query.user_id;
    const db_metadata = req.query.db_metadata;
    const t_id = req.query.t_id;

    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }

    try {
        await axios.get(dashboardURL + 'getVideoNote?user_id=' + user_id + '&db_metadata=' + db_metadata + '&t_id=' + t_id).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.get('/getActorVideoFeedback', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, t_id, v_id } = req.query;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    if (!v_id) {
        return res.send(new APIResponse(400, 'Video Id is mandatory'));
    }
    try {
        await axios.post(dashboardURL + 'getActorVideoFeedback', req.query).then(async result => {
            return res.send(new Status(result.data.status, result.data.details));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.put('/deleteActorVideoNote', async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.query.user_id;
    const db_metadata = req.query.db_metadata;
    const t_id = req.query.t_id;
    const noteId = req.query.noteId;

    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    if (!noteId) {
        return res.send(new APIResponse(400, 'Note Id is mandatory'));
    }

    try {
        await axios.put(dashboardURL + 'deleteVideoNote?user_id=' + user_id + '&db_metadata=' + db_metadata + '&t_id=' + t_id + '&noteId=' + noteId).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.put('/deleteActorContentNote', async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.query.user_id;
    const db_metadata = req.query.db_metadata;
    const t_id = req.query.t_id;
    const noteId = req.query.noteId;

    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    if (!noteId) {
        return res.send(new APIResponse(400, 'Note Id is mandatory'));
    }

    try {
        await axios.put(dashboardURL + 'deleteContentNote?user_id=' + user_id + '&db_metadata=' + db_metadata + '&t_id=' + t_id + '&noteId=' + noteId).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.delete('/removeActorVideoFeedback', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id, v_f_id } = req.query;
    const userId = req.headers['tokenuserid'];
    if (userId != user_id) {
        return res.send(new APIResponse(401, 'Unauthorized'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!v_f_id) {
        return res.send(new APIResponse(400, 'Video Feedback Id is mandatory'));
    }
    try {
        await axios({
            method: 'delete',
            url: `${dashboardURL}removeActorVideoFeedback`,
            data: req.query
        }).then((feedback) => {
            return res.send(new APIResponse(feedback.data.status, feedback.data.message));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.delete('/removeActorVideoComment', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, t_id, v_id, v_c_id, user_id } = req.query;
    const userId = req.headers['tokenuserid'];
    if (userId != user_id) {
        return res.send(new APIResponse(401, 'Unauthorized'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!v_c_id) {
        return res.send(new APIResponse(400, 'Video Comment Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    if (!v_id) {
        return res.send(new APIResponse(400, 'Video Id is mandatory'));
    }
    try {
        await axios({
            method: 'delete',
            url: `${dashboardURL}removeActorVideoComment`,
            data: req.query
        }).then((comment) => {
            return res.send(new APIResponse(comment.data.status, comment.data.message));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.delete('/removeActorEContentFeedback', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id, c_f_id } = req.query;
    const userId = req.headers['tokenuserid'];
    if (userId != user_id) {
        return res.send(new APIResponse(401, 'Unauthorized'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!c_f_id) {
        return res.send(new APIResponse(400, 'EContent Feedback Id is mandatory'));
    }
    try {
        await axios({
            method: 'delete',
            url: `${dashboardURL}removeActorEContentFeedback`,
            data: req.query
        }).then((feedback) => {
            return res.send(new APIResponse(feedback.data.status, feedback.data.message));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.delete('/removeActorEContentComment', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id, t_id, e_c_id, content_type_id, level_id, content_level_object_id } = req.query;
    const userId = req.headers['tokenuserid'];
    if (userId != user_id) {
        return res.send(new APIResponse(401, 'Unauthorized'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    if (!e_c_id) {
        return res.send(new APIResponse(400, 'Actor EContent Id is mandatory'));
    }
    if (!content_type_id) {
        return res.send(new APIResponse(400, 'Content Type Id is mandatory'));
    }
    if (!level_id) {
        return res.send(new APIResponse(400, 'Level Id is mandatory'));
    }
    if (!content_level_object_id) {
        return res.send(new APIResponse(400, 'Content Level Object Id is mandatory'));
    }
    try {
        await axios({
            method: 'delete',
            url: `${dashboardURL}${language}/removeActorEContentComment`,
            data: req.query
        }).then((comment) => {
            return res.send(new APIResponse(comment.data.status, comment.data.message));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addActoreContentComment', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id, content_type_id, level_id, t_id, content_level_object_id, new_comment, c_text } = req.body
    const userId = req.headers['tokenuserid'];
    if (userId != user_id) {
        return res.send(new APIResponse(401, 'Unauthorized'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!content_level_object_id) {
        return res.send(new APIResponse(400, 'Content Object Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Content Object Id is mandatory'));
    }
    if (!c_text) {
        return res.send(new APIResponse(400, 'comment is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}${language}/addActoreContentComment`,
            data: req.body
        }).then((comment) => {
            return res.send(new APIResponse(comment.data.status, comment.data.message));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addActorVideoComment', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id, t_id, v_id, new_comment, c_text } = req.body;
    const userId = req.headers['tokenuserid'];
    if (userId != user_id) {
        return res.send(new APIResponse(401, 'Unauthorized'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!v_id) {
        return res.send(new APIResponse(400, 'Video Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    if (!c_text) {
        return res.send(new APIResponse(400, 'comment is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}${language}/addActorVideoComment`,
            data: req.body
        }).then((comment) => {
            return res.send(new APIResponse(comment.data.status, comment.data.message));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getActorVideoComment', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, t_id, v_id } = req.body
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!v_id) {
        return res.send(new APIResponse(400, 'Video Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}${language}/getActorVideoComment`,
            data: req.body
        }).then((comment) => {
            return res.send(new Status(comment.data.status, comment.data.details));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/updateActorVideoComment', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, v_c_id } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!v_c_id) {
        return res.send(new APIResponse(400, 'Video comment id is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}updateActorVideoComment`,
            data: req.body
        }).then((comment) => {
            return res.send(new APIResponse(comment.data.status, comment.data.message));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/updateVideoCommentReply', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, v_c_id, reply_id } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!v_c_id) {
        return res.send(new APIResponse(400, 'Video comment id is mandatory'));
    }
    if (!reply_id) {
        return res.send(new APIResponse(400, 'Reply id is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}updateVideoCommentReply`,
            data: req.body
        }).then((reply) => {
            return res.send(new APIResponse(reply.data.status, reply.data.message));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/removeVideoCommentReply', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, v_c_id, reply_id } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!v_c_id) {
        return res.send(new APIResponse(400, 'Video comment id is mandatory'));
    }
    if (!reply_id) {
        return res.send(new APIResponse(400, 'Reply id is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}removeVideoCommentReply`,
            data: req.body
        }).then((reply) => {
            return res.send(new APIResponse(reply.data.status, reply.data.message));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getActorEContentComment', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, t_id, content_type_id, level_id } = req.body
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    if (!content_type_id) {
        return res.send(new APIResponse(400, 'content_type_id is mandatory'));
    }
    if (!level_id) {
        return res.send(new APIResponse(400, 'level_id Id is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}${language}/getActorEContentComment`,
            data: req.body
        }).then((comment) => {
            return res.send(new Status(comment.data.status, comment.data.details));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})
//This api's only for user not for Teacher
router.post('/videoTimeLineActivity', async (req: Request, res: Response, next: NextFunction) => {
    const { video_id, f_ts } = req.body;

    if (!video_id) {
        return res.send(new APIResponse(400, 'Video Id is mandatory'));
    }
    // important video time line point.
    if (!f_ts) {
        return res.send(new APIResponse(400, 'Video Time Line is mandatory'));
    }

    const errorMessage = validateData(req.body, res);
    if (errorMessage) {
        return errorMessage;
    }
    try {
        await axios.post(dashboardURL + `videoTimeLineActivity`, req.body).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.get('/getVideoTimeLine', async (req: Request, res: Response, next: NextFunction) => {
    const { video_id } = req.query;
    if (!video_id) {
        return res.send(new APIResponse(400, 'Video Id is mandatory'));
    }
    const errorMessage = validateData(req.query, res);
    if (errorMessage) {
        return errorMessage;
    }
    try {
        await axios.post(dashboardURL + `getVideoTimeLine`, req.query).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.post('/updateTimeLine', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, f_ts, time_line_id, user_id } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    // important video time line point.
    if (!f_ts) {
        return res.send(new APIResponse(400, 'Video Time Line is mandatory'));
    }

    if (!time_line_id) {
        return res.send(new APIResponse(400, 'Time Line Id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(time_line_id)) {
        return res.send(new APIResponse(400, 'Invalid Time Line Id'));
    }

    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    try {
        await axios.post(dashboardURL + `updateTimeLine`, req.body).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.post('/deleteTimeLine', async (req: Request, res: Response, next: NextFunction) => {
    // console.log("deleteTimeLine>>",req.body)
    const { db_metadata, time_line_id, user_id } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }

    if (!time_line_id) {
        return res.send(new APIResponse(400, 'Time Line Id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(time_line_id)) {
        return res.send(new APIResponse(400, 'Invalid Time Line Id'));
    }

    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    // return;
    try {
        await axios.post(dashboardURL + `deleteTimeLine`, req.body).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addClassTest', async (req: Request, res: Response, next: NextFunction) => {
    const { test_type, db_metadata, mnt_user_id, name, sub_id, ques_sheet, ttl_marks, ttl_exp_dur } = req.body;
    if (!test_type) {
        return res.send(new APIResponse(400, 'Test type is required'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!mnt_user_id) {
        return res.send(new APIResponse(400, 'Mentor user id is required'));
    }
    if (!name) {
        return res.send(new APIResponse(400, 'Test name is required'));
    }
    if (!sub_id) {
        return res.send(new APIResponse(400, 'Subject id is required'));
    }
    if (!ques_sheet.length) {
        return res.send(new APIResponse(400, 'Question sheet is required'));
    }
    if (!ttl_marks) {
        return res.send(new APIResponse(400, 'Total marks is required'));
    }
    if (!ttl_exp_dur) {
        return res.send(new APIResponse(400, 'Total expire duration(mins) is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}addClassTest`,
            data: req.body
        }).then((classTest) => {
            return res.send(new ResponseWithObject(classTest.data.status, classTest.data.message, classTest.data.data));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addPracticeTest', async (req: Request, res: Response, next: NextFunction) => {
    const { test_type, db_metadata, user_id, sub_id, t_id, ans_sheet, ttl_marks, ttl_std_marks, ttl_exp_dur, ttl_act_dur } = req.body;
    if (!test_type) {
        return res.send(new APIResponse(400, 'Test type is required'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User id is required'));
    }
    if (!sub_id) {
        return res.send(new APIResponse(400, 'Subject id is required'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic id is required'));
    }
    // if (!ans_sheet.length) {
    //     return res.send(new APIResponse(400, 'Answer sheet is required'));
    // }
    // if (!ttl_marks) {
    //     return res.send(new APIResponse(400, 'Total marks is required'));
    // }
    // if (!ttl_std_marks) {
    //     return res.send(new APIResponse(400, 'Total student marks is required'));
    // }
    // if (!ttl_exp_dur) {
    //     return res.send(new APIResponse(400, 'Total expire duration(mins) is required'));
    // }
    // if (!ttl_act_dur) {
    //     return res.send(new APIResponse(400, 'Total actual duration(mins) is required'));
    // }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}addPracticeTest`,
            data: req.body
        }).then((practiceTest) => {
            return res.send(new ResponseWithObject(practiceTest.data.status, practiceTest.data.message, practiceTest.data.data));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addClassTestAnswer', async (req: Request, res: Response, next: NextFunction) => {
    const { test_type, db_metadata, c_test_id, user_id, ans_sheet, ttl_std_marks, ttl_act_dur, t_std_ts } = req.body;
    if (!test_type) {
        return res.send(new APIResponse(400, 'Test type is required'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is required'));
    }
    if (!c_test_id) {
        return res.send(new APIResponse(400, 'Class test id is required'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User id is required'));
    }
    if (!ans_sheet.length) {
        return res.send(new APIResponse(400, 'Answer sheet is required'));
    }
    if (!ttl_std_marks) {
        return res.send(new APIResponse(400, 'Total student marks is required'));
    }
    if (!ttl_act_dur) {
        return res.send(new APIResponse(400, 'Total actual duration(mins) is required'));
    }
    if (!t_std_ts) {
        return res.send(new APIResponse(400, 'Test start date is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}addClassTestAnswer`,
            data: req.body
        }).then((classTestAns) => {
            return res.send(new ResponseWithObject(classTestAns.data.status, classTestAns.data.message, classTestAns.data.data));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getClassTestAnswer', async (req: Request, res: Response, next: NextFunction) => {
    const { test_type, db_metadata, c_test_id, user_id } = req.body;
    if (!test_type) {
        return res.send(new APIResponse(400, 'Test type is required'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is required'));
    }
    if (!c_test_id) {
        return res.send(new APIResponse(400, 'Class test id is required'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User id is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}getClassTestAnswer`,
            data: req.body
        }).then((classTestAns) => {
            return res.send(new Status(classTestAns.data.status, classTestAns.data.details));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getPracticeTest', async (req: Request, res: Response, next: NextFunction) => {
    const { test_type, db_metadata, user_id, sub_id, t_id } = req.body;
    if (!test_type) {
        return res.send(new APIResponse(400, 'Test type is required'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is required'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User id is required'));
    }
    if (!sub_id) {
        return res.send(new APIResponse(400, 'Subject id is required'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic id is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}getPracticeTest`,
            data: req.body
        }).then((practiceTest) => {
            return res.send(new Status(practiceTest.data.status, practiceTest.data.details));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getPracticeTestDetails', async (req: Request, res: Response, next: NextFunction) => {
    const { test_type, db_metadata, user_id, sub_id, t_id, p_t_id } = req.body;
    if (!test_type) {
        return res.send(new APIResponse(400, 'Test type is required'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is required'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User id is required'));
    }
    if (!sub_id) {
        return res.send(new APIResponse(400, 'Subject id is required'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic id is required'));
    }
    if (!p_t_id) {
        return res.send(new APIResponse(400, 'Practice test id is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}getPracticeTestDetails`,
            data: req.body
        }).then((practiceTest) => {
            return res.send(new ResponseWithObject(practiceTest.data.status, practiceTest.data.message, practiceTest.data.data));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getClassTest', async (req: Request, res: Response, next: NextFunction) => {
    const { test_type, db_metadata, sub_id } = req.body;
    if (!test_type) {
        return res.send(new APIResponse(400, 'Test type is required'));
    }
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is required'));
    }
    if (!sub_id) {
        return res.send(new APIResponse(400, 'User id is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}getClassTest`,
            data: req.body
        }).then((practiceTest) => {
            return res.send(new Status(practiceTest.data.status, practiceTest.data.details));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addCollabaration', async (req: any, res: Response, next: NextFunction) => {
    if (!req.body.db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is required'));
    }
    if (!req.body.user_id) {
        return res.send(new APIResponse(400, 'User id is required'));
    }
    if (!req.body.name) {
        return res.send(new APIResponse(400, 'Collabaration name is required'));
    }
    if (!req.body.chap_id) {
        return res.send(new APIResponse(400, 'Chapter id is required'));
    }
    if (!req.body.t_id) {
        return res.send(new APIResponse(400, 'Topic is required'));
    }
    if (!req.body.c_text) {
        return res.send(new APIResponse(400, 'Collabaration note is required'));
    }
    if (!req.body.c_dt) {
        return res.send(new APIResponse(400, 'Collabaration start date is required'));
    }
    if (!req.body.c_ts) {
        return res.send(new APIResponse(400, 'Collabaration time is required'));
    }
    if (!req.body.is_allow) {
        return res.send(new APIResponse(400, 'Is-Allow is required'));
    }
    if (!req.body.c_link) {
        return res.send(new APIResponse(400, 'C_Link is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}addCollabaration`,
            data: req.body
        }).then((collabaration) => {
            return res.send(new APIResponse(collabaration.data.status, collabaration.data.message));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getUserWiseCollabaration', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is required'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User id is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}getUserWiseCollabaration`,
            data: req.body
        }).then((getCollabaration) => {
            return res.send(new Status(getCollabaration.data.status, getCollabaration.data.details));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getAllCollabarations', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}getAllCollabarations`,
            data: req.body
        }).then((getCollabaration) => {
            return res.send(new Status(getCollabaration.data.status, getCollabaration.data.details));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

// Validate Request data for user Activity
const validateData = (data, res) => {
    if (!data.db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!data.user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(data.user_id)) {
        return res.send(new APIResponse(400, 'Invalid User Id'));
    }
    if (!data.t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(data.t_id)) {
        return res.send(new APIResponse(400, 'Invalid Topic Id'));
    }
    return null; // No error, data is valid
};

router.post('/addActorContentDoubt', upload.single('image'), async (req: any, res: any, next: any) => {
    let bodyData = { file: req.file, data: req.body.data }
    if (!bodyData.data) {
        return res.send(new APIResponse(400, 'Data is required'));
    }
    try {
        await axios.post(dashboardURL + 'actorContentDoubt', bodyData).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            console.log(error)
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.put('/updateActorDoubtReply', upload.single('image'), async (req: any, res: any, next: any) => {
    let bodyData = { file: req.file, data: req.body.data }
    if (!bodyData.data) {
        return res.send(new APIResponse(400, 'Data is required'));
    }

    try {
        await axios.put(dashboardURL + 'actorDoubtReply', bodyData).then(async doubtReply => {
            return res.send(new ResponseWithObject(doubtReply.data.status, doubtReply.data.message, doubtReply.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.put('/updateReplyLikeDislike', async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, doubtId, db_metadata, sub_id, t_id, replyId, likeValue, disLikeValue } = req.body
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!sub_id) {
        return res.send(new APIResponse(400, 'Subject Id is mandatory'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic Id is mandatory'));
    }
    if (!doubtId) {
        return res.send(new APIResponse(400, 'Doubt Id is mandatory'));
    }
    if (!replyId) {
        return res.send(new APIResponse(400, 'Reply Id is mandatory'));
    }

    const likeDislikeObj = { user_id, doubtId, db_metadata, sub_id, t_id, replyId, likeValue, disLikeValue }
    try {
        await axios.put(dashboardURL + 'doubtReplyLikeDislike', likeDislikeObj).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getDoubtsList', async (req: Request, res: Response, next: NextFunction) => {
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
            url: `${dashboardURL}getActorDoubtsList?user_id=${user_id}&db_metadata=${db_metadata}`,
            data: req.body
        }).then(async doubtList => {
            return res.send(new ResponseWithObject(doubtList.data.status, doubtList.data.message, doubtList.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addUserIntoExistingCollabaration', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, user_id, collabaration_id, new_user_id } = req.body
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is required'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User id is required'));
    }
    if (!collabaration_id) {
        return res.send(new APIResponse(400, 'Collabaration id is required'));
    }
    if (!new_user_id) {
        return res.send(new APIResponse(400, 'New user id is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}addUserIntoExistingCollabaration`,
            data: req.body
        }).then((addNewUserInCollabaration) => {
            return res.send(new APIResponse(addNewUserInCollabaration.data.status, addNewUserInCollabaration.data.message));
        }).catch((error) => {
            return res.send(new APIResponse(error.response.status, error.response.data.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addTaskToCollabaration', upload.single('image'), async (req: any, res: Response, next: NextFunction) => {
    if (req.file === '' || req.file === undefined || req.file === null) {
        return res.send(new APIResponse(400, "Task file is Mandatory"));
    }
    const bodyData = JSON.parse(req.body.data);
    const { db_metadata, user_id, name, collabaration_id, sub_id, t_id, t_text, t_dt, t_ts } = bodyData;
    bodyData.file = req.file;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is required'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User id is required'));
    }
    if (!name) {
        return res.send(new APIResponse(400, 'Task name is required'));
    }
    if (!collabaration_id) {
        return res.send(new APIResponse(400, 'Collabaration id is required'));
    }
    if (!sub_id) {
        return res.send(new APIResponse(400, 'Subject id is required'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic is required'));
    }
    if (!t_text) {
        return res.send(new APIResponse(400, 'Task note is required'));
    }
    if (!t_dt) {
        return res.send(new APIResponse(400, 'Task start date is required'));
    }
    if (!t_ts) {
        return res.send(new APIResponse(400, 'Task time is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}addTaskToCollabaration`,
            data: bodyData
        }).then((task) => {
            return res.send(new APIResponse(task.data.status, task.data.message));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addAssignments', upload.single('image'), async (req: any, res: Response, next: NextFunction) => {
    if (req.file === '' || req.file === undefined || req.file === null) {
        return res.send(new APIResponse(400, "Assignment file is Mandatory"));
    }
    const bodyData = JSON.parse(req.body.data);
    const { mnt_usr_id, name, src, batch_id, sub_id, t_id, a_text, i_text, a_pts, last_sub_dt } = bodyData;
    bodyData.file = req.file;
    if (!mnt_usr_id) {
        return res.send(new APIResponse(400, 'Mentor user id is required'));
    }
    if (!name) {
        return res.send(new APIResponse(400, 'Assignment name is required'));
    }
    if (!src) {
        return res.send(new APIResponse(400, 'Source is required'));
    }
    if (!batch_id) {
        return res.send(new APIResponse(400, 'Batch id is required'));
    }
    if (!sub_id) {
        return res.send(new APIResponse(400, 'Subject id is required'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic is required'));
    }
    if (!a_text) {
        return res.send(new APIResponse(400, 'Assignment text is required'));
    }
    if (!i_text) {
        return res.send(new APIResponse(400, 'Instruction text is required'));
    }
    if (!a_pts.length) {
        return res.send(new APIResponse(400, 'Assignment points is required'));
    }
    if (!last_sub_dt) {
        return res.send(new APIResponse(400, 'Last submission date is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}addAssignments`,
            data: bodyData
        }).then((task) => {
            return res.send(new APIResponse(task.data.status, task.data.message));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getAssignments', async (req: any, res: Response, next: NextFunction) => {
    const { mnt_usr_id, sub_id, t_id } = req.body;
    if (!mnt_usr_id) {
        return res.send(new APIResponse(400, 'Mentor user id is required'));
    }
    if (!sub_id) {
        return res.send(new APIResponse(400, 'Subject id is required'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}getAssignments`,
            data: req.body
        }).then((task) => {
            return res.send(new Status(task.data.status, task.data.details));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/submitAssignments', upload.single('image'), async (req: any, res: Response, next: NextFunction) => {
    if (req.file === '' || req.file === undefined || req.file === null) {
        return res.send(new APIResponse(400, "Assignment file is Mandatory"));
    }
    const bodyData = JSON.parse(req.body.data);
    const { db_metadata, a_id, user_id, sub_id, t_id, s_text, rec_pts, oth_lnr_pts, last_sub_dt } = bodyData;
    bodyData.file = req.file;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is required'));
    }
    if (!a_id) {
        return res.send(new APIResponse(400, 'Assignment id is required'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User id is required'));
    }
    if (!sub_id) {
        return res.send(new APIResponse(400, 'Subject id is required'));
    }
    if (!t_id) {
        return res.send(new APIResponse(400, 'Topic is required'));
    }
    if (!s_text) {
        return res.send(new APIResponse(400, 'Assignment Submission text is required'));
    }
    if (!rec_pts.length) {
        return res.send(new APIResponse(400, 'Points is required'));
    }
    if (!oth_lnr_pts.length) {
        return res.send(new APIResponse(400, 'Other learner points is required'));
    }
    if (!last_sub_dt) {
        return res.send(new APIResponse(400, 'Last submission date is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}submitAssignments`,
            data: bodyData
        }).then((task) => {
            return res.send(new APIResponse(task.data.status, task.data.message));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getSubmittedAssignments', async (req: any, res: Response, next: NextFunction) => {
    const { db_metadata, user_id, sub_id } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is required'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User id is required'));
    }
    if (!sub_id) {
        return res.send(new APIResponse(400, 'Subject id is required'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}getSubmittedAssignments`,
            data: req.body
        }).then((assignments) => {
            return res.send(new Status(assignments.data.status, assignments.data.details));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/updateActorEContentComment', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, e_c_id } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!e_c_id) {
        return res.send(new APIResponse(400, 'E-Content comment id is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}updateActorEContentComment`,
            data: req.body
        }).then((comment) => {
            return res.send(new APIResponse(comment.data.status, comment.data.message));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/updateEContentCommentReply', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, e_c_id, reply_id } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!e_c_id) {
        return res.send(new APIResponse(400, 'EContent comment id is mandatory'));
    }
    if (!reply_id) {
        return res.send(new APIResponse(400, 'Reply id is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}updateEContentCommentReply`,
            data: req.body
        }).then((reply) => {
            return res.send(new APIResponse(reply.data.status, reply.data.message));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/removeEContentCommentReply', async (req: Request, res: Response, next: NextFunction) => {
    const { db_metadata, e_c_id, reply_id } = req.body;
    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!e_c_id) {
        return res.send(new APIResponse(400, 'EContent comment id is mandatory'));
    }
    if (!reply_id) {
        return res.send(new APIResponse(400, 'Reply id is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}removeEContentCommentReply`,
            data: req.body
        }).then((reply) => {
            return res.send(new APIResponse(reply.data.status, reply.data.message));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.put('/deleteActorContentDoubt', async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, db_metadata, doubtId } = req.body;

    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!doubtId) {
        return res.send(new APIResponse(400, 'Doubt Id is mandatory'));
    }

    try {
        await axios.put(dashboardURL + 'removeContentDoubt', req.body).then(async doubts => {
            return res.send(new ResponseWithObject(doubts.data.status, doubts.data.message, doubts.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.put('/deleteActorDoubtReply', async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, db_metadata, doubtId, replyId } = req.body;

    if (!db_metadata) {
        return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
    }
    if (!user_id) {
        return res.send(new APIResponse(400, 'User Id is mandatory'));
    }
    if (!doubtId) {
        return res.send(new APIResponse(400, 'Doubt Id is mandatory'));
    }
    if (!replyId) {
        return res.send(new APIResponse(400, 'Reply Id is mandatory'));
    }

    try {
        await axios.put(dashboardURL + 'removeDoubtReply', req.body).then(async reply => {
            return res.send(new ResponseWithObject(reply.data.status, reply.data.message, reply.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addOrUpdateActorCurrActivity', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { db_metadata, user_id, sub_id, chap_id, t_id } = req.body;
        if (!db_metadata) {
            return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
        }
        if (!user_id) {
            return res.send(new APIResponse(400, 'User Id is mandatory'));
        }
        if (!sub_id) {
            return res.send(new APIResponse(400, 'Subject Id is mandatory'));
        }
        if (!chap_id) {
            return res.send(new APIResponse(400, 'Chapter Id is mandatory'));
        }
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        await axios({
            method: 'post',
            url: `${dashboardURL}addOrUpdateActorCurrActivity`,
            data: req.body
        }).then(currActivity => {
            return res.send(new ResponseWithObject(currActivity.data.status, currActivity.data.message, currActivity.data.data));
        }).catch(error => {
            if (error && error.response.data && error.response.data.status === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new APIResponse(400, error.message));
            }
        })
    }
    catch (error) {
        console.log(error)
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getDoubtsWithOutLogin', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.db_metadata) {
            return res.send(new APIResponse(400, 'Activity / db_metadata is mandatory'));
        }
        await axios.post(dashboardURL + 'getDoubtsWithOutLogin', req.body).then(async doubtsList => {
            return res.send(new ResponseWithObject(doubtsList.data.status, doubtsList.data.message, doubtsList.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.response.data.message));
        })
    } catch (error) {
        console.log(error)
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addOrUpdateStudyPlan', async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        if (!req.body.freq) {
            return res.send(new APIResponse(400, 'Frequency is mandatory'));
        }
        if (!req.body.plan) {
            return res.send(new APIResponse(400, 'User Id is mandatory'));
        }

        await axios({
            method: 'post',
            url: `${dashboardURL}createStudyPlan?userId=${userId}&db_metadata=${db_metadata}`,
            data: req.body
        }).then(studyPlan => {
            return res.send(new ResponseWithObject(studyPlan.data.status, studyPlan.data.message, studyPlan.data.data));
        }).catch(error => {
            if (error && error.response.data && error.response.data.status === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new APIResponse(400, error.message));
            }
        })
    }
    catch (error) {
        console.log(error)
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getUserStudyPlan', async (req: Request, res: Response, next: NextFunction) => {
    try {
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

        await axios({
            method: 'post',
            url: `${dashboardURL}getUserStudyPlan?userId=${userId}&db_metadata=${db_metadata}`,
            data: req.body
        }).then(studyPlan => {
            return res.send(new ResponseWithObject(studyPlan.data.status, studyPlan.data.message, studyPlan.data.data));
        }).catch(error => {
            if (error && error.response.data && error.response.data.status === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new APIResponse(400, error.message));
            }
        })
    }
    catch (error) {
        console.log(error)
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/updateCurriculumContent', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, cat_id, grade_id, sub_id } = req.body;
        if (!user_id) {
            return res.send(new APIResponse(400, 'User Id is mandatory'));
        }
        if (!sub_id) {
            return res.send(new APIResponse(400, 'Subject Id is mandatory'));
        }
        if (!cat_id) {
            return res.send(new APIResponse(400, 'Category Id is mandatory'));
        }
        if (!grade_id) {
            return res.send(new APIResponse(400, 'Grade Id is mandatory'));
        }
        await axios({
            method: 'post',
            url: `${dashboardURL}updateCurriculumContent`,
            data: req.body
        }).then(currActivity => {
            return res.send(new ResponseWithObject(currActivity.data.status, currActivity.data.message));
        }).catch(error => {
            if (error && error.response.data && error.response.data.status === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new APIResponse(400, error.message));
            }
        })
    }
    catch (error) {
        console.log(error)
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/userBySubjectCollabarations', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bodyData = req.body;
        if (!bodyData.db_metadata) {
            return res.send(new APIResponse(400, DB_METADATA));
        }
        if (!bodyData.user_id) {
            return res.send(new APIResponse(400, USER_ID));
        }
        if (!bodyData.sub_id) {
            return res.send(new APIResponse(400, SUB_ID));
        }
        await axios({
            method: 'post',
            url: `${dashboardURL}userBySubjectCollabarations`,
            data: req.body
        }).then((getCollabaration) => {
            return res.send(new Status(getCollabaration.data.status, getCollabaration.data.details));
        }).catch((error) => {
            if (error && error.response.data && error.response.data.status === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new APIResponse(400, error.message));
            }
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/updateCollabarationStatusByUser', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bodyData = req.body;
        if (!bodyData.db_metadata) {
            return res.send(new APIResponse(400, DB_METADATA));
        }
        if (!bodyData.user_id) {
            return res.send(new APIResponse(400, USER_ID));
        }
        if (!bodyData.collabaration_id) {
            return res.send(new APIResponse(400, COLLABARATION_ID));
        }
        if (bodyData.status === undefined || bodyData.status === null) {
            return res.send(new APIResponse(400, COLLABARATION_STATUS));
        }
        await axios({
            method: 'post',
            url: `${dashboardURL}updateCollabarationStatusByUser`,
            data: req.body
        }).then((collabarationStatus) => {
            return res.send(new APIResponse(collabarationStatus.data.status, collabarationStatus.data.message));
        }).catch((error) => {
            if (error && error.response.data && error.response.data.status === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new APIResponse(400, error.message));
            }
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/updateCollabaration', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bodyData = req.body;
        if (!bodyData.db_metadata) {
            return res.send(new APIResponse(400, DB_METADATA));
        }
        if (!bodyData.user_id) {
            return res.send(new APIResponse(400, USER_ID));
        }
        if (!bodyData.collabaration_id) {
            return res.send(new APIResponse(400, COLLABARATION_ID));
        }
        await axios({
            method: 'post',
            url: `${dashboardURL}updateCollabaration`,
            data: req.body
        }).then((updateCollabaration) => {
            return res.send(new APIResponse(updateCollabaration.data.status, updateCollabaration.data.message));
        }).catch((error) => {
            if (error && error.response.data && error.response.data.status === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new APIResponse(400, error.message));
            }
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

export = router;