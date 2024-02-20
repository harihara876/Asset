import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';
import validateUserDetail from '../../middlewares/validateUserDetail';
import campusOnboardingSchema from '../../validationSchema.ts/campusOnboardingSchema';

router.post('/checkUniqueEmail', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        const data = req.body;
        const query = req.query;
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        if (!data.email || data.email == "" || data.email == undefined) {
            return res.send(new APIResponse(400, 'email is required.'));
        };

        if(query.edit=="true"){
            if (!data.user_id || data.user_id == "" || data.user_id == undefined) {
                return res.send(new APIResponse(400, 'user_id is required.'));
            };
            if (data.user_id != "" && data.user_id !== undefined) {
                if (!mongoose.Types.ObjectId.isValid(data.user_id)) {
                    return res.send(new APIResponse(400, 'Invalid user_id'));
                }
            };
        }

        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}checkUniqueEmail?edit=${req.query.edit}`,
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


router.post('/checkUniqueNumber', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        const data = req.body;
        const query = req.query;
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        if (!data.cont_num || data.cont_num == "" || data.cont_num == undefined) {
            return res.send(new APIResponse(400, 'cont_num is required.'));
        };
        if(query.edit=="true"){
            if (!data.user_id || data.user_id == "" || data.user_id == undefined) {
                return res.send(new APIResponse(400, 'user_id is required.'));
            };
            if (data.user_id != "" && data.user_id !== undefined) {
                if (!mongoose.Types.ObjectId.isValid(data.user_id)) {
                    return res.send(new APIResponse(400, 'Invalid user_id'));
                }
            };
        }

        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}checkUniqueNumber?edit=${req.query.edit}`,
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