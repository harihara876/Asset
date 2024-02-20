import fs from 'fs';

const config: any = fs.readFileSync("./webconfig.json");
let configjson = JSON.parse(config);
let config_details = configjson.env.toString() == "local" ? configjson.local : configjson.server


export const configData = {
    s3Bucket: config_details.s3Bucket   
}