import fs from 'fs';
import { getLogger, setLoggerOptions } from "./winstonlog";
require('dotenv').config();

const config: any = fs.readFileSync("./webconfig.json");
let configjson = JSON.parse(config);
let config_details = process.env.NODE_ENV.toString() == "development" ? configjson.local : configjson.server


export const configData = {
    DBURL: config_details.DBURL,
    defdb: config_details.defdb,
    onboardingUrl: config_details.onboardingUrl,
    s3Bucket: config_details.s3Bucket,
    googleOAuthCredentials: config_details.googleOAuthCredentials,
    onboardingMFUrl: config_details.onboardingMFUrl,
    curriculumDashboardModuleMS: config_details.curriculumDashboardModuleMS
}

export const microservicesurl = {
    curriculumDashboardModuleMS: config_details.curriculumDashboardModuleMS,
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
    ismail: config_details.ismail,
    accountUrl: config_details.accountUrl
}

export var logger: any

setLoggerOptions(config_details.logger_options);
async function run() {
    logger = await getLogger();
}
run();

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
// export class ConnectRedis {

//     private static instance: Redis;
//     private constructor() { }

//     public static getInstance(): Redis {
//         if (!ConnectRedis.instance) {

//             let hostName = config_details.REDIS_HOST

//             if (!hostName.includes(",")) {

//                 ConnectRedis.instance = new Redis({
//                     port: 6379, // Redis port
//                     host: hostName, // Redis host
//                     db: 0 // Defaults to 0
//                 });

//             } else {

//                 let endpoints = [];
//                 let slaves = hostName.split(',');

//                 for (let i = 0; i < slaves.length; i++) {
//                     let ipAndPort = slaves[i].split(':');
//                     endpoints.push({ host: ipAndPort[0], port: parseInt(ipAndPort[1]) });
//                 }

//                 var masterName = 'jhiredismaster';

//                 console.log('servers' + endpoints.map(x => JSON.stringify(x)));

//                 var sentinelPassword = 'tX7tKvr76pPSDa8a';

//                 var pwd = 'tX7tKvr76pPSDa8a';


//                 ConnectRedis.instance = new Redis({ sentinels: endpoints, name: masterName, password: pwd, sentinelPassword: sentinelPassword });
//             }

//             ConnectRedis.instance.on("connect", () => {
//                 console.log(`Redis client connected`);
//             });
//             ConnectRedis.instance.on("error", () => {
//                 console.log(`Redis Not connected`);
//             })

//         }

//         return ConnectRedis.instance;
//     }
// }

