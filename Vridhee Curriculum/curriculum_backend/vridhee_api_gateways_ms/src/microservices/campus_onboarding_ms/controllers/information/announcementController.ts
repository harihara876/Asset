import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config"
import { Status, ResponseWithObject } from '../../utils/status';
import { validateAnnouncements } from '../../validationSchema.ts/campusValidations';
import multer from 'multer';
const upload = multer();

router.post('/getannouncements', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const { campus_group_id, campus_id, announcement_id } = req.body;
        if (!campus_group_id && !campus_id && !announcement_id) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Id is required.'));
        };

        if (campus_id) {
            if (!mongoose.Types.ObjectId.isValid(campus_id)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_id.'));
            };
        };

        if (!campus_id && campus_group_id) {
            return res.send(new ResponseWithObject(400, "Validation error", 'campus_ids is mandatory.'));
        };

        if (campus_group_id) {
            if (!mongoose.Types.ObjectId.isValid(campus_group_id)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_group_id.'));
            };
        };

        if (announcement_id) {
            if (!mongoose.Types.ObjectId.isValid(announcement_id)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid announcement_id.'));
            };
        };

        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}announcementslisting`,
            data: req.body
        })
            .then((announcements) => {
                return res.send(new Status(announcements.data.code, announcements.data.message, announcements.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/createannouncements', upload.array('image', 10), validateAnnouncements, async (req: Request, res: Response, next: NextFunction) => {
    try {
        let bodyData = { file: req.files, data: req.body.data };
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}insertannouncements`,
            data: bodyData
        })
            .then((announcements) => {
                return res.send(new Status(announcements.data.code, announcements.data.message, announcements.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/updateannouncements', upload.array('image', 10), async (req: Request, res: Response, next: NextFunction) => {
    try {
        let bodyData = { file: req.files, data: req.body.data };
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updateannouncements`,
            data: bodyData
        })
            .then((announcements) => {
                return res.send(new Status(announcements.data.code, announcements.data.message, announcements.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.delete('/deleteannouncements', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imageData = req.body.imgs;
        if (!imageData || imageData.length === 0) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Imgs are required in body.'));
        };

        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}deleteannouncements?id=${req.query.id}&section=${req.query.section}`,
            data: req.body
        })
            .then((announcements) => {
                return res.send(new Status(announcements.data.code, announcements.data.message, announcements.data.data));
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
