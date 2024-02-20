import { Request, Response, NextFunction } from 'express';
import { ResponseWithObject, APIResponse } from "../utils/status";
import { generateOtp } from '../utils/generateOtp';
import { VridheeSendEmail } from '../utils/smsEmailSend';
import { emailVerificationMessage } from '../utils/emailTemplates';
import { iEmail } from '../models/interfaces';
import { configData } from '../utils/config';
let configSettings: any = configData


export async function emailVerification(req: Request<{}, {}, iEmail, {}>, res: Response, next: NextFunction) {
    try {
        const { email } = req.body;
        const { OTP, otpRefId } = await generateOtp();
        const subject: string = 'Vridhee Email Verification';
        const msg: string = OTP + ' ' + emailVerificationMessage;
        const emailVerificationResponse = await VridheeSendEmail(msg, subject, email, configSettings.email);
        if (emailVerificationResponse && emailVerificationResponse.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, "Email sent & Please verify the OTP.", { OTP, otpRefId }));
        }
        return res.status(400).send(new APIResponse(400, "Email not sent"));
    }
    catch (error) {
        return res.send(new APIResponse(500, error.message))
    }
}