import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';
import {validatePresence,validateMongoId} from '../../../../utils/validationFunctions';

router.post('/getFeeStructure', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data =req.body
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        let presenceResult = validatePresence(["campus_group_id"],data,res);
        let idValidateResult = validateMongoId(["fee_structure_id","campus_group_id","campus_id"],data,res);
        if (presenceResult || idValidateResult) {
            return;
        }
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}getFeeStructList`,
            data: req.body
        })
            .then((feestructure) => {
                return res.send(new Status(feestructure.data.code, feestructure.data.message, feestructure.data.data));
            })
            .catch(function (error) {
                return res.send(new APIResponse(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.post('/createFeeStructure', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data =req.body
           if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
            let presenceResult = validatePresence(["campus_id","campus_group_id","str_name"],data,res);
            let idValidateResult = validateMongoId(["campus_id","campus_group_id"],data,res);
            if (presenceResult || idValidateResult) {
                return;
            }
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}addfeeStruct`,
            data: req.body
        })
            .then((feestructure) => {
                return res.send(new Status(feestructure.data.code, feestructure.data.message, feestructure.data.data));
            })
            .catch(function (error) {
                return res.send(new APIResponse(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});


router.put('/updateFeeStructure', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data =req.body
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        let presenceResult = validatePresence(["fee_structure_id"],data,res);
        let idValidateResult = validateMongoId(["campus_id","campus_group_id","fee_structure_id"],data,res);
        if (presenceResult || idValidateResult) {
            return;
        }

        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updatefeeStruct?section=${req.query.section}`,
            data: req.body
        })
            .then((feestructure) => {
                return res.send(new Status(feestructure.data.code, feestructure.data.message, feestructure.data.data));
            })
            .catch(function (error) {
                return res.send(new APIResponse(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});



router.delete('/deleteFeeStructure', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data =req.body
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        let presenceResult = validatePresence(["feeStructure_id"],data,res);
        let idValidateResult = validateMongoId(["feeStructure_id"],data,res);
        if (presenceResult || idValidateResult) {
            return;
        }
        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}delfeeStruct`,
            data: req.body
        })
        .then((feeCategory) => {
            return res.send(new Status(feeCategory.data.code, feeCategory.data.message, feeCategory.data.data));
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