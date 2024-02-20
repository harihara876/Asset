import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';
import { ICourseQuery } from '../../models/interfaces';
import { validateCreateCampusCourse } from '../../validationSchema.ts/campusValidations';
import multer from 'multer';
const upload = multer();

router.post('/createCampusCourse', upload.single('image'), validateCreateCampusCourse, async (req: any, res, next) => {
    try {
        let bodyData = { file: req.file, data: req.body.data };
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}createCampusCourse`,
            data: bodyData
        }).then((course) => {
            return res.send(new Status(course.data.code, course.data.message, course.data.data));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        });
    } catch (error) {
        return res.status(400).send(new Status(400, error.message));
    }
});

router.put('/updateCampusCourseBatch', upload.single('image'), async (req: any, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        let bodyData = req.body;
        if(req.query.courseSection==="course"){
            bodyData = { file: req.file, data: req.body.data };
        };
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updateCampusCourseBatch?courseSection=${req.query.courseSection}`,
            data: bodyData
        })
            .then((campusCourse) => {
                return res.send(new Status(campusCourse.data.code, campusCourse.data.message, campusCourse.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/getCampusCourseBatch', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const { campus_group_id, campus_course_id, campus_batch_id, campus_id } = req.body;
        if (campus_group_id || campus_course_id || campus_batch_id || campus_id) {
            if (campus_group_id != "" && campus_group_id !== undefined) {
                if (!mongoose.Types.ObjectId.isValid(campus_group_id)) {
                    return res.send(new APIResponse(400, 'Invalid Campus Group Id'));
                }
            };
            if (campus_course_id != "" && campus_course_id !== undefined) {
                if (!mongoose.Types.ObjectId.isValid(campus_course_id)) {
                    return res.send(new APIResponse(400, 'Invalid Campus Course Id'));
                }
            };
            if (campus_batch_id != "" && campus_batch_id !== undefined) {
                if (!mongoose.Types.ObjectId.isValid(campus_batch_id)) {
                    return res.send(new APIResponse(400, 'Invalid Campus Batch Id'));
                }
            };
            if (campus_id != "" && campus_id !== undefined) {
                if (!mongoose.Types.ObjectId.isValid(campus_id)) {
                    return res.send(new APIResponse(400, 'Invalid Campus Id'));
                }
            };
        }
        else {
            return res.send(new Status(400, "Id is required"))
        };
        if (req.query.courseSection === "batch") {
            if (!campus_course_id) {
                return res.send(new APIResponse(400, 'CourseId is Mandatory.'));
            };
        };
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}getCampusCourseBatch?courseSection=${req.query.courseSection}&page=${req.query.page}`,
            data: req.body
        })
            .then((campusCourse) => {
                return res.send(new Status(campusCourse.data.code, campusCourse.data.message, campusCourse.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            });
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.delete('/deleteCampusCourseBatch', async (req: Request<{}, {}, {}, ICourseQuery>, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}deleteCampusCourseBatch?courseSection=${req.query.courseSection}`,
            data: req.body
        })
            .then((course) => {
                return res.send(new Status(course.data.code, course.data.message, course.data.data));
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