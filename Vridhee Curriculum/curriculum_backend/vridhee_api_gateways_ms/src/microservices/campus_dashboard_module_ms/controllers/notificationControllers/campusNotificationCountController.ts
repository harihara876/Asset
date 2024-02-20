import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config";
import { Status, APIResponse } from '../../utils/status';

router.post('/createCampusNotificationCount', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            if (data.campus_group_id != "" && data.campus_group_id !== undefined) {
                if (!mongoose.Types.ObjectId.isValid(data.campus_group_id)) {
                    return res.send(new APIResponse(400, 'Invalid Campus Group Id'));
                }
            };
            await axios({
                method: 'post',
                url: `${configData.campusDashBoardMsUrl}iCampNotfCount`,
                data: req.body
            })
                .then((notificationCount) => {
                    return res.send(new Status(notificationCount.data.code, notificationCount.data.message, notificationCount.data.data));
                })
                .catch(function (error) {
                    return res.send(new Status(400, error.message));
                })
        }
        catch (error) {
            return res.send(new Status(400, error.message));
        }
});


router.post('/getCampusNotificationCount', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}gCampNotfCount`,
            data: req.body
        })
            .then((notificationCount) => {
                return res.send(new Status(notificationCount.data.code, notificationCount.data.message, notificationCount.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.put('/updateCampusNotificationCount', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'put',
            url: `${configData.campusDashBoardMsUrl}uCampNotfCount`,
            data: req.body
        })
            .then((notificationCount) => {
                return res.send(new Status(notificationCount.data.code, notificationCount.data.message, notificationCount.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.delete('/deleteCampusNotificationCount', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.campusDashBoardMsUrl}deleteCampusNotificationCount`,
            data: req.body
        })
            .then((notificationCount) => {
                return res.send(new Status(notificationCount.data.code, notificationCount.data.message, notificationCount.data.data));
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