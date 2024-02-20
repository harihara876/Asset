import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from "../../utils/config"
import { Status, APIResponse } from '../../utils/status';
import validateUserDetail from '../../middlewares/validateUserDetail';
import campusOnboardingSchema from '../../validationSchema.ts/campusOnboardingSchema';
import { validatePresence, validateMongoId } from '../../../../utils/validationFunctions';
import { validateCampusUserOnBoard } from "../../validationSchema.ts/campusValidations";
import multer from 'multer';
const upload = multer();

router.post('/getUserOnboardData', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const data = req.body;

        let presenceResult = validatePresence(["campus_id"], data, res);
        let idValidateResult = validateMongoId(["campus_id", "campus_group_id", "designation_id"], data, res);
        if (presenceResult || idValidateResult) {
            return;
        }

        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}getCampUserListing?listing=${req.query.listing}`,
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
//validateUserDetail.validateUserOnboard(campusOnboardingSchema.campusUserOnboardSchema)
router.post('/addUser',upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = JSON.parse(req.body.data);
        let bodyData = { file: req.file, data: data };
        if (bodyData.data.user_type === "Employee") {
            if (!bodyData.data.designation_id) {
                return res.send(new APIResponse(400, 'designation_id is required.'));
            };
            if (bodyData.data.designation_id !== "" && bodyData.data.designation_id != undefined) {
                if (!mongoose.Types.ObjectId.isValid(bodyData.data.designation_id)) {
                    return res.send(new APIResponse(400, 'Invalid designation_id'));
                }
            };
        };
        if (bodyData.data.user_type === "Student") {
            const validateStudent = await validateCampusUserOnBoard(bodyData.data);
            if(!validateStudent.err){
                return res.send(new APIResponse(400, validateStudent.msg));
            };
        }
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}createUserOnboard`,
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


router.put('/updateUserOnboardData',upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        let bodyData = req.body;
        if(req.query.image=="true"){
            bodyData = { file: req.file, data: req.body.data };
        };

        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updateUserOnboardData?image=${req.query.image}`, 
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


router.delete('/deleteUserOnboard', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new Status(400, "Body is required"));
        const data = req.body;
        if (!data.user_type && data.user_type == "" && data.user_type == undefined) {
            return res.send(new APIResponse(400, 'user_type is required.'));
        };
        if (!data.campus_group_id && data.campus_group_id == "" && data.campus_group_id == undefined) {
            return res.send(new APIResponse(400, 'campus_group_id is required.'));
        };
        if (!data.campus_id && data.campus_id == "" && data.campus_id == undefined) {
            return res.send(new APIResponse(400, 'campus_id is required.'));
        };
        if (!data.user_id && data.user_id == "" && data.user_id == undefined) {
            return res.send(new APIResponse(400, 'user_id is required.'));
        };

        if (!mongoose.Types.ObjectId.isValid(data.campus_group_id)) {
            return res.send(new APIResponse(400, 'Invalid campus_group_id'));
        }
        if (!mongoose.Types.ObjectId.isValid(data.campus_id)) {
            return res.send(new APIResponse(400, 'Invalid campus_id'));
        }
        if (!mongoose.Types.ObjectId.isValid(data.user_id)) {
            return res.send(new APIResponse(400, 'Invalid user_id'));
        }

        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}deleteUserOnboard`,
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


router.post('/resendEmail', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = req.body;

        let presenceResult = validatePresence(["campus_group_id","module_id","campus_id","user_id","email"],data,res);

        let idValidateResult = validateMongoId(["campus_group_id","module_id","campus_id","user_id"],data,res);

        if (presenceResult || idValidateResult) {
            return;
        }

        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}resendEmail`,
            data: data
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

export = router;

// if (presenceResult.flag === 1) {
//     return res.send(new APIResponse(400, `${presenceResult.fieldName} is required.`));
// };

// if (data.campus_id !== "" && data.campus_id != undefined) {
//     if (!mongoose.Types.ObjectId.isValid(data.campus_id)) {
//         return res.send(new APIResponse(400, 'Invalid campus_id'));
//     }
// };