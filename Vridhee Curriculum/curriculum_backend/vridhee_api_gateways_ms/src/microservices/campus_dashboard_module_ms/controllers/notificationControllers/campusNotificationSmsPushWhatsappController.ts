import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config";
import { Status, APIResponse } from '../../utils/status';
import validateNotifications from '../../middlewares/validateNotifications';
import campusDashboardSchema from '../../validationSchemas/campusDashboardSchema';

//validateNotifications.validateNotificationSmsPushWhatsapp(campusDashboardSchema.campusNotificationSmsPushWhatsappSchema),
router.post('/createNotificationSmsPushWhatsapp', validateNotifications.validateNotificationSmsPushWhatsapp(campusDashboardSchema.campusNotificationSmsPushWhatsappSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            await axios({
                method: 'post',
                url: `${configData.campusDashBoardMsUrl}iNotfSPW`,
                data: req.body
            })
                .then((spwNotification) => {
                    return res.send(new Status(spwNotification.data.code, spwNotification.data.message, spwNotification.data.data));
                })
                .catch(function (error) {
                    return res.send(new Status(400, error.message));
                })
        }
        catch (error) {
            return res.send(new Status(400, error.message));
        }
    });


router.post('/getNotificationSmsPushWhatsapp', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const data = req.body;
        if (!data.campus_group_id && !data.campus_id && !data.module_id && !data.campus_Notification_sms_push_whatsapp_id) {
            return res.send(new APIResponse(400, 'At least one of the campus_group_id, campus_id, module_id or campus_Notification_sms_push_whatsapp_id is required.'));
        };
        if (data.campus_group_id !== "" && data.campus_group_id != undefined) {
            if (!mongoose.Types.ObjectId.isValid(data.campus_group_id)) {
                return res.send(new APIResponse(400, 'Invalid campus_group_id'));
            }
        };

        if (data.campus_id !== "" && data.campus_id != undefined) {
            if (!mongoose.Types.ObjectId.isValid(data.campus_id)) {
                return res.send(new APIResponse(400, 'Invalid campus_id'));
            }
        };

        if (data.module_id !== "" && data.module_id != undefined) {
            if (!mongoose.Types.ObjectId.isValid(data.module_id)) {
                return res.send(new APIResponse(400, 'Invalid module_id'));
            }
        };
        
        if (data.campus_Notification_sms_push_whatsapp_id !== "" && data.campus_Notification_sms_push_whatsapp_id != undefined) {
            if (!mongoose.Types.ObjectId.isValid(data.campus_Notification_sms_push_whatsapp_id)) {
                return res.send(new APIResponse(400, 'Invalid campus_Notification_sms_push_whatsapp_id'));
            }
        };

        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}gNotfSPW`,
            data: req.body
        })
            .then((spwNotification) => {
                return res.send(new Status(spwNotification.data.code, spwNotification.data.message, spwNotification.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.put('/updateNotificationSmsPushWhatsapp', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'put',
            url: `${configData.campusDashBoardMsUrl}uNotfSPW`,
            data: req.body
        })
            .then((spwNotification) => {
                return res.send(new Status(spwNotification.data.code, spwNotification.data.message, spwNotification.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.delete('/deleteNotificationSmsPushWhatsapp', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.campusDashBoardMsUrl}dNotfSPW`,
            data: req.body
        })
            .then((spwNotification) => {
                return res.send(new Status(spwNotification.data.code, spwNotification.data.message, spwNotification.data.data));
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