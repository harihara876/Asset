import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config"
import { Status, ResponseWithObject } from '../../utils/status';
import { validateNews } from '../../validationSchema.ts/campusValidations';
import multer from 'multer';
const upload = multer();

router.post('/getnews', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const { news_id, campus_group_id, campus_id } = req.body;
        if (!campus_group_id && !campus_id && !news_id) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Id is required.'));
        };
        if (campus_id) {
            if (!mongoose.Types.ObjectId.isValid(campus_id)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_id.'));
            };
        };

        if (!campus_id && campus_group_id) {
            return res.send(new ResponseWithObject(400, "Validation error", 'campus_ids is mandatory.'));
        };

        if (campus_group_id) {
            if (!mongoose.Types.ObjectId.isValid(campus_group_id)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_group_id.'));
            };
        };

        if (news_id) {
            if (!mongoose.Types.ObjectId.isValid(news_id)) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid news_id.'));
            };
        };
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}newslisting`,
            data: req.body
        })
            .then((news) => {
                return res.send(new Status(news.data.code, news.data.message, news.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/createnews', upload.array('image', 10), validateNews, async (req: Request, res: Response, next: NextFunction) => {
    try {
        let bodyData = { file: req.files, data: req.body.data };
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}insertnews`,
            data: bodyData
        })
            .then((news) => {
                return res.send(new Status(news.data.code, news.data.message, news.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/updatenews', upload.array('image', 10), async (req: Request, res: Response, next: NextFunction) => {
    try {
        let bodyData = { file: req.files, data: req.body.data };
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updatenews`,
            data: bodyData
        })
            .then((news) => {
                return res.send(new Status(news.data.code, news.data.message, news.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.delete('/deletenews', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imageData = req.body.imgs;
        if (!imageData || imageData.length === 0) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Imgs are required.'));
        };

        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}deletenews?id=${req.query.id}section=${req.query.section}`,
            data: req.body
        })
            .then((news) => {
                return res.send(new Status(news.data.code, news.data.message, news.data.data));
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
