import express from "express";
import axios from "axios";
import cors from "cors";
import fs from 'fs';
import bodyParser from 'body-parser';
const config: any = fs.readFileSync("./webconfig.json");
const configjson = JSON.parse(config);
require('dotenv').config();
const configCommonUrl = process.env.NODE_ENV.toString() == "development" ? configjson.local.commonAPIURL : configjson.server.commonAPIURL
getConfigDetails();
import { createConnection, createSecondaryConnection } from './dbmanager/dbconnection'
// import { getActorDetails } from "./controllers/lookupController";
import { getsubjectsList } from "./controllers/subjectsController";
import { getlookupdata } from "./controllers/lookupController";
import { getGradesList, getcurrCategoryTypes, getStudyFields } from './controllers/currCategoryController'
import {
    addUserProfile, updateUserProfile, getUserProfile, deleteAwardData, deleteProfessionalData, deleteEducationalData,
    updateAwardData, updateProfessionData, updateEducationData, getUserDetails, updateUserAwardsCertificates, getMentors
} from './controllers/userProfileController';
import { getCertificationData } from './controllers/certificationController'
import { getUniversityData } from './controllers/universityController'
import { getCompanyData } from './controllers/companyController'
import { getDesignationData } from './controllers/designationController'
import { getAreaExpertData } from "./controllers/areaExpertController";
import { getInstitutionData } from "./controllers/institutionController";

const app = express();
const port = 4030;

getConfigDetails();

app.use(cors({ origin: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

app.get("/", async (req, res) => {
    res.send(" Welcome to Vridhee Account Approvel Authorization Microservice accessed...");
});

//getting config values
async function getConfigDetails() {
    let commonAPILink: any = "";
    let commonAPILink1: any = configCommonUrl;

    try {

        await axios.get(`${configCommonUrl}api/v1/get_config_details`).then(async (result) => {
            //console.log(result)
            if (result.data) {
                let configData = result.data.data;
                await fs.writeFile("webconfig.json", JSON.stringify(configData, null, 4), (err) => {
                    // Checking for errors
                    if (err) throw err;
                    console.log("config file copied successfully"); // Success
                });

                let conn = await createConnection();
                await createSecondaryConnection(conn);

            } else {
                console.log("no data");
            }

        }).catch((err) => {
            console.log("error:" + err.message);
            getConfigDetails();
        });
    } catch (err) {
        console.log("Exception : " + err.message);
    }
}

app.get('/getUserDetails', getUserDetails);
app.get('/getsubjectsList', getsubjectsList);
app.get('/getlookupdata', getlookupdata)
app.get('/getGradesList', getGradesList);
app.post('/addUserProfile', addUserProfile);
app.get('/getUserProfile', getUserProfile)
app.put('/updateUserProfile', updateUserProfile);
app.put('/updateUserProfile/awardsCertificates', updateUserAwardsCertificates);
app.put('/deleteAwardData', deleteAwardData)
app.put('/deleteProfessionalData', deleteProfessionalData)
app.put('/deleteEducationalData', deleteEducationalData);
app.put('/updateAwardData', updateAwardData)
app.put('/updateProfessionData', updateProfessionData)
app.put('/updateEducationData', updateEducationData)
app.get('/getcurrCategoryTypes', getcurrCategoryTypes);
app.get('/getInstitutionData', getInstitutionData);
app.get('/getCertificationData', getCertificationData);
app.get('/getUniversityData', getUniversityData);
app.get('/getCompanyData', getCompanyData);
app.get('/getDesignationData', getDesignationData);
app.get('/getAreaExpertData', getAreaExpertData);
app.get('/getStudyFields', getStudyFields);
app.get('/getMentors', getMentors);

app.listen(port, () => {
    console.log("port listen on " + port);
});