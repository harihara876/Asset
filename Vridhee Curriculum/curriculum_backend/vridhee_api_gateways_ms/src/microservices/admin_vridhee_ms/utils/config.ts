import fs from 'fs';
require('dotenv').config();

const config: any = fs.readFileSync("./webconfig.json");
let configjson = JSON.parse(config);
export let config_details = process.env.NODE_ENV.toString() == "development" ? configjson.campus_local : configjson.campus_server

export const configData = {
    adminVridheeMsUrl: config_details.adminVridheeMsUrl
};

export const microservicesurl = {
    JWT_SECRET: config_details.JWT_SECRET,

};