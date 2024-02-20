import { logInUser } from '../dbmanager/dbconnection';
import { IJWTToken, IGoogle, IAuthorization, Location } from '../models/interfaces';

const addLogInUser = async (jwtToken: IJWTToken, google: IGoogle, userId: string, sid: string) => {
    try {
        const body = { jwtToken, google, userId, sid };
        let user: any = await logInUser.create(body);
        return user;
    } catch (error) {
        throw Error('add login user details ' + error.message)
    }
}

const findLogInUser = async (userId: string) => {
    try {
        let user: any = await logInUser.findOne({ userId });
        return user;
    } catch (error) {
        throw Error('find login user ' + error.message)
    }
}

const updateLogInUser = async (jwtToken: IJWTToken, google: IGoogle, userId: string, sid: string) => {
    try {
        let user: any = await logInUser.updateOne({ userId }, { jwtToken, google, sid });
        return user;
    } catch (error) {
        throw Error('update login user ' + error.message)
    }
}

const getLoginUser = async (tokenuserid: IAuthorization, apiKey: IAuthorization) => {
    let data = {};
    try {
        let loginUserDetails = await logInUser.findOne({
            "userId": tokenuserid,
            $or: [{ "jwtToken.jwtAccessToken": apiKey }, { "google.accessToken": apiKey }]
        });
        if (loginUserDetails) {
            data = {
                status: 200,
                userDetails: loginUserDetails,
                message: "success"
            }
            return data;
        } else {
            data = {
                status: 204,
                message: "User not exits"
            }
            return data;
        }
    }
    catch (err) {
        throw Error('500' + err.message)
    }

}

const reNewToken = async (jwtToken: IJWTToken, userId: string) => {
    try {
        let user: any = await logInUser.updateOne(
            {
                userId,
                "jwtToken.jwtRefreshToken": jwtToken.jwtRefreshToken
            },
            {
                $set: { "jwtToken.jwtAccessToken": jwtToken.reNewJwtAccessToken }
            }
        );
        return user;
    } catch (error) {
        throw Error('update login user ' + error.message)
    }
}

const saveLocation = async (data: Location) => {
    try {
        const filter = { "userId": data.user_id }; // Define your filter criteria
        const update = { $set: { "location": data.location } }; // Define the update operation

        let updateLocation: any = await logInUser.updateMany(filter, update);
        updateLocation.location = data.location;
        return updateLocation;
    } catch (error) {
        throw Error('error in update location' + error.message)
    }
}

const getToken = async (userId: string, sid: string) => {
    try {
        let user: any = await logInUser.findOne({ userId, sid });
        return user;
    } catch (error) {
        throw Error('find login user ' + error.message)
    }
}

export { addLogInUser, findLogInUser, updateLogInUser, getLoginUser, reNewToken, saveLocation, getToken }