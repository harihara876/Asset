import { Request, Response, NextFunction } from "express";
import { ResponseWithObject, APIResponse, APIResponseWithDetails, Status } from "../utils/status";

import { Success, noDataAvail, noDataAvailUpdate, updateErrnMsg } from "../utils/errormsg";
// import { getCurrActivity } from "../services/actorCurrActivityService";
import { findDbMetaDataDetails, getUserNameProfImg } from "../services/userActivity";
import {
    getCurrActivity, getCurrContentActivity, getFeedPost, findActorActivity,
    addActorCurrActivity, findActorActivityByChapter, updateActorActivityByChapter,
    findActorActivityByChapterAndTopic, updateActorActivityByChapterAndTopic, updateActorCurrActivity,
    findCourseContent, gradeWiseChaptersAndTopics,
    getSubChapTopicData,
    addFeedPost, getContent,
    findLeaderBoard
} from "../services/actorCurrActivityService";
import { uploadFileIntoS3 } from "../utils/s3Config";
const { ObjectId } = require('mongodb');
export async function addOrUpdateActorCurrActivity(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata, sub_id, chap_id, t_id } = req.body;
        let actorCurrActivity: any = { user_id, sub_id };
        let chapter: any = { chap_id };
        let topic: any = { t_id }
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const db_name = dbMetaDataInfo[0].db_name;
        const collection_name = dbMetaDataInfo[0].act_collection[0].name;
        const user = await getUserNameProfImg(user_id);
        if (!user.length) {
            return res.status(400).send(new APIResponse(400, 'User not found'));
        }
        actorCurrActivity.cat_id = user[0].learning.curr_cat_id;
        actorCurrActivity.grade_id = user[0].learning.curr_grade_id;
        const userSubjectWiseLevel = user[0].learning.subjects.find(sub => sub.id === sub_id);
        const currActivity = await findActorActivity(db_name, collection_name, actorCurrActivity);
        let data = [{ chap_id, t_data: [{ t_id, t_u_s_lev: +userSubjectWiseLevel.rating }] }];
        if (!currActivity) {
            actorCurrActivity.data = data;
            const actorActivityResponse = await addActorCurrActivity(db_name, collection_name, actorCurrActivity);
            return res.status(200).send(new ResponseWithObject(200, 'Success', actorActivityResponse));
        }
        if (currActivity && currActivity.data.length) {
            const actorActivityChapterResponse = await findActorActivityByChapter(db_name, collection_name, { ...actorCurrActivity, ...chapter });
            if (actorActivityChapterResponse) {
                const actorActivityChapterResponse = await findActorActivityByChapterAndTopic(db_name, collection_name, { ...actorCurrActivity, ...chapter, ...topic });
                if (!actorActivityChapterResponse) {
                    actorCurrActivity.data = data;
                    const updateActivityByChapterTopic = await updateActorActivityByChapterAndTopic(db_name, collection_name, { ...actorCurrActivity, ...chapter, ...topic });
                    return res.status(200).send(new APIResponse(200, 'Topic is added'));
                } else {
                    return res.status(400).send(new APIResponse(400, 'Topic is already present in the chapter'));
                }
            } else {
                actorCurrActivity.data = data;
                const updateActivityByChapter = await updateActorActivityByChapter(db_name, collection_name, { ...actorCurrActivity, ...chapter });
                return res.status(200).send(new APIResponse(200, 'Chapter is added'));
            }
        }
    } catch (error) {
        // Sending a server error response with a generic error message
        return res.status(500).send(new APIResponse(500, error.message));
    }
}


export async function getCollaborationCount(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata } = req.query
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        } else {
            const dbName = dbMetaDataInfo[0].db_name;
            const collectionName = dbMetaDataInfo[0].act_collection[0].name;

            const currActivity = await getCurrActivity(dbName, collectionName, req.body);
            // console.log("currActivity>>>>>>>", currActivity);
            let tot_s_chal = 0;
            let tot_s_dbt_raised = 0;
            let tot_s_vcoin_earn = 0;
            let tot_s_cert = 0;
            let tot_s_men_msg = 0;
            currActivity.forEach(current => {
                tot_s_chal += +current.tot_s_chal || 0;
                tot_s_dbt_raised += +current.tot_s_dbt_raised || 0;
                tot_s_vcoin_earn += +current.tot_s_vcoin_earn || 0;
                tot_s_cert += +current.tot_s_cert || 0;
                tot_s_men_msg += +current.tot_s_men_msg || 0;
            });
            let actvityObj = {
                Challenge: tot_s_chal,
                MentorMessage: tot_s_men_msg,
                Doubt: tot_s_dbt_raised,
                Reward: tot_s_vcoin_earn,
                Certificate: tot_s_cert
            }
            if (currActivity.length === 0) {
                res.status(200).send(new ResponseWithObject(200, noDataAvail));
            } else {
                res.status(200).send(new ResponseWithObject(200, 'Success', actvityObj));
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getActorCurrContentActivity(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.query.user_id, req.query.db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        } else {
            const dbName = dbMetaDataInfo[0].db_name;
            const collectionName = dbMetaDataInfo[0].act_collection[0].name;

            const contentActivity = await getCurrContentActivity(dbName, collectionName, req.query);
            if (contentActivity.length === 0) {
                res.status(200).send(new ResponseWithObject(200, noDataAvail));
            } else {
                res.status(200).send(new ResponseWithObject(200, 'Success', contentActivity));
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getActorFeedPost(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata } = req.query
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        } else {
            const dbName = dbMetaDataInfo[0].db_name;
            const collectionName = dbMetaDataInfo[0].act_collection[0].name;

            const feedPost = await getFeedPost(dbName, collectionName, req.query);
            if (feedPost.length === 0) {
                res.status(200).send(new ResponseWithObject(200, noDataAvail));
            } else {
                res.status(200).send(new ResponseWithObject(200, 'Success', feedPost));
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function updateActorEContentCurrActivity(req: Request, res: Response, next: NextFunction) {
    try {
        const summaryDBMetaDataInfo = await findDbMetaDataDetails(req.body.summaryObj.user_id, req.body.summaryObj.db_metadata);
        const currDBMetaDataInfo = await findDbMetaDataDetails(req.body.currActObj.user_id, req.body.currActObj.db_metadata);

        if (summaryDBMetaDataInfo && currDBMetaDataInfo) {
            const summDBName = summaryDBMetaDataInfo[0].db_name;
            const summCollectionName = summaryDBMetaDataInfo[0].act_collection[0].name;
            const currDBName = currDBMetaDataInfo[0].db_name;
            const currCollectionName = currDBMetaDataInfo[0].act_collection[0].name;

            const currActivity = await updateActorCurrActivity(summDBName, summCollectionName, currDBName, currCollectionName, req.body.summaryObj, req.body.currActObj);
            if (currActivity) {
                res.status(200).send(new ResponseWithObject(200, 'Update Success', currActivity));
            } else {
                res.status(200).send(new ResponseWithObject(200, noDataAvailUpdate));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(new APIResponse(500, noDataAvailUpdate));
    }
}

export async function getCourseContentV1(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.query.userId, req.query.db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        } else {
            const dbName = dbMetaDataInfo[0].db_name;
            const collectionName = dbMetaDataInfo[0].act_collection[0].name;
            const activitySummaryData = await findCourseContent(dbName, collectionName, req.body);
            if (activitySummaryData) {
                const chapAndTIds = [];
                activitySummaryData.data.forEach(chap => {
                    chap.t_data.forEach(t => {
                        chapAndTIds.push({ chap_id: chap.chap_id, t_id: t.t_id });
                    });
                });
                const subChapTopicData = await getSubChapTopicData(dbName, collectionName, chapAndTIds);
                for (const chapter of activitySummaryData.data) {
                    const matchingChapter = subChapTopicData.find(chap => chap._id.toString() === chapter.chap_id);
                    if (matchingChapter) {
                        const totalTopics = chapter.t_data.length;
                        const completedTopics = 0;
                        const completedTopicsValue = 0 ? completedTopics : 0;
                        chapter['_doc'].chap_name = matchingChapter.chapter.name;
                        chapter['_doc'].completed_topics = completedTopics;
                        chapter['_doc'].totalTopics = totalTopics;
                        chapter['_doc'].completed_hours = completedTopics.toFixed(2);
                        chapter['_doc'].totalTopicHours = parseFloat(((totalTopics * 10) / 60).toFixed(2));
                        chapter['_doc'].buddiesCompleted = completedTopicsValue;


                        for (const topic of chapter.t_data) {
                            const matchingTopic = matchingChapter.chapter.topics.find(t => t._id.toString() === topic.t_id);
                            if (matchingTopic) {
                                if (topic.t_sts === 2) {
                                    topic['_doc'].completed = "True";
                                } else {
                                    topic['_doc'].completed = "False";
                                }
                                topic['_doc'].t_name = matchingTopic.name;
                            }
                        }
                    }
                }
                let chaptersData = activitySummaryData.data
                let topicsLength = 0
                const total_chapter = chaptersData.length;
                for (const chapter of chaptersData) {
                    topicsLength += chapter.t_data.length
                }
                const total_time = Math.round((topicsLength * 10) / 60);
                let finalRes = {
                    totalChapter: total_chapter,
                    totalTime: total_time,
                    totalTopicsLength: topicsLength,
                    activitySummaryData: activitySummaryData
                }
                return res.status(200).send(new ResponseWithObject(200, "Success", finalRes));
            } else {
                return res.status(400).send(new APIResponse(400, noDataAvail));
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function addGradeWiseChaptersAndTopics(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, currCatId, currGradeId, subjectId } = req.body;
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, 27);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const db_name = dbMetaDataInfo[0].db_name;
        const collection_name = dbMetaDataInfo[0].act_collection[0].name;
        await gradeWiseChaptersAndTopics(user_id, currCatId, currGradeId, subjectId, db_name, collection_name);
        return res.status(200).send(new APIResponse(200, 'Curriculum added'));
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal server error'));
    }
}

export async function addActorFeedPost(req: Request, res: Response, next: NextFunction) {
    try {
        const image = req.body.file;
        let imageUrl = '';
        const bodyData = JSON.parse(req.body.data);
        const { user_id, db_metadata, header, body } = bodyData
        if (image) {
            const s3URL = await uploadFileIntoS3('feed_post', user_id, image);
            imageUrl = s3URL.url;
        }

        let feedPostObj = { user_id, db_metadata, header, body, imageUrl }
        const dbMetaDataInfo = await findDbMetaDataDetails(feedPostObj.user_id, feedPostObj.db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        } else {
            const dbName = dbMetaDataInfo[0].db_name;
            const collectionName = dbMetaDataInfo[0].act_collection[0].name;
            const feedPost = await addFeedPost(dbName, collectionName, feedPostObj);
            if (feedPost) {
                res.status(200).send(new ResponseWithObject(200, 'FeedPost Added', feedPost))
            } else {
                return res.status(400).send(new APIResponse(400, "FeedPost not Added."));
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function updateCurriculumContent(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, cat_id, grade_id, sub_id } = req.body;
        let actorCurrActivity: any = { user_id, sub_id, cat_id, grade_id };
        const user = await getUserNameProfImg(user_id);
        if (!user.length) {
            return res.status(400).send(new APIResponse(400, 'User not found'));
        }
        const userSubjectWiseLevel = user[0].learning.subjects.find(sub => sub.id === sub_id);
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, 27);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const db_name = dbMetaDataInfo[0].db_name;
        const collection_name = dbMetaDataInfo[0].act_collection[0].name;
        const chapters = await getContent(cat_id, grade_id, sub_id, userSubjectWiseLevel);
        const currActivity = await findActorActivity(db_name, collection_name, actorCurrActivity);
        if (!currActivity) {
            actorCurrActivity.data = chapters;
            const actorActivityResponse = await addActorCurrActivity(db_name, collection_name, actorCurrActivity);
            return res.status(200).send(new ResponseWithObject(200, 'Success', actorActivityResponse));
        } else if (currActivity && currActivity.data.length) {
            for (let chapter of chapters) {
                const actorActivityChapterResponse = await findActorActivityByChapter(db_name, collection_name, { ...actorCurrActivity, chap_id: chapter.chap_id });
                if (actorActivityChapterResponse) {
                    for (let topic of chapter.t_data) {
                        const actorActivityChapterResponse = await findActorActivityByChapterAndTopic(db_name, collection_name, { ...actorCurrActivity, chap_id: chapter.chap_id, t_id: topic.t_id });
                        if (!actorActivityChapterResponse) {
                            actorCurrActivity.data = [{ chap_id: chapter.chap_id, t_data: [topic] }];
                            await updateActorActivityByChapterAndTopic(db_name, collection_name, { ...actorCurrActivity, chap_id: chapter.chap_id, t_id: topic.t_id });
                        }
                    }
                } else {
                    actorCurrActivity.data = [{ chap_id: chapter.chap_id, t_data: chapter.t_data }];
                    await updateActorActivityByChapter(db_name, collection_name, { ...actorCurrActivity, chap_id: chapter.chap_id });
                }
            }
        }
        return res.status(200).send(new APIResponse(200, 'Curriculum updated'));
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal server error'));
    }
}

export async function getLeaderBoard(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.query.userId, req.query.db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        } else {
            const dbName = dbMetaDataInfo[0].db_name;
            const collectionName = dbMetaDataInfo[0].act_collection[0].name;
            const connDbMetaData = '26';
            const connDbMetaDataInfo = await findDbMetaDataDetails(req.query.userId, connDbMetaData);
            const connDBName = connDbMetaDataInfo[0].db_name;
            const connCollectionName = connDbMetaDataInfo[0].act_collection[0].name;
            const leaderBoard: any = await findLeaderBoard(dbName, collectionName, connDBName, connCollectionName, req.query);
            if(leaderBoard.status === 201){
                return res.status(400).send(new APIResponse(400, leaderBoard.message));
            } else if(leaderBoard.length === 0){
                return res.status(400).send(new APIResponse(400, noDataAvail));
            } else {
                return res.status(200).send(new ResponseWithObject(200, Success, leaderBoard));
            }
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal server error'));
    }
}