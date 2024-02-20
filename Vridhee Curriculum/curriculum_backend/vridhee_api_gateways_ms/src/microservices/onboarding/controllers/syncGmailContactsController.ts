import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { configData } from '../utils/config';
import { microservicesurl } from '../utils/config';
import { APIResponseStatus, Status, APIResponse, ResponseWithDataObject } from '../utils/status';

const scopes = ['https://www.googleapis.com/auth/contacts.other.readonly'];

const oAuth2Client = new OAuth2Client(
    configData.googleOAuthCredentials.clientId,
    configData.googleOAuthCredentials.clientSecret,
    configData.googleOAuthCredentials.syncGmailContactsCallbackUrl
);

interface IEmail {
    "email": string
}

router.post('/syncGmailContacts', async (req: Request<{}, {}, IEmail, {}>, res: Response, next: NextFunction) => {
    try {
        let { email } = req.body;
        const { tokenuserid } = req.headers;
        if (!email) {
            return res.send(new APIResponseStatus(400, 'Email is required parameter.'));
        }
        const validateGmail = /^[\w.+\-]+@gmail\.com$/.test(email);
        if (!validateGmail) {
            return res.send(new APIResponseStatus(400, 'Invalid gmail.'));
        }
        await axios({
            method: 'post',
            url: `${microservicesurl.accountUrl}checkUser`,
            data: { email }
        }).then((user) => {
            const authUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes,
                state: JSON.stringify({ tokenuserid })
            });
            return res.send(authUrl)
        }).catch((error) => {
            return res.send(new APIResponseStatus(error.response.data.code, error.response.data.message));
        })
    }
    catch (error) {
        return res.send(new APIResponseStatus(400, error.message));
    }
})

router.get('/syncGmailContacts/callback', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const code: any = req.query.code;
        let state: any = req.query.state;
        let { tokenuserid } = JSON.parse(state);
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        const people = google.people({ version: 'v1', auth: oAuth2Client });
        // const { data: contactsData } = await people.people.connections.list({
        //     resourceName: 'people/me',
        //     personFields: 'names,emailAddresses,photos',
        // });
        // // Process the contacts
        // const contacts = contactsData.connections.map((contact) => ({
        //     name: contact.names ? contact.names[0].displayName : 'No Name',
        //     email: contact.emailAddresses ? contact.emailAddresses[0].value : 'No Email',
        // }));

        const { data: otherContactsData } = await people.otherContacts.list({
            readMask: 'names,emailAddresses,photos',
        });
        // Process other contacts
        const otherContacts = otherContactsData.otherContacts.map((otherContact) => ({
            name: otherContact.names ? otherContact.names[0].displayName : otherContact.emailAddresses[0].value.split('@')[0],
            email: otherContact.emailAddresses ? otherContact.emailAddresses[0].value : 'No Email',
            photo: otherContact.photos ? otherContact.photos[0].url : 'No Photo'
        }));
        let contactsObj = {
            user_id: tokenuserid,
            db_metadata: 26,
            contacts: otherContacts
        }
        await axios({
            method: 'post',
            url: `${configData.curriculumDashboardModuleMS}addGmailContacts`,
            data: contactsObj
        }).then(contact => {
            return res.redirect(`${configData.onboardingMFUrl}network`);
        }).catch(error => {
            return res.redirect(`${configData.onboardingMFUrl}network`);
        })
        // return res.send(new Status(200, 'done', otherContacts));
    }
    catch (error) {
        return res.send(new APIResponseStatus(400, error.message));
    }
})

router.post('/addGmailContacts', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, db_metadata, contacts } = req.body;
        if (!user_id) {
            return res.send(new APIResponse(400, 'User Id is mandatory'));
        }
        if (!db_metadata) {
            return res.send(new APIResponse(400, 'DB Metadata is mandatory'));
        }
        if (!contacts) {
            return res.send(new APIResponse(400, 'Contacts is mandatory'));
        }
        if (!contacts.length) {
            return res.send(new APIResponse(400, 'Atleast one contact is mandatory'));
        }
        await axios({
            method: 'post',
            url: `${configData.curriculumDashboardModuleMS}addGmailContacts`,
            data: req.body
        }).then((contacts) => {
            return res.send(new APIResponseStatus(contacts.data.status, contacts.data.message));
        }).catch((error) => {
            return res.send(new APIResponseStatus(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponseStatus(400, error.message));
    }
})

router.post('/getConnections', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, db_metadata } = req.body;
        if (!user_id) {
            return res.send(new APIResponse(400, 'User Id is mandatory'));
        }
        if (!db_metadata) {
            return res.send(new APIResponse(400, 'DB Metadata is mandatory'));
        }
        await axios({
            method: 'post',
            url: `${configData.curriculumDashboardModuleMS}getConnections`,
            data: req.body
        }).then((contacts) => {
            return res.send(new ResponseWithDataObject(contacts.data.status, contacts.data.message, contacts.data.data));
        }).catch((error) => {
            console.log(error)
            return res.send(new APIResponseStatus(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponseStatus(400, error.message));
    }
})

export = router;