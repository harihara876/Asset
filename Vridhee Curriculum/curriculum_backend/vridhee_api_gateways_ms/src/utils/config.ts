import fs from 'fs';
require('dotenv').config();
const config: any = fs.readFileSync("./webconfig.json");
let configjson = JSON.parse(config);
let config_details = process.env.NODE_ENV.toString() == "development" ? configjson.campus_local : configjson.campus_server

export const configData = {
    secretkey: config_details.adminSecretKey
};
