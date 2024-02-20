import axios from 'axios';
import configJson from "vridhee_common_component_mf/configJson";

const API_GATEWAY_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.apiGatewayUrl : configJson.server.apiGatewayUrl

export default class DashboardService {

    private static baseURL: string | undefined = API_GATEWAY_URL;

    public static getProfileData(profileId: string | null) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/userprofile?profileId=${profileId}`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getDashboardSummaryData(act_type: string | null, summary_type: number) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms/getDashboardSummaryData?act_type=${act_type}&summary_type=${summary_type}`;
        return axios.get(UserURL);
    }

    public static getSubjectChapter(subject_id: string) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms/getSubjectChapter?subject_id=${subject_id}`;
        return axios.get(UserURL);
    }

    public static getActorDashboardSummaryData(user_id: string | undefined, act_type: string) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms/getActorDashboardSummaryData?user_id=${user_id}&act_type=${act_type}`;
        return axios.get(UserURL);
    }

    public static getCurriculumTopicSummary(topic_id: string | null) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms/getCurriculumTopicSummary?topic_id=${topic_id}`;
        return axios.get(UserURL);
    }

    public static getCourseContent(sub_id: string | null) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms/getCourseContent?sub_id=${sub_id}`;
        return axios.get(UserURL);
    }

    public static getCurriculumSubjects(profileId: string | null) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getCurriculumSubjects?profileId=${profileId}`;
        return axios.get(UserURL);
    }

    public static getCurriculumSubjectDetails(categoryId: string, gradeId: string, sub_id: string) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getCurriculumSubjectDetails?categoryId=${categoryId}&gradeId=${gradeId}&sub_id=${sub_id}`;
        return axios.get(UserURL);
    }

    public static getActivities() {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/activity`;
        return axios.get(UserURL);
    }

    public static getVideoContent(t_id: string,langType:number) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms?langType=${langType}&collectionName=getVideoContentLevel1&t_id=${t_id}`;
        return axios.get(UserURL);
    }

    public static getQuestionChoiceLevel1(t_id: string, kind: number, fore: number,bloom_cat_id:string) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms?langType=1&collectionName=getQuestionChoiceLevel1&t_id=${t_id}&kind=${kind}&for=${fore}&bloom_cat_id=${bloom_cat_id}`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static actorContentLikeDislike(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/actorContentLikeDislike?langType=1`;
        return axios.post(UserURL, body);
    }

    public static actorContentNote(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/actorContentNote`;
        return axios.post(UserURL, body);
    }

    public static getActorContentNote(db_metadata: number, user_id: string | null, t_id: string) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getActorContentNote?db_metadata=${db_metadata}&user_id=${user_id}&t_id=${t_id}`;
        return axios.get(UserURL);
    }

    public static deleteActorContentNote(db_metadata: number, user_id: string | null, t_id: string, noteId: string) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/deleteActorContentNote?db_metadata=${db_metadata}&user_id=${user_id}&t_id=${t_id}&noteId=${noteId}`;
        return axios.put(UserURL);
    }

    public static addActorVideoNote(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/addActorVideoNote`;
        return axios.post(UserURL, body);
    }

    public static getActorVideoNote(db_metadata: number, user_id: string | null, t_id: string) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getActorVideoNote?db_metadata=${db_metadata}&user_id=${user_id}&t_id=${t_id}`;
        return axios.get(UserURL);
    }

    public static deleteActorVideoNote(db_metadata: number, user_id: string | null, t_id: string, noteId: string) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/deleteActorVideoNote?db_metadata=${db_metadata}&user_id=${user_id}&t_id=${t_id}&noteId=${noteId}`;
        return axios.put(UserURL);
    }

    public static getAiEContentLevel1(t_id: string,langType:number) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms/?langType=${langType}&collectionName=getAiEContentLevel1&t_id=${t_id}`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getAiEContentLevel2(t_id: string,langType:number) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms/?langType=${langType}&collectionName=getAiEContentLevel2&t_id=${t_id}`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getAiEContentLevel3(t_id: string,langType:number) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms/?langType=${langType}&collectionName=getAiEContentLevel3&t_id=${t_id}`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getAiEContentLevel4(t_id: string,langType:number) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms/?langType=${langType}&collectionName=getAiEContentLevel4&t_id=${t_id}`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getbookEContentLevel1(t_id: string | null,langType:number) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms?langType=${langType}&collectionName=getbookEContentLevel1&t_id=${t_id}`;
        return axios.get(UserURL);
    }

    public static getTeacherEContentLevel1(t_id: string | null,langType:number) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms?langType=${langType}&collectionName=getTeacherEContentLevel1&t_id=${t_id}`;
        return axios.get(UserURL);
    }

    public static getExampleLevel(t_id: string | null,langType:number) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms?langType=${langType}&collectionName=getExampleLevel&t_id=${t_id}`;
        return axios.get(UserURL);
    }

    public static getImportantPointsLevel(t_id: string | null,langType:number) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms?langType=${langType}&collectionName=getImportantPointsLevel&t_id=${t_id}`;
        return axios.get(UserURL);
    }

    public static getExerciseLevel(t_id: string | null,langType:number) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms?langType=${langType}&collectionName=getExerciseLevel&t_id=${t_id}`;
        return axios.get(UserURL);
    }

    public static getActorEContentFeedback(db_metadata:number,t_id: string | null,content_type_id:string,level_id:string) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getActorEContentFeedback?db_metadata=${db_metadata}&t_id=${t_id}&content_type_id=${content_type_id}&level_id=${level_id}`;
        return axios.get(UserURL);
    }

    public static actorEContentFeedback(body: any) {
        const headers = {
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/actorEContentFeedback`;
        return axios.post(UserURL, body, { 'headers': headers });
    }

    public static getActorVideoFeedback(db_metadata: number, t_id: string | null, v_id: string) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getActorVideoFeedback?db_metadata=${db_metadata}&t_id=${t_id}&v_id=${v_id}`;
        return axios.get(UserURL);
    }

    public static removeActorEContentFeedback(db_metadata: number, user_id: string | null, c_f_id: string) {
        const headers = {
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/removeActorEContentFeedback?db_metadata=${db_metadata}&user_id=${user_id}&c_f_id=${c_f_id}`;
        return axios.delete(UserURL, { 'headers': headers });
    }


    public static actorVideoFeedback(body: any) {
        const headers = {
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/actorVideoFeedback`;
         return axios.post(UserURL, body, { 'headers': headers });
    }

    public static removeActorVideoFeedback(db_metadata: number, user_id: string | null, v_f_id: string) {
        const headers = {
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/removeActorVideoFeedback?db_metadata=${db_metadata}&user_id=${user_id}&v_f_id=${v_f_id}`;
        return axios.delete(UserURL, { 'headers': headers });
    }

    public static videoLikeDislike(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/videoLikeDislike?langType=1`;
        return axios.post(UserURL, body);
    }

    public static getActorVideoComment(body: any,langType:number) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getActorVideoComment?langType=${langType}`;
        return axios.post(UserURL, body);
    }

    public static addActorVideoComment(body: any,langType:number) {
        const headers = {
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/addActorVideoComment?langType=${langType}`;
        return axios.post(UserURL, body, { 'headers': headers });
    }

    public static removeActorVideoComment(db_metadata: number, user_id: string | null,t_id : string | null,v_id: string,v_c_id: string | undefined) {
        const headers = {
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/removeActorVideoComment?db_metadata=${db_metadata}&user_id=${user_id}&t_id=${t_id}&v_id=${v_id}&v_c_id=${v_c_id}`;
         return axios.delete(UserURL, { 'headers': headers });
    }

    public static subjectNeedToJoin(user_id:string | null) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/subjectNeedToJoin?user_id=${user_id}`;
        return axios.get(UserURL);
    }

    public static getContentTypes() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getLookUpDetails?name=content_type`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getContentLevels() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/getLookUpDetails?name=level`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getVideoAndTL(t_id: string | null, video_id: string, user_id: string | null) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms?langType=1&collectionName=getVideoAndTL&t_id=${t_id}&user_id=${user_id}&video_id=${video_id}`;
        return axios.get(UserURL);
    }
    
//Time Line Activity for Teacher
    public static addTimeLine(body: any) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms?langType=1&collectionName=createVideoTLine`;
        return axios.post(UserURL, body);
    }

    public static updateTimeLine(body: any) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms?langType=1&collectionName=updateVideoTLine`;
        return axios.post(UserURL, body);
    }

    public static deleteTimeLine(body: any) {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms?langType=1&collectionName=deleteVideoTLine`;
        return axios.post(UserURL, body);
    }

    //Time Line Activity for User
    public static userActivityTimeLine(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/videoTimeLineActivity`;
        return axios.post(UserURL, body);
    }
    
    //Get User Time Line from 
    public static getTimeLine(db_metadata: number ,user_id: string | null, t_id: string | null, video_id: string) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getVideoTimeLine?db_metadata=${db_metadata}&user_id=${user_id}&t_id=${t_id}&video_id=${video_id}`;
        return axios.get(UserURL);
    }

    public static userUpdateTimeLine(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/updateTimeLine`;
        return axios.post(UserURL, body);
    }

    public static userDeleteTLine(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/deleteTimeLine`;
        return axios.post(UserURL, body);
    }


    public static getQuestions(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/?langType=1&collectionName=getQuestions`;
        return axios.post(UserURL, body);
    }

    public static getAnswerStatus() {
        let UserURL: string = `${this.baseURL}/api/onboarding/getLookUpDetails?name=ans_sts`;
        return axios.get(UserURL);
    }

    public static addClassTest(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/addClassTest`;
        return axios.post(UserURL, body);
    }

    public static addPracticeTest(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/addPracticeTest`;
        return axios.post(UserURL, body);
    }

    public static addClassTestAnswer(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/addClassTestAnswer`;
        return axios.post(UserURL, body);
    }

    public static getClassTestAnswer(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getClassTestAnswer`;
        return axios.post(UserURL, body);
    }

    public static getPracticeTest(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getPracticeTest`;
        return axios.post(UserURL, body);
    }

    public static getPracticeTestDetails(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getPracticeTestDetails`;
        return axios.post(UserURL, body);
    }

    public static getClassTest(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getClassTest`;
        return axios.post(UserURL, body);
    }


    public static addEContentComment(body: any) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/addActoreContentComment?langType=1`;
        return axios.post(UserURL, body, { 'headers': headers });
    }

    public static getEContentComment(body: any) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getActorEContentComment?langType=1`;
        return axios.post(UserURL, body, { 'headers': headers });
    }

    public static removeEContentComment(body: any) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/removeActorEContentComment?db_metadata=${body.db_metadata}&user_id=${body.user_id}&t_id=${body.t_id}&e_c_id=${body.e_c_id}&content_type_id=${body.content_type_id}&level_id=${body.level_id}&content_level_object_id=${body.content_level_object_id}&langType=${body.langType}`;
        return axios.delete(UserURL, { 'headers': headers });
    }

    public static addContentComment(body: any) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/addActoreContentComment?langType=1`;
        return axios.post(UserURL, body, { 'headers': headers });
    }

    public static getContentComment(body: any) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getActorEContentComment?langType=1`;
        return axios.post(UserURL, body, { 'headers': headers });
    }

    public static removeContentComment(body: any) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/removeActorEContentComment?db_metadata=${body.db_metadata}&user_id=${body.user_id}&t_id=${body.t_id}&e_c_id=${body.e_c_id}&content_type_id=${body.content_type_id}&level_id=${body.level_id}&content_level_object_id=${body.content_level_object_id}&langType=${body.langType}`;
        return axios.delete(UserURL, { 'headers': headers });
    }

    public static updateActorVideoComment(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/updateActorVideoComment`;
        return axios.post(UserURL, body);
    }

    public static updateVideoCommentReply(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/updateVideoCommentReply`;
        return axios.post(UserURL, body);
    }

    public static removeVideoCommentReply(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/removeVideoCommentReply`;
        return axios.post(UserURL, body);
    }
    public static addActorContentDoubt(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/addActorContentDoubt`;
        return axios.post(UserURL, body)
    }

    public static getDoubtsWithOutLogin(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getDoubtsWithOutLogin`;
        return axios.post(UserURL, body);
    }

    public static getDoubtsList(db_metadata: number ,user_id: string | null) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getDoubtsList?user_id=${user_id}&db_metadata=${db_metadata}`;
        return axios.post(UserURL);
    }

    public static getDoubtsListWithBody(db_metadata: number ,user_id: string | null,body:any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getDoubtsList?user_id=${user_id}&db_metadata=${db_metadata}`;
        return axios.post(UserURL,body);
    }

    public static postDoubtContent(data: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/updateActorDoubtReply`;
        return axios.put(UserURL, data);
    }

    public static deleteActorContentDoubt(data: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/deleteActorContentDoubt`;
        return axios.put(UserURL, data);
    }

    public static deleteActorDoubtReply(data: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/deleteActorDoubtReply`;
        return axios.put(UserURL, data);
    }


    public static updateReplyLikeDislike(data: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/updateReplyLikeDislike`;
        return axios.put(UserURL, data);
    }

    public static getSubjectsList() {
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms/getSubjectsList`;
        return axios.get(UserURL);
    }

    public static getAllCollabarations(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getAllCollabarations`;
        return axios.post(UserURL, body);
    }

    public static getUserWiseCollabaration(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getUserWiseCollabaration`;
        return axios.post(UserURL, body);
    }

    public static addCollabaration(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/addCollabaration`;
        return axios.post(UserURL, body);
    }

    public static addUserIntoExistingCollabaration(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/addUserIntoExistingCollabaration`;
        return axios.post(UserURL, body);
    }

    public static commentLikeDislike(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/updateActorEContentComment`;
        return axios.post(UserURL, body);
    }

    public static addCommentReply(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/updateActorEContentComment`;
        return axios.post(UserURL, body);
    }

    public static updateCommentReply(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/updateEContentCommentReply`;
        return axios.post(UserURL, body);
    }

    public static removeEContentCommentReply(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/removeEContentCommentReply`;
        return axios.post(UserURL, body);
    }

    public static getSubmittedAssignments(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getSubmittedAssignments`;
        return axios.post(UserURL, body);
    }

    public static updateTopicEContentTimer(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/updateActorEContentCurrActivity`;
        return axios.put(UserURL, body);
    }

    public static addOrUpdateActorCurrActivity(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/addOrUpdateActorCurrActivity`;
        return axios.post(UserURL, body);
    }

    public static getAssignments(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getAssignments?langType=1&collectionName=assignmentLevel1`;
        return axios.post(UserURL, body);
    }

    public static submitAssignments(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/submitAssignments`;
        return axios.post(UserURL, body);
    }

    public static addAsignments(body: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/addAsignments`;
        return axios.post(UserURL, body);
    }
    public static getUserDashboardSummary(user_id: string | undefined) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getUserDashboardSummary?userId=${user_id}`;
        return axios.get(UserURL);
    }

    public static getCurriculumSubjectsV2(profileId: string | null) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getCurriculumSubjectsV2?profileId=${profileId}`;
        return axios.get(UserURL);
    }

    public static checkIsUserLogin() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/account/checkIsUserLogin`;
        return axios.post(UserURL,{}, { 'headers': headers });
    }

    public static mobilecheckIsUserLogin(userId:string,token:string) {
        const headers = {
            'Authorization': `Bearer token`,
            'Tokenuserid': userId
        }
        let UserURL: string = `${this.baseURL}/api/account/checkIsUserLogin`;
        return axios.post(UserURL,{}, { 'headers': headers });
    }


    public static userVerify(id: string | null) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/onboarding/userVerify?userId=${id}`;
        return axios.get(UserURL, { 'headers': headers });
    }

    public static getCurriculumSubjectDetailsV2(categoryId: string, gradeId: string, sub_id: any, userid: any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getCurriculumSubjectDetailsV2?categoryId=${categoryId}&gradeId=${gradeId}&sub_id=${sub_id}&userid=${userid}`;
        return axios.get(UserURL);
    }

    public static getToken(body:any) {
        const headers = {
            'Tokenuserid': localStorage.getItem('Tokenuserid')
        }
        let UserURL: string = `${this.baseURL}/api/account/getToken`;
        return axios.post(UserURL,body, { 'headers': headers });
    }

    public static getMobileToken(body:any,userId:string) {
        const headers = {
           'Tokenuserid': userId
        }
        let UserURL: string = `${this.baseURL}/api/account/getToken`;
        return axios.post(UserURL,body, { 'headers': headers });
    }


    public static getCourseContentV1(body: any) {
        const db_metadata = 27;
        let UserURL: string = `${this.baseURL}/api/v1/ai/curriculum_dashboard_module_ms/getCourseContentV1?userId=${body.userId}&db_metadata=${db_metadata}`;
        return axios.post(UserURL, body);
    }

    public static getFrequencyType(ftype: any) {
        let UserURL: string = `${this.baseURL}/api/onboarding/getLookUpDetails?name=${ftype}`;
        return axios.get(UserURL);
    }

    public static getCType() {
        let UserURL: string = `${this.baseURL}/api/onboarding/getLookUpDetails?name=c_type`;
        return axios.get(UserURL);
    }

    public static getCollaborationCount(body:any,userId: string,db_metadata:number) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getCollaborationCount?user_id=${userId}&db_metadata=${db_metadata}`;
        return axios.post(UserURL,body);
    }

    public static addOrUpdateStudyPlan(body:any,userId: any,db_metadata:number) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/addOrUpdateStudyPlan?userId=${userId}&db_metadata=${db_metadata}`;
        return axios.post(UserURL,body);
    }

    public static getUserStudyPlan() {
        const id = localStorage.getItem('Tokenuserid');
        const db_metadata = 64;
        // const headers = {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Tokenuserid': localStorage.getItem('Tokenuserid')
        // }
        
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getUserStudyPlan?userId=${id}&db_metadata=${db_metadata}`;
        return axios.post(UserURL, {"userId": id});
    }


    public static getStudyPlan(body:any,userId:string,db_metadata:number) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getUserStudyPlan?userId=${userId}&db_metadata=${db_metadata}`;
        return axios.post(UserURL,body);
    }


    public static getCurriculumHeader(body:any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getCurriculumHeader`;
        return axios.post(UserURL,body);
    }

    public static getCurriculum(body:any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getCurriculum`;
        return axios.post(UserURL,body);
    }

    public static updateCurriculumContent(body:any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/updateCurriculumContent`;
        return axios.post(UserURL,body);
    }

    public static getLeaderBoard(userId: string, db_metadata: number, subjectId: string) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getLeaderBoard?userId=${userId}&db_metadata=${db_metadata}&subjectId=${subjectId}`;
        return axios.get(UserURL);
    }

    public static userBySubjectCollabarations(body:any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/userBySubjectCollabarations`;
        return axios.post(UserURL,body);
    }

    public static updateCollabarationStatusByUser(body:any) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/updateCollabarationStatusByUser`;
        return axios.post(UserURL,body);
    }

    public static getMentorsList(sub_id: string | null) {
        let UserURL: string = `${this.baseURL}/api/curriculum_dashboard_module_ms/getMentorsList?subjectId=${sub_id}`;
        return axios.get(UserURL);
	}

}