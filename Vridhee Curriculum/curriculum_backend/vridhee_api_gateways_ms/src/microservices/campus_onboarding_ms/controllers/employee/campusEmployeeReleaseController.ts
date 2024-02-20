import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';
import {validatePresence,validateMongoId} from '../../../../utils/validationFunctions';


router.post('/employeeRelease', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const data = req.body;

        let presenceResult = validatePresence(["campus_id","user_id"],data,res);
        let idValidateResult = validateMongoId(["campus_id","user_id"],data,res);
        if (presenceResult || idValidateResult) {
            return;
        } 

        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}employeeRelease`,
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


router.post('/getEmployeeResign', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}getEmployeeResign`,
            data: req.body
        })
        .then((empData) => {
            return res.send(new Status(empData.data.code, empData.data.message, empData.data.data));
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