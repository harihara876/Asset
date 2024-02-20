import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';
import {validatePresence,validateMongoId} from '../../../../utils/validationFunctions';
import multer from 'multer';
const upload = multer();

router.post('/createQueryDet',upload.single('image'), async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        let data = JSON.parse(req.body.data);
        let bodyData = { file: req.file, data: data };
        if (!Object.keys(bodyData.data).length) return res.send(new Status(400, "Body is required"));

        let presenceResult = validatePresence(["campus_id","campus_group_id","category_id","severity","subject"],bodyData.data,res);   //"campus_id","campus_group_id","category_id","severity","subject"
        let idValidateResult = validateMongoId(["campus_id","campus_group_id","category_id"],bodyData.data,res);
        if (presenceResult || idValidateResult) {
            return;
        }
        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}createsugConDet`,
            data: bodyData
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


router.post('/getQueryDet', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        if(req.query.page){
            let presenceResult = validatePresence(["campus_group_id"],req.body,res);
            let idValidateResult = validateMongoId(["campus_id","campus_group_id","query_det_id","category_id","created_by"],req.body,res);
            if (presenceResult || idValidateResult) {
                return;
            }
        }else{
            let presenceResult = validatePresence(["query_det_id"],req.body,res);
            let idValidateResult = validateMongoId(["campus_id","campus_group_id","query_det_id","category_id","created_by"],req.body,res);
            if (presenceResult || idValidateResult) {
                return;
            }
        }
        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}getsugConDet?page=${req.query.page}`,
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

router.put('/updateQueryDet',upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = JSON.parse(req.body.data);
        let bodyData = { file: req.file, data: data };

        if (!Object.keys(bodyData.data).length) return res.send(new Status(400, "Body is required"));   

        await axios({
            method: 'put',
            url: `${configData.campusDashBoardMsUrl}upsugConDet`,
            data: bodyData
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


router.delete('/deleteQueryDet', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'delete',
            url: `${configData.campusDashBoardMsUrl}dtsugConDet`,
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


router.post('/getQueryMIS', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        let presenceResult = validatePresence(["campus_group_id"],req.body,res);
        let idValidateResult = validateMongoId(["campus_id","campus_group_id"],req.body,res);
        if (presenceResult || idValidateResult) {
            return;
        }
        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}getQueryMIS?query=${req.query.page}`,
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






