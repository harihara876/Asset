import mongoose from "mongoose";
import { metaDbConnetion, currActivitySummary, currContentActivity, actorFeedPost, sub_chapter, lookUpMasterSchema, contentDoubt, userConnection, userDetail, userProfile } from "../dbmanager/dbconnection";
import { stringify } from "querystring";
import { configData } from "../utils/config";
const { ObjectId } = require('mongodb');

export const getCurrActivity = async (dbName, collectionName, getCountObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const currActivity = await currActivitySummary.find(
            {
                "user_id" : getCountObj.user_id
            },
            {
                "_id": 0,
                "tot_s_chal" : 1,
                "tot_s_men_msg" : 1,
                "tot_s_dbt_raised" : 1,
                "tot_s_vcoin_earn" : 1,
                "tot_s_cert" : 1,
            }
        )
        return currActivity;
    } catch (error) {
        throw Error('getCurrActivity: ' + error.message)
    }
}

export const getCurrContentActivity = async (dbName, collectionName, getContentObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const contentActivity = await currContentActivity.find({
            "user_id" : getContentObj.user_id,
            "sub_id" : getContentObj.subjectId,
            "chap_id": getContentObj.chapterId,
            "t_id": getContentObj.topicId
        }).sort({"cr_dts" : -1})
        return contentActivity;
    } catch (error) {
        throw Error('getCurrContentActivity: ' + error.message)
    }
}

export const getFeedPost = async (dbName, collectionName, getContentObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const feedPost = await actorFeedPost.find({
            "user_id" : getContentObj.user_id
        })
        return feedPost;
    } catch (error) {
        throw Error('getCurrContentActivity: ' + error.message)
    }
}

export const findActorActivity = async (dbName, collectionName, actorCurrActivity) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const currActivity = await currActivitySummary.findOne(
            {
                'user_id': actorCurrActivity.user_id,
                'sub_id': actorCurrActivity.sub_id,
                'cat_id': actorCurrActivity.cat_id,
                'grade_id': actorCurrActivity.grade_id
            }
        )
        return currActivity;
    } catch (error) {
        throw Error('getDoubtsList: ' + error.message)
    }
}

export const addActorCurrActivity = async (dbName, collectionName, actorCurrActivity) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const currActivity = await currActivitySummary.create(actorCurrActivity)
        return currActivity;
    } catch (error) {
        console.log(error)
        throw Error('getDoubtsList: ' + error.message)
    }
}

export const findActorActivityByChapter = async (dbName, collectionName, actorCurrActivity) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const currActivity = await currActivitySummary.aggregate([
            {
                '$match': {
                    'user_id': actorCurrActivity.user_id,
                    'sub_id': actorCurrActivity.sub_id,
                    'cat_id': actorCurrActivity.cat_id,
                    'grade_id': actorCurrActivity.grade_id
                }
            }, {
                '$unwind': {
                    'path': '$data'
                }
            }, {
                '$match': {
                    'data.chap_id': actorCurrActivity.chap_id
                }
            }
        ])
        return currActivity[0];
    } catch (error) {
        console.log(error)
        throw Error('findActorActivityByChapter: ' + error.message)
    }
}

export const updateActorActivityByChapter = async (dbName, collectionName, actorCurrActivity) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const updateActorActivity = await currActivitySummary.updateOne(
            {
                'user_id': actorCurrActivity.user_id,
                'sub_id': actorCurrActivity.sub_id,
                'cat_id': actorCurrActivity.cat_id,
                'grade_id': actorCurrActivity.grade_id
            },
            {
                $push: {
                    "data": actorCurrActivity.data[0]
                }
            })
        return updateActorActivity;
    } catch (error) {
        throw Error('updateActorActivityByChapter: ' + error.message)
    }
}

export const findActorActivityByChapterAndTopic = async (dbName, collectionName, actorCurrActivity) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const currActivity = await currActivitySummary.aggregate([
            {
                '$match': {
                    'user_id': actorCurrActivity.user_id,
                    'sub_id': actorCurrActivity.sub_id,
                    'cat_id': actorCurrActivity.cat_id,
                    'grade_id': actorCurrActivity.grade_id
                }
            }, {
                '$unwind': {
                    'path': '$data'
                }
            }, {
                '$match': {
                    'data.chap_id': actorCurrActivity.chap_id
                }
            }, {
                '$unwind': {
                    'path': '$data.t_data'
                }
            }, {
                '$match': {
                    'data.t_data.t_id': actorCurrActivity.t_id
                }
            }
        ])
        return currActivity[0];
    } catch (error) {
        throw Error('findActorActivityByChapterAndTopic: ' + error.message)
    }
}

export const updateActorActivityByChapterAndTopic = async (dbName, collectionName, actorCurrActivity) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const updateActorActivity = await currActivitySummary.updateOne(
            {
                'user_id': actorCurrActivity.user_id,
                'sub_id': actorCurrActivity.sub_id,
                'cat_id': actorCurrActivity.cat_id,
                'grade_id': actorCurrActivity.grade_id,
                'data.chap_id': actorCurrActivity.chap_id
            },
            {
                $push: {
                    "data.$.t_data": actorCurrActivity.data[0].t_data
                }
            })
        return updateActorActivity;
    } catch (error) {
        throw Error('updateActorActivityByChapterAndTopic: ' + error.message)
    }
}

export const updateActorCurrActivity = async (summDBName, summCollectionName, currDBName, currCollectionName, summaryObj, currActObj) => {
    try {
        await metaDbConnetion(summDBName, summCollectionName);
        const EContentActivityData = await currActivitySummary.aggregate(
            [
                {
                    $match: {
                        'user_id': summaryObj.user_id,
                        'sub_id': summaryObj.subjectId
                    }
                },
                {
                    $project: { 'tot_s_vid_watch': 1, 'tot_s_e_con_watch': 1, data: 1 }
                },
                { $unwind: { path: '$data' } },
                {
                    $match: {
                        'data.chap_id': summaryObj.chapterId
                    }
                },
                { $unwind: { path: '$data.t_data' } },
                {
                    $match: {
                        'data.t_data.t_id': summaryObj.topicId
                    }
                },
                {
                    $project: {
                        'tot_s_vid_watch': 1,
                        'tot_s_e_con_watch': 1,
                        'data.c_t_com': 1,
                        'data.t_data.c_t_data.tot_vid_watch': 1,
                        'data.t_data.c_t_data.tot_vid_dur': 1,
                        'data.t_data.c_t_data.tot_e_con_watch': 1,
                        'data.t_data.c_t_data.tot_e_con_dur': 1
                    }
                }
            ]
        );
        
        const totSelVidWatch = EContentActivityData[0].tot_s_vid_watch;
        const totSelEContentWatch = EContentActivityData[0].tot_s_e_con_watch;
        const contentCom = EContentActivityData[0].data.c_t_com;
        const totVidWatch = EContentActivityData[0].data.t_data.c_t_data.tot_vid_watch;
        const totVidDur = EContentActivityData[0].data.t_data.c_t_data.tot_vid_dur;
        const totEContWatch = EContentActivityData[0].data.t_data.c_t_data.tot_e_con_watch;
        const totEConDur = EContentActivityData[0].data.t_data.c_t_data.tot_e_con_dur;
        if(!summaryObj.contentDuration && !summaryObj.videoDuration){
            const updateEContentActivity = await currActivitySummary.updateOne(
                {
                    "user_id" : summaryObj.user_id,
                    "sub_id" : summaryObj.subjectId,
                    "data.chap_id": summaryObj.chapterId,
                    "data.t_data.t_id": summaryObj.topicId
                },
                {
                    $set: {
                        "tot_s_vid_watch": totSelVidWatch + 1,
                        "tot_s_e_con_watch": totSelEContentWatch + 1,
                        "data.$.c_t_com": contentCom + 1,
                        "data.$.t_data.$[elem].t_sts": summaryObj.t_sts,
                    }
                },
                {
                    arrayFilters: [
                        { "elem.t_id": summaryObj.topicId }
                    ]
                }
            )
            // console.log("updateEContentActivity>>>>", updateEContentActivity)
            const currActivityData = await updateCurrActivity(currDBName, currCollectionName, currActObj)
            return {updateEContentActivity, currActivityData};
        } else {
            const updateEContentActivity = await currActivitySummary.updateOne(
                {
                    "user_id" : summaryObj.user_id,
                    "sub_id" : summaryObj.subjectId,
                    "data.chap_id": summaryObj.chapterId,
                    "data.t_data.t_id": summaryObj.topicId
                },
                {
                    $set: {
                        "tot_s_vid_watch": totSelVidWatch + 1,
                        "tot_s_e_con_watch": totSelEContentWatch + 1,
                        "data.$.c_t_com": contentCom + 1,
                        "data.$.t_data.$[elem].t_sts": summaryObj.t_sts,
                        "data.$.t_data.$[elem].c_t_data.tot_vid_watch": totVidWatch + 1,
                        "data.$.t_data.$[elem].c_t_data.tot_vid_dur": totVidDur + (+summaryObj.videoDuration),
                        "data.$.t_data.$[elem].c_t_data.tot_e_con_watch": totEContWatch + 1,
                        "data.$.t_data.$[elem].c_t_data.tot_e_con_dur": totEConDur + (+summaryObj.contentDuration)
                    }
                },
                {
                    arrayFilters: [
                        { "elem.t_id": summaryObj.topicId }
                    ]
                }
            )
            // console.log("updateEContentActivity>>>>", updateEContentActivity)
            const currActivityData = await updateCurrActivity(currDBName, currCollectionName, currActObj)
            return {updateEContentActivity, currActivityData};
        }
    } catch ( error ) {
        console.log(error)
        throw Error('updateActorCurrActivity: ' + error.message)
    }
}

export const updateCurrActivity = async (currDBName, currCollectionName, currActObj) => {
    try {
        await metaDbConnetion(currDBName, currCollectionName);
        const currActivity = await currContentActivity.create(
            {
                "user_id" : currActObj.user_id,
                "sub_id" : currActObj.subjectId,
                "chap_id": currActObj.chapterId,
                "t_id": currActObj.topicId,
                "cont_id" : currActObj.contentId,
                "cont_sts" : currActObj.contStatus,
                "cont_ty" : currActObj.contType,
                "cont_lang" : currActObj.contLang,
                "tot_dur" : currActObj.totalDur,
                "last_watch_time" : currActObj.lastWatchTime
            }
        )
        return currActivity
    } catch ( error ) {
        console.log(error)
        throw Error('updateCurrActivity: ' + error.message)
    }
}

export const findCourseContent = async (dbName, collectionName, activityObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const activitySummaryData = await currActivitySummary.findOne({
            user_id: activityObj.userId,
            sub_id: activityObj.subjectId,
            cat_id: activityObj.catId,
            grade_id: activityObj.gradeId,
        })
        return activitySummaryData;
    } catch( error ) {
        console.log(error);
        throw Error('findCourseContent: ' + error.message)
    }
}

export const gradeWiseChaptersAndTopics = async (user_id, currCatId, currGradeId, subjectId, db_name, collection_name) => {
    try {
        await metaDbConnetion(db_name, collection_name);
        for (let sub_id of subjectId) {
            let currActivity = {
                user_id,
                cat_id: currCatId,
                grade_id: currGradeId,
                sub_id,
                data: []
            }
            const subjectChapters = await sub_chapter.aggregate([
                {
                    '$match': {
                        'sub_id': sub_id
                    }
                }
            ])
            for (let subChapter of subjectChapters) {
                let chapterObj = {
                    chap_id: subChapter._id.toString(),
                    t_data: []
                }
                for (let topic of subChapter.chapter.topics) {
                    let found = topic.cur_tag.some(curTag => curTag.cat_id === currCatId && curTag.grd_id === currGradeId);
                    if (found) {
                        let topicObj = { t_id: topic._id.toString() };
                        chapterObj.t_data.push(topicObj)
                    }
                }
                if (chapterObj.t_data.length) {
                    currActivity.data.push(chapterObj)
                }
            }
            if (currActivity.data.length) {
                let currActivitySummaryObj = await currActivitySummary.findOne({
                    user_id: currActivity.user_id,
                    cat_id: currActivity.cat_id,
                    grade_id: currActivity.grade_id,
                    sub_id: currActivity.sub_id
                });
                if (!currActivitySummaryObj) {
                    await currActivitySummary.create(currActivity)
                }
            }
        }
        return
    } catch (error) {
        console.log(error)
        throw Error('updateCurrActivity: ' + error.message)
    }
}

export const getSubChapTopicData = async (dbName, collectionName, chapAndTIds) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const subChapTopicData = await sub_chapter.find({
            $or: chapAndTIds.map(({ chap_id, t_id }) => ({ 'chapter.topics._id': t_id, '_id': chap_id })),
        }, {"_id": 1, "chapter.name": 1, "chapter.topics.name":1, "chapter.topics._id":1}).lean();
        return subChapTopicData
    } catch(error){
        console.log(error)
        throw Error('getSubChapTopicData: ' + error.message)
    }
}

export const addFeedPost = async (dbName, collectionName, feedPostObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        let feedHeader = feedPostObj.header
        let feedBody = feedPostObj.body
        const feedPost = await actorFeedPost.create(
            {
                "user_id": feedPostObj.user_id,
                "header.h_text": feedHeader.h_text,
                "header.img_path": feedPostObj.imageUrl,
                "body": feedBody
            }
        )
        return feedPost;
    } catch (error) {
        throw Error('addFeedPost: ' + error.message)
    }
}

export const getContent = async (currCatId: string, currGradeId: string, sub_id: string, userSubjectWiseLevel) => {
    try {
        const subjectChapters = await sub_chapter.aggregate([
            {
                '$match': {
                    'sub_id': sub_id
                }
            }
        ])
        let chapters = [];
        for (let subChapter of subjectChapters) {
            let chapterObj = {
                chap_id: subChapter._id.toString(),
                t_data: []
            }
            for (let topic of subChapter.chapter.topics) {
                let found = topic.cur_tag.some(curTag => curTag.cat_id === currCatId && curTag.grd_id === currGradeId);
                if (found) {
                    let topicObj = { t_id: topic._id.toString(), t_u_s_lev: +userSubjectWiseLevel.rating };
                    chapterObj.t_data.push(topicObj)
                }
            }
            if (chapterObj.t_data.length) {
                chapters.push(chapterObj)
            }
        }
        return chapters;
    } catch (error) {
        console.log(error)
        throw Error('getContent: ' + error.message)
    }
}

export const addCountForCollabration = async(actvityDBName, activityCollectionName, countObj) => {
    await metaDbConnetion(actvityDBName, activityCollectionName);
    try{
        const findDoubtCount = await currActivitySummary.findOne(
            { "user_id": countObj.user_id, "sub_id": countObj.sub_id },
            { "_id": 0, "user_id": 1, "sub_id": 1, "tot_s_dbt_raised": 1 }
        )
        let countOfDoubt = findDoubtCount.tot_s_dbt_raised
        const doubtCount = await currActivitySummary.updateOne(
            { "user_id": countObj.user_id, "sub_id": countObj.sub_id },
            { $set: { "tot_s_dbt_raised": countOfDoubt + 1 } }
        )
        return doubtCount;
    } catch (error){
        console.log(error);
        throw Error('updateCountsForCollabration: ' + error.message)
    }
}

export const decreaseCountForCollabration = async(dbName, doubtsCollectionName, actvityDBName, activityCollectionName, countObj) => {
    try{
        await metaDbConnetion(dbName, doubtsCollectionName);
        const findDoubtId = await contentDoubt.findOne(
            { "_id": new mongoose.Types.ObjectId(countObj.doubtId), "user_id": countObj.user_id },
            { "_id": 0, "sub_id": 1 }
        )
        if( findDoubtId ){
            await metaDbConnetion(actvityDBName, activityCollectionName);
            let getSubjectId = findDoubtId.sub_id
            const findDoubtCount = await currActivitySummary.findOne(
                { "user_id": countObj.user_id, "sub_id": getSubjectId },
                { "_id": 0, "user_id": 1, "sub_id": 1, "tot_s_dbt_raised": 1 }
            )
            let countOfDoubt = findDoubtCount.tot_s_dbt_raised;
            const doubtCount = await currActivitySummary.updateOne(
                { "user_id": countObj.user_id, "sub_id": getSubjectId },
                { $set: { "tot_s_dbt_raised": countOfDoubt - 1 } }
            )
            return doubtCount;
        }
    } catch (error){
        console.log(error);
        throw Error('updateCountsForCollabration: ' + error.message)
    }
}

export const findLeaderBoard = async(dbName, collectionName, connDBName, connCollectionName, leaderObj) => {
    try{
        await metaDbConnetion(connDBName, connCollectionName);
        const connUserIds = await userConnection.find(
            { "user_id" : leaderObj.userId }, { '_id': 0, 'user_id': 1, 'circle.user_c_id': 1 }
        )
        if(connUserIds.length > 0){
            let userIdsArray = [];
            userIdsArray.push(connUserIds[0].user_id)
            const circleArray = connUserIds[0].circle
            for(const circle of circleArray){
                userIdsArray.push(circle.user_c_id)
            }
            if(connUserIds.length > 0){
                const activityData = await getActivityData(dbName, collectionName, userIdsArray, leaderObj);
                const calculations = await getCalculations(activityData);
                Math.max(...calculations.map(o => o.points));
                calculations.forEach((element, i) => {
                    element.Rank = i+1;
                })
                return calculations;
            } else {
                console.log("No user connections for this user.");
                return { status: 201, message: "No user connections for this user." };
            }
        } else {
            console.log("No user connections for this user.");
            return { status: 201, message: "No Data available in UserConnection." };
        }
    } catch (error){
        console.log(error);
        throw Error('findLeaderBoard: ' + error.message)
    }
}

export const getActivityData = async (dbName, collectionName, userIdsArray, leaderObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const topicsData = await currActivitySummary.find(
            {
                "user_id": { $in: userIdsArray },
                "sub_id": leaderObj.subjectId,
                "sub_sts": 1
            }
        );
        const userNames = await userDetail.find(
            { '_id': { $in: userIdsArray.map(id => new mongoose.Types.ObjectId(id))} },
            { "disp_name": 1 }
        )
        const userImages = await userProfile.find(
            { "user_id": { $in : userIdsArray } },
            { "_id": 0, "user_id": 1, "personal_info.image": 1 }
        )
        let img;
        let userImagesRes = []
        for(let i = 0; i < userImages.length; i++){
            if (userImages[i].personal_info.image) {
                if (userImages[i].personal_info.image.includes('https')) {
                    img = userImages[i].personal_info.image;
                } else {
                    img = configData.s3BaseUrl + userImages[i].personal_info.image;
                }
            } else {
                img = '';
            }
            userImages[i].personal_info.image = img;
            userImagesRes.push(userImages[i])
        }
        const userNameWithIds = new Map(userNames.map(user => [user._id.toString(), user.disp_name]));
        const userImageWIthIds = new Map(userImagesRes.map(userImg => [userImg.user_id.toString(), userImg.personal_info.image]))
        const topicsDataWithNames = topicsData.map(topic => {
            const userId = topic.user_id.toString();
            return { ...topic._doc, userName: userNameWithIds.get(userId) || "", profileImg: userImageWIthIds.get(userId) || "" };
        });
        const activityRes = await currActivitySummary.aggregate(
            [
                {
                    $match: {
                        "user_id": { $in: userIdsArray },
                        "sub_id": leaderObj.subjectId
                    }
                },
                { $project: { user_id: 1, data: 1 } },
                { $unwind: { path: '$data' } },
                { $unwind: { path: '$data.t_data' } },
                {
                    $group: {
                        _id: '$user_id',
                        ttlL1QuesScore: {
                            $sum: '$data.t_data.c_t_data.tot_L1_ques_score'
                        },
                        ttlL2QuesScore: {
                            $sum: '$data.t_data.c_t_data.tot_L2_ques_score'
                        },
                        ttlL3QuesScore: {
                            $sum: '$data.t_data.c_t_data.tot_L3_ques_score'
                        },
                        ttlL4QuesScore: {
                            $sum: '$data.t_data.c_t_data.tot_L4_ques_score'
                        },
                        ttlAssignScore: {
                            $sum: '$data.t_data.c_t_data.tot_assig_score'
                        }
                    }
                }
            ]
        );
        return {topicsDataWithNames, activityRes};
    } catch (error) {
        console.log(error);
        throw Error('getActivityData: ' + error.message);
    }
};

export const getCalculations = async (activityObj) => {
    try{
        let resultArray = [];
        const activityData = activityObj.topicsDataWithNames;
        const performanceData = activityObj.activityRes;
        for (let i = 0; i < activityData.length; i++) {
            let calculations = {
                ttlHours: activityData[i].tot_s_vid_dur + activityData[i].tot_s_e_con_dur + activityData[i].tot_s_ques_dur,
                engagement: activityData[i].tot_s_vid_watch + activityData[i].tot_s_e_con_watch + activityData[i].tot_s_test_given + activityData[i].tot_s_assig_given + activityData[i].tot_s_gs + activityData[i].tot_s_dbt_ans + activityData[i].tot_s_help_given + activityData[i].tot_s_chall + activityData[i].tot_s_note,
                vCoins: activityData[i].tot_s_vcoin_earn,
                name: activityData[i].userName,
                userId: activityData[i].user_id,
                subStatus: activityData[i].sub_sts,
                image: activityData[i].profileImg,
                performance
            };
            const matchingPerData = performanceData.find(perf => perf._id === activityData[i].user_id);
            if (matchingPerData) {
                calculations.performance = matchingPerData.ttlL1QuesScore + matchingPerData.ttlL2QuesScore + matchingPerData.ttlL3QuesScore + matchingPerData.ttlL4QuesScore + matchingPerData.ttlAssignScore;
            }
            resultArray.push(calculations);
        }
        let calculationData = []
        for( const res of resultArray ){
            let finalRes = {
                points: res.engagement + res.performance + res.vCoins,
                userName: res.name,
                user_id: res.userId,
                hours: res.ttlHours,
                sub_sts: res.subStatus,
                profileImg: res.image
            }
            calculationData.push(finalRes);
        }
        // console.log("calculationData>>>>>>", calculationData)
        return calculationData
    } catch (error){
        console.log(error);
        throw Error('getCalculations: ' + error.message)
    }
}