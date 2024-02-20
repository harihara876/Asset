import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import axios from 'axios';
import validateUserDetail from '../../middlewares/validateUserDetail';
import campusOnboardingSchema from '../../validationSchema.ts/campusOnboardingSchema';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';
import { IDesignationQuery } from '../../models/interfaces';

router.post('/getCampusDesignation', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const data = req.body;
        if (!data.campus_group_id && !data.designation_id) {
            return res.send(new APIResponse(400, 'At least one of campus_group_id or designation_id is required.'));
        };
        if (data.campus_group_id !== "" || data.designation_id !== "") {
            let id = data.campus_group_id || data.designation_id;
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                return res.send(new APIResponse(400, 'Invalid Id'));
            }
        };
        if (data.is_listing === 1) {
            if (data.campus_group_id != "" && data.campus_group_id !== undefined) {
                if (!mongoose.Types.ObjectId.isValid(data.campus_group_id)) {
                    return res.send(new APIResponse(400, 'Invalid Campus Group Id'));
                }
            } else {
                return res.send(new APIResponse(400, 'Campus Group Id is required'));
            }
        };
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}getCampusDesignation`,
            data: req.body
        })
            .then((designationData) => {
                return res.send(new Status(designationData.data.code, designationData.data.message, designationData.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.post('/createDesignation', validateUserDetail.validateCampusDesignation(campusOnboardingSchema.campusDesignationSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        if (req.query.flag === "onboarding") {
            const check = !data.user_id || !data.campus_id;
            if (check) {
                return res.send(new APIResponse(400, 'user_id and campus_id is required.'));
            }
            else {
                if (!data.user_id || !mongoose.Types.ObjectId.isValid(data.user_id)) {
                    return res.send(new APIResponse(400, 'Invalid User Id'));
                };
                if (!data.campus_id || !mongoose.Types.ObjectId.isValid(data.campus_id)) {
                    return res.send(new APIResponse(400, 'Invalid Campus Id'));
                };
            }
        };
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}createDesignation?flag=${req.query.flag}`,
            data: req.body
        })
            .then((designationData) => {
                return res.send(new Status(designationData.data.code, designationData.data.message, designationData.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }

});


router.put('/updateCampusDesignation', async (req: Request<{}, {}, {}, IDesignationQuery>, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updateCampusDesignation?id=${req.query.id}`,
            data: req.body
        })
            .then((designationData) => {
                return res.send(new Status(designationData.data.code, designationData.data.message, designationData.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.delete('/deleteCampusDesignation', async (req: Request<{}, {}, {}, IDesignationQuery>, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}deleteCampusDesignation?id=${req.query.id}`
        })
            .then((designationData) => {
                return res.send(new Status(designationData.data.code, designationData.data.message, designationData.data.data));
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


