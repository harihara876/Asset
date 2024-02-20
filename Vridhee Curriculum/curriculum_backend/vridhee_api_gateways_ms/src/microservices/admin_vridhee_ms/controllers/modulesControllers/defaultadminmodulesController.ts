import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config"
import { ResponseWithObject, Status } from '../../utils/status';
import validatedata from '../../middlewares/validatedata';
import validateSchema from '../../validationSchemas/validateSchema';

router.post('/addadminmodules', validatedata.validateCommonFunctionSchema(validateSchema.defaultAdminModuleSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'post',
            url: `${configData.adminVridheeMsUrl}insertadminModules`,
            data: req.body
        })
            .then((menuModule) => {
                return res.send(new ResponseWithObject(menuModule.data.code, menuModule.data.message, menuModule.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/getadminmodule', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'post',
            url: `${configData.adminVridheeMsUrl}getadminModules?moduleSection=${req.query.moduleSection}`,
            data: req.body
        })
            .then((menuModule) => {
                return res.send(new ResponseWithObject(menuModule.data.code, menuModule.data.message, menuModule.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/updateadminmodules', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'put',
            url: `${configData.adminVridheeMsUrl}updateadminModules?moduleSection=${req.query.moduleSection}`,
            data: req.body
        })
            .then((menuModule) => {
                return res.send(new ResponseWithObject(menuModule.data.code, menuModule.data.message, menuModule.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.delete('/deleteadminmodules', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.adminVridheeMsUrl}dadminmodules?moduleSection=${req.query.moduleSection}&module_id=${req.query.module_id}&menu_id=${req.query.menu_id}`
        })
            .then((menuModule) => {
                return res.send(new ResponseWithObject(menuModule.data.code, menuModule.data.message, menuModule.data.data));
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

