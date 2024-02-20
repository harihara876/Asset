import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { APIResponse, details, ResponseWithObject } from '../utils/status';
import { configData } from '../utils/config';
const adminVridheeMsUrl = configData.adminVridheeMsUrl;

interface IUserId {
    "userId": string
};

router.delete('/deleteUsers', async (req: Request<{}, {}, {}, IUserId>, res: Response, next: NextFunction) => {
    let { userId } = req.query;
    if (!userId) {
        return res.send(new APIResponse(400, 'User id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.send(new APIResponse(400, 'Invalid User Id'));
    }
    try {
        await axios({
            method: 'delete',
            url: `${adminVridheeMsUrl}deleteUsers`,
            data: req.query
        }).then((curriculum) => {
            return res.send(new ResponseWithObject(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch((error) => {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.delete('/deleteSubjectData', async (req: Request, res: Response, next: NextFunction) => {
    let data = req.body;
    const flag = data.flag;
    if (!Object.keys(data).length) return res.send(new APIResponse(400, "Body is required"));
    if (!flag) {
        return res.send(new APIResponse(400, 'Flag query is mandatory.'));
    };
    if (flag === "subject") {
        if (!data.sub_id && !mongoose.Types.ObjectId.isValid(data.sub_id)) {
            return res.send(new APIResponse(400, 'Subject Id is mandatory.'));
        };
    }
    else if (flag === "chapter") {
        if (!data.chapters || data.chapters.length === 0) {
            return res.send(new APIResponse(400, 'Chapters Id is mandatory.'));
        };
    }
    else if (flag === "topic") {
        if (!data.topic_id || data.topic_id.length === 0) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory.'));
        };
        if (!data.chapter_id && !mongoose.Types.ObjectId.isValid(data.chapter_id)) {
            return res.send(new APIResponse(400, 'Invalid Chapter Id.'));
        };
    };
    try {
        await axios({
            method: 'delete',
            url: `${adminVridheeMsUrl}delSubChapTopic`,
            data: data
        }).then((curriculum) => {
            return res.send(new details(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.delete("/cleandata", async (req:Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${adminVridheeMsUrl}dataclean`,
            data: req.query
        }).then((curriculum) => {
            return res.send(new ResponseWithObject(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch((error) => {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

export = router;