import bcrypt from "bcryptjs";
// import otpGenerator from "otp-generator";
// var dateFormat = require('dateformat');
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/winstonlog';
import { APIResponse, ResponseWithObject } from "../utils/status";
import { PASSWORD_ALREADY_UPDATED, done, inactiveUsrMsg, invalidOtpErrMsg, invalidUserErrMsg, noUserErrMsg, otptimeexpired, resetPwdMsg, samePwdMsg, sendOtpMsg, usrNotExistsErrMsg } from "../utils/errormsg";
import { configData } from '../utils/config'
import { getUserByEmailContact, getUserByOtpRef, getUserDetailsById } from "../services/loginService";
import { updateUserById } from "../services/loginService";
import { SMPP_SendSMS, VridheeSendEmail } from "../utils/smsEmailSend";
import { ILogInUser, IVerifyOTP, IUserId } from '../models/interfaces';
import { generateOtp } from '../utils/generateOtp';
import { forgetOTPVerification } from '../utils/emailTemplates';
import { getDecryptString, setEncryptString } from '../utils/crypto';
import { getUserById } from "../services/userDetailService";
let configSettings: any = configData


export async function login(req: Request<{}, {}, ILogInUser, {}>, res: Response, next: NextFunction) {
    var body = req.body;
    let user: any;

    try {
        user = await getUserByEmailContact(body)
        if (user) {
            let password = false;
            const decryptedPassword = await getDecryptString(user.user_pwd)
            if (body.pwd == decryptedPassword) {
                password = true;
            }
            if (password) {
                let jsonObj: any = {}
                if (user.isUserLogIn) {
                    jsonObj = {
                        lastLoginDt: new Date(Date.now())
                    }
                    await updateUserById(user?._id, jsonObj);
                    return res.status(200).send(new ResponseWithObject(200, done, user));
                } else if (!user.isUserLogIn) {
                    jsonObj = {
                        isUserLogIn: true,
                        lastLoginDt: new Date(Date.now())
                    }
                    await updateUserById(user?._id, jsonObj);
                    return res.status(200).send(new ResponseWithObject(200, done, user));
                } else {
                    return res.send(new APIResponse(400, inactiveUsrMsg));
                }
                // if (user.lastLoginDt === undefined || user.sts == 1) {
                //     return res.status(200).send(new ResponseWithObject(200, done, user));
                // } else {
                //     return res.send(new APIResponse(400, inactiveUsrMsg));
                // }
            } else {
                return res.send(new APIResponse(400, invalidUserErrMsg));
            }
        } else {
            return res.send(new APIResponse(400, usrNotExistsErrMsg));
        }
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
}

export async function verifyOTP(req: Request<{}, {}, IVerifyOTP, {}>, res: Response, next: NextFunction) {
    let body = req.body;
    try {
        let user = await getUserByOtpRef(body);
        if (user) {
            let curTime = new Date(Date.now()).valueOf();
            let otpSentTime = new Date(user.otpExpTime).getTime();
            let diffTime = (curTime - otpSentTime) / 60000;
            let expiryTime = configSettings.otpExpmin;

            if (diffTime > expiryTime) {
                return res.send(new APIResponse(400, otptimeexpired));
            } else if (!user.lastLoginDt || user.sts == 1) {
                return res.status(200).send(new ResponseWithObject(200, done, user));
            } else {
                return res.send(new APIResponse(400, inactiveUsrMsg));
            }
        } else {
            return res.send(new APIResponse(400, invalidOtpErrMsg));
        }
    } catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export async function forgetPassword(req: Request<{}, {}, ILogInUser, {}>, res: Response, next: NextFunction) {
    let body = req.body;
    try {
        let user = await getUserByEmailContact(body);
        const { OTP, otpRefId } = await generateOtp();
        const subject: string = 'Vridhee-Reset Password';
        const msg: string = OTP + ' ' + forgetOTPVerification;
        await VridheeSendEmail(msg, subject, user.email, configSettings.email);
        let minutesToAdd = configSettings.otpExpmin;
        let currentDate = new Date();
        let futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);

        let resetTime = new Date()
        let jsonObj: any = {
            otp: OTP,
            otpRef: otpRefId,
            uptby: user?._id,
            otpExpTime: futureDate,
            resetLinkTime: resetTime.valueOf(),
            pwdUpdtd: false,
            up_dts: new Date(Date.now())
        }
        await updateUserById(user?._id, jsonObj)
        if (user) {
            return res.status(200).send(new ResponseWithObject(200, done, { user, otp: OTP, otpRefId }));
        } else {
            return res.send(new APIResponse(400, noUserErrMsg));
        }
    } catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export async function setPassword(req: Request<{}, {}, ILogInUser, {}>, res: Response, next: NextFunction) {
    let body = req.body;
    try {
        let user = await getUserDetailsById(body);
        if (user) {
            let resetDifference: any
            let presentDateTime = new Date();
            let currentEpoch = presentDateTime.valueOf();
            if (user.resetLinkTime) {
                resetDifference = currentEpoch - parseInt(user.resetLinkTime);
            } else {
                resetDifference = 0
            }
            if (resetDifference < 86400000 && user.pwdUpdtd == "false") {
                const setEncryptionPwd = await setEncryptString(body.pwd);
                const getDecryptedPwd = await getDecryptString(user.user_pwd);
                if (body.pwd !== getDecryptedPwd) {
                    let jsonObj: any = {
                        user_pwd: setEncryptionPwd,
                        sts: 1,
                        uptby: body.userId,
                        lastLoginDt: new Date(Date.now()),
                        pwdUpdtd: true,
                        resetLinkTime: currentEpoch,
                        uptat: new Date(Date.now())
                    }
                    await updateUserById(user._id, jsonObj)
                } else {
                    return res.send(new APIResponse(400, samePwdMsg))
                }
            } else {
                return res.send(new APIResponse(401, PASSWORD_ALREADY_UPDATED));
            }
            return res.send(new ResponseWithObject(200, done, { message: resetPwdMsg }))
        }
        else {
            return res.send(new APIResponse(400, usrNotExistsErrMsg))
        }
    } catch (error) {
        return res.send(new APIResponse(500, error.message))
    }
}

export async function checkIsUserLogin(req: Request<{}, {}, IUserId, {}>, res: Response, next: NextFunction) {
    try {
        const { tokenuserid } = req.body;
        const user = await getUserById(tokenuserid);
        if (!user) {
            return res.status(400).send(new APIResponse(400, "User not found."));
        }
        if (!user.isUserLogIn) {
            return res.status(400).send(new APIResponse(400, "User not login. Please login again"));
        }
        return res.status(200).send(new ResponseWithObject(200, done, user));
    }
    catch (error) {
        return res.send(new APIResponse(500, error.message))
    }
}