import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config"
import { Status, ResponseWithObject } from '../../utils/status';
import { validateNotice } from '../../validationSchema.ts/campusValidations';
import multer from 'multer';
const upload = multer();

router.post('/getnotice', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const { notice_id, campus_group_id, campus_id } = req.body;
        if (!campus_group_id && !campus_id && !notice_id) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Id is required.'));
        };

        if (campus_id) {
            if (!mongoose.Types.ObjectId.isValid(campus_id)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_id.'));
            };
        };

        if (!campus_id && campus_group_id) {
            return res.send(new ResponseWithObject(400, "Validation error", 'campus_id is mandatory.'));
        };

        if (campus_group_id) {
            if (!mongoose.Types.ObjectId.isValid(campus_group_id)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_group_id.'));
            };
        };

        if (notice_id) {
            if (!mongoose.Types.ObjectId.isValid(notice_id)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid notice_id.'));
            };
        };

        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}noticelisting`,
            data: req.body
        })
            .then((notice) => {
                return res.send(new Status(notice.data.code, notice.data.message, notice.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/createnotice', upload.array('image', 10), validateNotice, async (req: Request, res: Response, next: NextFunction) => {
    try {
        let bodyData = { file: req.files, data: req.body.data };
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}insertnotice`,
            data: bodyData
        })
            .then((notice) => {
                return res.send(new Status(notice.data.code, notice.data.message, notice.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/updatenotice', upload.array('image', 10), async (req: Request, res: Response, next: NextFunction) => {
    try {
        let bodyData = { file: req.files, data: req.body.data };
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updatenotice`,
            data: bodyData
        })
            .then((notice) => {
                return res.send(new Status(notice.data.code, notice.data.message, notice.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.delete('/deletenotice', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imageData = req.body.imgs;
        if (!imageData || imageData.length === 0) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Imgs are required.'));
        };

        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}deletenotice?id=${req.query.id}`,
            data: req.body
        })
            .then((notice) => {
                return res.send(new Status(notice.data.code, notice.data.message, notice.data.data));
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
