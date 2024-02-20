import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import axios from 'axios';
import {APIResponse } from "../../utils/status"
import validateNotifications from "../../middlewares/validateNotifications";
import campusDashboardSchema from "../../validationSchemas/campusDashboardSchema"

//import campusOnboardingSchema from '../validationSchema.ts/campusOnboardingSchema';

import { configData } from "../../utils/config"
import { Status } from "../../utils/status"


router.post('/getDefaultNotification', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const data = req.body;
        if (!data.campus_group_id) {
            return res.send(new APIResponse(400, 'campus_group_id is required.'));
        };
        if (data.campus_group_id !== "" && data.campus_group_id != undefined) {
            if (!mongoose.Types.ObjectId.isValid(data.campus_group_id)) {
                return res.send(new APIResponse(400, 'Invalid campus_group_id'));
            }
        };

        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}gDfNotf`,
            data: req.body
        })
        .then((campusInfo) => 
        {
            return res.send(new Status(campusInfo.data.code, campusInfo.data.message, campusInfo.data.data));
        })
        .catch(function (error) 
        {
            return res.send(new Status(400, error.message));
        })
    } 
    catch (error) 
    {
        return res.send(new Status(400, error.message));
    }
})

router.post('/insertDefaultNotification',validateNotifications.validateDefaultNotifications(campusDashboardSchema.defaultNotificationSchema),
async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}iDftNotf`,
            data: req.body
        })
        .then((details) => 
        {
            return res.send(new Status(details.data.code, details.data.message, details.data.data));
        })
        .catch(function (error) 
        {
            return res.send(new Status(400, error.message));
        })
    } 
    catch (error) 
    {
        return res.send(new Status(400, error.message));
    }
})


router.put('/updateDefaultNotification', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'put',
            url: `${configData.campusDashBoardMsUrl}uDftNotf?id=${req.query.id}`,
            data: req.body
        })
        .then((updatedInfo) => 
        {
            return res.send(new Status(updatedInfo.data.code, updatedInfo.data.status, updatedInfo.data.data));
        })
        .catch(function (error) 
        {
            return res.send(new Status(400, error.message));
        })
    } 
    catch (error) 
    {
        return res.send(new Status(400, error.message));
    }
})



router.delete('/deleteDefaultNotification', async (req: Request, res: Response) => 
{
    try 
    {
        await axios({
            method: 'delete',
            url: `${configData.campusDashBoardMsUrl}dDftNotf?id=${req.query.id}`
        })
        .then((notificationInfo) => 
        {
            return res.send(new Status(notificationInfo.data.code, notificationInfo.data.status, notificationInfo.data.data));
        })
        .catch(function (error) 
        {
            return res.send(new Status(400, error.message));
        })
    } 
    catch (error) 
    {
        return res.send(new Status(400, error.message));
    }
})


router.post('/getModulesUsingGroupId', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}gModsUsingGroupId`,
            data: req.body
        })
        .then((campusInfo) => 
        {
            return res.send(new Status(campusInfo.data.code, campusInfo.data.message, campusInfo.data.data));
        })
        .catch(function (error) 
        {
            return res.send(new Status(400, error.message));
        })
    } 
    catch (error) 
    {
        return res.send(new Status(400, error.message));
    }
})

export = router;