import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';
import {validatePresence,validateMongoId} from '../../../../utils/validationFunctions';


router.post('/createEnquiry', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const data = req.body;

        // let presenceResult = validatePresence(["campus_id","campus_group_id","category_id","type"],data,res);
        // let idValidateResult = validateMongoId(["campus_id","campus_group_id","category_id"],data,res);
        // if (presenceResult || idValidateResult) {
        //     return;
        // }
        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}crEnq`,
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

router.post('/getEnquiry', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        let presenceResult = validatePresence(["campus_id","campus_group_id"],data,res);
        let idValidateResult = validateMongoId(["campus_id","campus_group_id","query_cat_id"],data,res);
        if (presenceResult || idValidateResult) {
            return;
        }
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        await axios({
            method: 'post',
            url: `${configData.campusDashBoardMsUrl}gtEn?page=${req.query.page}`,
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

router.put('/updateEnquiry', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        await axios({
            method: 'put',
            url: `${configData.campusDashBoardMsUrl}upEn`,
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

router.delete('/deleteEnquiry', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'delete',
            url: `${configData.campusDashBoardMsUrl}dtEn`,
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