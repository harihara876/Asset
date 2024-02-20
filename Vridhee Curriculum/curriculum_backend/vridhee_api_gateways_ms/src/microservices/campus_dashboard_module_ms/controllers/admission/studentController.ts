import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { configData } from "../../utils/config";
import { Status, APIResponse } from '../../utils/status';
import multer from 'multer';
import { validateCampusUserOnBoard } from '../../middlewares/validateUserDetail';
const router = express.Router();
const upload = multer();

router.post('/studentslisting', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const data = req.body;
        if (!data.campus_group_id) {
            return res.send(new Status(400, "campus_group_id is required."))
        };

        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}getstudents?listing=${req.query.listing}`,
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

router.post('/addcampusstudents', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        let bodyData = { file: req.file, data: req.body.data };
        const validateStudent = validateCampusUserOnBoard(bodyData.data);
        if (!validateStudent.err) {
            return res.send(new APIResponse(400, validateStudent.msg));
        };
        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}insertstudents`,
            data: bodyData
        })
            .then((userOnboard) => {
                return res.send(new Status(userOnboard.data.code, userOnboard.data.message, userOnboard.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/updatestudents', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body.data).length) return res.send(new Status(400, "Body is required"));
        let bodyData = { file: req.file, data: req.body.data };
        await axios({
            method: 'put',
            url: `${configData.campusDashBoardMsUrl}ustudents`,
            data: bodyData
        })
            .then((result) => {
                return res.send(new Status(result.data.code, result.data.message, result.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/deletestudents', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.campusDashBoardMsUrl}dstudents?section=${req.query.section}`,
            data: req.body
        })
            .then((result) => {
                return res.send(new Status(result.data.code, result.data.message, result.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/verifycampusstudents', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const data = req.body;
        if (!data.campus_id) {
            return res.send(new Status(400, "campus_id is required."))
        };

        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}cstudentcoursereln`,
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


export = router;

