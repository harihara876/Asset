import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config"
import { Status, ResponseWithObject } from '../../utils/status';
import { validateHolidays } from '../../validationSchema.ts/campusValidations';

router.post('/getholidays', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const { campus_group_id, campus_ids, holiday_id } = req.body;
        if (!campus_group_id && !campus_ids && !holiday_id) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Id is required.'));
        };

        if (campus_ids) {
            if (!mongoose.Types.ObjectId.isValid(campus_ids)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_id.'));
            };
        };

        if (!campus_ids && campus_group_id) {
            return res.send(new ResponseWithObject(400, "Validation error", 'campus_ids is mandatory.'));
        };

        if (campus_group_id) {
            if (!mongoose.Types.ObjectId.isValid(campus_group_id)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_group_id.'));
            };
        };

        if (holiday_id) {
            if (!mongoose.Types.ObjectId.isValid(holiday_id)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid holiday_id.'));
            };
        };

        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}holidaylisting`,
            data: req.body
        })
            .then((holiday) => {
                return res.send(new Status(holiday.data.code, holiday.data.message, holiday.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/createholidays', validateHolidays, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}insertholidays`,
            data: req.body
        })
            .then((holiday) => {
                return res.send(new Status(holiday.data.code, holiday.data.message, holiday.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/updateholidays', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updateholidays`,
            data: req.body
        })
            .then((holiday) => {
                return res.send(new Status(holiday.data.code, holiday.data.message, holiday.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.delete('/deleteholidays', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}deleteholidays?id=${req.query.id}&date_id=${req.query.date_id}`
        })
            .then((holiday) => {
                return res.send(new Status(holiday.data.code, holiday.data.message, holiday.data.data));
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
