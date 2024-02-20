import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const router = express.Router();
import axios from 'axios';
import validateNotifications from "../../middlewares/validateNotifications";
import campusDashboardSchema from "../../validationSchemas/campusDashboardSchema"
import { configData } from "../../utils/config"
import { Status,APIResponse } from "../../utils/status"

router.post('/getCampusNotificationConfig', 
async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const data = req.body;
        if (!data.campus_group_id && !data.module_id && !data.default_notification_id && !data.campus_notification_config_id) {
            return res.send(new APIResponse(400, 'At least one of the campus_group_id, module_id, campus_notification_config_id or default_notification_id is required.'));
        };
        if (data.campus_group_id !== "" && data.campus_group_id != undefined) {
            if (!mongoose.Types.ObjectId.isValid(data.campus_group_id)) {
                return res.send(new APIResponse(400, 'Invalid campus_group_id'));
            }
        };

        if (data.default_notification_id !== "" && data.default_notification_id != undefined) {
            if (!Number.isInteger(data.default_notification_id)) {
                return res.send(new APIResponse(400, 'Invalid default_notification_id'));
            }
        };
        
        if (data.campus_notification_config_id !== "" && data.campus_notification_config_id != undefined) {
            if (!mongoose.Types.ObjectId.isValid(data.campus_notification_config_id)) {
                return res.send(new APIResponse(400, 'Invalid campus_notification_config_id'));
            }
        };
        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}gCampNotfConfig?configData=${req.query.configData}&is_listing=${req.query.is_listing}`,
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

//,validateNotifications.validateCampusNotificationConfig(campusDashboardSchema.campusNotificationSchema)
router.post('/insertCampusNotificationConfig',validateNotifications.validateCampusNotificationConfig(campusDashboardSchema.campusNotificationSchema),
async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}iCampNotfConfig`,
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

router.put('/updateCampusNotificationConfig',
async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'put',
            url: `${configData.campusDashBoardMsUrl}uCampNotfConfig?id=${req.query.id}`,
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


router.delete('/deleteCampusNotificationConfig',
async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'delete',
            url: `${configData.campusDashBoardMsUrl}dCampNotfConfig?id=${req.query.id}`,
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

export = router;