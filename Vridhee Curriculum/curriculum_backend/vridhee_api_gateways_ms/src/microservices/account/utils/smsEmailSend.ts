import mail from 'nodemailer';
import axios from 'axios'
import smpp from 'smpp'
import { getLogger } from './winstonlog';
import AWS from 'aws-sdk';
import { APIResponseStatus } from './status';
import { MAILID_VALIDATE_MSG, MAIL_MSG, PHONENO_VALIDATE_MSG, done, mobLengthMsg } from './errormsg';

let logger: any 


export function setEmailLogger(loggerOption) {
    logger = loggerOption;
}

export async function VridheeSendEmail(msg, sub, tomail, emailConfigdata, isbodyhtml = false) {
    let logger = await getLogger();
    try {
        var trans = await mail.createTransport({
            host: emailConfigdata.host,
            port: 587,
            secure: false,
            auth: {
                user: emailConfigdata.SMTPUserName,
                pass: emailConfigdata.SMTPPassword
            }
        });
        var mailOpt;

        if (!isbodyhtml) {
            mailOpt = {
                from: emailConfigdata.fromEmailId,
                to: tomail,
                subject: sub,
                text: msg
            }
        }
        else {
            mailOpt = {
                from: emailConfigdata.fromEmailId,
                to: tomail,
                subject: sub,
                html: msg
            }
        }

        let response;
        response = await trans.sendMail(mailOpt);
        if (response.messageId) {
            response.status = 200;
            logger.error( "Response  :" + "Success" + "," + "msg : Email sent");
        }
        else {
            response.status = 400;
            logger.error( "Response  :" + "Fail" + "," + "Exception : Email sent failed");
        }
        return response;

    } catch (error) {
        console.log("vridhee mail catch error:" + error.message);
        logger.error("Request  :" + "Exception" + "," + "Exception : In SendEmail " + error.message);
    }
}

export async function SMPP_SendSMS(msg, mobileno, config_data) {
    try {
        const sns = new AWS.SNS({
            accessKeyId: config_data.AWSAccessKeyId,
            secretAccessKey: config_data.AWSSecretKey,
            region: 'ap-south-1' // Replace with your desired AWS region
        });

        const params = {
            Message: msg,
            PhoneNumber: mobileno
        };

        const result = await sns.publish(params).promise();

        if (result.MessageId) {
            return {
                mobileno,
                messageid: result.MessageId,
                sendstatus: 'sent'
            };
        } else {
            return {
                mobileno,
                messageid: '',
                sendstatus: 'failed'
            };
        }
    } catch (error) {
        console.log("Error in SMPP_SendSMS:", error);
        return {
            mobileno,
            message: error.message,
            sendstatus: 'failed'
        };
    }
}

export function validateEmail(req, res) {
    try {
        let emailrex = new RegExp("^[a-zA-Z0-9]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$");
        const { email } = req.body;
        if (!email) {
            return new APIResponseStatus(400, MAIL_MSG);
        }
        else if (email && !email.match(emailrex)) {
            return new APIResponseStatus(400, MAILID_VALIDATE_MSG);
        } else {
            return new APIResponseStatus(200, done);
        }
    } catch (error) {
        return error.message;
    }
}

export function validatePhoneNo(req) {
    try {
        let MOBILE_REGX = /^[0]?[56789]\d{9}$/;
        const { phoneNo } = req.body;
        if (phoneNo && phoneNo.length != 10) {
            return new APIResponseStatus(400, mobLengthMsg);
        }
        else if (phoneNo && !String(phoneNo).match(MOBILE_REGX)) {
            return new APIResponseStatus(400, PHONENO_VALIDATE_MSG);
        } else {
            return new APIResponseStatus(200, done);
        }
    } catch (error) {
        return error.message
    }
}