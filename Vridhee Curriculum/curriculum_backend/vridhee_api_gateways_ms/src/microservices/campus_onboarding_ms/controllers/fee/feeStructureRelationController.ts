import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';
import {validatePresence,validateMongoId} from '../../../../utils/validationFunctions';


router.post('/getfeeStructureReln', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data =req.body
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        let presenceResult = validatePresence(["campus_group_id"],data,res);
        let idValidateResult = validateMongoId(["fee_structure_id","fee_structure_rel_id","campus_id"],data,res);
        if (presenceResult || idValidateResult) {
            return;
        }
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}getfeerels`,
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


router.post('/createfeeStructureReln', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}createfeerels`,
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


router.put('/updatefeeStructureReln', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data =req.body
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        let presenceResult = validatePresence(["feeStructureRel_id"],data,res);
        let idValidateResult = validateMongoId(["feeStructureRel_id"],data,res);
        if (presenceResult || idValidateResult) {
            return;
        }
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updatefeerels`,
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



router.delete('/deletefeeStructureReln', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data =req.body
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        let presenceResult = validatePresence(["feeStructureRel_id"],data,res);
        let idValidateResult = validateMongoId(["feeStructureRel_id"],data,res);
        if (presenceResult || idValidateResult) {
            return;
        }
        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}delfeerels`,
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


export = router;