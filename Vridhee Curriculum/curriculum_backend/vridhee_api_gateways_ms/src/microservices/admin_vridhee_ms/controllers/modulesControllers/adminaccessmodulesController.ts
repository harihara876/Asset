import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config"
import { ResponseWithObject, Status, APIResponse } from '../../utils/status';
import validatedata from '../../middlewares/validatedata';
import validateSchema from '../../validationSchemas/validateSchema';

router.post('/addadminaccessmodules', validatedata.validateCommonFunctionSchema(validateSchema.accessModuleSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'post',
            url: `${configData.adminVridheeMsUrl}cadminaccessmodules`,
            data: req.body
        })
            .then((accessmodules) => {
                return res.send(new ResponseWithObject(accessmodules.data.code, accessmodules.data.message, accessmodules.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/getadminaccessmodules', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        if (!data.admin_id) {
            return res.send(new ResponseWithObject(400, "Validation error", 'admin_id is mandatory in body.'));
        };
        await axios({
            method: 'post',
            url: `${configData.adminVridheeMsUrl}gaccessmodules?moduleSection=${req.query.moduleSection}`,
            data: req.body
        })
            .then((accessmodules) => {
                return res.send(new ResponseWithObject(accessmodules.data.code, accessmodules.data.message, accessmodules.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/updateadminaccessmodules', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new APIResponse(400, "Body is required"));
        await axios({
            method: 'put',
            url: `${configData.adminVridheeMsUrl}uaccessmodules?moduleSection=${req.query.moduleSection}`,
            data: req.body
        })
            .then((accessmodules) => {
                return res.send(new ResponseWithObject(accessmodules.data.code, accessmodules.data.message, accessmodules.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.delete('/deleteadminaccessmodules', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.adminVridheeMsUrl}daccessmodules?id=${req.query.id}`
        })
            .then((accessmodules) => {
                return res.send(new ResponseWithObject(accessmodules.data.code, accessmodules.data.message, accessmodules.data.data));
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