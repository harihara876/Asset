import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config";
import { APIResponse, Status } from '../../utils/status';
import validateUserDetail from '../../middlewares/validateUserDetail';
import campusOnboardingSchema from '../../validationSchema.ts/campusOnboardingSchema';

router.post('/getfeeCategories', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const data = req.body;
        if (data.campus_group_id != "" && data.campus_group_id !== undefined) {
            if (!mongoose.Types.ObjectId.isValid(data.campus_group_id)) {
                return res.send(new APIResponse(400, 'Invalid Campus Group Id'));
            }
        };
        if (data.campus_id != "" && data.campus_id !== undefined) {
            if (!mongoose.Types.ObjectId.isValid(data.campus_id)) {
                return res.send(new APIResponse(400, 'Invalid Campus Id'));
            }
        };
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}feeCategory/get?feeCategory=${req.query.feeCategory}`,
            data: req.body
        })
            .then((feeCategory) => {
                return res.send(new Status(feeCategory.data.code, feeCategory.data.message, feeCategory.data.data));
            })
            .catch(function (error) {
                return res.send(new APIResponse(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/createfeeCategories', validateUserDetail.validateFeeCategory(campusOnboardingSchema.campusFeeCategory), async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}feeCategory/create`,
            data: req.body
        })
            .then((feeCategory) => {
                return res.send(new Status(feeCategory.data.code, feeCategory.data.message, feeCategory.data.data));
            })
            .catch(function (error) {
                return res.send(new APIResponse(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/updateCampusfeeCategory', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}feeCategory/update`,
            data: req.body
        })
            .then((feeCategory) => {
                return res.send(new Status(feeCategory.data.code, feeCategory.data.message, feeCategory.data.data));
            })
            .catch(function (error) {
                return res.send(new APIResponse(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.delete('/deleteCampusfeeCategory', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}feeCategory/del?id=${req.query.id}`,
            data: req.body
        })
            .then((feeCategory) => {
                return res.send(new Status(feeCategory.data.code, feeCategory.data.message, feeCategory.data.data));
            })
            .catch(function (error) {
                return res.send(new APIResponse(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

export = router;