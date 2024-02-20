import mongoose from 'mongoose';
import { configData } from '../utils/config'
import { lookupmasterSchema } from './mongodbschemas/lookupMasterSchema'
import { subjectsSchema } from './mongodbschemas/curr_grade_subjectsSchema';
import { userProfileSchema } from './mongodbschemas/userProfileSchema';
import { currCategorySchema } from './mongodbschemas/currCategorySchema';
import { certificationSchema } from '../dbmanager/mongodbschemas/certificationSchema'
import { universitySchema } from './mongodbschemas/universitySchema';
import { companySchema } from './mongodbschemas/companySchema';
import { designationSchema } from './mongodbschemas/designationSchema';
import { areaExpertSchema } from './mongodbschemas/areaExpertSchema';
import { instituteSchema } from './mongodbschemas/institutionSchema'
import { subjectSchema } from './mongodbschemas/subjectsSchema';
import { actorSchema } from './mongodbschemas/actorSchema';
import { userdetailSChema } from './mongodbschemas/userdetailSchema';

let config: any = configData

let dbURL = config.DBURL//"mongodb://127.0.0.1:27017/"
let defdb = config.defdb//"jiohealthiomt"
let dbConnect: any
let primaryConnection: any
let SecondaryConnection: any

var lookup, actor, subjects, userdetail, userprofile, currCategory, certification, university, company, designation, areaExpert, instituiton, newsubject;

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

export { primaryConnection, lookup, actor, subjects, userdetail, userprofile, currCategory, certification, university, company, designation, areaExpert, instituiton, newsubject }


export async function createConnection() {
    return dbConnect = await makeNewConnection();
}

export async function createSecondaryConnection(dbConnect) {
    primaryConnection = await dbConnect.useDb(defdb)
    lookup = primaryConnection.model("lookupmaster", lookupmasterSchema, "lookupmaster")
    // subjects = primaryConnection.model("curr_grade_subjects", subjectsSchema, "curr_grade_subjects")
    userprofile = primaryConnection.model("userprofile", userProfileSchema, "userprofile")
    currCategory = primaryConnection.model("curr_category", currCategorySchema, "curr_category")
    certification = primaryConnection.model("certification", certificationSchema, "certification")
    university = primaryConnection.model("university", universitySchema, "university")
    company = primaryConnection.model("company", companySchema, "company")
    designation = primaryConnection.model("designation", designationSchema, "designation")
    areaExpert = primaryConnection.model("area_expert", areaExpertSchema, "area_expert")
    instituiton = primaryConnection.model("institutions", instituteSchema, "institutions")
    newsubject = primaryConnection.model("subjects", subjectSchema, "subjects")
    actor = primaryConnection.model("actor", actorSchema, "actor")
    userdetail = primaryConnection.model("userdetail", userdetailSChema, "userdetail")
}