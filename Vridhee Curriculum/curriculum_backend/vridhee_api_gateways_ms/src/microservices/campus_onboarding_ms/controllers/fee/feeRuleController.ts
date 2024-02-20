import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';
import validateUserDetail from '../../middlewares/validateUserDetail';
import {validatePresence,validateMongoId} from '../../../../utils/validationFunctions';


router.post('/addFeeRule', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const data = req.body;
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}addFeeRule`,
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


router.post('/getFeeRule', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        let presenceResult = validatePresence(["campus_id"],data,res);
        let idValidateResult = validateMongoId(["campus_id","campus_group_id","fee_rule_id"],data,res);
        if (presenceResult || idValidateResult) {
            return;
        }

        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}getFeeRule`,
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

router.put('/updateFeeRule', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updateFeeRule`,
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


router.delete('/deleteFeeRule', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}deleteFeeRule`,
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