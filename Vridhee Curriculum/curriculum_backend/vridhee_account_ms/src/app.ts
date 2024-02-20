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
import { getActors, getActorProfileDetails } from "./controllers/actorController";
import { addUserDetails, getUsersCount, updateUserDbMetadata } from './controllers/userDetailController';
import { forgetPassword, login, verifyOTP, checkIsUserLogin } from './controllers/loginController';
import { setPassword } from "./controllers/loginController";
import { emailVerification } from "./controllers/verificationController";
import { signup } from "./controllers/signUpController";
import { googleOauth } from "./controllers/googleOauthController";
import { isUserLogin, logInUser, reNewAccessToken, location, getLogInUser } from "./controllers/logInUserController";
import { logout } from "./controllers/logoutController";
import { checkEmailAndContactNumber, checkUser } from "./controllers/checkEmailAndContactNumberController";

const app = express();
const port = 4010;


app.use(cors({ origin: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

app.get("/", async (req, res) => {
    res.send(" Welcome to Vridhee Account Approvel Authorization Microservice accessed...");
});

//getting config values
async function getConfigDetails() {
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

app.get('/actors', getActors);
app.get('/getActorProfileDetails', getActorProfileDetails);
app.post('/addUserdetails', addUserDetails);
app.post('/signup', signup);
app.post('/login', login);
app.post('/verifyOTP', verifyOTP);
app.post('/forgetPassword', forgetPassword);
app.post('/setPassword', setPassword);
app.post('/emailVerification', emailVerification);
app.post('/oauth/google', googleOauth);
app.post('/logInUser', logInUser);
app.post('/isUserLogin', isUserLogin);
app.post('/reNewAccessToken', reNewAccessToken);
app.post('/checkEmailAndContactNumber', checkEmailAndContactNumber);
app.post('/location', location);
app.get('/getUsersCount', getUsersCount)
app.put('/updateUserDbMetadata', updateUserDbMetadata);
app.post('/logout', logout);
app.post('/checkIsUserLogin', checkIsUserLogin);
app.post('/checkUser', checkUser);
app.post('/getToken', getLogInUser);

app.listen(port, () => {
    console.log("port listen on " + port);
});