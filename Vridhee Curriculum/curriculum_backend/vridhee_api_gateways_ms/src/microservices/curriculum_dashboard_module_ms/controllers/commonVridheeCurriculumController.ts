import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { Status, ResponseWithObject, APIResponse } from '../utils/status';
import axios from 'axios';
import { configData } from '../utils/config'
import { languages } from '../utils/languages';
import { methods } from '../utils/methods';
import multer from 'multer';
const upload = multer();

// let methods: any[];
let language = "";

router.use(async (req, res, next) => {

    let params = req.query;

    let url = req.originalUrl.split('/');

    // let language = languages.includes(params.langType);

    if (params.langType && languages.hasOwnProperty(String(params.langType))) {

        language = languages[String(params.langType)];
        // next();
    } else if (params.langType && !languages.hasOwnProperty(String(params.langType))) {

        return res.send({ sts: 400, msg: "Bad Request and language is not exist" })
    }

    let collectionName = methods.includes(String(params.collectionName));
    if (language && collectionName) {
        if (collectionName) {
            next();
        } else {
            res.send({ sts: 400, msg: "Bad Request, Please send valid method" })
            return
        }
    } else {
        return next();
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    let commonController = "vridheeCurriculumDashboard";
    try {
        const { langType, collectionName } = req.query;
        const { chapterName, topicName, data } = req.body;
        if (!langType) {
            return res.send(new APIResponse(400, 'Language type is mandatory in params'));
        }
        if (!collectionName) {
            return res.send(new APIResponse(400, 'Collection name is mandatory in params'));
        }
        // if (!chapterName) {
        //     return res.send(new APIResponse(400, 'Chapter name is mandatory in body'));
        // }
        // if (!topicName) {
        //     return res.send(new APIResponse(400, 'Topic name is mandatory in body'));
        // }
        // if (!data || data.length == 0) {
        //     return res.send(new APIResponse(400, 'Data need atleast one object in body'));
        // }
        try {
            await axios({
                method: 'post',
                url: `${configData.curriculumDashboardModuleMS}${language}/${commonController}/${collectionName}`,
                data: req.body
            }).then((curriculum) => {
                language = "";
                return res.send(new ResponseWithObject(curriculum.data.code, curriculum.data.message, curriculum.data.data));
            }).catch(function (error) {
                language = "";
                return res.send(new Status(400, error.message));
            })
        } catch (error) {
            language = "";
            return res.send(new Status(400, error.message));
        }
    } catch (error) {
        language = "";
        return res.send(new Status(400, error.message));
    }
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    let commonController = "vridheeCurriculumDashboard";
    try {
        const { langType, collectionName } = req.query;
        if (!langType) {
            return res.send(new APIResponse(400, 'Language type is mandatory in params'));
        }
        if (!collectionName) {
            return res.send(new APIResponse(400, 'Collection name is mandatory in params'));
        }

        try {
            await axios({
                method: 'get',
                url: `${configData.curriculumDashboardModuleMS}${language}/${commonController}/${collectionName}`,
                data: req.query
            }).then((curriculum) => {
                language = "";
                return res.send(new ResponseWithObject(curriculum.data.code, curriculum.data.message, curriculum.data.data));
            }).catch(function (error) {
                language = "";
                return res.send(new Status(400, error.message));
            })
        } catch (error) {
            language = "";
            return res.send(new Status(400, error.message));
        }
    } catch (error) {
        language = "";
        return res.send(new Status(400, error.message));
    }
})

router.post('/addAssignments', upload.single('image'), async (req: any, res: Response, next: NextFunction) => {
    if (req.file === '' || req.file === undefined || req.file === null) {
        return res.send(new APIResponse(400, "Assignment file is Mandatory"));
    }
    const bodyData = JSON.parse(req.body.data);
    const { mnt_usr_id, name, src, batch_id, sub_id, t_id, a_text, i_text, a_pts, last_sub_dt } = bodyData;
    bodyData.file = req.file;
    const { langType, collectionName } = req.query;
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
    if (!langType) {
        return res.send(new APIResponse(400, 'Language type is mandatory in params'));
    }
    if (!collectionName) {
        return res.send(new APIResponse(400, 'Collection name is mandatory in params'));
    }
    let commonController = "vridheeCurriculumDashboard";
    try {
        await axios({
            method: 'post',
            url: `${configData.curriculumDashboardModuleMS}${language}/${commonController}/${collectionName}`,
            data: bodyData
        }).then((assignment) => {
            return res.send(new APIResponse(assignment.data.status, assignment.data.message));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/getAssignments', async (req: any, res: Response, next: NextFunction) => {
    try {
        const { mnt_usr_id, sub_id, t_id } = req.body;
        const { langType, collectionName } = req.query;
        if (!mnt_usr_id) {
            return res.send(new APIResponse(400, 'Mentor user id is required'));
        }
        if (!sub_id) {
            return res.send(new APIResponse(400, 'Subject id is required'));
        }
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic is required'));
        }
        if (!langType) {
            return res.send(new APIResponse(400, 'Language type is mandatory in params'));
        }
        if (!collectionName) {
            return res.send(new APIResponse(400, 'Collection name is mandatory in params'));
        }
        let commonController = "vridheeCurriculumDashboard";
        await axios({
            method: 'get',
            url: `${configData.curriculumDashboardModuleMS}${language}/${commonController}/${collectionName}`,
            data: req.body
        }).then((assignment) => {
            return res.send(new Status(assignment.data.status, assignment.data.details));
        }).catch((error) => {
            if (error && error.response.data && error.response.data.status === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new Status(400, error.message));
            }
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

export = router