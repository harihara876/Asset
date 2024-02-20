import { userdetail, userprofile, actDbMetaData } from '../dbmanager/dbconnection';
import { IAddOrResponseUser } from '../models/interfaces';
import { setEncryptString } from '../utils/crypto';
import mongoose from 'mongoose';

const adduserDetails = async (userDetailObj: IAddOrResponseUser) => {
    try {
        userDetailObj.cr_dts = new Date().toISOString();
        userDetailObj.up_dts = new Date().toISOString();
        userDetailObj.user_pwd = await setEncryptString(userDetailObj.user_pwd);
        const actDBMetaData = await getActorDBMetaData();
        let userDetail: any = await userdetail.create(userDetailObj);
        let userProfile: any = {}
        userProfile.personal_info = {}
        userProfile.cr_dts = new Date().toISOString();
        userProfile.up_dts = new Date().toISOString();
        userProfile.personal_info.dob = userDetailObj.dob;
        userProfile.personal_info.gender = userDetailObj.gender;
        userProfile.user_id = userDetail._id;
        userProfile.act_typ = userDetail.act_typ;
        userProfile.db_metadata = actDBMetaData;
        const userProfileRecord = await userprofile.create(userProfile);
        userDetail['_doc']['profileId'] = userProfileRecord._id;
        userDetail['_doc']['dob'] = userProfileRecord.personal_info.dob;
        userDetail['_doc']['gender'] = userProfileRecord.personal_info.gender;
        return userDetail;
    } catch (error) {
        throw Error('add user details ' + error.message)
    }
}

const addOAuthDetails = async (userDetailObj) => {
    try {
        userDetailObj.cr_dts = new Date().toISOString();
        userDetailObj.up_dts = new Date().toISOString();
        userDetailObj.act_typ = userDetailObj.act_typ;
        const actDBMetaData = await getActorDBMetaData();
        let userDetail: any = await userdetail.create(userDetailObj);
        let userProfile: any = {}
        userProfile.personal_info = {}
        userProfile.cr_dts = new Date().toISOString();
        userProfile.up_dts = new Date().toISOString();
        userProfile.personal_info.dob = userDetailObj.dob;
        userProfile.personal_info.gender = userDetailObj.gender;
        userProfile.personal_info.image = userDetailObj.image;
        userProfile.user_id = userDetail._id;
        userProfile.act_typ = userDetail.act_typ;
        userProfile.db_metadata = actDBMetaData;
        const userProfileRecord = await userprofile.create(userProfile);
        userDetail['_doc']['profileId'] = userProfileRecord._id;
        userDetail['_doc']['dob'] = userProfileRecord.personal_info.dob;
        userDetail['_doc']['gender'] = userProfileRecord.personal_info.gender;
        userDetail['_doc']['image'] = userProfileRecord.personal_info.image;
        return userDetail;
    } catch (error) {
        throw Error('add user Info ' + error.message)
    }
}

const findOAuthDetails = async (email: string) => {
    try {
        try {
            const user = await userdetail.findOne({ email: email });
            if (user) {
                const userProfile = await userprofile.findOne({ user_id: user._id })
                user['_doc']['profileId'] = userProfile._id;
                user['_doc']['dob'] = userProfile.personal_info.dob;
                user['_doc']['gender'] = userProfile.personal_info.gender;
                return user;
            } else {
                return ''
            }
        } catch (error) {
            throw Error('Find user info ' + error.message)
        }
    } catch (error) {
        throw Error('Find user info ' + error.message)
    }
}

const checkEmailAndContactnumber = async (checkEmail, emailOrContactNumber) => {
    try {
        let query = {}
        if (checkEmail) {
            query['email'] = emailOrContactNumber
        } else {
            query['cont_num'] = emailOrContactNumber
        }
        const user = await userdetail.findOne(query);
        return user;
    } catch (error) {
        throw Error('Find user info ' + error.message)
    }
}

const getActorDBMetaData = async () => {
    const totalCount = await userprofile.count();
    const actMetaData = await actDbMetaData.find();
    let actMetaDataIds = [];
    for (let actData of actMetaData) {
        for (let collection of actData.act_collection) {
            let metaDataObj: any = {}
            if (collection.start_value <= totalCount && collection.end_value >= totalCount) {
                metaDataObj.db_id = actData.db_id
                metaDataObj.collection_id = collection._id;
                actMetaDataIds.push(metaDataObj)
            }
        }
    }
    return actMetaDataIds;
}

export const getCount = async () => {
    try {
        const userCount = await userdetail.count()
        return userCount
    } catch (error) {
        throw Error('getCount: ' + error.message)
    }
}

export const updateDbMetadata = async () => {
    try {
        const findUser = await userprofile.find({ "db_metadata": { $exists: false } });

        const actDBMetaData = await getActorDBMetaData();
        // console.log("actDBMetaData>>", actDBMetaData)
        const userIds = findUser.map(user => user.user_id);
        // console.log("userIds>>", userIds)
        const metaResult = await userprofile.updateMany(
            {
                "user_id": { $in: userIds }
            },
            {
                $push: {
                    "db_metadata": {
                        $each: actDBMetaData
                    }
                }
            }
        );
        return metaResult;
    } catch (error) {
        throw Error('updateDbMetadata ' + error.message)
    }
}

const getUserById = async (userId: string) => {
    try {
        let user = await userdetail.findOne({ _id: new mongoose.Types.ObjectId(userId) });
        if (user) {
            const profile = await userprofile.findOne({ user_id: new mongoose.Types.ObjectId(userId) })
            user['_doc']['profileId'] = profile._id;
            user['_doc']['dob'] = profile.personal_info.dob;
            user['_doc']['gender'] = profile.personal_info.gender;
        } else {
            user = ''
        }
        return user
    } catch (error) {
        throw Error('get user ' + error.message)
    }
}

const verifyUser = async (email: string) => {
    try {
        const user = await userdetail.findOne({ email });
        return user;
    } catch (error) {
        throw Error('Find user info ' + error.message)
    }
}

export { adduserDetails, addOAuthDetails, findOAuthDetails, checkEmailAndContactnumber, getUserById, verifyUser }