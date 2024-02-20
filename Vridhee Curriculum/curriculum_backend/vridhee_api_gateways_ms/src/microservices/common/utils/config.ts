import fs from 'fs';
require('dotenv').config();
const config: any = fs.readFileSync("./webconfig.json");
let configjson = JSON.parse(config);
let config_details = process.env.NODE_ENV.toString() == "development" ? configjson.local : configjson.server

export const configData = {
    s3Bucket: config_details.s3Bucket,
    commonAPIURL: config_details.commonAPIURL
}