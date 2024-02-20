import express from 'express';
import fs from 'fs'
import cors from 'cors';
import axios from 'axios';
require('dotenv').config();
import { configData } from './microservices/common/utils/config';

const app = express();

app.use(cors({ origin: true }));
RunDefaultMethods();

async function RunDefaultMethods() {
    await getConfigDetails();
}

//getting config values
async function getConfigDetails() {
    // let commonAPILink: any = ""; 
    // let commonAPILink1: any = configCommonUrl; 
    await axios.get(configData.commonAPIURL + "api/v1/get_config_details").then(async (result) => {
        //console.log(result)
        if (result.data) {
            let configData = result.data.data;
            // console.log("this is config File", configData)
            await fs.writeFile("webconfig.json", JSON.stringify(configData, null, 4), err => {
                // Checking for errors
                if (err) throw err;
                console.log("Done writing"); // Success
            });
        } else {
            console.log("no data");
        }
    }).catch((err) => {
        console.log("error:" + err.message);
        getConfigDetails();
    });

}

export default app