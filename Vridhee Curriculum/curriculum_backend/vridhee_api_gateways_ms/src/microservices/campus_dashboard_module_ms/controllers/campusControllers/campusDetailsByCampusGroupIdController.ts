import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import axios from 'axios';
import validateNotifications from "../../middlewares/validateNotifications";
import campusDashboardSchema from "../../validationSchemas/campusDashboardSchema"
import { configData } from "../../utils/config"
import { Status,APIResponse } from "../../utils/status"


router.post('/getCampusDetailsByCampusGroupId',validateNotifications.validateGetCampusDetailsByGroupId(campusDashboardSchema.getCampusDetailsByGroupIdSchema), async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        const data = req.body;
        if (data.campus_group_id !== "") {
            let id = data.campus_group_id;
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                return res.send(new APIResponse(400, 'Invalid Campus Group Id'));
            }
        };
        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}getCampDetsByCGId`,
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