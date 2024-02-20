import fs from 'fs';
require('dotenv').config();
const config: any = fs.readFileSync("./webconfig.json");
let configjson = JSON.parse(config);
let config_details = process.env.NODE_ENV.toString() == "development" ? configjson.campus_local : configjson.campus_server

export const configData = {
    DBURL: config_details.DBURL,
    defdb: config_details.defdb,
    campusDashBoardMsUrl: config_details.campusDashBoardMsUrl,
    s3Bucket: config_details.s3Bucket   
}
export const microservicesurl = {
    configuration: config_details.configurationUrl,
    authorization: config_details.onboardingUrl,
    TOKEN_EXP: config_details.TOKEN_EXP,
    JWT_SECRET: config_details.JWT_SECRET,
    REFRESH_JWT_SECRET: config_details.REFRESH_JWT_SECRET,
    RESET_PWD_SECRET: config_details.RESET_PWD_SECRET,
    RESET_PWD_EXP: config_details.RESET_PWD_EXP,
    REF_TOKEN_EXP: config_details.REF_TOKEN_EXP,
    otpExpmin: config_details.otpExpmin,
    REDIS_PORT: config_details.REDIS_PORT,
    REDIS_HOST: config_details.REDIS_HOST,
    isPwdEnc: config_details.isPwdEnc,
    email: config_details.email,
    ismail: config_details.ismail
    
}

export var logger: any


export function isValidNumber(numberOnly) {
    let status = true;
    try {
        let patternNumOnly = /^[0-9]+$/;
        if (!patternNumOnly.test(numberOnly)) {
            status = false;
        }


    } catch (e) {
        e = null;
        status = false;
    }
    return status;
}
