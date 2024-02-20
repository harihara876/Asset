import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import campusOnboardingSchema from '../../validationSchema.ts/campusOnboardingSchema';
import validateUserDetail from '../../middlewares/validateUserDetail';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';

router.post('/getCampusGroupById', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        if (req.query.groupCategory !== "checkName") {
            const { campus_group_id, sub_group } = req.body;
            if (campus_group_id || campus_group_id || sub_group.sub_group_id) {
                if (campus_group_id != "" && campus_group_id !== undefined) {
                    if (!mongoose.Types.ObjectId.isValid(campus_group_id)) {
                        return res.send(new APIResponse(400, 'Invalid Campus Group Id'));
                    }
                };
                if (sub_group) {
                    if (sub_group.sub_group_id != "" && sub_group.sub_group_id !== undefined) {
                        if (!mongoose.Types.ObjectId.isValid(sub_group.sub_group_id)) {
                            return res.send(new APIResponse(400, 'Invalid Sub Group Id'));
                        }
                    };
                }
            }
            else {
                return res.send(new Status(400, 'At least one of campus_group_id or sub_group_id is required.'))
            };
        }
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}getCampusGroupById?groupCategory=${req.query.groupCategory}`,
            data: req.body
        })
            .then((campusGroup) => {
                return res.send(new Status(campusGroup.data.code, campusGroup.data.message, campusGroup.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/createCampusGroup', validateUserDetail.validateCampusGroup(campusOnboardingSchema.campusGroupSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            if (data.sub_group_present === "Yes" && data.group_type === "SubGroup") {
                const subGroups = data.sub_group;
                if (!subGroups || subGroups.length === 0) {
                    return res.send(new Status(400, 'sub Group Name is Mandatory.'));
                };
                const duplicateSubGroup = subGroups.some((subGroup, index) =>
                    subGroups.findIndex((sg) => sg.sub_group_name === subGroup.sub_group_name) !== index);

                if (duplicateSubGroup) {
                    return res.send(new Status(400, 'sub_group_name cannot be same.'));
                };
            };
            await axios({
                method: 'post',
                url: `${configData.campusOnBoardingMsUrl}createCampusGroup`,
                data: req.body
            })
                .then((campusGroup) => {
                    return res.send(new Status(campusGroup.data.code, campusGroup.data.message, campusGroup.data.data));
                })
                .catch(function (error) {
                    return res.send(new Status(400, error.message));
                });
        }
        catch (error) {
            return res.send(new Status(400, error.message));
        }
    });

router.put('/updateCampusGroupById', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        if (!Object.keys(data).length) return res.send(new Status(400, "Body is required"));
        if (data.sub_group_present === "Yes" && data.group_type === "SubGroup") {
            const subGroups = data.sub_group;
            if (!subGroups || subGroups.length === 0) {
                return res.send(new Status(400, 'sub Group Name is Mandatory.'));
            };
            const duplicateSubGroup = subGroups.some((subGroup, index) =>
                subGroups.findIndex((sg) => sg.sub_group_name === subGroup.sub_group_name) !== index);

            if (duplicateSubGroup) {
                return res.send(new Status(400, 'Already existing sub_group_name is found.'));
            };
        };
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updateCampusGroupById?id=${req.query.id}`,
            data: req.body
        })
            .then((campusGroup) => {
                return res.send(new Status(campusGroup.data.code, campusGroup.data.message, campusGroup.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            });
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

export = router;
