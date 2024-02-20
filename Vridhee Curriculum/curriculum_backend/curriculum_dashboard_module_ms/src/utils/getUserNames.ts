import { userDetail } from '../dbmanager/dbconnection';

export const findUserDetails = async (userId) => {
    const uniqueId = [... new Set(userId)];
    let users = await userDetail.find(
        { _id: { $in: uniqueId } },
        { disp_name: 1 }
    );
    return users;
}