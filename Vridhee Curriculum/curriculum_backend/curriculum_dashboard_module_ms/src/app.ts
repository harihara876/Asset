import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import { createAnalyticsConnection, createConnection, createSecondaryConnection } from './dbmanager/dbconnection'
import { getChapterTopics, insertSubjectData, updateEBook, updateTopic, updatingCurTag } from "./controllers/curriculamController"
import {
    getSubjectData, addSubjectChapter, addTopics, getSubjectChapter, getTopics, addCurTag, addCurrCategory, addEBook,
    updateCurrCategory, addTtlCount, getCourseContent, updateTopicDescr, updateChapter, addingTyBrdGrd,
    updatingTyBrdGrd
} from "./controllers/curriculamController";
import {
    getCurriculumSubjects, getCurriculumSubjectDetails, getCurriculumSubjectsV2, getCurriculumSubjectDetailsV2,
    getCurriculumHeader, getCurriculum
} from "./controllers/curriculumSubjectsController";
import { getDashboardSummary, addCurriculamTopicSummary, getCurriculumTopicSummary, getActorDashboardSummary, addActorDashboardSummary, subjectNeedToJoin, getUserDashboardSummary } from "./controllers/dashboardSummaryController"
import { createEnglishConnection, createEnglishSecondaryConnection } from
    './dbmanager/languagesDBSchemas/vridheeCurriculumEnglish/dbconnection';

import { createHindiConnection, createHindiSecondaryConnection } from
    './dbmanager/languagesDBSchemas/vridheeCurriculumHindi/dbconnection';


import {
    actorContentLikeDislike, actorEContentFeedback, actorContentNote, actorVideoFeedback,
    getContentNote, actorRevisionLikeDislike, getActorEContentFeedback, getActorVideoFeedback,
    actorVideoNote, getVideoNote, deleteVideoNote, deleteContentNote, videoLikeDislike, addActoreContentComment,
    addActorVideoComment, getActorVideoComment, removeActorVideoFeedback, removeActorEContentFeedback, getActorEContentComment,
    videoTimeLineActivity, getVideoTimeLine, addClassTest, addPracticeTest, addClassTestAnswer, getClassTestAnswer,
    getPracticeTest, getClassTest, removeActorVideoComment, actorContentDoubt, addCollabaration, getUserWiseCollabaration,
    getAllCollabarations,
    updateTimeLine,
    deleteTimeLine, actorDoubtReply, doubtReplyLikeDislike, getActorDoubtsList, addUserIntoExistingCollabaration,
    addTaskToCollabaration, removeActorEContentComment, createAssignments, getAssignments, submitAssignments, getSubmittedAssignments,
    updateActorVideoComment, updateVideoCommentReply, removeVideoCommentReply, updateActorEContentComment, updateEContentCommentReply,
    removeEContentCommentReply,
    removeContentDoubt,
    removeDoubtReply,
    getDoubtsWithOutLogin, addGmailContacts, getConnections, createStudyPlan,
    getUserStudyPlan, getPracticeTestDetails, userBySubjectCollabarations, updateCollabarationStatusByUser
} from "./controllers/userActivityController"

import {
    addOrUpdateActorCurrActivity, getCollaborationCount, getActorCurrContentActivity, getActorFeedPost,
    updateActorEContentCurrActivity, getCourseContentV1, addGradeWiseChaptersAndTopics,
    addActorFeedPost, updateCurriculumContent,
    getLeaderBoard
} from "./controllers/actorCurrActivityController";


import vridheeCurriculumDashboardRoutes from "./routers/vridheeCurriculumDashboardRoutes";
import { addActorVCoin, updateActorVCoin, getMentorsList, addPGCampus } from "./controllers/rewardActivityController";
import { getInprogressSubjects, getPerformance, getEngagement, getProgress } from "./controllers/analyticsController";

const app = express();
const port = 4040;
let languages: any[];
languages = ["vridheeCurriculumEnglish", "vridheeCurriculumHindi"];

app.use(async (req, res, next) => {
    let conn = await createConnection();
    await createSecondaryConnection(conn);
    await createAnalyticsConnection(conn)

    let urlArray = req.originalUrl.split('/');
    let method = urlArray[1];
    let language = languages.includes(method);
    // console.log("urlArray>>", urlArray)
    // console.log("language>>", language)
    if (language) {
        getConfigDetails(method, next);
    } else if (method === "getSubjectData" || method === "insertSubjectData" || method === "addSubjectChapter" ||
        method === "addTopics" || method === "getTopics" || method === "getSubjectChapter" || method === "getDashboardSummary"
        || method === 'addCurriculamTopicSummary' || 'getCurriculumTopicSummary' || method === 'getActorDashboardSummary' ||
        method === 'addCurrCategory' || 'updateCurrCategory' || 'deleteCurrDetails' || 'getCourseContent' || 'updateTopicDescr' || "createActorContentLikeDislike" || "actorContentNote" || "getContentNote" || "actorVideoNote" || "getVideoNote" || "deleteVideoNote" || "deleteContentNote" || "actorContentDoubt") {
        next();
    } else {
        next()
    }
    //  else if (method === "getSubjectData" || method === "insertSubjectData" || method === "addSubjectChapter" ||
    //     method === "addTopics" || method === "getTopics" || method === "getSubjectChapter" || method === "getDashboardSummary"
    //     || method === 'addCurriculamTopicSummary' || 'getCurriculumTopicSummary' || method === 'getActorDashboardSummary' ||
    //     method === 'addCurrCategory' || 'updateCurrCategory' || 'deleteCurrDetails' || 'getCourseContent' || 'updateTopicDescr' || "createActorContentLikeDislike") {
    //     next();
    // } else {
    //     res.send({ sts: 400, msg: "Bad Request" })
    //     return
    // }
});

app.use(cors({ origin: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

app.get("/", async (req, res) => {
    res.send(" Welcome to Vridhee Account Approvel Dashboard Microservice accessed...");
});


async function getConfigDetails(method, next) {
    let services: any;

    try {
        switch (method) {
            case "vridheeCurriculumEnglish":
                services = await import('./services/vridheeCurriculumEnglish');
                global.service = services;
                let english = await createEnglishConnection();
                await createEnglishSecondaryConnection(english);
                next();
                break;

            case "vridheeCurriculumHindi":
                services = await import('./services/vridheeCurriculumHindi');
                global.service = services;
                let hindi = await createHindiConnection();
                await createHindiSecondaryConnection(hindi);
                next();
                break;

        }
    } catch (err) {
        console.log("Exception : " + err.message);
    }

}

app.get('/getSubjectData', getSubjectData);
app.post('/insertSubjectData', insertSubjectData)
app.post('/addSubjectChapter', addSubjectChapter);
app.put('/addTopics/:chapterId', addTopics);
app.put('/addEbook/:chapterId', addEBook);
app.put('/addCurTag', addCurTag);
app.put('/addTtlCount', addTtlCount);
app.get('/getTopics/:chapterId', getTopics);
app.get('/getSubjectChapter', getSubjectChapter);
app.get('/getDashboardSummary', getDashboardSummary)
app.get('/getCurriculumTopicSummary', getCurriculumTopicSummary);
app.post('/addCurriculamTopicSummary', addCurriculamTopicSummary);
app.get('/getActorDashboardSummary', getActorDashboardSummary);
app.post('/addActorDashboardSummary', addActorDashboardSummary);
app.post('/addCurrCategory', addCurrCategory);
app.put('/updateCurrCategory', updateCurrCategory);
app.post('/*/actorContentLikeDislike', actorContentLikeDislike);
app.post('/*/videoLikeDislike', videoLikeDislike);
app.post('/actorRevisionLikeDislike', actorRevisionLikeDislike);
app.get('/getCourseContent', getCourseContent)
app.get('/getCurriculumSubjects', getCurriculumSubjects)
app.get('/getCurriculumSubjectDetails', getCurriculumSubjectDetails)
app.put('/updateTopicDescr', updateTopicDescr)
app.post('/actorContentNote', actorContentNote)
app.post('/actorEContentFeedback', actorEContentFeedback)
app.post('/getActorEContentFeedback', getActorEContentFeedback)
app.delete('/removeActorEContentFeedback', removeActorEContentFeedback)
app.post('/actorVideoFeedback', actorVideoFeedback)
app.post('/getActorVideoFeedback', getActorVideoFeedback)
app.delete('/removeActorVideoFeedback', removeActorVideoFeedback)
app.delete('/removeActorVideoComment', removeActorVideoComment)
app.delete('/*/removeActorEContentComment', removeActorEContentComment)
app.get('/getContentNote', getContentNote)
app.post('/actorVideoNote', actorVideoNote)
app.get('/getVideoNote', getVideoNote)
app.put('/deleteVideoNote', deleteVideoNote)
app.put('/deleteContentNote', deleteContentNote)
app.post('/*/addActoreContentComment', addActoreContentComment)
app.post('/*/addActorVideoComment', addActorVideoComment)
app.post('/*/getActorVideoComment', getActorVideoComment)
app.post('/*/getActorEContentComment', getActorEContentComment)
app.get('/subjectNeedToJoin', subjectNeedToJoin)
app.post('/videoTimeLineActivity', videoTimeLineActivity)
app.post('/updateTimeLine', updateTimeLine)
app.post('/deleteTimeLine', deleteTimeLine)
app.post('/getVideoTimeLine', getVideoTimeLine)
app.post('/addClassTest', addClassTest)
app.post('/addPracticeTest', addPracticeTest)
app.post('/addClassTestAnswer', addClassTestAnswer)
app.post('/getClassTestAnswer', getClassTestAnswer)
app.post('/getPracticeTest', getPracticeTest)
app.post('/getClassTest', getClassTest)
app.post('/actorContentDoubt', actorContentDoubt)
app.post('/addCollabaration', addCollabaration)
app.put('/actorDoubtReply', actorDoubtReply)
app.post('/getUserWiseCollabaration', getUserWiseCollabaration)
app.post('/getAllCollabarations', getAllCollabarations)
app.get('/getChapterTopics/:subId/:gradeId', getChapterTopics)
app.put('/doubtReplyLikeDislike', doubtReplyLikeDislike)
app.post('/getActorDoubtsList', getActorDoubtsList);
app.post('/addUserIntoExistingCollabaration', addUserIntoExistingCollabaration);
app.post('/addTaskToCollabaration', addTaskToCollabaration);
app.post('/addAssignments', createAssignments);
app.post('/getAssignments', getAssignments);
app.post('/submitAssignments', submitAssignments);
app.post('/getSubmittedAssignments', getSubmittedAssignments);
app.post('/updateActorVideoComment', updateActorVideoComment);
app.post('/updateVideoCommentReply', updateVideoCommentReply);
app.post('/removeVideoCommentReply', removeVideoCommentReply);
app.post('/updateActorEContentComment', updateActorEContentComment);
app.post('/updateEContentCommentReply', updateEContentCommentReply);
app.post('/removeEContentCommentReply', removeEContentCommentReply);
app.put('/updateChapter', updateChapter);
app.put('/addingTyBrdGrd', addingTyBrdGrd);
app.put('/updatingTyBrdGrd', updatingTyBrdGrd);
app.put('/updateEBook', updateEBook);
app.put('/updateTopic', updateTopic);
app.put('/updatingCurTag', updatingCurTag);
app.put('/removeContentDoubt', removeContentDoubt);
app.put('/removeDoubtReply', removeDoubtReply);
app.post('/addOrUpdateActorCurrActivity', addOrUpdateActorCurrActivity);
app.post('/getCollaborationCount', getCollaborationCount)
app.get('/getActorCurrContentActivity', getActorCurrContentActivity)
app.get('/getActorFeedPost', getActorFeedPost)
app.put('/updateActorEContentCurrActivity', updateActorEContentCurrActivity);
app.post('/getDoubtsWithOutLogin', getDoubtsWithOutLogin);
app.get('/getUserDashboardSummary', getUserDashboardSummary)
app.get('/getCurriculumSubjectsV2', getCurriculumSubjectsV2)
app.post('/getCurriculumHeader', getCurriculumHeader)
app.get('/getCurriculumSubjectDetailsV2', getCurriculumSubjectDetailsV2)
app.post('/addGmailContacts', addGmailContacts);
app.post('/getConnections', getConnections);
app.use('/*/vridheeCurriculumDashboard', vridheeCurriculumDashboardRoutes);
app.post('/createStudyPlan', createStudyPlan);
app.post('/getCourseContentV1', getCourseContentV1);
app.post('/addGradeWiseChaptersAndTopics', addGradeWiseChaptersAndTopics)
app.post('/getUserStudyPlan', getUserStudyPlan)
app.post('/addActorVCoin', addActorVCoin);
app.post('/getPracticeTestDetails', getPracticeTestDetails);
app.put('/updateActorVCoin', updateActorVCoin)
app.post('/addActorFeedPost', addActorFeedPost)
app.post('/updateCurriculumContent', updateCurriculumContent);
app.get('/getMentorsList', getMentorsList);
app.post('/addPGCampus', addPGCampus);
app.post('/getCurriculum', getCurriculum);
app.post('/getInprogressSubjects', getInprogressSubjects)
app.get('/getLeaderBoard', getLeaderBoard)
app.post('/getInprogressSubjects', getInprogressSubjects);
app.post('/getPerformance', getPerformance);
app.post('/getEngagement', getEngagement);
app.post('/getProgress', getProgress);
app.post('/userBySubjectCollabarations', userBySubjectCollabarations);
app.post('/updateCollabarationStatusByUser', updateCollabarationStatusByUser);

app.listen(port, () => {
    console.log("port listen on " + port);
});