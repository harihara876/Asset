import { userdetail, userprofile } from '../dbmanager/dbconnection';
import { IAddOrResponseUser } from '../models/interfaces';

const adduserDetails = async (userDetailObj: IAddOrResponseUser) => {
    try {
        userDetailObj.cr_dts = new Date().toISOString();
        userDetailObj.up_dts = new Date().toISOString();
        let userDetail: any = await userdetail.create(userDetailObj);
        let userProfile: any = {}
        userProfile.personal_info = {}
        userProfile.cr_dts = new Date().toISOString();
        userProfile.up_dts = new Date().toISOString();
        userProfile.personal_info.dob = userDetailObj.dob;
        userProfile.personal_info.gender = userDetailObj.gender;
        userProfile.user_id = userDetail._id;
        const userProfileRecord = await userprofile.create(userProfile);
        userDetail['_doc']['profileId'] = userProfileRecord._id;
        userDetail['_doc']['dob'] = userProfileRecord.personal_info.dob;
        userDetail['_doc']['gender'] = userProfileRecord.personal_info.gender;
        return userDetail;
    } catch (error) {
        throw Error('add user details ' + error.message)
    }
}

export { adduserDetails }