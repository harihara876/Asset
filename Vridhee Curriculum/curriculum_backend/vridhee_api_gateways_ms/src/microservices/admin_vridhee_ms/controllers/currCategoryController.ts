import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { APIResponse, details } from '../utils/status';
import mongoose from 'mongoose';
import axios from 'axios';
import { configData } from '../utils/config';

interface ISubjectId {
    "subId": string
};

router.put('/updateContentsCounts', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = req.body;
        if (!data.subId || !data.catId || !data.gradeId) {
            return res.send(new APIResponse(400, 'Subject Category GradeId are mandatory.'));
        }
        if (!mongoose.Types.ObjectId.isValid(data.subId) || !mongoose.Types.ObjectId.isValid(data.catId)) {
            return res.send(new APIResponse(400, 'Invalid Subject Id or Category Id.'));
        }
        await axios({
            method: 'put',
            url: `${configData.adminVridheeMsUrl}updateContentCounts`,
            data: req.body
        }).then((curriculum) => {
            return res.send(new details(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.get('/getCatgrade', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'get',
            url: `${configData.adminVridheeMsUrl}getCatgrade`,
            data: req.query
        }).then((curriculum) => {
            return res.send(new details(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.get('/getSubjectGrades', async (req: Request<{}, {}, {}, ISubjectId>, res: Response, next: NextFunction) => {
    let { subId } = req.query;
    if (!subId) {
        return res.send(new APIResponse(400, 'Subjectid id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(subId)) {
        return res.send(new APIResponse(400, 'Invalid Subject Id'));
    }
    try {
        await axios({
            method: 'get',
            url: `${configData.adminVridheeMsUrl}getGradeslisting`,
            data: req.query
        }).then((curriculum) => {
            return res.send(new details(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

export = router;
