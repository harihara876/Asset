import { Request, Response, NextFunction } from 'express';
import { addOAuthDetails, findOAuthDetails } from '../services/userDetailService';
import { updateProfileWithS3Url } from '../services/userProfileService';
import { APIResponse, ResponseWithObject, details } from '../utils/status';
import { IAddOrResponseUser } from '../models/interfaces';
import { uploadFileIntoS3 } from '../utils/s3Config';

export const googleOauth = async (req: any, res: any, next: any) => {
    try {
        const {
            email, act_typ, disp_name, vdisp_name, dob, image, gender, cr_dts, up_dts
        } = req.body;
        const userDetailFromOAuth = { email, act_typ, disp_name, vdisp_name, dob, image, gender, cr_dts, up_dts };
        const userInfo = await findOAuthDetails(email);
        if (userInfo) {
            return res.status(200).send(new ResponseWithObject(200, "done", userInfo));
        } else {
            const user = await addOAuthDetails(userDetailFromOAuth);
            return res.status(200).send(new ResponseWithObject(200, "done", user));
        }
    } catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}