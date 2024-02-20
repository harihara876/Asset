import mongoose from 'mongoose';
import { configData } from '../utils/config'
import { lookupmasterSchema } from './mongodbschemas/lookupMasterSchema'
import { actorSchema } from '../dbmanager/mongodbschemas/actorSchema'
import { userdetailSChema } from './mongodbschemas/userdetailSchema';
import { userProfileSchema } from './mongodbschemas/userProfileSchema';
import { logInUserSchema } from './mongodbschemas/logInUserSchema';
import { actorDBMetaDataSchema } from './mongodbschemas/actorDBMetaDataSchema';

let config: any = configData

let dbURL = config.DBURL//"mongodb://127.0.0.1:27017/"
let defdb = config.defdb//"jiohealthiomt"
let dbConnect: any
let primaryConnection: any
let SecondaryConnection: any

var logInUser, lookup, actor, subjects, userdetail, userprofile, currCategory, certification, university, company, designation, areaExpert, instituiton, actDbMetaData;

export async function makeNewConnection() {
    const db = mongoose.createConnection(dbURL, { maxPoolSize: 1000, maxConnecting: 100, maxIdleTimeMS: 100 });

    db.on('error', function (error) {
        db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
    });
    db.on('connected', function () {
        console.log("Connected to server: " + dbURL)
    });

    db.on('disconnected', function () {
    });

    return db;
}

export { primaryConnection, logInUser, lookup, actor, subjects, userdetail, userprofile, currCategory, certification, university, company, designation, areaExpert, instituiton, actDbMetaData }


export async function createConnection() {
    return dbConnect = await makeNewConnection();
}

export async function createSecondaryConnection(dbConnect) {
    primaryConnection = await dbConnect.useDb(defdb)
    lookup = primaryConnection.model("lookupmaster", lookupmasterSchema, "lookupmaster")
    actor = primaryConnection.model("actor", actorSchema, "actor")
    userdetail = primaryConnection.model("userdetail", userdetailSChema, "userdetail")
    userprofile = primaryConnection.model("userprofile", userProfileSchema, "userprofile")
    logInUser = primaryConnection.model("loginuser", logInUserSchema, "loginuser")
    actDbMetaData = primaryConnection.model("act_db_metadata", actorDBMetaDataSchema, "act_db_metadata")
}