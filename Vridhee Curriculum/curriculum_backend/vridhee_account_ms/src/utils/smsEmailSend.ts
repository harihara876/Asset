import mail from 'nodemailer';
import axios from 'axios';
import smpp from 'smpp';
import AWS from 'aws-sdk';

let logger: any


export function setEmailLogger(loggerOption) {
    logger = loggerOption;
}

export async function VridheeSendEmail(msg, sub, tomail, emailConfigdata, isbodyhtml = false) {
    // let logger = await getLogger();
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
            // logger.error( "Response  :" + "Success" + "," + "msg : Email sent");
        }
        else {
            response.status = 400;
            // logger.error( "Response  :" + "Fail" + "," + "Exception : Email sent failed");
        }
        return response;
    } catch (error) {
        return { status: 500, message: error.message }
        // logger.error("Request  :" + "Exception" + "," + "Exception : In SendEmail " + error.message);
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