import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from '../utils/config';
import { APIResponseStatus } from '../utils/status';

router.post('/checkEmailAndContactNumber', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { checkEmail, emailOrContactNumber } = req.body;
        if ((checkEmail === true || checkEmail === false) && emailOrContactNumber) {
            await axios({
                method: 'post',
                url: `${configData.accountUrl}checkEmailAndContactNumber`,
                data: { checkEmail, emailOrContactNumber }
            }).then((user) => {
                return res.send(new APIResponseStatus(user.data.code, user.data.message));
            }).catch(function (error) {
                return res.send(new APIResponseStatus(error.response.data.code, error.response.data.message));
            })
        } else {
            return res.send(new APIResponseStatus(400, 'checkEmail & emailOrContactNumber are mandetary fields.'));
        }
    } catch (error) {
        return res.send(new APIResponseStatus(400, error.message));
    }
})

export = router