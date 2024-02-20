import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config"
import { Status, ResponseWithObject } from '../../utils/status';
import { validateNoticetemplate } from '../../validationSchema.ts/campusValidations';

router.post('/getnoticetemplate', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const { campus_group_id, campus_ids, notice_template_id } = req.body;
        if (!campus_group_id && !campus_ids && !notice_template_id) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Id is required.'));
        };

        if (campus_ids) {
            if (!mongoose.Types.ObjectId.isValid(campus_ids)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_id.'));
            };
        };

        if (campus_ids && !campus_group_id) {
            return res.send(new ResponseWithObject(400, "Validation error", 'campus_group_id is mandatory.'));
        };

        if (campus_group_id) {
            if (!mongoose.Types.ObjectId.isValid(campus_group_id)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_group_id.'));
            };
        };

        if (notice_template_id) {
            if (!mongoose.Types.ObjectId.isValid(notice_template_id)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid notice_template_id.'));
            };
        };

        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}noticetemplatelisting`,
            data: req.body
        })
            .then((noticetemplate) => {
                return res.send(new Status(noticetemplate.data.code, noticetemplate.data.message, noticetemplate.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/createnoticetemplate', validateNoticetemplate, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}insertnoticetemplate`,
            data: req.body
        })
            .then((noticetemplate) => {
                return res.send(new Status(noticetemplate.data.code, noticetemplate.data.message, noticetemplate.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/updatenoticetemplate', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updatenoticetemplate`,
            data: req.body
        })
            .then((noticetemplate) => {
                return res.send(new Status(noticetemplate.data.code, noticetemplate.data.message, noticetemplate.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.delete('/deletenoticetemplate', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}deletenoticetemplate?id=${req.query.id}`,
            data: req.body
        })
            .then((noticetemplate) => {
                return res.send(new Status(noticetemplate.data.code, noticetemplate.data.message, noticetemplate.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

export = router;
