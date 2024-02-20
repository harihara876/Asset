import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config";
import { Status, APIResponse } from '../../utils/status';
import validateNotifications from '../../middlewares/validateNotifications';
import campusDashboardSchema from '../../validationSchemas/campusDashboardSchema';


router.post('/createCampusNotificationEmail', validateNotifications.validateNotificationEmail(campusDashboardSchema.campusNotificationEmailSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            if (data.user_id != "" && data.user_id !== undefined) {
                if (!mongoose.Types.ObjectId.isValid(data.user_id)) {
                    return res.send(new APIResponse(400, 'Invalid User Id'));
                }
            };
            await axios({
                method: 'post',
                url: `${configData.campusDashBoardMsUrl}iCampNotfEmail`,
                data: req.body
            })
                .then((emailNotification) => {
                    return res.send(new Status(emailNotification.data.code, emailNotification.data.message, emailNotification.data.data));
                })
                .catch(function (error) {
                    return res.send(new Status(400, error.message));
                })
        }
        catch (error) {
            return res.send(new Status(400, error.message));
        }
    });


router.post('/getCampusNotificationEmail', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}gCampNotfEmail`,
            data: req.body
        })
            .then((emailNotification) => {
                return res.send(new Status(emailNotification.data.code, emailNotification.data.message, emailNotification.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.put('/updateCampusNotificationEmail', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'put',
            url: `${configData.campusDashBoardMsUrl}uCampNotfEmail`,
            data: req.body
        })
            .then((emailNotification) => {
                return res.send(new Status(emailNotification.data.code, emailNotification.data.message, emailNotification.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.delete('/deleteCampusNotificationEmail', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.campusDashBoardMsUrl}dCampNotfEmail`,
            data: req.body
        })
            .then((emailNotification) => {
                return res.send(new Status(emailNotification.data.code, emailNotification.data.message, emailNotification.data.data));
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