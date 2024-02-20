import fs from 'fs';
require('dotenv').config();

const config: any = fs.readFileSync("./webconfig.json");
let configjson = JSON.parse(config);
export let config_details = process.env.NODE_ENV.toString() == "development" ? configjson.local : configjson.server

export const configData = {
    curriculumDashboardModuleMS: config_details.curriculumDashboardModuleMS
}