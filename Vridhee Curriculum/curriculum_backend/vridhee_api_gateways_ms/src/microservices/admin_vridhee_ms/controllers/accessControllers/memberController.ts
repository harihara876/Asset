import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config"
import { ResponseWithObject, Status, APIResponse } from '../../utils/status';
import multer from 'multer';
const upload = multer();

router.post('/addadminmembers', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        let bodyData = { file: req.file, data: req.body.data };
        await axios({
            method: 'post',
            url: `${configData.adminVridheeMsUrl}cadminmembers`,
            data: bodyData
        })
            .then((members) => {
                return res.send(new ResponseWithObject(members.data.code, members.data.message, members.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/updateadminmembers', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new APIResponse(400, "Body is required"));
        await axios({
            method: 'put',
            url: `${configData.adminVridheeMsUrl}uadminmembers`,
            data: req.body
        })
            .then((member) => {
                return res.send(new ResponseWithObject(member.data.code, member.data.message, member.data.data));
            })
            .catch(function (error) {
                return res.send(new APIResponse(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.delete('/deleteadminmembers', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.adminVridheeMsUrl}dadminmembers?id=${req.query.id}`,
            data: req.body
        })
            .then((member) => {
                return res.send(new ResponseWithObject(member.data.code, member.data.message, member.data.data));
            })
            .catch(function (error) {
                return res.send(new APIResponse(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

export = router;
