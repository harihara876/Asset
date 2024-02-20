import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config"
import { Status } from '../../utils/status';
import { IModuleQuery } from '../../models/interfaces';
import validateUserDetail from '../../middlewares/validateUserDetail';
import campusOnboardingSchema from '../../validationSchema.ts/campusOnboardingSchema';

router.post('/createDefaultCampusModules', validateUserDetail.validateDefaultModule(campusOnboardingSchema.campusDefaultModuleSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}createDefaultCampusModules`,
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

router.post('/getDefaultCampusModules', async (req: Request<{}, {}, {}, IModuleQuery>, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}getDefaultCampusModules?moduleSection=${req.query.moduleSection}`,
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

router.put('/updateDefaultCampusModules', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updateDefaultCampusModules?moduleSection=${req.query.moduleSection}`,
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

router.delete('/deleteDefaultCampusModules', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}deleteDefaultCampusModules?moduleSection=${req.query.moduleSection}&module_id=${req.query.module_id}&menu_id=${req.query.menu_id}`
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
