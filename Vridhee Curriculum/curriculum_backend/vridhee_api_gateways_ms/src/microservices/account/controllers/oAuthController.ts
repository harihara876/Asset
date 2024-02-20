import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData, scopes } from '../utils/config';
import { Status, ResponseWithDataObject, APIResponseStatus } from '../utils/status';
import { google } from 'googleapis';
import { done } from '../utils/errormsg';
import { generateToken } from '../utils/generateToken';


router.get('/oauth/google', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { act_typ, type } = req.query
        if (!act_typ) {
            return res.send(new APIResponseStatus(400, 'act_type is required parameter'));
        }
        let client = new google.auth.OAuth2(
            configData.googleOAuthCredentials.clientId,
            configData.googleOAuthCredentials.clientSecret,
            configData.googleOAuthCredentials.callbackUrl,
        );
        const authorizationUrl: string = client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            include_granted_scopes: false,
            state: JSON.stringify({ act_typ, type })
        });
        return res.send(authorizationUrl)
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/oauth/google/callback', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let client = new google.auth.OAuth2(
            configData.googleOAuthCredentials.clientId,
            configData.googleOAuthCredentials.clientSecret,
            configData.googleOAuthCredentials.callbackUrl,
        );
        let code: any = req.query.code;
        let state: any = req.query.state;
        let { act_typ, type } = JSON.parse(state);
        let { tokens } = await client.getToken(code);
        client.setCredentials({
            access_token: tokens.access_token,
            scope: scopes,
        })
        const service = google.people({ version: 'v1', auth: client });
        let errorStatus = false;
        service.people.get({
            resourceName: 'people/me',
            personFields: 'genders,birthdays,names,emailAddresses,photos,phoneNumbers'
        }, async (err: any, peopleData: any) => {
            // Do your thing
            if (err) {
                errorStatus = true;
            } else {
                let userObj: any = {};
                userObj.act_typ = JSON.parse(act_typ);
                userObj.email = peopleData.data.emailAddresses[0].value;
                userObj.disp_name = peopleData.data.names[0].displayName;
                userObj.vdisp_name = peopleData.data.names[0].displayName;
                userObj.image = peopleData.data.photos[0].url;
                userObj.dob = `${peopleData.data.birthdays[0].date.year}-${peopleData.data.birthdays[0].date.month}-${peopleData.data.birthdays[0].date.day}`;
                userObj.gender = peopleData.data.genders[0].formattedValue;
                await axios.post(`${configData.accountUrl}oauth/google`, userObj)
                    .then(async (result) => {
                        let response = result.data;
                        if (response.code == 200 && response.data._id) {
                            let resTokenObj = await generateToken(response.data);
                            let userObj: any = {};
                            userObj._2faEnabled = response.data._2fa ? true : false
                            userObj.accessToken = resTokenObj.token
                            userObj.expiresIn = resTokenObj.expiresIn
                            userObj.firstLogin = response.data.lastLoginDt ? false : true
                            userObj.refreshToken = resTokenObj.refreshToken
                            userObj.tokenType = "JWT"
                            await axios.post(`${configData.accountUrl}logInUser`, {
                                jwtToken: {
                                    jwtAccessToken: resTokenObj.token,
                                    jwtRefreshToken: resTokenObj.refreshToken,
                                    expiresin: resTokenObj.expiresIn
                                }, google: {
                                    id: peopleData.data.resourceName,
                                    accessToken: tokens.access_token,
                                }, userId: response.data._id
                            })
                            await axios({
                                method: 'get',
                                url: `${configData.onboardingUrl}getUserDetails?userId=${response.data._id}`,
                            }).then((userVerify) => {
                                if (userVerify && userVerify.data.code === 400) {
                                    return res.redirect(`${configData.onboardingMFUrl}?${resTokenObj.token}?${type}`);
                                } else if (userVerify && userVerify.data.code === 200) {
                                    return res.redirect(`${configData.curriculumDashboardMFUrl}?${resTokenObj.token}?${type}`)
                                }
                            }).catch((error) => {
                                return res.redirect(`${configData.accountMFUrl}login`);
                            })
                            // return res.redirect(`${configData.onboardingMFUrl}?token=${resTokenObj.token}`);
                            // return res.status(200).send(new ResponseWithDataObject(200, done, resTokenObj));
                        } else {
                            return res.redirect(`${configData.accountMFUrl}login`);
                            // return res.status(400).send(new APIResponseStatus(400, "Invalid user"));
                        }
                    }).catch((error) => {
                        return res.status(400).send(new APIResponseStatus(400, error.message));
                    })
            }
        });
        if (errorStatus) {
            return res.send(new Status(400, 'Error while fetching data in google account'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

export = router