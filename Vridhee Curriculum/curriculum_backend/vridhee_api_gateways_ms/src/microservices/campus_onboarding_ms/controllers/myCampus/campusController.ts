import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';
import { validateCampus, validateCampusContactDetails } from '../../validationSchema.ts/campusValidations';
import multer from 'multer';
const upload = multer();

router.post('/createCampusInfo', upload.single('image'), validateCampus, async (req: any, res: any, next: any) => {
    try {
        let bodyData = { file: req.file, data: req.body.data };
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}createCampusInfo`,
            data: bodyData
        })
            .then((campusInfo) => {
                return res.send(new Status(campusInfo.data.code, campusInfo.data.message, campusInfo.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/getCampusInfo', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const { campus_info_id, campus_group_id, sub_group_id } = req.body;
        if (campus_info_id || campus_group_id || sub_group_id) {
            if (campus_info_id != "" && campus_info_id !== undefined) {
                if (!mongoose.Types.ObjectId.isValid(campus_info_id)) {
                    return res.send(new APIResponse(400, 'Invalid Campus Id'));
                }
            };
            if (campus_group_id != "" && campus_group_id !== undefined) {
                if (!mongoose.Types.ObjectId.isValid(campus_group_id)) {
                    return res.send(new APIResponse(400, 'Invalid Campus Group Id'));
                }
            };
            if (sub_group_id != "" && sub_group_id !== undefined) {
                if (!mongoose.Types.ObjectId.isValid(sub_group_id)) {
                    return res.send(new APIResponse(400, 'Invalid Sub Group Id'));
                }
            };
        }
        else {
            return res.send(new Status(400, "Id is required"))
        };
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}getCampusInfo?section=${req.query.section}`,
            data: req.body
        })
            .then((campusInfo) => {
                return res.send(new Status(campusInfo.data.code, campusInfo.data.message, campusInfo.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/updateCampusInfo', upload.single('image'), validateCampusContactDetails, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        let bodyData = { file: req.file, data: req.body.data };
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updateCampusInfo`,
            data: bodyData
        })
            .then((campusInfo) => {
                return res.send(new Status(campusInfo.data.code, campusInfo.data.message, campusInfo.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/deleteCampus', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        if (!data.campus_logo_url) {
            return res.send(new APIResponse(400, 'campus_logo_url is mandatory in body.'));
        };
        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}dCampusInfo?id=${req.query.id}`,
            data: req.body
        })
            .then((menuModule) => {
                return res.send(new Status(menuModule.data.code, menuModule.data.message, menuModule.data.data));
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
