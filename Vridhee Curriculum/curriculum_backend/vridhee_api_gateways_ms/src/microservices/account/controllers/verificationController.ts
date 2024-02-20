import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from '../utils/config';
import { APIResponseStatus, Status } from '../utils/status';
import { MAILID_VALIDATE_MSG } from '../utils/errormsg';
import { validateEmail } from '../utils/smsEmailSend';

router.post('/sendOtpForEmailVerification', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let validatEmail = await validateEmail(req, res);
        if (validatEmail.status === 200) {
            await axios({
                method: 'post',
                url: `${configData.accountUrl}emailVerification`,
                data: req.body
            }).then((user) => {
                return res.send(new Status(user.data.code, user.data.message, user.data.data));
            }).catch((error) => {
                return res.send(new Status(400, error.message));
            })
        } else {
            return res.send(validatEmail);
        } 
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

export = router