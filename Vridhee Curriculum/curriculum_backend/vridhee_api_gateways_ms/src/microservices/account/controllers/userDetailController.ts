import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from '../utils/config';
import { APIResponse, Status } from '../utils/status';
import validateUserDetail from '../middlewares/validateUserDetail';
import userDetailSchema from '../validationSchemas/userDetailSchema';
import multer from 'multer';
const upload = multer();


router.post('/userdetails', validateUserDetail(userDetailSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'post',
            url: `${configData.accountUrl}addUserdetails`,
            data: req.body
        }).then((user) => {
            return res.send(new Status(user.data.code, user.data.message, user.data.data));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/signup', upload.single('image'), async (req: any, res: any, next: any) => {
    if (req.file === '' || req.file === undefined || req.file === null) {
        return res.send(new APIResponse(400, "User Profile Image is Mandatory"));
    }
    try {
        const reqData = JSON.parse(req.body.data);
        const { act_typ, email, user_pwd, cont_num, disp_name, vdisp_name, dob, gender } = reqData;
        if (!act_typ) {
            return res.send(new APIResponse(400, "Actor type is mandatory"));
        }
        if (!email) {
            return res.send(new APIResponse(400, "Email is mandatory"));
        }
        if (!user_pwd) {
            return res.send(new APIResponse(400, "Password is mandatory"));
        }
        if (!cont_num) {
            return res.send(new APIResponse(400, "Contact number is mandatory"));
        }
        if (!disp_name) {
            return res.send(new APIResponse(400, "Name is mandatory"));
        }
        if (!vdisp_name) {
            return res.send(new APIResponse(400, "Vridhee display name is mandatory"));
        }
        if (!dob) {
            return res.send(new APIResponse(400, "DOB is mandatory"));
        }
        if (!gender) {
            return res.send(new APIResponse(400, "Gender is mandatory"));
        }
        let bodyData = { file: req.file, data: req.body.data }
        await axios({
            method: 'post',
            url: `${configData.accountUrl}signup`,
            data: bodyData
        }).then((user) => {
            return res.send(new Status(user.data.code, user.data.message, user.data.data));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getUsersCount', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'get',
            url: `${configData.accountUrl}getUsersCount`,
        }).then((userCount) => {
            return res.send(new Status(userCount.data.code, userCount.data.message, userCount.data.data));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.put('/updateUserDbMetadata', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'put',
            url: `${configData.accountUrl}updateUserDbMetadata`,
        }).then((userCount) => {
            return res.send(new Status(userCount.data.code, userCount.data.message, userCount.data.data));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

export = router