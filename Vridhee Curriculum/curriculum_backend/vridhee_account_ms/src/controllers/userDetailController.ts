import { Request, Response, NextFunction } from 'express';
import { adduserDetails, getCount, updateDbMetadata } from '../services/userDetailService';
import { APIResponse, ResponseWithObject, details } from '../utils/status';
import { IAddOrResponseUser } from '../models/interfaces'

export const addUserDetails = async (req: Request<{}, IAddOrResponseUser, IAddOrResponseUser, {}>, res: Response, next: NextFunction) => {
    try {
        const {
            act_typ, email, user_pwd, cont_num, disp_name, vdisp_name, dob, gender, cr_dts, up_dts
        } = req.body;
        const userDetail = { act_typ, email, user_pwd, cont_num, disp_name, vdisp_name, dob, gender, cr_dts, up_dts };
        const user = await adduserDetails(userDetail);
        if (user) {
            delete user.user_pwd;
            return res.status(201).send(new ResponseWithObject(201, "done", user));
        } else {
            return res.send(new APIResponse(400, 'Userdetails are not created'));
        }
    } catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}
export const getUsersCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCount = await getCount();
        if(userCount){
            return res.status(201).send(new ResponseWithObject(200, "done", userCount));
        } else {
            return res.send(new APIResponse(400, "No data available"));
        }
    } catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export const updateUserDbMetadata = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // let metaProfileId = req.query.profileId
        
        const dbMetadata: any = await updateDbMetadata();
        if (dbMetadata) {
            return res.status(200).send(new ResponseWithObject(200, "Update Success", dbMetadata));
        }
        else {
            return res.send(new APIResponse(400, "db_metadata already exists for this user"));
        }
    }
    catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}
