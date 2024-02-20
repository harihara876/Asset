import { userdetail, userprofile } from '../dbmanager/dbconnection';
import { logger } from '../utils/winstonlog';
import { ILogInUser } from '../models/interfaces';


export async function getUserByEmailContact(query: ILogInUser) {

    try {

        let data: any
        let search = {
            "$or": [
                {
                    "email": query.userId
                },
                {
                    "cont_num": query.userId
                }
            ]
        }
        try {
            data = await userdetail.findOne(search)
            if (data) {
                const profile = await userprofile.findOne({ user_id: data._id })
                data['_doc']['profileId'] = profile._id;
                data['_doc']['dob'] = profile.personal_info.dob;
                data['_doc']['gender'] = profile.personal_info.gender;
            } else {
                data = ''
            }
        } catch (error) {
            data = ''
        }
        return data;

    } catch (error) {
        throw Error('getUserByEmailContact ' + error.message)
    }
}

export async function updateUserById(id, jsonObject) {
    try {
        let data: any
        data = await userdetail.findByIdAndUpdate(id,
            {
                $set: jsonObject
            }
        );

        return data;
    } catch (error) {
        throw Error('updateUserById ' + error.message)
    }
}

export async function getUserByOtpRef(query) {

    try {
        let data: any
        let search = {
            $and: [{ otp: query.otp }, { otpRef: query.ref }]
        }
        data = await userdetail.findOne(search)
        return data;
    } catch (error) {
        throw Error('getUserByOtpRef ' + error.message)
    }
}

export async function getUserDetailsById(query) {

    try {

        let data: any
        try {
            data = await userdetail.findOne({ _id: query.userId });

        } catch (error) {
            data = ''
        }
        return data;

    } catch (error) {
        throw Error('getUserById ' + error.message)
    }
}