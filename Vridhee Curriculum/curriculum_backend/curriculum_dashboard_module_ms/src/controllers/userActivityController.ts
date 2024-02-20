import { Request, Response, NextFunction } from "express";
import { ResponseWithObject, APIResponse, APIResponseWithDetails, Status } from "../utils/status";
import { doubtsDeleteMsg, doubtsSuccessMsg, noDataAvail, noDataAvailDelete, noDoubtsAvail, noMetaDataAvail, noStudyPlanAvail } from "../utils/errormsg";
import {
    findDbMetaDataDetails, contentLikeDislikeActivity, likeDislikeActivity, noteActivity,
    eContentFeedBack, videoFeedBack, getNote, addVideoNote, videoLikeDislikeActivity,
    getDBMetaDataName, geteContentFeedBackList, getVideoFeedBackList, getVideo, deleteVideo,
    deleteNote, getLookUpMasterData, updatettlCount, findTtlCnt, addEContentComment, addVideoComment, getVideoCommentList,
    removeActorvideoFeedback, removeActorecontentFeedback, geteContentCommentList, videoTLineActivity, getVideoTLine,
    addclassTest, addpracticeTest, addclassAnswer, getclassTestAnswers, getpracticeTest, getclassTest, removeActorvideocomment, addContentDoubt,
    saveCollabaration, updateCollabarationURL, userwiseCollabaration, getcollabarations, timeLineUpdate, deleteVideoTLine, updateDoubtReply, updateLikeDisLike, getDoubtsList,
    updateUserIdInCollabaration, saveTaskInCollabaration, updateTaskURL, removeActorecontentComment, saveAssignments, updateAssignmentURL,
    getAssignmentList, submitAssignment, updateAssignmentSubmissionURL, getSubmittedAssignmentList, updateVideoComment, updateVideoCommentreply,
    removeVideoCommentreply, updateEContentComment, eContentCommentReply, removeEContentCommentreply, deleteDoubtByDoubtId, deleteDoubtReplyByReplyId,
    getUserNameProfImg, getTopicNames,
    getSubjectNames,
    getdoubtDBMetaDataName,
    getDoubts, saveGmailContacts, getContacts, newStudyPlan,
    getStudyPlan, getpracticeTestInfo,
    getSubjectDetails, userSubjectCollabarations, updateCollabarationStatus
} from '../services/userActivity';
import { shortHandCollectionName } from '../utils/shortHandCollectionName';
import { uploadFileIntoS3 } from "../utils/s3Config";
import { epochToDayName, epochToHumanReadable } from "../utils/epochToDate";
import { addCountForCollabration, decreaseCountForCollabration } from "../services/actorCurrActivityService";

export async function actorContentLikeDislike(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);

        //Get collection name of language database from lookupmaster to update ttl_count.
        const lookUpMasterInfo = await getLookUpMasterData(req.body.content_type_id, req.body.level_id);
        //Collection name of language database.
        const languageCName = lookUpMasterInfo[1].data.val + '_' + lookUpMasterInfo[0].data.val;

        // return lookUpMasterInfo;
        if (!dbMetaDataInfo) {
            // Sending a client error response if the required data is not found
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        if (!lookUpMasterInfo) {
            //Sending a client error response if the language collection name not found from lookupmaster
            return res.status(400).send(new APIResponse(400, 'Language Collection Name is not available'));
        }
        const db_name = dbMetaDataInfo[0].db_name;
        const collection_name = dbMetaDataInfo[0].act_collection[0].name;
        //update status for meta data DB
        let sts
        if (req.body.like === 1) {
            sts = 1
        } else if (req.body.dislike === 1) {
            sts = 2
        } else {
            sts = 0 // user activity is un select 
        }
        req.body.sts = sts;
        //Insert & update LikeDislikeActivity in meta data DB 
        await contentLikeDislikeActivity(db_name, collection_name, req.body);
        // Find Total count for update user like or dislike activity
        const findLangCInfo = await findTtlCnt(languageCName, req.body.t_id, req.body.content_level_object_id);
        let ttl_cnt;
        if (!findLangCInfo[0].count) {
            ttl_cnt = {
                "like": req.body.like,
                "dislike": req.body.dislike,
            }
        } else {
            ttl_cnt = {
                "like": findLangCInfo[0].count.like + req.body.like,
                "dislike": findLangCInfo[0].count.dlike + req.body.dislike,
            }
        }

        const updatettlCnt = {
            "t_id": req.body.t_id,
            "_id": req.body.content_level_object_id,
            "ttl_cnt": ttl_cnt,
            "languageCName": languageCName
        }
        // Api for Update user like or dislike activity
        const updateStsCount = await updatettlCount(updatettlCnt);
        const topicContentInfo = updateStsCount.data.filter((dt) => dt._id == req.body.content_level_object_id);

        // Sending a success response
        res.status(200).send(new ResponseWithObject(200, 'Success', topicContentInfo[0].ttl_cnt));

    } catch (error) {
        // Logging the error for debugging purposes
        console.error('Error in createActorContentLikeDislike:', error);

        // Sending a server error response with a generic error message
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function videoLikeDislike(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);

        //Because we have only one collecction of video 
        const languageCName = "video_level_1"

        if (!dbMetaDataInfo) {
            // Sending a client error response if the required data is not found
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }

        const db_name = dbMetaDataInfo[0].db_name;
        const collection_name = dbMetaDataInfo[0].act_collection[0].name;
        //update status for meta data DB
        let sts
        if (req.body.like === 1) {
            sts = 1
        } else if (req.body.dislike === 1) {
            sts = 2
        } else {
            sts = 0 // user activity is un select 
        }
        req.body.sts = sts;

        //Insert & update LikeDislikeActivity in meta data DB 
        await videoLikeDislikeActivity(db_name, collection_name, req.body);

        // Find Total count for update user like or dislike activity
        const findLangCInfo = await findTtlCnt(languageCName, req.body.t_id, req.body.video_id);
        let ttl_cnt;
        if (!findLangCInfo[0].count) {
            ttl_cnt = {
                "like": req.body.like,
                "dislike": req.body.dislike,
            }
        } else {
            ttl_cnt = {
                "like": findLangCInfo[0].count.like + req.body.like,
                "dislike": findLangCInfo[0].count.dlike + req.body.dislike,
            }
        }

        const updatettlCnt = {
            "t_id": req.body.t_id,
            "_id": req.body.video_id,
            "ttl_cnt": ttl_cnt,
            "languageCName": languageCName
        }
        // Api for Update user like or dislike activity
        const updateStsCount = await updatettlCount(updatettlCnt);
        const topicContentInfo = updateStsCount.data.filter((dt) => dt._id == req.body.video_id);

        // Sending a success response
        res.status(200).send(new ResponseWithObject(200, 'Success', topicContentInfo[0].ttl_cnt));

    } catch (error) {
        // Logging the error for debugging purposes
        console.error('Error in videoLikeDislike:', error);

        // Sending a server error response with a generic error message
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

// actorRevisionLikeDislike ApI is not fully completed depend on db
export async function actorRevisionLikeDislike(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        // console.log("dbMetaDataInfo>>>", dbMetaDataInfo);

        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;

            console.log("db_name>>>", db_name);
            console.log("collection_name>>>", dbMetaDataInfo[0].act_collection[0].name);
            //logic 
            const results = await likeDislikeActivity(db_name, collection_name, req.body);
            // const lDCounts = await likeDislikeCount(results.t_id, results.content_type_id, results.level_id);
            console.log("likeDislikeActivity>>>", results);
            // Sending a success response
            res.status(200).send(new ResponseWithObject(200, 'Success', results));
        } else {
            // Sending a client error response if the required data is not found
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
    } catch (error) {
        // Logging the error for debugging purposes
        console.error('Error in actorRevisionLikeDislike:', error);

        // Sending a server error response with a generic error message
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function actorEContentFeedback(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;
            const results = await eContentFeedBack(db_name, collection_name, req.body);
            return res.status(200).send(new ResponseWithObject(200, 'Feedback added', results));
        } else {
            return res.status(400).send(new APIResponse(400, 'Internal server error'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function actorContentNote(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;

            const content = await noteActivity(db_name, collection_name, req.body);
            res.status(200).send(new ResponseWithObject(200, 'Note Added or Updated', content));
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select at least one curriculum'));
        }
    } catch (error) {
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function actorVideoFeedback(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;
            const results = await videoFeedBack(db_name, collection_name, req.body);
            return res.status(200).send(new ResponseWithObject(200, 'Feedback added', results));
        } else {
            return res.status(400).send(new APIResponse(400, 'Internal server error'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getContentNote(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.query.user_id, req.query.db_metadata);
        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;

            const contentNote = await getNote(db_name, collection_name, req.query);

            for (let i = 0; i < contentNote.length; i++) {
                const dateObject = new Date(+contentNote[i].c_ts)
                const humanDateFormat = dateObject.toISOString()
                contentNote[i].c_ts = humanDateFormat
            }

            if (contentNote.length === 0) {
                res.status(200).send(new ResponseWithObject(200, noDataAvail, contentNote));
            } else {
                res.status(200).send(new ResponseWithObject(200, 'Success', contentNote));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select at least one curriculum'));
        }
    } catch (error) {
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getActorEContentFeedback(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, t_id, content_type_id, level_id } = req.body
        const dbMetaDataInfo = await getDBMetaDataName(db_metadata);
        if (dbMetaDataInfo) {
            let feedBackData = await geteContentFeedBackList(dbMetaDataInfo.db_name, t_id, content_type_id, level_id);
            return res.status(200).send(new Status(200, feedBackData));
        } else {
            return res.status(400).send(new APIResponse(400, 'Internal server error'));
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getActorVideoFeedback(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, t_id, v_id } = req.body
        const dbMetaDataInfo = await getDBMetaDataName(db_metadata);
        if (dbMetaDataInfo) {
            let feedBackData = await getVideoFeedBackList(dbMetaDataInfo.db_name, t_id, v_id);
            return res.status(200).send(new Status(200, feedBackData));
        } else {
            return res.status(400).send(new APIResponse(400, 'Internal server error'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function actorVideoNote(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;

            const videoNote = await addVideoNote(db_name, collection_name, req.body);
            res.status(200).send(new ResponseWithObject(200, 'Note Added or Updated', videoNote));
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select at least one curriculum'));
        }
    } catch (error) {
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getVideoNote(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.query.user_id, req.query.db_metadata);
        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;

            const videoNote = await getVideo(db_name, collection_name, req.query);
            for (let i = 0; i < videoNote.length; i++) {
                const dateObject = new Date(+videoNote[i].c_ts)
                const humanDateFormat = dateObject.toISOString()
                videoNote[i].c_ts = humanDateFormat
            }
            if (videoNote.length === 0) {
                res.status(200).send(new ResponseWithObject(200, noDataAvail, videoNote));
            } else {
                res.status(200).send(new ResponseWithObject(200, 'Success', videoNote));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select at least one curriculum'));
        }
    } catch (error) {
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function deleteVideoNote(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.query.user_id, req.query.db_metadata);
        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;

            const videoNote = await deleteVideo(db_name, collection_name, req.query);
            if (videoNote.deletedCount === 0) {
                res.status(200).send(new ResponseWithObject(200, noDataAvailDelete));
            } else {
                res.status(200).send(new ResponseWithObject(200, 'Note Deleted Successfully', videoNote));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select at least one curriculum'));
        }
    } catch (error) {
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function deleteContentNote(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.query.user_id, req.query.db_metadata);
        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;

            const contentNote = await deleteNote(db_name, collection_name, req.query);

            if (contentNote.deletedCount === 0) {
                res.status(200).send(new ResponseWithObject(200, noDataAvailDelete));
            } else {
                res.status(200).send(new ResponseWithObject(200, 'Note Deleted Successfully', contentNote));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select at least one curriculum'));
        }
    } catch (error) {
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function addActoreContentComment(req: Request, res: Response, next: NextFunction) {
    const { db_metadata, user_id, content_type_id, level_id, t_id, content_level_object_id, new_comment } = req.body
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const db_name = dbMetaDataInfo[0].db_name;
        const userContentCollectionName = dbMetaDataInfo[0].act_collection[0].name;
        const lookUpMasterInfo = await getLookUpMasterData(content_type_id, level_id);
        if (!lookUpMasterInfo) {
            return res.status(400).send(new APIResponse(400, 'Language Collection Name is not available'));
        }
        const collectionName = lookUpMasterInfo[1].data.val + '_' + lookUpMasterInfo[0].data.val;
        await addEContentComment(db_name, userContentCollectionName, req.body);
        if (new_comment) {
            const findLangCollectionInfo = await findTtlCnt(collectionName, t_id, content_level_object_id);
            let ttl_cnt;
            if (!findLangCollectionInfo[0].count) {
                ttl_cnt = {
                    "comment": 1,
                }
            } else {
                ttl_cnt = {
                    "comment": findLangCollectionInfo[0].count.comment + 1,
                }
            }
            const updatettlCnt = {
                "t_id": t_id,
                "_id": content_level_object_id,
                "ttl_cnt": ttl_cnt,
                "languageCName": collectionName
            }
            await updatettlCount(updatettlCnt);
        }
        return res.status(200).send(new APIResponse(200, 'Comment added'));
    } catch (error) {
        console.log(error)
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function addActorVideoComment(req: Request, res: Response, next: NextFunction) {
    const { db_metadata, user_id, t_id, v_id, new_comment } = req.body
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const db_name = dbMetaDataInfo[0].db_name;
        const userContentCollectionName = dbMetaDataInfo[0].act_collection[0].name;
        const collectionName = "video_level_1";
        await addVideoComment(db_name, userContentCollectionName, req.body);
        if (new_comment) {
            const findLangCollectionInfo = await findTtlCnt(collectionName, t_id, v_id);
            let ttl_cnt;
            if (!findLangCollectionInfo[0].count) {
                ttl_cnt = {
                    "comment": 1,
                }
            } else {
                ttl_cnt = {
                    "comment": findLangCollectionInfo[0].count.comment + 1,
                }
            }
            const updatettlCnt = {
                "t_id": t_id,
                "_id": v_id,
                "ttl_cnt": ttl_cnt,
                "languageCName": collectionName
            }
            await updatettlCount(updatettlCnt);
        }
        return res.status(200).send(new APIResponse(200, 'Comment added'));
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getActorVideoComment(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, t_id, v_id } = req.body
        const dbMetaDataInfo = await getDBMetaDataName(db_metadata);
        if (dbMetaDataInfo) {
            let commentData = await getVideoCommentList(dbMetaDataInfo.db_name, t_id, v_id);
            return res.status(200).send(new Status(200, commentData));
        } else {
            return res.status(400).send(new APIResponse(400, 'Internal server error'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getActorEContentComment(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, t_id, content_type_id, level_id } = req.body;
        const dbMetaDataInfo = await getDBMetaDataName(db_metadata);
        if (dbMetaDataInfo) {
            let commentData = await geteContentCommentList(dbMetaDataInfo.db_name, t_id, content_type_id, level_id);
            return res.status(200).send(new Status(200, commentData));
        } else {
            return res.status(400).send(new APIResponse(400, 'Internal server error'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function removeActorVideoFeedback(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, v_f_id, user_id } = req.body
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;
            const results = await removeActorvideoFeedback(db_name, collection_name, v_f_id, user_id);
            return res.status(200).send(new ResponseWithObject(200, 'Feedback removed', results));
        } else {
            return res.status(400).send(new APIResponse(400, 'Internal server error'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function removeActorVideoComment(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, t_id, v_id, v_c_id, user_id } = req.body
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const db_name = dbMetaDataInfo[0].db_name;
        const userContentCollectionName = dbMetaDataInfo[0].act_collection[0].name;
        const collectionName = "video_level_1";
        await removeActorvideocomment(db_name, userContentCollectionName, v_c_id, user_id);
        const findLangCollectionInfo = await findTtlCnt(collectionName, t_id, v_id);
        let ttl_cnt;
        if (!findLangCollectionInfo[0].count) {
            ttl_cnt = {
                "comment": 0,
            }
        } else {
            ttl_cnt = {
                "comment": findLangCollectionInfo[0].count.comment - 1,
            }
        }
        const updatettlCnt = {
            "t_id": t_id,
            "_id": v_id,
            "ttl_cnt": ttl_cnt,
            "languageCName": collectionName
        }
        await updatettlCount(updatettlCnt);
        return res.status(200).send(new APIResponse(200, 'Comment removed'));
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function removeActorEContentFeedback(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, c_f_id, user_id } = req.body
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;
            const results = await removeActorecontentFeedback(db_name, collection_name, c_f_id, user_id);
            return res.status(200).send(new ResponseWithObject(200, 'Feedback removed', results));
        } else {
            return res.status(400).send(new APIResponse(400, 'Feedback not removed'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function removeActorEContentComment(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, content_type_id, level_id, t_id, content_level_object_id, e_c_id, user_id } = req.body
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const db_name = dbMetaDataInfo[0].db_name;
        const userContentCollectionName = dbMetaDataInfo[0].act_collection[0].name;
        const lookUpMasterInfo = await getLookUpMasterData(content_type_id, level_id);
        if (!lookUpMasterInfo) {
            return res.status(400).send(new APIResponse(400, 'Language Collection Name is not available'));
        }
        const collectionName = lookUpMasterInfo[1].data.val + '_' + lookUpMasterInfo[0].data.val;
        await removeActorecontentComment(db_name, userContentCollectionName, e_c_id, user_id);
        const findLangCollectionInfo = await findTtlCnt(collectionName, t_id, content_level_object_id);
        let ttl_cnt;
        if (!findLangCollectionInfo[0].count) {
            ttl_cnt = {
                "comment": 0,
            }
        } else {
            ttl_cnt = {
                "comment": findLangCollectionInfo[0].count.comment - 1,
            }
        }
        const updatettlCnt = {
            "t_id": t_id,
            "_id": content_level_object_id,
            "ttl_cnt": ttl_cnt,
            "languageCName": collectionName
        }
        await updatettlCount(updatettlCnt);
        return res.status(200).send(new APIResponse(200, 'Comment removed'));
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function videoTimeLineActivity(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        console.log("dbMetaDataInfo>>", dbMetaDataInfo)
        if (!dbMetaDataInfo) {
            // Sending a client error response if the required data is not found
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }

        const db_name = dbMetaDataInfo[0].db_name;
        const collection_name = dbMetaDataInfo[0].act_collection[0].name;

        //videoTimeLine user activity in meta data DB 
        const vTLResponse = await videoTLineActivity(db_name, collection_name, req.body);

        if (!vTLResponse) {
            return res.status(200).send(new APIResponse(400, 'Video Time Line not created'));
        }
        // Sending a success response
        res.status(200).send(new ResponseWithObject(200, 'Success', vTLResponse));

    } catch (error) {
        // Logging the error for debugging purposes
        console.error('Error in createVideoTimeLine:', error);

        // Sending a server error response with a generic error message
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getVideoTimeLine(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        if (!dbMetaDataInfo) {
            // Sending a client error response if the required data is not found
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }

        const db_name = dbMetaDataInfo[0].db_name;
        const collection_name = dbMetaDataInfo[0].act_collection[0].name;

        //videoTimeLine user activity in meta data DB 
        const vTLResponse = await getVideoTLine(db_name, collection_name, req.body);

        if (!vTLResponse) {
            return res.status(200).send(new APIResponse(400, 'No Video Time Line available'));
        }
        // Sending a success response
        res.status(200).send(new ResponseWithObject(200, 'Success', vTLResponse));

    } catch (error) {
        // Logging the error for debugging purposes
        console.error('Error in getVideoTimeLine:', error);

        // Sending a server error response with a generic error message
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function updateTimeLine(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        if (!dbMetaDataInfo) {
            // Sending a client error response if the required data is not found
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }

        const db_name = dbMetaDataInfo[0].db_name;
        const collection_name = dbMetaDataInfo[0].act_collection[0].name;

        //videoTimeLine user activity in meta data DB 
        const vTLResponse = await timeLineUpdate(db_name, collection_name, req.body);

        if (!vTLResponse) {
            return res.status(200).send(new APIResponse(400, 'Video Time Line not updated'));
        }
        // Sending a success response
        res.status(200).send(new ResponseWithObject(200, 'Success', vTLResponse));

    } catch (error) {
        // Logging the error for debugging purposes
        console.error('Error in Update TimeLine:', error);

        // Sending a server error response with a generic error message
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function deleteTimeLine(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        if (!dbMetaDataInfo) {
            // Sending a client error response if the required data is not found
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }

        const db_name = dbMetaDataInfo[0].db_name;
        const collection_name = dbMetaDataInfo[0].act_collection[0].name;

        //videoTimeLine user activity in meta data DB 
        const vTLResponse = await deleteVideoTLine(db_name, collection_name, req.body);

        if (!vTLResponse) {
            return res.status(200).send(new APIResponse(400, 'Video Time Line not deleted'));
        }
        // Sending a success response
        res.status(200).send(new ResponseWithObject(200, 'Success', vTLResponse));

    } catch (error) {
        // Logging the error for debugging purposes
        console.error('Error in Delete TimeLine:', error);

        // Sending a server error response with a generic error message
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function addClassTest(req: Request, res: Response, next: NextFunction) {
    try {
        const { test_type, db_metadata, mnt_user_id, batch_id, sub_id, ques_sheet, ttl_marks, ttl_exp_dur } = req.body
        const dbMetaDataInfo = await findDbMetaDataDetails(mnt_user_id, db_metadata);
        if (dbMetaDataInfo.length) {
            const dbName = dbMetaDataInfo[0].db_name;
            let collectionName: string;
            for (let dbMeta of dbMetaDataInfo[0].act_collection) {
                let shortHandName = shortHandCollectionName(dbMeta.name)
                if (test_type === shortHandName) {
                    collectionName = dbMeta.name
                }
            }
            const classTestObj = await addclassTest(dbName, collectionName, req.body)
            if (classTestObj) {
                return res.status(200).send(new ResponseWithObject(200, 'Class test added', classTestObj));
            } else {
                return res.status(400).send(new APIResponse(400, 'Class test not added'));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'DB not connected'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function addPracticeTest(req: Request, res: Response, next: NextFunction) {
    try {
        const { test_type, db_metadata, user_id, sub_id } = req.body;
        const userResult = await getUserNameProfImg(user_id);
        if (!userResult.length) {
            return res.status(400).send(new APIResponse(400, 'User not found'));
        }
        let subject = userResult[0].learning.subjects.filter(subject => subject.id == sub_id);
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (dbMetaDataInfo.length) {
            const dbName = dbMetaDataInfo[0].db_name;
            let collectionName: string;
            for (let dbMeta of dbMetaDataInfo[0].act_collection) {
                let shortHandName = shortHandCollectionName(dbMeta.name)
                if (test_type === shortHandName) {
                    collectionName = dbMeta.name
                }
            }
            const practiceTestObj = await addpracticeTest(dbName, collectionName, req.body, subject[0])
            if (practiceTestObj) {
                return res.status(200).send(new ResponseWithObject(200, 'Practice test added', practiceTestObj));
            } else {
                return res.status(400).send(new APIResponse(400, 'Practice test not added'));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'DB not connected'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function addClassTestAnswer(req: Request, res: Response, next: NextFunction) {
    try {
        const { test_type, db_metadata, user_id } = req.body
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (dbMetaDataInfo.length) {
            const dbName = dbMetaDataInfo[0].db_name;
            let collectionName: string;
            for (let dbMeta of dbMetaDataInfo[0].act_collection) {
                let shortHandName = shortHandCollectionName(dbMeta.name)
                if (test_type === shortHandName) {
                    collectionName = dbMeta.name
                }
            }
            const classTestAnswerObj = await addclassAnswer(dbName, collectionName, req.body)
            if (classTestAnswerObj) {
                return res.status(200).send(new ResponseWithObject(200, 'Class test answer added', classTestAnswerObj));
            } else {
                return res.status(400).send(new APIResponse(400, 'Class test answer not added'));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'DB not connected'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getClassTestAnswer(req: Request, res: Response, next: NextFunction) {
    try {
        const { test_type, db_metadata, user_id, c_test_id } = req.body
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (dbMetaDataInfo.length) {
            const dbName = dbMetaDataInfo[0].db_name;
            let collectionName: string;
            for (let dbMeta of dbMetaDataInfo[0].act_collection) {
                let shortHandName = shortHandCollectionName(dbMeta.name)
                if (test_type === shortHandName) {
                    collectionName = dbMeta.name
                }
            }
            let classTestAnswers = await getclassTestAnswers(test_type, dbName, user_id, c_test_id);
            return res.status(200).send(new Status(200, classTestAnswers));
        } else {
            return res.status(400).send(new APIResponse(400, 'DB not connected'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getPracticeTest(req: Request, res: Response, next: NextFunction) {
    try {
        const { test_type, db_metadata, user_id, sub_id, t_id } = req.body;
        const userResult = await getUserNameProfImg(user_id);
        if (!userResult.length) {
            return res.status(400).send(new APIResponse(400, 'User not found'));
        }
        let subject = userResult[0].learning.subjects.filter(subject => subject.id == sub_id);
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (dbMetaDataInfo.length) {
            const dbName = dbMetaDataInfo[0].db_name;
            let collectionName: string;
            for (let dbMeta of dbMetaDataInfo[0].act_collection) {
                let shortHandName = shortHandCollectionName(dbMeta.name)
                if (test_type === shortHandName) {
                    collectionName = dbMeta.name
                }
            }
            let practiceTestAnswers = await getpracticeTest(dbName, collectionName, user_id, sub_id, t_id, subject[0]);
            return res.status(200).send(new Status(200, practiceTestAnswers));
        } else {
            return res.status(400).send(new APIResponse(400, 'DB not connected'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getPracticeTestDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const { test_type, db_metadata, user_id, sub_id, t_id, p_t_id } = req.body
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (dbMetaDataInfo.length) {
            const dbName = dbMetaDataInfo[0].db_name;
            let collectionName: string;
            for (let dbMeta of dbMetaDataInfo[0].act_collection) {
                let shortHandName = shortHandCollectionName(dbMeta.name)
                if (test_type === shortHandName) {
                    collectionName = dbMeta.name
                }
            }
            let practiceTestAnswer = await getpracticeTestInfo(dbName, collectionName, user_id, sub_id, t_id, p_t_id);
            return res.status(200).send(new ResponseWithObject(200, 'done', practiceTestAnswer));
        } else {
            return res.status(400).send(new APIResponse(400, 'DB not connected'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getClassTest(req: Request, res: Response, next: NextFunction) {
    try {
        const { test_type, sub_id } = req.body;
        let classTest = await getclassTest(test_type, 'learner_test_db', sub_id)
        if (classTest.length) {
            return res.status(200).send(new Status(200, classTest));
        } else {
            return res.status(400).send(new APIResponse(400, 'Data not found'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function actorContentDoubt(req: Request, res: Response, next: NextFunction) {
    try {
        const image = req.body.file;
        let imageUrl = '';
        const bodyData = JSON.parse(req.body.data);
        const { user_id, doubtId, db_metadata, sub_id, chapter_id, t_id, d_title, d_text, reply } = bodyData
        if (image) {
            const s3URL = await uploadFileIntoS3('content_doubt', user_id, image);
            imageUrl = s3URL.url;
        }

        let doubtObj = { user_id, doubtId, db_metadata, sub_id, chapter_id, t_id, d_title, d_text, imageUrl, reply }

        const dbMetaDataInfo = await findDbMetaDataDetails(doubtObj.user_id, doubtObj.db_metadata);
        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;

            const contentDoubt = await addContentDoubt(db_name, collection_name, doubtObj);
            let activityDB_metadata = '27';
            const activityDBMetaDataInfo = await findDbMetaDataDetails(doubtObj.user_id, activityDB_metadata);
            let actvityDBName = activityDBMetaDataInfo[0].db_name;
            let activityCollectionName = activityDBMetaDataInfo[0].act_collection[0].name;
            const doubtsCount = await addCountForCollabration(actvityDBName, activityCollectionName, doubtObj);
            if (contentDoubt && doubtsCount.modifiedCount === 1) {
                res.status(200).send(new ResponseWithObject(200, doubtsSuccessMsg, contentDoubt))
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select at least one curriculum'));
        }
    } catch (error) {
        res.status(400).send(new APIResponse(400, 'Internal Server Error'));
    }
}

export async function addCollabaration(req: Request, res: Response, next: NextFunction) {
    try {
        // const { db_metadata, user_id, name, sub_id, t_id, c_text, c_dt, c_ts, c_link, t_allow, is_allow, j_list } = req.body;
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const db_name = dbMetaDataInfo[0].db_name;
        const userContentCollectionName = dbMetaDataInfo[0].act_collection[0].name;
        const collabarationObj = await saveCollabaration(db_name, userContentCollectionName, req.body);
        if (collabarationObj) {
            // const collabarationId = collabarationObj['_doc']['_id'];
            // const s3URL = await uploadFileIntoS3('collabaration', collabarationId, req.body.file);
            // await updateCollabarationURL(collabarationId, db_name, userContentCollectionName, s3URL.url)
            return res.status(200).send(new APIResponse(200, 'Collabaration added'));
        } else {
            return res.status(400).send(new APIResponse(400, 'Collabaration is not added'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getUserWiseCollabaration(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, user_id } = req.body;
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const dbName = dbMetaDataInfo[0].db_name;
        const userContentCollectionName = dbMetaDataInfo[0].act_collection[0].name;
        const collabarationList = await userwiseCollabaration(dbName, userContentCollectionName, user_id);
        if (collabarationList.length) {
            return res.status(200).send(new Status(200, collabarationList));
        } else {
            return res.status(400).send(new APIResponse(400, 'Collabarations not available'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getAllCollabarations(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata } = req.body;
        const dbMetaDataInfo = await getDBMetaDataName(db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        let collabarations = await getcollabarations(dbMetaDataInfo.db_name);
        if (collabarations.length) {
            return res.status(200).send(new Status(200, collabarations));
        } else {
            return res.status(400).send(new APIResponse(400, 'Collabarations not available'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function actorDoubtReply(req: Request, res: Response, next: NextFunction) {
    try {
        const image = req.body.file;
        let imageUrl = '';
        const bodyData = JSON.parse(req.body.data);
        const { user_id, doubtId, db_metadata, sub_id, t_id, replyId, src, replyUserId, r_text, likeValue } = bodyData
        if (image) {
            const s3URL = await uploadFileIntoS3('content_doubt', user_id, image);
            imageUrl = s3URL.url;
        }

        let replyObj = { user_id, doubtId, db_metadata, sub_id, t_id, imageUrl, replyId, src, replyUserId, r_text, likeValue }

        const dbMetaDataInfo = await findDbMetaDataDetails(replyObj.user_id, replyObj.db_metadata);
        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;
            const doubtReply = await updateDoubtReply(db_name, collection_name, replyObj);
            if (doubtReply.modifiedCount && doubtReply.matchedCount === 1) {
                res.status(200).send(new ResponseWithObject(200, 'Reply added or updated for the Doubt', doubtReply));
            } else {
                res.status(200).send(new ResponseWithObject(201, 'Reply not added'));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select at least one curriculum'));
        }
    } catch (error) {
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function doubtReplyLikeDislike(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, doubtId, db_metadata, sub_id, t_id, replyId, likeValue, disLikeValue } = req.body
        const likeDislikeObj = { user_id, doubtId, db_metadata, sub_id, t_id, replyId, likeValue, disLikeValue }

        const dbMetaDataInfo = await findDbMetaDataDetails(likeDislikeObj.user_id, likeDislikeObj.db_metadata);
        if (dbMetaDataInfo) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;

            const replyLikeDislike = await updateLikeDisLike(db_name, collection_name, likeDislikeObj);
            res.status(200).send(new ResponseWithObject(200, 'Like or Dislike Added', replyLikeDislike));
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select at least one curriculum'));
        }
    } catch (error) {
        res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getActorDoubtsList(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata } = req.query
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (dbMetaDataInfo) {
            const dbName = dbMetaDataInfo[0].db_name;
            const doubtsCollectionName = dbMetaDataInfo[0].act_collection[0].name;
            const doubtsList = await getDoubtsList(dbName, doubtsCollectionName, req.body);
            for (let i = 0; i < doubtsList.length; i++) {
                const userResult = await getUserNameProfImg(doubtsList[i].user_id);
                const subRes = await getSubjectNames(doubtsList[i].sub_id);
                const topicResult = await getTopicNames(doubtsList[i].sub_id, doubtsList[i].chapter_id, doubtsList[i].t_id);
                doubtsList[i]['_doc'].profileImage = userResult.length > 0 ? userResult[0].personal_info.image : ""
                doubtsList[i]['_doc'].userName = userResult.length > 0 ? userResult[0].userdetails.disp_name : ""
                doubtsList[i]['_doc'].subjectName = subRes.length > 0 ? subRes[0].name : ""
                doubtsList[i]['_doc'].chapName = topicResult.length > 0 ? topicResult[0].chapter.name : ""
                doubtsList[i]['_doc'].topicName = topicResult.length > 0 ? topicResult[0].chapter.topics.name : ""

                const replyArray = doubtsList[i].reply;
                for (let i = 0; i < replyArray.length; i++) {
                    const replyUserData = await getUserNameProfImg(replyArray[i].user_id);
                    replyArray[i]['_doc'].profileImage = replyUserData.length > 0 ? replyUserData[0].personal_info.image : ""
                    replyArray[i]['_doc'].userName = replyUserData.length > 0 ? replyUserData[0].userdetails.disp_name : ""
                }
            }
            if (doubtsList.length === 0) {
                res.status(200).send(new ResponseWithObject(400, noDoubtsAvail));
            } else {
                res.status(200).send(new ResponseWithObject(200, 'Success', doubtsList));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select at least one curriculum'));
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function addUserIntoExistingCollabaration(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, user_id, collabaration_id, new_user_id } = req.body;
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const dbName = dbMetaDataInfo[0].db_name;
        const userContentCollectionName = dbMetaDataInfo[0].act_collection[0].name;
        let collabaration = await updateUserIdInCollabaration(dbName, userContentCollectionName, user_id, collabaration_id, new_user_id)
        if (collabaration.status !== 200) {
            return res.status(400).send(new APIResponse(collabaration.status, collabaration.message));
        } else {
            return res.status(200).send(new APIResponse(collabaration.status, collabaration.message));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function addTaskToCollabaration(req: Request, res: Response, next: NextFunction) {
    try {
        // const { db_metadata, user_id, name, sub_id, t_id, c_text, c_dt, c_ts, c_link, t_allow, is_allow, j_list } = req.body;
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const db_name = dbMetaDataInfo[0].db_name;
        const userContentCollectionName = dbMetaDataInfo[0].act_collection[0].name;
        const taskObj = await saveTaskInCollabaration(db_name, userContentCollectionName, req.body);
        if (taskObj) {
            const taskId = taskObj['_doc']['_id'];
            const s3URL = await uploadFileIntoS3('collabaration_task', taskId, req.body.file);
            await updateTaskURL(taskId, db_name, userContentCollectionName, s3URL.url)
            return res.status(200).send(new APIResponse(200, 'Task added'));
        } else {
            return res.status(400).send(new APIResponse(400, 'Task is not added'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function createAssignments(req: Request, res: Response, next: NextFunction) {
    try {
        const db_name = 'vridhee-cur_english';
        const userContentCollectionName = 'assignment_level_1';
        const assignmentObj = await saveAssignments(db_name, userContentCollectionName, req.body);
        if (assignmentObj) {
            const assignmentId = assignmentObj['_doc']['_id'];
            const s3URL = await uploadFileIntoS3('vridhee-cur_english/assignment_level_1', assignmentId, req.body.file);
            await updateAssignmentURL(assignmentId, db_name, userContentCollectionName, s3URL.url)
            return res.status(200).send(new APIResponse(200, 'Assignment added'));
        } else {
            return res.status(400).send(new APIResponse(400, 'Assignment is not added'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getAssignments(req: Request, res: Response, next: NextFunction) {
    try {
        const { mnt_usr_id, sub_id, t_id } = req.body;
        const dbName = 'vridhee-cur_english';
        const userContentCollectionName = 'assignment_level_1';
        const assignmentsData = await getAssignmentList(dbName, userContentCollectionName, mnt_usr_id, sub_id, t_id);
        if (assignmentsData.length) {
            return res.status(200).send(new Status(200, assignmentsData));
        } else {
            return res.status(400).send(new APIResponse(400, 'Assignments not available'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function submitAssignments(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const db_name = dbMetaDataInfo[0].db_name;
        const userContentCollectionName = dbMetaDataInfo[0].act_collection[0].name;
        const assignmentObj = await submitAssignment(db_name, userContentCollectionName, req.body);
        if (assignmentObj) {
            const assignmentId = assignmentObj['_doc']['_id'];
            const s3URL = await uploadFileIntoS3('assignment_submission', assignmentId, req.body.file);
            await updateAssignmentSubmissionURL(assignmentId, db_name, userContentCollectionName, s3URL.url)
            return res.status(200).send(new APIResponse(200, 'Assignment submitted'));
        } else {
            return res.status(400).send(new APIResponse(400, 'Assignment not submitted'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getSubmittedAssignments(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata, sub_id } = req.body
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const db_name = dbMetaDataInfo[0].db_name;
        const userContentCollectionName = dbMetaDataInfo[0].act_collection[0].name;
        const assignmentsData = await getSubmittedAssignmentList(db_name, userContentCollectionName, user_id, sub_id);
        if (assignmentsData.length) {
            for (let i = 0; i < assignmentsData.length; i++) {
                const userResult = await getUserNameProfImg(assignmentsData[i].user_id);
                const subRes = await getSubjectNames(assignmentsData[i].sub_id);
                assignmentsData[i]['_doc'].userName = userResult.length > 0 ? userResult[0].userdetails.disp_name : ""
                assignmentsData[i]['_doc'].profileImage = userResult.length > 0 ? userResult[0].personal_info.image : ""
                assignmentsData[i]['_doc'].subjectName = subRes.length > 0 ? subRes[0].name : ""
            }
            return res.status(200).send(new Status(200, assignmentsData));
        } else {
            return res.status(400).send(new APIResponse(400, 'Assignments not available'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function updateActorVideoComment(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, v_c_id, like, dlike, reply } = req.body
        const dbMetaDataInfo = await getDBMetaDataName(db_metadata);
        if (dbMetaDataInfo) {
            await updateVideoComment(dbMetaDataInfo.db_name, v_c_id, like, dlike, reply)
            let message: string;
            if (like) {
                message = 'Like added'
            } else if (dlike) {
                message = 'Dislike added'
            } else if (reply.length) {
                message = 'Reply added'
            } else {
                message = 'No activity added'
            }
            return res.status(200).send(new APIResponse(200, message));
        } else {
            return res.status(400).send(new APIResponse(400, 'Metadata not available'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function updateVideoCommentReply(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, v_c_id, reply_id, like, dlike, val } = req.body
        const dbMetaDataInfo = await getDBMetaDataName(db_metadata);
        if (dbMetaDataInfo) {
            await updateVideoCommentreply(dbMetaDataInfo.db_name, v_c_id, reply_id, like, dlike, val)
            let message: string;
            if (like) {
                message = 'Like added'
            } else if (dlike) {
                message = 'Dislike added'
            } else if (val) {
                message = 'Reply changed'
            } else {
                message = 'No activity added'
            }
            return res.status(200).send(new APIResponse(200, message));
        } else {
            return res.status(400).send(new APIResponse(400, 'Metadata not available'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function removeVideoCommentReply(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, v_c_id, reply_id } = req.body
        const dbMetaDataInfo = await getDBMetaDataName(db_metadata);
        if (dbMetaDataInfo) {
            await removeVideoCommentreply(dbMetaDataInfo.db_name, v_c_id, reply_id)
            return res.status(200).send(new APIResponse(200, 'Reply removed'));
        } else {
            return res.status(400).send(new APIResponse(400, 'Metadata not available'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function updateActorEContentComment(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, e_c_id, like, dlike, reply } = req.body
        const dbMetaDataInfo = await getDBMetaDataName(db_metadata);
        if (dbMetaDataInfo) {
            await updateEContentComment(dbMetaDataInfo.db_name, e_c_id, like, dlike, reply)
            let message: string;
            if (like) {
                message = 'Like added'
            } else if (dlike) {
                message = 'Dislike added'
            } else if (reply.length) {
                message = 'Reply added'
            } else {
                message = 'No activity added'
            }
            return res.status(200).send(new APIResponse(200, message));
        } else {
            return res.status(400).send(new APIResponse(400, 'Metadata not available'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function updateEContentCommentReply(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, e_c_id, reply_id, like, dlike, val } = req.body
        const dbMetaDataInfo = await getDBMetaDataName(db_metadata);
        if (dbMetaDataInfo) {
            await eContentCommentReply(dbMetaDataInfo.db_name, e_c_id, reply_id, like, dlike, val)
            let message: string;
            if (like) {
                message = 'Like added'
            } else if (dlike) {
                message = 'Dislike added'
            } else if (val) {
                message = 'Reply changed'
            } else {
                message = 'No activity added'
            }
            return res.status(200).send(new APIResponse(200, message));
        } else {
            return res.status(400).send(new APIResponse(400, 'Metadata not available'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function removeEContentCommentReply(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, e_c_id, reply_id } = req.body
        const dbMetaDataInfo = await getDBMetaDataName(db_metadata);
        if (dbMetaDataInfo) {
            await removeEContentCommentreply(dbMetaDataInfo.db_name, e_c_id, reply_id)
            return res.status(200).send(new APIResponse(200, 'Reply removed'));
        } else {
            return res.status(400).send(new APIResponse(400, 'Metadata not available'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function removeContentDoubt(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        if (dbMetaDataInfo) {
            const dbName = dbMetaDataInfo[0].db_name;
            const doubtsCollectionName = dbMetaDataInfo[0].act_collection[0].name;

            let activityDB_metadata = '27';
            const activityDBMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, activityDB_metadata);
            let actvityDBName = activityDBMetaDataInfo[0].db_name;
            let activityCollectionName = activityDBMetaDataInfo[0].act_collection[0].name;
            const doubtsCount = await decreaseCountForCollabration(dbName, doubtsCollectionName, actvityDBName, activityCollectionName, req.body)
            const deleteDoubts = await deleteDoubtByDoubtId(dbName, doubtsCollectionName, req.body);
            if (doubtsCount.modifiedCount === 1 && deleteDoubts.deletedCount === 1) {
                res.status(200).send(new ResponseWithObject(200, doubtsDeleteMsg, deleteDoubts));
            } else {
                res.status(200).send(new ResponseWithObject(200, "No Doubts were available to Delete"));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select at least one curriculum'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function removeDoubtReply(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.body.user_id, req.body.db_metadata);
        if (dbMetaDataInfo) {
            const dbName = dbMetaDataInfo[0].db_name;
            const doubtsCollectionName = dbMetaDataInfo[0].act_collection[0].name;

            const deleteReply: any = await deleteDoubtReplyByReplyId(dbName, doubtsCollectionName, req.body);
            if (deleteReply.modifiedCount === 1) {
                res.status(200).send(new ResponseWithObject(200, "Reply was deleted Successfully", deleteReply));
            } else {
                res.status(200).send(new ResponseWithObject(200, "No Replies were available to Delete"));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'Please select at least one curriculum'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getDoubtsWithOutLogin(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, subjectId, chapterId, topicId, searchText } = req.body;
        const doubtsReqObj = { db_metadata, subjectId, chapterId, topicId, searchText }
        const dbMetaDataInfo = await getdoubtDBMetaDataName(doubtsReqObj.db_metadata);
        if (dbMetaDataInfo) {
            const doubtsData = await getDoubts(dbMetaDataInfo.db_name, doubtsReqObj)
            for (let i = 0; i < doubtsData.length; i++) {
                const userResult = await getUserNameProfImg(doubtsData[i].user_id);
                const subRes = await getSubjectNames(doubtsData[i].sub_id);
                const topicResult = await getTopicNames(doubtsData[i].sub_id, doubtsData[i].chapter_id, doubtsData[i].t_id);
                doubtsData[i]['_doc'].profileImage = userResult.length > 0 ? userResult[0].personal_info.image : ""
                doubtsData[i]['_doc'].userName = userResult.length > 0 ? userResult[0].userdetails.disp_name : ""
                doubtsData[i]['_doc'].subjectName = subRes.length > 0 ? subRes[0].name : ""
                doubtsData[i]['_doc'].chapName = topicResult.length > 0 ? topicResult[0].chapter.name : ""
                doubtsData[i]['_doc'].topicName = topicResult.length > 0 ? topicResult[0].chapter.topics.name : ""

                const replyArray = doubtsData[i].reply;
                for (let i = 0; i < replyArray.length; i++) {
                    const replyUserData = await getUserNameProfImg(replyArray[i].user_id);
                    replyArray[i].profileImage = replyUserData.length > 0 ? replyUserData[0].personal_info.image : ""
                    replyArray[i].userName = replyUserData.length > 0 ? replyUserData[0].userdetails.disp_name : ""
                }
            }
            if (doubtsData.length === 0) {
                return res.status(400).send(new APIResponse(400, noDoubtsAvail));
            } else {
                return res.status(200).send(new ResponseWithObject(200, "Success", doubtsData));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'Internal server error'));
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function addGmailContacts(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata, contacts } = req.body;
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo.length) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        }
        const db_name = dbMetaDataInfo[0].db_name;
        const userContentCollectionName = dbMetaDataInfo[0].act_collection[0].name;
        const gmailContacts = await saveGmailContacts(db_name, userContentCollectionName, user_id, contacts);
        if (gmailContacts) {
            return res.status(200).send(new APIResponse(200, 'Gmail contacts added'));
        } else {
            return res.status(400).send(new APIResponse(400, 'Gmail contacts not added'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getConnections(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata } = req.body;
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (dbMetaDataInfo.length) {
            const db_name = dbMetaDataInfo[0].db_name;
            const collection_name = dbMetaDataInfo[0].act_collection[0].name;
            let contacts = await getContacts(db_name, collection_name, user_id);
            if (contacts) {
                for (let i = 0; i < contacts.circle.length; i++) {
                    const userResult = await getUserNameProfImg(contacts.circle[i].user_c_id);
                    contacts.circle[i]['_doc'].userName = userResult.length > 0 ? userResult[0].userdetails.disp_name : ""
                    contacts.circle[i]['_doc'].profileImage = userResult.length > 0 ? userResult[0].personal_info.image : ""
                    contacts.circle[i]['_doc'].email = userResult.length > 0 ? userResult[0].userdetails.email : ""
                }
                return res.status(200).send(new ResponseWithObject(200, "done", contacts));
            } else {
                return res.status(400).send(new APIResponse(400, 'Contacts not available'));
            }
        } else {
            return res.status(400).send(new APIResponse(400, 'Metadata not configured'));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function createStudyPlan(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.query.userId, req.query.db_metadata);
        const dbName = dbMetaDataInfo[0].db_name;
        const collectionName = dbMetaDataInfo[0].act_collection[0].name;
        const addStudyPlan = await newStudyPlan(dbName, collectionName, req.body);
        if (addStudyPlan.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, addStudyPlan.message, addStudyPlan.data));
        } else {
            return res.status(400).send(new APIResponse(400, addStudyPlan.message));
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function getUserStudyPlan(req: Request, res: Response, next: NextFunction) {
    try {
        const dbMetaDataInfo = await findDbMetaDataDetails(req.query.userId, req.query.db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, 'Meta Data is not available'));
        } else {
            const dbName = dbMetaDataInfo[0].db_name;
            const collectionName = dbMetaDataInfo[0].act_collection[0].name;
            const userStudyPlan = await getStudyPlan(dbName, collectionName, req.body);
            const frequency = userStudyPlan.freq;
            const planner = userStudyPlan.plan;
            for (let i = 0; i < frequency.length; i++) {
                const subjectNames = await getSubjectDetails(frequency[i].sub_id);
                const startDayName = epochToDayName(frequency[i].str_on);
                const endDayName = epochToDayName(frequency[i].end_on);
                const strDay = startDayName.split(',')[0].trim();
                const endOnDay = endDayName.split(',')[0].trim();
                frequency[i]['_doc'].subName = subjectNames.length > 0 ? subjectNames[0].name : ""
                frequency[i]['_doc'].startDay = strDay.length > 0 ? strDay : ""
                frequency[i]['_doc'].endDay = endOnDay.length > 0 ? endOnDay : ""
            }
            frequency.forEach(freq => {
                freq.str_on = epochToHumanReadable(freq.str_on)
                freq.end_on = epochToHumanReadable(freq.end_on)
            });
            for( let i = 0; i < planner.length; i++ ){
                planner[i]['_doc'].date = epochToHumanReadable(planner[i].date);
                const timeSlot = planner[i].t_slot;
                for (let j = 0; j < timeSlot.length; j++) {
                    const subjectNames = await getSubjectDetails(timeSlot[j].sub_id);
                    timeSlot[j]['_doc'].subName = subjectNames.length > 0 ? subjectNames[0].name : ""
                }
            }
            userStudyPlan.created_ts = epochToHumanReadable(userStudyPlan.created_ts)
            if (userStudyPlan) {
                return res.status(200).send(new ResponseWithObject(200, "StudyPlan is available", userStudyPlan));
            } else {
                return res.status(400).send(new APIResponse(400, noStudyPlanAvail));
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function userBySubjectCollabarations(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, user_id, sub_id } = req.body;
        const metaDataDBName = await getDBMetaDataName(db_metadata);
        if (!metaDataDBName) {
            return res.status(400).send(new APIResponse(400, noMetaDataAvail));
        }
        const userCollabarations = await userSubjectCollabarations(metaDataDBName.db_name, user_id, sub_id);
        if (userCollabarations.length) {
            return res.status(200).send(new Status(200, userCollabarations));
        } else {
            return res.status(400).send(new APIResponse(400, noDataAvail));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}

export async function updateCollabarationStatusByUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { db_metadata, user_id, collabaration_id, status } = req.body;
        const metaDataDBName = await getDBMetaDataName(db_metadata);
        if (!metaDataDBName) {
            return res.status(400).send(new APIResponse(400, noMetaDataAvail));
        }
        const updateStatus: any = await updateCollabarationStatus(metaDataDBName.db_name, user_id, collabaration_id, status);
        if (updateStatus && updateStatus.status == 200) {
            return res.status(200).send(new APIResponse(200, updateStatus.message));
        } else {
            return res.status(400).send(new APIResponse(400, updateStatus.message));
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, 'Internal Server Error'));
    }
}