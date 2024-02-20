import { Request, Response, NextFunction } from 'express'
import {
    findLogInUser, addLogInUser, updateLogInUser, getLoginUser, reNewToken, saveLocation,
    getToken
} from '../services/logInUserService';
import { APIResponse, APIResponseWithDetails, ResponseWithObject } from '../utils/status';

export const logInUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { jwtToken, google, userId, sid } = req.body;
        let logInUser = await findLogInUser(userId);
        if (logInUser) {
            const updateExistingUser = await updateLogInUser(jwtToken, google, userId, sid);
            if (updateExistingUser) {
                return res.status(201).send(new ResponseWithObject(201, "done", updateExistingUser));
            } else {
                return res.send(new APIResponse(400, 'logInUser are not created'));
            }
        } else {
            const addLogInUserData = await addLogInUser(jwtToken, google, userId, sid);
            if (addLogInUserData) {
                return res.status(201).send(new ResponseWithObject(201, "done", addLogInUserData));
            } else {
                return res.send(new APIResponse(400, 'logInUser are not created'));
            }
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export const isUserLogin = async (req: Request, res: Response, next: NextFunction) => {
    let isLogin = false;
    let tokens = [];
    let googleAccessToken = "";

    const { tokenuserid, apiKey } = req.body
    try {

        await getLoginUser(tokenuserid, apiKey).then(async (userTokenAsync: any) => {
            if (userTokenAsync.status == 200) {
                isLogin = true;
                googleAccessToken = userTokenAsync.userDetails?.google?.accessToken ? userTokenAsync.userDetails.google.accessToken : "";
                tokens = userTokenAsync.userDetails?.jwtToken ? userTokenAsync.userDetails.jwtToken : [];
            }
            res.send({ "isLogin": isLogin, "tokens": tokens, "googleAccessToken": googleAccessToken });
        }).catch(error => {
            res.send({ "isLogin": isLogin, "tokens": tokens });
            console.log("Error in tokenPushToArray:" + error.message);
        });


    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export const checkAuthOfUser = async (req: Request, res: Response, next: NextFunction) => { }

export const reNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const { jwtToken, userId } = req.body;

    try {

        await reNewToken(jwtToken, userId).then(async (userTokenAsync: any) => {
            let tokens = [];
            if (userTokenAsync.status == 200) {
                tokens = userTokenAsync.userDetails?.jwtToken ? userTokenAsync.userDetails.jwtToken : [];
            }
            res.send({ "tokens": tokens });
        }).catch(error => {
            res.send({ "Error in tokenPushToArray": error.message });
        });


    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export const location = async (req: Request, res: Response) => {
    try {
        let locationData = await saveLocation(req.body);
        if (locationData) {
            return res.send(new APIResponseWithDetails(200, "User Location Updated", locationData))
        } else {
            return res.send({ "status": 500, "message": "Location is Not Updated" })
        }
    } catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export const getLogInUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tokenuserid, sid } = req.body;
        let logInUser = await getToken(tokenuserid, sid);
        if (logInUser) {
            return res.status(200).send(new ResponseWithObject(200, "Success", logInUser));
        } else {
            return res.send(new APIResponse(400, 'User not login'));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}