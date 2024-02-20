import mongoose from 'mongoose';
import { configData } from '../utils/config'
import { subjectSchema } from './mongodbschemas/subjectSchema';
import { subchaptopicSchema } from './mongodbschemas/subchaptopicSchema';
import { dashboardSummarySchema } from './mongodbschemas/dashboardSummarySchema';
import { learnerDashboardSummarySchema } from './mongodbschemas/learnerDashboardSummarySchema';
import { parentDashboardSummarySchema } from './mongodbschemas/parentDashboardSummarySchema';
import { teacherDashboardSummarySchema } from './mongodbschemas/teacherDashboardSummarySchema';
import { campusDashboardSummarySchema } from './mongodbschemas/campusDashboardSummarySchema';
import { buddiesDashboardSummarySchema } from './mongodbschemas/buddiesDashboardSummarySchema';
import { curriculamTopicSummarySchema } from './mongodbschemas/curriculamTopicSummarySchema';
import { currCategorySchema } from './mongodbschemas/currCategorySchema';
import { userProfileSchema } from './mongodbschemas/userProfileSchema';
import { userdetailSChema } from './mongodbschemas/userdetailSchema';
import { actorDBMetaDataSchema } from './mongodbschemas/actorDBMetaDataSchema';
import { lookupmasterSchema } from './mongodbschemas/lookupmasterSchema';
import { content_like_dislike } from '../dbmanager/actorDBSchemas/userActivity/content_like_dislike';
import { video_like_dislike } from '../dbmanager/actorDBSchemas/userActivity/video_like_dislike';
import { revision_like_dislike } from './actorDBSchemas/userActivity/revision_like_dislike';
import { content_note } from './actorDBSchemas/userActivity/content_note';
import { eContentFeedbackSchema } from '../dbmanager/actorDBSchemas/userActivity/eContentFeedbackSchema';
import { videoFeedbackSchema } from '../dbmanager/actorDBSchemas/userActivity/videoFeedbackSchema';
import { video_note } from './actorDBSchemas/userActivity/videoNoteSchema';
import { eContentCommentSchema } from './actorDBSchemas/userActivity/eContentCommentSchema';
import { videoCommentSchema } from './actorDBSchemas/userActivity/videoCommentSchema';
import { videoTimeLine } from './actorDBSchemas/userActivity/videoTimeLineSchema';
import { classTestSchema } from './actorDBSchemas/userActivity/classTestSchema';
import { practiceTestSchema } from './actorDBSchemas/userActivity/practiceTestSchema';
import { contentDoubtSchema } from './actorDBSchemas/userActivity/contentDoubtSchema'
import { classTestAnswerSchema } from './actorDBSchemas/userActivity/classTestAnswerSchema';
import { collabarationSchema } from './actorDBSchemas/userActivity/collabarationSchema';
import { assignTasksToCollabarationSchema } from './actorDBSchemas/userActivity/assignTasksToCollabarationSchema';
import { assignmentEnglishSchema } from './actorDBSchemas/userActivity/assignmentEnglishSchema';
import { assignmentSubmissionSchema } from './actorDBSchemas/userActivity/assignmentSubmissionSchema';
import { actorCurrActivitySummarySchema } from './actorDBSchemas/userActivity/actorCurrActivitySummarySchema';
import { actorCurrContentActivitySchema } from './actorDBSchemas/userActivity/actorCurrContentActivity';
import { actorFeedPostSchema } from './actorDBSchemas/userActivity/actorFeedPost';
import { userDashboardSchema } from './mongodbschemas/userDashboardSchema';
import { studyPlanSchema } from './actorDBSchemas/userActivity/studyPlanSchema';
import { eventSchema } from './actorDBSchemas/userActivity/eventSchema';
import { studyPlanHistorySchema } from './actorDBSchemas/userActivity/studyPlanHistorySchema';
import { eventHistorySchema } from './actorDBSchemas/userActivity/eventHistorySchema';
import { userConnectionSchema } from './actorDBSchemas/userActivity/userConnectionSchema';
import { actorActivityVCoinSchema } from './rewardActivitySchemas/actorActivityVCoinSchema';
import { pgCampusSchema } from './rewardActivitySchemas/pgCampusSchema';

let config: any = configData

let dbURL = config.dbURL
let defdb = config.vridhee.defdb
let analyticdb = config.vridheeAnalytics.defdb
let dbConnect: any
let primaryConnection: any
let SecondaryConnection: any
let actorDbConnection: any
// const englishLanguage = config.vridheeCurriculumEnglish.defdb;
// const hindiLanguage = config.vridheeCurriculumHindi.defdb;

var subject, sub_chapter, dashboardSummary, curriculamTopicSummary, learnerDashboardSummary,
    buddiesDashboardSummary, campusDashboardSummary, parentDashboardSummary, teacherDashboardSummary,
    currCategory, userProfile, userDetail, contentLikeDislike, videoLikeDislike, revisionlikeDislike, contentNote, eContentFeedback,
    videoFeedback, actorDBMetaData, videoNote, lookUpMasterSchema, eContentComment, videoComment,
    videoTLine, classTest, practiceTest, classTestAnswer, contentDoubt, collabaration, collabarationTasks, assignmentEnglish, assignmentSubmission, currActivitySummary, currContentActivity, actorFeedPost, userDashboard, studyPlan, events, studyPlanHistory, eventHistory,
    userConnection, actorActivityVCoin, pgCampus;


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

export {
    primaryConnection, subject, sub_chapter, dashboardSummary, curriculamTopicSummary,
    learnerDashboardSummary, buddiesDashboardSummary, campusDashboardSummary,
    parentDashboardSummary, teacherDashboardSummary, currCategory, userProfile, userDetail,
    contentLikeDislike, videoLikeDislike, revisionlikeDislike, contentNote, eContentFeedback, videoFeedback,
    actorDBMetaData, videoNote, lookUpMasterSchema, eContentComment, videoComment, videoTLine, classTest,
    practiceTest, classTestAnswer, contentDoubt, collabaration, collabarationTasks, assignmentEnglish, assignmentSubmission, currActivitySummary, currContentActivity, actorFeedPost, userDashboard, studyPlan, events, studyPlanHistory, eventHistory,
    userConnection, actorActivityVCoin, pgCampus
}



export async function createConnection() {
    return dbConnect = await makeNewConnection();
}

export async function createSecondaryConnection(dbConnect) {
    primaryConnection = await dbConnect.useDb(defdb)
    subject = primaryConnection.model("subjects", subjectSchema, "subjects")
    sub_chapter = primaryConnection.model("sub_chap_topic", subchaptopicSchema, "sub_chap_topic")
    currCategory = primaryConnection.model("curr_category", currCategorySchema, "curr_category")
    userProfile = primaryConnection.model("userprofile", userProfileSchema, "userprofile")
    userDetail = primaryConnection.model("userdetail", userdetailSChema, "userdetail")
    actorDBMetaData = primaryConnection.model("act_db_metadata", actorDBMetaDataSchema, "act_db_metadata")
    lookUpMasterSchema = primaryConnection.model("lookupmaster", lookupmasterSchema, "lookupmaster")
}

export async function createAnalyticsConnection(dbConnect) {
    primaryConnection = await dbConnect.useDb(analyticdb)
    dashboardSummary = primaryConnection.model("dashboard_summary", dashboardSummarySchema, "dashboard_summary")
    learnerDashboardSummary = primaryConnection.model("learner_dashboard_summary", learnerDashboardSummarySchema, "learner_dashboard_summary")
    parentDashboardSummary = primaryConnection.model("parent_dashboard_summary", parentDashboardSummarySchema, "parent_dashboard_summary")
    teacherDashboardSummary = primaryConnection.model("teacher_dashboard_summary", teacherDashboardSummarySchema, "teacher_dashboard_summary")
    campusDashboardSummary = primaryConnection.model("campus_dashboard_summary", campusDashboardSummarySchema, "campus_dashboard_summary")
    buddiesDashboardSummary = primaryConnection.model("buddies_dashboard_summary", buddiesDashboardSummarySchema, "buddies_dashboard_summary")
    curriculamTopicSummary = primaryConnection.model("curriculam_topic_summary", curriculamTopicSummarySchema, "curriculam_topic_summary");
    userDashboard = primaryConnection.model("user_dashboard_summary", userDashboardSchema, "user_dashboard_summary")
}

export async function metaDbConnetion(dbName, collection_name) {
    actorDbConnection = await dbConnect.useDb(dbName);

    contentLikeDislike = actorDbConnection.model(collection_name, content_like_dislike, collection_name);
    // revisionlikeDislike = actorDbConnection.model(collection_name, revision_like_dislike, collection_name);
    contentNote = actorDbConnection.model(collection_name, content_note, collection_name)
    eContentFeedback = actorDbConnection.model(collection_name, eContentFeedbackSchema, collection_name);
    videoFeedback = actorDbConnection.model(collection_name, videoFeedbackSchema, collection_name);
    videoNote = actorDbConnection.model(collection_name, video_note, collection_name);
    videoLikeDislike = actorDbConnection.model(collection_name, video_like_dislike, collection_name);
    eContentComment = actorDbConnection.model(collection_name, eContentCommentSchema, collection_name);
    videoComment = actorDbConnection.model(collection_name, videoCommentSchema, collection_name);
    videoTLine = actorDbConnection.model(collection_name, videoTimeLine, collection_name);
    classTest = actorDbConnection.model(collection_name, classTestSchema, collection_name);
    practiceTest = actorDbConnection.model(collection_name, practiceTestSchema, collection_name);
    classTestAnswer = actorDbConnection.model(collection_name, classTestAnswerSchema, collection_name);
    contentDoubt = actorDbConnection.model(collection_name, contentDoubtSchema, collection_name);
    collabaration = actorDbConnection.model(collection_name, collabarationSchema, collection_name);
    collabarationTasks = actorDbConnection.model(collection_name, assignTasksToCollabarationSchema, collection_name);
    assignmentEnglish = actorDbConnection.model(collection_name, assignmentEnglishSchema, collection_name);
    assignmentSubmission = actorDbConnection.model(collection_name, assignmentSubmissionSchema, collection_name);
    currActivitySummary = actorDbConnection.model(collection_name, actorCurrActivitySummarySchema, collection_name);
    currContentActivity = actorDbConnection.model(collection_name, actorCurrContentActivitySchema, collection_name);
    actorFeedPost = actorDbConnection.model(collection_name, actorFeedPostSchema, collection_name);
    studyPlan = actorDbConnection.model(collection_name, studyPlanSchema, collection_name);
    events = actorDbConnection.model(collection_name, eventSchema, collection_name);
    studyPlanHistory = actorDbConnection.model(collection_name, studyPlanHistorySchema, collection_name);
    eventHistory = actorDbConnection.model(collection_name, eventHistorySchema, collection_name);
    userConnection = actorDbConnection.model(collection_name, userConnectionSchema, collection_name);
    actorActivityVCoin = actorDbConnection.model(collection_name, actorActivityVCoinSchema, collection_name);
    pgCampus = actorDbConnection.model(collection_name, pgCampusSchema, collection_name);
}

export async function contentDBConnetion(dbName) {
    return await dbConnect.useDb(dbName);
}