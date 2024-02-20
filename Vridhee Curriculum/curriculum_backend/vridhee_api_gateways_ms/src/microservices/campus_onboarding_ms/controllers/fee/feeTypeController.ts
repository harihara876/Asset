import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config";
import { APIResponse, Status } from '../../utils/status';
import { validateCampusUserOnBoard } from '../../validationSchema.ts/campusValidations';
import validateUserDetail from '../../middlewares/validateUserDetail';
import campusOnboardingSchema from '../../validationSchema.ts/campusOnboardingSchema';

router.post('/getfeetypes', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}feetypes/get?feetype=${req.query.feetype}`,
            data: req.body
        })
            .then((feetypes) => {
                return res.send(new Status(feetypes.data.code, feetypes.data.message, feetypes.data.data));
            })
            .catch(function (error) {
                return res.send(new APIResponse(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.post('/createfeetype', validateUserDetail.validateFeeType(campusOnboardingSchema.campusFeeType),async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}feetypes/create`,
            data: req.body
        })
            .then((feetypes) => {
                return res.send(new Status(feetypes.data.code, feetypes.data.message, feetypes.data.data));
            })
            .catch(function (error) {
                return res.send(new APIResponse(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.put('/updatefeetype', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}feetypes/update`,
            data: req.body
        })
            .then((feetypes) => {
                return res.send(new Status(feetypes.data.code, feetypes.data.message, feetypes.data.data));
            })
            .catch(function (error) {
                return res.send(new APIResponse(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.delete('/deletefeetype', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}feetypes/del?id=${req.query.id}`,
            data: req.body
        })
            .then((feetypes) => {
                return res.send(new Status(feetypes.data.code, feetypes.data.message, feetypes.data.data));
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