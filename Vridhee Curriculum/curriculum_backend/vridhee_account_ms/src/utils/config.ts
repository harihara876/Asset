var fs = require("fs");
require('dotenv').config();
var config = fs.readFileSync("./webconfig.json");
console.log(process.env.NODE_ENV)
let configjson = JSON.parse(config);
let config_details = process.env.NODE_ENV.toString() == "development" ? configjson.local : configjson.server

 export const configData = {
    DBURL: config_details.DBURL,
    defdb: config_details.defdb,
    logger_options: config_details.logger_options,
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
    ismail: config_details.ismail,
    issendsms: config_details.issendsms,
    issmpp: config_details.issmpp,
    issmtp: config_details.issmtp,
    sms: config_details.sms,
    s3Bucket: config_details.s3Bucket,
    s3BaseUrl: config_details.s3BaseUrl,


}