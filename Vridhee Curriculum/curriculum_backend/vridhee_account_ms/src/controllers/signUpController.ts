import { Request, Response, NextFunction } from 'express';
import { adduserDetails } from '../services/userDetailService';
import { updateProfileWithS3Url } from '../services/userProfileService';
import { APIResponse, ResponseWithObject, details } from '../utils/status';
import { IAddOrResponseUser } from '../models/interfaces';
import { uploadFileIntoS3 } from '../utils/s3Config';

export const signup = async (req: any, res: any, next: any) => {
    try {
        const image = req.body.file
        const bodyData = JSON.parse(req.body.data);
        const {
            act_typ, email, user_pwd, cont_num, disp_name, vdisp_name, dob, gender, cr_dts, up_dts
        } = bodyData;
        const userDetail = { act_typ, email, user_pwd, cont_num, disp_name, vdisp_name, dob, gender, cr_dts, up_dts };
        const user = await adduserDetails(userDetail);
        if (user) {
            const profileId = user['_doc']['profileId']
            const s3URL = await uploadFileIntoS3(profileId, image);
            const imageUrl = s3URL.url;
            await updateProfileWithS3Url({ personal_info: { image: imageUrl } }, profileId, 'personal_info');
            delete user.user_pwd;
            return res.status(201).send(new ResponseWithObject(201, "done", user));
        } else {
            return res.send(new APIResponse(400, 'Userdetails are not created'));
        }
    } catch (error) {
        console.log(error)
        return res.send(new APIResponse(500, error.message));
    }
}