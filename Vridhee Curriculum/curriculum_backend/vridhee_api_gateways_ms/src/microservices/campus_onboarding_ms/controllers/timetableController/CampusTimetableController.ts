import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';
import validateUserDetail from '../../middlewares/validateUserDetail';
import campusOnboardingSchema from '../../validationSchema.ts/campusOnboardingSchema';
import {validatePresence,validateMongoId} from '../../../../utils/validationFunctions';



router.post('/addTimetable', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const data = req.body;

        let presenceResult = validatePresence(["campus_id","course_id","batch_id"],data,res);
        let idValidateResult = validateMongoId(["campus_id","course_id","batch_id"],data,res);
        if (presenceResult || idValidateResult) {
            return;
        }
        //?moduleSection=${req.query.moduleSection}
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}ctTt`,
            data: req.body
        })
        .then((data) => {
            return res.send(new Status(data.data.code, data.data.message, data.data.data));
        })
        .catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.post('/getTimetable', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        // let presenceResult = validatePresence(["campus_id","course_id","batch_id"],data,res);
        // let idValidateResult = validateMongoId(["campus_id","course_id","batch_id"],data,res);
        // if (presenceResult || idValidateResult) {
        //     return;
        // }

        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}gtTt?is_main=${req.query.is_main}`,
            data: req.body
        })
        .then((timetableData) => {
            return res.send(new Status(timetableData.data.code, timetableData.data.message, timetableData.data.data));
        })
        .catch(function (error) {
            return res.send(new Status(400, error.message)); //gg
        })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/updateTimetable', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}utTt`,
            data: req.body
        })
            .then((feePaymentMode) => {
                return res.send(new Status(feePaymentMode.data.code, feePaymentMode.data.message, feePaymentMode.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.delete('/deleteTimetable', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}dtTt`,
            data: req.body
        })
        .then((data) => {
            return res.send(new Status(data.data.code, data.data.message, data.data.data));
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













        // if (presenceResult.flag === 1) {
        //     return res.send(new APIResponse(400, `${presenceResult.fieldName} is required.`));
        // };

        // if (data.campus_id !== "" && data.campus_id != undefined) {
        //     if (!mongoose.Types.ObjectId.isValid(data.campus_id)) {
        //         return res.send(new APIResponse(400, 'Invalid campus_id'));
        //     }
        // };