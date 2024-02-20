import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';

router.post('/getCampusUserRelation', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        if (!Object.keys(data).length) return res.send(new Status(400, "Body is required"));
        if (!mongoose.Types.ObjectId.isValid(data.user_id)) {
            return res.send(new APIResponse(400, 'Invalid User Id'));
        };
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}getCampusUserRelation?flag=${req.query.flag}`,
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


// router.post('/addCampusUserRelation',validateUserDetail.validateUserRelation(campusOnboardingSchema.campusUserSchema), async (req: Request, res: Response, next: NextFunction) => 
// {
//     try 
//     {
//         const data = req.body;
//         if (!mongoose.Types.ObjectId.isValid(data.user_id)) {
//             return res.send(new APIResponse(400, 'Invalid User Id'));
//         };
//         if (!mongoose.Types.ObjectId.isValid(data.campus_id)) {
//             return res.send(new APIResponse(400, 'Invalid Campus Id'));
//         };
//         await axios({
//             method: 'post',
//             url: `${configData.campusOnBoardingMsUrl}addCampusUserRelation`,
//             data: req.body
//         })
//         .then((data) => 
//         {
//             return res.send(new Status(data.data.code, data.data.message));
//         })
//         .catch(function (error) 
//         {
//             return res.send(new Status(400, error.message));
//         });
//     } 
//     catch (error) 
//     {
//         return res.send(new Status(400, error.message));
//     }
// });

export = router;