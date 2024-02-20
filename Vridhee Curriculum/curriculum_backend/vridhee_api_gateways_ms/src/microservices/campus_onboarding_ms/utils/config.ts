import fs from 'fs';
require('dotenv').config();
const config: any = fs.readFileSync("./webconfig.json");
let configjson = JSON.parse(config);
let config_details = process.env.NODE_ENV.toString() == "development" ? configjson.campus_local : configjson.campus_server

export const configData = {
    DBURL: config_details.DBURL,
    defdb: config_details.defdb,
    campusOnBoardingMsUrl: config_details.campusOnBoardingMsUrl,
    commonAPIURL: config_details.commonAPIURL,
    apiGatewayUrl: config_details.apiGatewayUrl,
    s3Bucket: config_details.s3Bucket,
};
