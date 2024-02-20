import mongoose, { Mongoose } from 'mongoose';
import moment from 'moment';
import lodash from 'lodash';
import {
    userProfile, metaDbConnetion, contentLikeDislike, videoLikeDislike, revisionlikeDislike, contentNote,
    eContentFeedback, videoFeedback, actorDBMetaData, contentDBConnetion, videoNote,
    lookUpMasterSchema, eContentComment, videoComment, userDetail, videoTLine, classTest, practiceTest, classTestAnswer,
    contentDoubt, collabaration, collabarationTasks, assignmentEnglish, assignmentSubmission, sub_chapter,
    subject,
    currActivitySummary, userConnection, studyPlan
} from '../dbmanager/dbconnection';
import {
    primaryConnection
} from '../dbmanager/languagesDBSchemas/vridheeCurriculumEnglish/dbconnection'
import {
    hindiDBURL
} from '../dbmanager/languagesDBSchemas/vridheeCurriculumHindi/dbconnection'
import { epochToDate } from '../utils/epochToDate';
import { shortHandCollectionName } from '../utils/shortHandCollectionName';
const { ObjectId } = require('mongodb');
import { findUserDetails } from '../utils/getUserNames';
import { configData } from '../utils/config';
import { questionBankCollections } from '../utils/questionBankCollections';
import { findChapterNameTopicName } from './findChapterTopic';
import { getLookup } from './curriculumSubjectsService';
import { NOT_UPDATED, UPDATED, noDataAvail } from '../utils/errormsg';

let languageDBURL = primaryConnection ? primaryConnection : hindiDBURL;
// import { metaDbConnetion } from '../dbmanager/actorDBSchemas/userActivity/userActivityDbConnection'
// const { ObjectId } = require('mongodb');


export const findDbMetaDataDetails = async (profileId, dbMetaData) => {
    try {
        const objectId = new mongoose.Types.ObjectId(profileId);

        const dbMetadataInfo = await userProfile.aggregate([
            {
                $match: {
                    "user_id": objectId
                }
            },
            {
                $project: {
                    "_id": 0,
                    "db_metadata": {
                        $filter: {
                            input: "$db_metadata",
                            as: "metadata",
                            cond: { $eq: ["$$metadata.db_id", +dbMetaData] }
                        }
                    }
                }
            },
            { $unwind: "$db_metadata" },
            {
                $lookup: {
                    from: "act_db_metadata",
                    localField: "db_metadata.db_id",
                    foreignField: "db_id",
                    as: "relatedData"
                }
            },
            {
                $unwind: "$relatedData"
            },
            {
                $project: {
                    "relatedData._id": 1,
                    "relatedData.db_name": 1,
                    "relatedData.db_id": 1,
                    "relatedData.act_collection": {
                        $filter: {
                            input: "$relatedData.act_collection",
                            as: "mdata",
                            // cond: { $eq: ["$$mdata._id", new mongoose.Types.ObjectId("$db_metadata.collection_id")] }
                            cond: { $eq: ["$$mdata._id", { $toObjectId: "$db_metadata.collection_id" }] }
                        }
                    }
                }
            },
            {
                $unwind: { path: "$relatedData.act_collection", preserveNullAndEmptyArrays: true }
            },
            {
                $group: {
                    _id: "$relatedData._id",
                    db_name: { $first: "$relatedData.db_name" },
                    db_id: { $first: "$relatedData.db_id" },
                    act_collection: { $push: "$relatedData.act_collection" }
                }
            }
        ]);

        // Check if any data is found
        if (!dbMetadataInfo || dbMetadataInfo.length === 0) {
            throw new Error('No data found');
        }
        return dbMetadataInfo;
    } catch (error) {
        // Log the error for debugging purposes
        console.error(`Error in findDbMetaDataDetails: ${error.message}`);

        // Rethrow the error to propagate it to the calling function
        throw new Error(`findDbMetaDataDetails: ${error.message}`);
    }
};

//Get collection name of languages database from lookupmaster to update ttl_count.
export const getLookUpMasterData = async (contentTypeId, levelId) => {
    try {
        const lookupinfo = await lookUpMasterSchema.aggregate([
            {
                $match: {
                    "name": { $in: ["content_type", "level"] }
                }
            },
            {
                $unwind: "$data"
            },
            {
                $match: {
                    "data.id": { $in: [contentTypeId, levelId] }
                }
            },
            {
                $project: { "_id": 0, "name": 1, "data.id": 1, "data.val": 1 }
            }
        ])

        // Check if any data is found
        if (!lookupinfo || lookupinfo.length === 0) {
            throw new Error('No data found from lookup Master');
        }

        return lookupinfo;
    } catch (error) {
        // Log the error for debugging purposes
        console.error(`Error in getLookUpMasterData: ${error.message}`);

        // Rethrow the error to propagate it to the calling function
        throw new Error(`getLookUpMasterData: ${error.message}`);
    }
}

export const contentLikeDislikeActivity = async (dbName, collection_name, contentLikeDislikeinfo) => {
    await metaDbConnetion(dbName, collection_name);
    //contentLikeDislike Activity;
    let filter = {
        "t_id": contentLikeDislikeinfo.t_id,
        "user_id": contentLikeDislikeinfo.user_id,
        "content_type_id": contentLikeDislikeinfo.content_type_id,
        "level_id": contentLikeDislikeinfo.level_id,
        "content_level_object_id": contentLikeDislikeinfo.content_level_object_id
    };
    let contentLikeDislikeActivity: any;
    try {

        contentLikeDislikeActivity = await contentLikeDislike.findOneAndUpdate(
            filter,
            {
                $set: {
                    "t_id": contentLikeDislikeinfo.t_id,
                    "user_id": contentLikeDislikeinfo.user_id,
                    "sts": contentLikeDislikeinfo.sts,
                    "content_type_id": contentLikeDislikeinfo.content_type_id, //lookup collection
                    "level_id": contentLikeDislikeinfo.level_id, //lookup collection
                    "content_level_object_id": contentLikeDislikeinfo.content_level_object_id
                }
            },
            { upsert: true, new: true }
        )

        // Check if any data is found
        if (!contentLikeDislikeActivity || contentLikeDislikeActivity.length === 0) {
            throw new Error('Something went wrong');
        }

        return contentLikeDislikeActivity;
    } catch (error) {
        throw Error('contentLikeDislikeActivity: ' + error.message)
    }
}

export const videoLikeDislikeActivity = async (dbName, collection_name, videoLikeDislikeinfo) => {
    await metaDbConnetion(dbName, collection_name);
    let filter = {
        "t_id": videoLikeDislikeinfo.t_id,
        "user_id": videoLikeDislikeinfo.user_id,
        "video_id": videoLikeDislikeinfo.video_id
    };
    let videoLikeDislikeActivity: any;
    try {

        videoLikeDislikeActivity = await videoLikeDislike.findOneAndUpdate(
            filter,
            {
                $set: {
                    "t_id": videoLikeDislikeinfo.t_id,
                    "user_id": videoLikeDislikeinfo.user_id,
                    "sts": videoLikeDislikeinfo.sts,
                    "video_id": videoLikeDislikeinfo.video_id //lookup collection
                }
            },
            { upsert: true, new: true }
        )

        // Check if any data is found
        if (!videoLikeDislikeActivity || videoLikeDislikeActivity.length === 0) {
            throw new Error('Something went wrong');
        }

        return videoLikeDislikeActivity;
    } catch (error) {
        throw Error('videoLikeDislikeActivity: ' + error.message)
    }
}

// Find Total count for update user like or dislike activity
export const findTtlCnt = async (languageCName, t_id, contentId) => {
    const schema = new mongoose.Schema({}, { strict: false });
    let modelName = primaryConnection.model(languageCName, schema, languageCName);
    const filter = {
        "t_id": t_id,
        "data._id": new ObjectId(contentId)
    };
    try {
        const getCount = await modelName.aggregate([
            {
                $match: filter
            },
            {
                $unwind: "$data"
            },
            {
                $match: {
                    "data._id": new ObjectId(contentId)
                }
            },
            {
                $project: {
                    "_id": 0,
                    "t_id": 1,
                    "content_id": "$data._id",
                    "count": "$data.ttl_cnt"
                }
            }
        ])
        return getCount;
    } catch (error) {
        throw new Error(">> :" + error.message)
    }
}

//Update user like or dislike activity
export const updatettlCount = async (updatettlCnt) => {
    const schema = new mongoose.Schema({}, { strict: false });
    let modelName = primaryConnection.model(updatettlCnt.languageCName, schema, updatettlCnt.languageCName);
    //Update ttl count
    let filter = {
        "t_id": updatettlCnt.t_id,
        "data._id": new ObjectId(updatettlCnt._id)
    };
    let updateCount: any;
    try {

        updateCount = await modelName.findOneAndUpdate(
            filter,
            {
                $set: {
                    "data.$.ttl_cnt.like": updatettlCnt.ttl_cnt.like,
                    "data.$.ttl_cnt.dlike": updatettlCnt.ttl_cnt.dislike,
                    "data.$.ttl_cnt.comment": updatettlCnt.ttl_cnt.comment
                }
            },
            { upsert: true, new: true }
        )
        // Check if any data is found
        if (!updateCount || updateCount.length === 0) {
            throw new Error('Something went wrong');
        }

        return updateCount;
    } catch (error) {
        throw Error('updateCount : ' + error.message)
    }
}

export const likeDislikeActivity = async (dbName, collection_name, likeDinfo) => {
    await metaDbConnetion(dbName, collection_name);
    //like dislike Activity
    let filter = {
        "t_id": likeDinfo.t_id,
        "user_id": likeDinfo.user_id
    };
    let lDActivity: any;
    try {

        lDActivity = await revisionlikeDislike.findOneAndUpdate(
            filter,
            {
                $set: {
                    "t_id": likeDinfo.t_id,
                    "user_id": likeDinfo.user_id,
                    "sts": likeDinfo.sts
                }
            },
            { upsert: true, new: true }
        )

        // Check if any data is found
        if (!lDActivity || lDActivity.length === 0) {
            throw new Error('Something went wrong');
        }
        // const lDCounts = await likeDislikeCount(likeDislikeActivity);

        return lDActivity;
    } catch (error) {
        throw Error('revisionlikeDislike Activity: ' + error.message)
    }
}

// export const likeDislikeCount = async (textInfo) => {

//     let match = {
//         "t_id": textInfo.t_id,
//         "content_type_id": textInfo.content_type_id,
//         "level_id": textInfo.level_id
//     };
//     let lDCount: any;
//     try {

//         lDCount = await contentLikeDislike.aggregate([
//             {
//                 $match: match
//             },
//             {
//                 $group: {
//                     _id: {
//                         $cond: {
//                             if: { $eq: ["$sts", 2] }, // 2 for dislike
//                             then: "dislike",
//                             else: {
//                                 $cond: {
//                                     if: { $eq: ["$sts", 1] }, //1 for like
//                                     then: "like",
//                                     else: "unknown"
//                                 }
//                             }
//                         }
//                     },
//                     count: { $sum: 1 }
//                 }
//             }
//         ])

//         return lDCount;
//     } catch (error) {
//         throw Error('likeDislikeCount: ' + error.message)
//     }
// }

export const noteActivity = async (dbName, collection_name, noteInfo) => {
    await metaDbConnetion(dbName, collection_name);
    try {
        if (!noteInfo.noteId) {
            const noteActivity = await contentNote.create(
                {
                    "t_id": noteInfo.t_id,
                    "user_id": noteInfo.user_id,
                    "n_text": noteInfo.n_text
                }
            )
            return noteActivity;
        } else {
            let filter = {
                "_id": new mongoose.Types.ObjectId(noteInfo.noteId),
                "t_id": noteInfo.t_id,
                "user_id": noteInfo.user_id
            };
            const noteActivity = await contentNote.findOneAndUpdate(
                filter,
                {
                    $set: {
                        "t_id": noteInfo.t_id,
                        "user_id": noteInfo.user_id,
                        "n_text": noteInfo.n_text
                    }
                }, { upsert: true, new: true }
            )
            return noteActivity;
        }
    } catch (error) {
        throw Error('noteActivity: ' + error.message)
    }
}

export const eContentFeedBack = async (dbName, collectionName, feedbackInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        if (!feedbackInfo.c_f_id) {
            const feedback = await eContentFeedback.create(
                {
                    "t_id": feedbackInfo.t_id,
                    "user_id": feedbackInfo.user_id,
                    "f_text": feedbackInfo.f_text,
                    "rat": feedbackInfo.rat,
                    "content_type_id": feedbackInfo.content_type_id,
                    "level_id": feedbackInfo.level_id
                }
            )
            return feedback;
        } else {
            let filter = {
                "t_id": feedbackInfo.t_id,
                "user_id": feedbackInfo.user_id,
                "content_type_id": feedbackInfo.content_type_id,
                "level_id": feedbackInfo.level_id,
                "_id": new mongoose.Types.ObjectId(feedbackInfo.c_f_id),
            };
            const feedback = await eContentFeedback.findOneAndUpdate(
                filter,
                {
                    $set: {
                        "t_id": feedbackInfo.t_id,
                        "user_id": feedbackInfo.user_id,
                        "f_text": feedbackInfo.f_text,
                        "rat": feedbackInfo.rat,
                        "content_type_id": feedbackInfo.content_type_id,
                        "level_id": feedbackInfo.level_id
                    }
                },
                { upsert: true, new: true }
            )
            return feedback;
        }

    } catch (error) {
        throw Error('feedback: ' + error.message)
    }
}

export const videoFeedBack = async (dbName, collectionName, feedbackInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        if (!feedbackInfo.v_f_id) {
            const feedback = await videoFeedback.create(
                {
                    "t_id": feedbackInfo.t_id,
                    "v_id": feedbackInfo.v_id,
                    "user_id": feedbackInfo.user_id,
                    "f_text": feedbackInfo.f_text,
                    "rat": feedbackInfo.rat,
                }
            )
            return feedback;
        } else {
            const filter = {
                "_id": new mongoose.Types.ObjectId(feedbackInfo.v_f_id),
                "t_id": feedbackInfo.t_id,
                "v_id": feedbackInfo.v_id,
                "user_id": feedbackInfo.user_id
            };
            const feedback = await videoFeedback.findOneAndUpdate(
                filter,
                {
                    $set: {
                        "t_id": feedbackInfo.t_id,
                        "v_id": feedbackInfo.v_id,
                        "user_id": feedbackInfo.user_id,
                        "f_text": feedbackInfo.f_text,
                        "rat": feedbackInfo.rat
                    }
                },
                { upsert: true, new: true }
            )
            return feedback;
        }
    } catch (error) {
        throw Error('feedback: ' + error.message)
    }
}

export const getNote = async (dbName, collectionName, noteInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const note = await contentNote.find({
            "t_id": noteInfo.t_id,
            "user_id": noteInfo.user_id
        })
        return note;
    } catch (error) {
        throw Error('getNote: ' + error.message)
    }
}

export const getDBMetaDataName = async (db_metadata) => {
    return await actorDBMetaData.findOne({ db_id: +db_metadata }, { db_id: 1, db_name: 1 })
}

export const geteContentFeedBackList = async (dbName, t_id, content_type_id, level_id) => {
    let dbConnection = await contentDBConnetion(dbName);
    let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
    const schema = new mongoose.Schema({}, { strict: false });
    let feedbackDocs = [];
    for (let collection of collectionList) {
        let modelName = dbConnection.model(collection.name, schema, collection.name);
        let feedbackDoc = await modelName.find({
            t_id, content_type_id, level_id
        })
        if (feedbackDoc.length) {
            feedbackDocs = [...feedbackDocs, ...feedbackDoc]
        }
    }
    for (let i = 0; i < feedbackDocs.length; i++) {
        let user = await userDetail.find({ _id: new mongoose.Types.ObjectId(feedbackDocs[i].user_id) }, { disp_name: 1 });
        if (user.length) {
            feedbackDocs[i]['_doc'].user_name = user[0].disp_name
        } else {
            feedbackDocs[i]['_doc'].user_name = ""
        }
        feedbackDocs[i]['_doc'].c_ts = await epochToDate(feedbackDocs[i].c_ts)
    }
    return feedbackDocs;
}

export const getVideoFeedBackList = async (dbName, t_id, v_id) => {
    let dbConnection = await contentDBConnetion(dbName);
    let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
    const schema = new mongoose.Schema({}, { strict: false });
    let feedbackDocs = [];
    for (let collection of collectionList) {
        let modelName = dbConnection.model(collection.name, schema, collection.name);
        let feedbackDoc = await modelName.find({
            t_id, v_id
        })
        if (feedbackDoc.length) {
            feedbackDocs = [...feedbackDocs, ...feedbackDoc]
        }
    }
    for (let i = 0; i < feedbackDocs.length; i++) {
        let user = await userDetail.find({ _id: new mongoose.Types.ObjectId(feedbackDocs[i].user_id) }, { disp_name: 1 });
        if (user.length) {
            feedbackDocs[i]['_doc'].user_name = user[0].disp_name
        } else {
            feedbackDocs[i]['_doc'].user_name = ""
        }
        feedbackDocs[i]['_doc'].c_ts = await epochToDate(feedbackDocs[i].c_ts)
    }
    return feedbackDocs;
}

export const addVideoNote = async (dbName, collection_name, noteInfo) => {
    await metaDbConnetion(dbName, collection_name);
    try {
        if (!noteInfo.noteId) {
            const createNote = await videoNote.create(
                {
                    "t_id": noteInfo.t_id,
                    "user_id": noteInfo.user_id,
                    "n_text": noteInfo.n_text
                }
            )
            return createNote;
        } else {
            let filter = {
                "_id": new mongoose.Types.ObjectId(noteInfo.noteId),
                "t_id": noteInfo.t_id,
                "user_id": noteInfo.user_id
            };
            const updateNote = await videoNote.findOneAndUpdate(
                filter,
                {
                    $set: {
                        "t_id": noteInfo.t_id,
                        "user_id": noteInfo.user_id,
                        "n_text": noteInfo.n_text
                    }
                }, { upsert: true, new: true }
            )
            return updateNote;
        }
    } catch (error) {
        throw Error('addVideoNote: ' + error.message)
    }
}

export const getVideo = async (dbName, collectionName, noteInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const note = await videoNote.find({
            "t_id": noteInfo.t_id,
            "user_id": noteInfo.user_id
        })
        return note;
    } catch (error) {
        throw Error('getVideoNote: ' + error.message)
    }
}

export const deleteVideo = async (dbName, collectionName, noteInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const note = await videoNote.deleteOne({
            "_id": new mongoose.Types.ObjectId(noteInfo.noteId),
            "t_id": noteInfo.t_id,
            "user_id": noteInfo.user_id
        })
        return note;
    } catch (error) {
        throw Error('deleteVideo: ' + error.message)
    }
}

export const deleteNote = async (dbName, collectionName, noteInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const note = await contentNote.deleteOne({
            "_id": new mongoose.Types.ObjectId(noteInfo.noteId),
            "t_id": noteInfo.t_id,
            "user_id": noteInfo.user_id
        })
        return note;
    } catch (error) {
        throw Error('deleteNote: ' + error.message)
    }
}

export const addEContentComment = async (dbName, collectionName, commentInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        if (!commentInfo.c_c_id) {
            const comment = await eContentComment.create(
                {
                    "t_id": commentInfo.t_id,
                    "user_id": commentInfo.user_id,
                    "content_type_id": commentInfo.content_type_id,
                    "level_id": commentInfo.level_id,
                    "c_text": commentInfo.c_text,
                }
            )
            return comment;
        } else {
            const filter = {
                "_id": new mongoose.Types.ObjectId(commentInfo.c_c_id),
                "t_id": commentInfo.t_id,
                "user_id": commentInfo.user_id,
                "content_type_id": commentInfo.content_type_id,
                "level_id": commentInfo.level_id
            };
            const comment = await eContentComment.findOneAndUpdate(
                filter,
                {
                    $set: {
                        "t_id": commentInfo.t_id,
                        "user_id": commentInfo.user_id,
                        "content_type_id": commentInfo.content_type_id,
                        "level_id": commentInfo.level_id,
                        "c_text": commentInfo.c_text,
                    }
                },
                { upsert: true, new: true }
            )
            return comment;
        }

    } catch (error) {
        throw Error('comment: ' + error.message)
    }
}

export const addVideoComment = async (dbName, collectionName, commentInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        if (!commentInfo.v_c_id) {
            let comment = await videoComment.create(
                {
                    "t_id": commentInfo.t_id,
                    "user_id": commentInfo.user_id,
                    "v_id": commentInfo.v_id,
                    "c_text": commentInfo.c_text,
                },
            )
            return comment;
        } else {
            let filter = {
                "_id": new mongoose.Types.ObjectId(commentInfo.v_c_id),
                "t_id": commentInfo.t_id,
                "user_id": commentInfo.user_id,
                "v_id": commentInfo.v_id
            };
            let comment = await videoComment.findOneAndUpdate(
                filter,
                {
                    $set: {
                        "t_id": commentInfo.t_id,
                        "user_id": commentInfo.user_id,
                        "v_id": commentInfo.v_id,
                        "c_text": commentInfo.c_text,
                    }
                },
                { upsert: true, new: true }
            )
            return comment;
        }
    } catch (error) {
        throw Error('video comment: ' + error.message)
    }
}

export const getVideoCommentList = async (dbName, t_id, v_id) => {
    let dbConnection = await contentDBConnetion(dbName);
    let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
    const schema = new mongoose.Schema({}, { strict: false });
    let commentDocs = [];
    for (let collection of collectionList) {
        let modelName = dbConnection.model(collection.name, schema, collection.name);
        let commentDoc = await modelName.find({
            t_id, v_id
        })
        if (commentDoc.length) {
            commentDocs = [...commentDocs, ...commentDoc]
        }
    }
    let userId = []
    for (let doc of commentDocs) {
        userId.push(doc.user_id)
        for (let replyObj of doc.reply) {
            userId.push(replyObj.ref_c_user_id)
        }
    }
    const userDetails = await findUserDetails(userId);
    for (let i = 0; i < commentDocs.length; i++) {
        let user = userDetails.find(item => item._id == commentDocs[i].user_id)
        if (user) {
            commentDocs[i]['_doc'].user_name = user.disp_name;
        } else {
            commentDocs[i]['_doc'].user_name = "";
        }
        for (let j = 0; j < commentDocs[i].reply.length; j++) {
            let refUser = userDetails.find(item => item._id == commentDocs[i].reply[j].ref_c_user_id);
            if (refUser) {
                commentDocs[i]['_doc'].reply[j].user_name = refUser.disp_name;
            } else {
                commentDocs[i]['_doc'].reply[j].user_name = "";
            }
        }
    }
    return commentDocs;
}

export const geteContentCommentList = async (dbName: string, t_id: string, content_type_id: string, level_id: string) => {
    let dbConnection = await contentDBConnetion(dbName);
    let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
    const schema = new mongoose.Schema({}, { strict: false });
    let commentDocs = [];
    for (let collection of collectionList) {
        let modelName = dbConnection.model(collection.name, schema, collection.name);
        let commentDoc = await modelName.find({
            t_id, content_type_id, level_id
        })
        if (commentDoc.length) {
            commentDocs = [...commentDocs, ...commentDoc]
        }
    }
    let userId = []
    for (let doc of commentDocs) {
        userId.push(doc.user_id)
        for (let replyObj of doc.reply) {
            userId.push(replyObj.ref_c_user_id)
        }
    }
    const userDetails = await findUserDetails(userId);
    for (let i = 0; i < commentDocs.length; i++) {
        let user = userDetails.find(item => item._id == commentDocs[i].user_id)
        if (user) {
            commentDocs[i]['_doc'].user_name = user.disp_name;
        } else {
            commentDocs[i]['_doc'].user_name = "";
        }
        for (let j = 0; j < commentDocs[i].reply.length; j++) {
            let refUser = userDetails.find(item => item._id == commentDocs[i].reply[j].ref_c_user_id);
            if (refUser) {
                commentDocs[i]['_doc'].reply[j].user_name = refUser.disp_name;
            } else {
                commentDocs[i]['_doc'].reply[j].user_name = "";
            }
        }
    }
    return commentDocs;
}

export const removeActorvideoFeedback = async (dbName: string, collectionName: string, v_f_id: string, user_id: string) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const feedback = await videoFeedback.deleteOne({
            "_id": new mongoose.Types.ObjectId(v_f_id),
            "user_id": user_id
        })
        return feedback;
    } catch (error) {
        throw Error('feedback: ' + error.message)
    }
}

export const removeActorvideocomment = async (dbName: string, collectionName: string, v_c_id: string, user_id: string) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const comment = await videoComment.deleteOne({
            "_id": new mongoose.Types.ObjectId(v_c_id),
            "user_id": user_id
        })
        return comment;
    } catch (error) {
        throw Error('comment: ' + error.message)
    }
}

export const removeActorecontentFeedback = async (dbName: string, collectionName: string, c_f_id: string, user_id: string) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const feedback = await eContentFeedback.deleteOne({
            "_id": new mongoose.Types.ObjectId(c_f_id),
            "user_id": user_id
        })
        return feedback;
    } catch (error) {
        throw Error('feedback: ' + error.message)
    }
}

export const removeActorecontentComment = async (dbName: string, collectionName: string, e_c_id: string, user_id: string) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const comment = await eContentComment.deleteOne({
            "_id": new mongoose.Types.ObjectId(e_c_id),
            "user_id": user_id
        })
        return comment;
    } catch (error) {
        throw Error('comment: ' + error.message)
    }
}

export const videoTLineActivity = async (dbName, collection_name, vTLinereq) => {

    await metaDbConnetion(dbName, collection_name);
    let filter = {
        "t_id": vTLinereq.t_id,
        "user_id": vTLinereq.user_id,
        "video_id": vTLinereq.video_id,
        "f_ts": vTLinereq.f_ts
    };
    let vTLineActivity: any;
    try {

        vTLineActivity = await videoTLine.findOneAndUpdate(
            filter,
            {
                $set: {
                    "name": vTLinereq.name, //user name / learner name
                    "t_id": vTLinereq.t_id,
                    "user_id": vTLinereq.user_id,
                    "sts": vTLinereq.sts,
                    "f_ts": vTLinereq.f_ts,
                    "video_id": vTLinereq.video_id //lookup collection
                }
            },
            { upsert: true, new: true }
        )

        // Check if any data is found
        if (!vTLineActivity || vTLineActivity.length === 0) {
            throw new Error('Something went wrong');
        }

        return vTLineActivity;
    } catch (error) {
        throw Error('vTLineActivity: ' + error.message)
    }
}

export const getVideoTLine = async (dbName, collectionName, getVTLInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const VideoTLRes = await videoTLine.find({
            "t_id": getVTLInfo.t_id,
            "user_id": getVTLInfo.user_id,
            "video_id": getVTLInfo.video_id
        })
        return VideoTLRes;
    } catch (error) {
        throw Error('getVideoTLine: ' + error.message)
    }
}

export const timeLineUpdate = async (dbName, collection_name, vTLinereq) => {

    await metaDbConnetion(dbName, collection_name);
    let filter = {
        // "t_id": vTLinereq.t_id,
        // "user_id": vTLinereq.user_id,
        // "video_id": vTLinereq.video_id,
        "_id": new ObjectId(vTLinereq.time_line_id)
    };
    let vTLineActivity: any;
    try {

        vTLineActivity = await videoTLine.findOneAndUpdate(
            filter,
            {
                $set: {
                    // "sts": vTLinereq.sts,
                    "f_ts": vTLinereq.f_ts
                }
            },
            { new: true }
        )

        // Check if any data is found
        if (!vTLineActivity || vTLineActivity.length === 0) {
            throw new Error('Something went wrong');
        }

        return vTLineActivity;
    } catch (error) {
        throw Error('vTLineActivity: ' + error.message)
    }
}

//Delete Video Time Line in t_line array based upon the filter.
export const deleteVideoTLine = async (dbName, collection_name, vTLinereq) => {
    await metaDbConnetion(dbName, collection_name);
    try {
        const timeLine = await videoTLine.deleteOne({
            "_id": new mongoose.Types.ObjectId(vTLinereq.time_line_id)
        })
        return timeLine;
    } catch (error) {
        throw Error('timeLine: ' + error.message)
    }
};

export const addclassTest = async (dbName: string, collectionName: string, classTestInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        if (!classTestInfo.c_t_id) {
            let classTestObj = await classTest.create(classTestInfo)
            return classTestObj;
        } else {
            let filter = {
                "_id": new mongoose.Types.ObjectId(classTestInfo.c_t_id),
                "mnt_user_id": classTestInfo.mnt_user_id,
                "sub_id": classTestInfo.sub_id
            };
            let classTestObj = await classTest.findOneAndUpdate(
                filter,
                {
                    $set: {
                        "name": classTestInfo.name,
                        "ques_sheet": classTestInfo.ques_sheet,
                        "ttl_marks": classTestInfo.ttl_marks,
                        "ttl_exp_dur": classTestInfo.ttl_exp_dur
                    }
                },
                { upsert: true, new: true }
            )
            return classTestObj;
        }
    } catch (error) {
        throw Error('classTestObj: ' + error.message)
    }
}

export const addpracticeTest = async (dbName: string, collectionName: string, practiceTestInfo, subject) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        if (!practiceTestInfo.p_t_id) {
            let practiceTestObj = await practiceTest.create(practiceTestInfo);
            const testDetails = await getpracticeTestInfo(dbName, collectionName, practiceTestInfo.user_id, practiceTestInfo.sub_id,
                practiceTestInfo.t_id, practiceTestObj._id.toString());
            if (testDetails.score > subject.rating) {
                let summaryDBMetaDataInfo = await findDbMetaDataDetails(practiceTestInfo.user_id, 27);
                const summDBName = summaryDBMetaDataInfo[0].db_name;
                const summCollectionName = summaryDBMetaDataInfo[0].act_collection[0].name;
                await metaDbConnetion(summDBName, summCollectionName);
                await currActivitySummary.updateOne(
                    {
                        "user_id": practiceTestInfo.user_id,
                        "sub_id": practiceTestInfo.sub_id,
                        "data.chap_id": practiceTestInfo.chap_id,
                        "data.t_data.t_id": practiceTestInfo.t_id
                    },
                    {
                        $set: {
                            "data.$.t_data.$[elem].t_sts": 2,
                        }
                    },
                    {
                        arrayFilters: [
                            { "elem.t_id": practiceTestInfo.t_id }
                        ]
                    }
                )
            }
            return practiceTestObj;
        } else {
            let filter = {
                "_id": new mongoose.Types.ObjectId(practiceTestInfo.p_t_id),
                "user_id": practiceTestInfo.user_id,
                "sub_id": practiceTestInfo.sub_id,
                "t_id": practiceTestInfo.t_id
            };
            let practiceTestObj = await practiceTest.findOneAndUpdate(
                filter,
                {
                    $set: {
                        "ans_sheet": practiceTestInfo.ans_sheet,
                        "ttl_marks": practiceTestInfo.ttl_marks,
                        "ttl_std_marks": practiceTestInfo.ttl_std_marks,
                        "ttl_exp_dur": practiceTestInfo.ttl_exp_dur,
                        "ttl_act_dur": practiceTestInfo.ttl_act_dur,
                        "sts": practiceTestInfo.sts,
                        "std_rat": practiceTest.std_rat,
                        "std_fd": practiceTest.std_fd,
                        "is_chal": practiceTest.is_chal,
                        "chal_t_id": practiceTest.chal_t_id,
                        "chal_rank": practiceTest.chal_rank
                    }
                },
                { upsert: true, new: true }
            )
            return practiceTestObj;
        }
    } catch (error) {
        throw Error('practiceTestObj: ' + error.message)
    }
}

export const addclassAnswer = async (dbName: string, collectionName: string, classTestAnswertInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        classTestAnswertInfo.t_std_ts = new Date(classTestAnswertInfo.t_std_ts).getTime();
        if (!classTestAnswertInfo.c_t_a_id) {
            let classTestAnswerObj = await classTestAnswer.create(classTestAnswertInfo)
            return classTestAnswerObj;
        } else {
            let filter = {
                "_id": new mongoose.Types.ObjectId(classTestAnswertInfo.c_t_a_id),
                "c_test_id": classTestAnswertInfo.c_test_id,
                "user_id": classTestAnswertInfo.user_id,
            };
            let classTestAnswerObj = await classTestAnswer.findOneAndUpdate(
                filter,
                {
                    $set: {
                        "ans_sheet": classTestAnswertInfo.ans_sheet,
                        "ttl_std_marks": classTestAnswertInfo.ttl_std_marks,
                        "ttl_act_dur": classTestAnswertInfo.ttl_act_dur,
                        "t_std_ts": classTestAnswertInfo.t_std_ts,
                        "sts": classTestAnswertInfo.sts,
                        "std_rat": classTestAnswertInfo.std_rat,
                        "std_fd": classTestAnswertInfo.std_fd,
                    }
                },
                { upsert: true, new: true }
            )
            return classTestAnswerObj;
        }
    } catch (error) {
        throw Error('classTestAnswerObj: ' + error.message)
    }
}

export const getclassTestAnswers = async (test_type: string, dbName: string, user_id: string, c_test_id: string) => {
    let dbConnection = await contentDBConnetion(dbName);
    let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
    const schema = new mongoose.Schema({}, { strict: false });
    let testAnswers = [];
    for (let collection of collectionList) {
        if (test_type === await shortHandCollectionName(collection.name)) {
            let modelName = dbConnection.model(collection.name, schema, collection.name);
            let testAnswerData = await modelName.find({
                user_id, c_test_id
            })
            testAnswers = [...testAnswers, ...testAnswerData]
        }
    }
    for (let i = 0; i < testAnswers.length; i++) {
        let user = await userDetail.find({ _id: new mongoose.Types.ObjectId(testAnswers[i].user_id) }, { disp_name: 1 });
        if (user.length) {
            testAnswers[i]['_doc'].user_name = user[0].disp_name
        } else {
            testAnswers[i]['_doc'].user_name = ""
        }
        testAnswers[i]['_doc'].cr_dts = await epochToDate(testAnswers[i].cr_dts)
        testAnswers[i]['_doc'].up_dts = await epochToDate(testAnswers[i].up_dts)
    }
    return testAnswers;
}

export const getpracticeTest = async (dbName: string, collectionName: string, user_id: string, sub_id: string, t_id: string, subject) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        let practiceTestData = await practiceTest.find({
            user_id,
            sub_id,
            t_id
        })
        // let practiceTest = [];
        // let modelName = dbConnection.model(collection.name, schema, collection.name);
        // let testAnswerData = await modelName.find({
        //     user_id,
        //     sub_id,
        //     t_id
        // })
        // if (testAnswerData.length) {
        //     let dbConnection = await contentDBConnetion('vridhee-cur_english');
        //     for (let i = 0; i < testAnswerData[0].ans_sheet.length; i++) {
        //         let ansSheet = testAnswerData[0].ans_sheet[i];
        //         let questionData: any;
        //         for (let questionBank of questionBankCollections) {
        //             let modelName = dbConnection.model(questionBank, schema, questionBank);
        //             let questionBankData = await modelName.findOne({
        //                 "_id": new mongoose.Types.ObjectId(ansSheet.qb_id),
        //             })
        //             if (questionBankData) {
        //                 questionData = questionBankData
        //             }
        //         }
        //         testAnswerData[0].ans_sheet[i]['questionData'] = questionData
        //     }
        // }
        // practiceTest = [...practiceTest, ...testAnswerData]
        for (let i = 0; i < practiceTestData.length; i++) {
            let correctCount = 0;
            let wrongCount = 0;
            let notAttemptedCount = 0;
            for (let ansSheet of practiceTestData[i].ans_sheet) {
                if (ansSheet.ans_sts === 1) {
                    correctCount = correctCount + 1;
                } else if (ansSheet.ans_sts === 2) {
                    wrongCount = wrongCount + 1;
                } else if (ansSheet.ans_sts === 3) {
                    notAttemptedCount = notAttemptedCount + 1;
                }
            }
            let user = await userDetail.find({ _id: new mongoose.Types.ObjectId(practiceTestData[i].user_id) }, { disp_name: 1 });
            if (user.length) {
                practiceTestData[i]['_doc'].user_name = user[0].disp_name;
            } else {
                practiceTestData[i]['_doc'].user_name = "";
            }
            practiceTestData[i]['_doc'].exam_statistics = {
                correctCount, wrongCount, notAttemptedCount
            };
            practiceTestData[i]['_doc'].score = (practiceTestData[i].ttl_std_marks / practiceTestData[i].ttl_marks) * 100;
            practiceTestData[i]['_doc'].progress = ((practiceTestData[i].ttl_std_marks / practiceTestData[i].ttl_marks) * 100) - subject.rating;
            practiceTestData[i]['_doc']['time_questions'] = {
                ttl_time: practiceTestData[i].ttl_exp_dur,
                ttl_questions: practiceTestData[i].ans_sheet.length
            };
            practiceTestData[i]['_doc'].accuracy = (practiceTestData[i].ttl_act_dur / practiceTestData[i].ttl_exp_dur) * 100;
            practiceTestData[i]['_doc'].cr_dts = await epochToDate(practiceTestData[i].cr_dts);
            practiceTestData[i]['_doc'].up_dts = await epochToDate(practiceTestData[i].up_dts);
        }
        let orderedPracticeTest = lodash.orderBy(practiceTestData, (a) => new Date(a['_doc'].cr_dts), ['desc']);
        return orderedPracticeTest;
    } catch (error) {
        throw Error('getpracticeTestInfo: ' + error.message)
    }
}

export const getpracticeTestInfo = async (dbName: string, collectionName: String, user_id: string, sub_id: string, t_id: string, p_t_id) => {
    await metaDbConnetion(dbName, collectionName);
    let dbConnection = await contentDBConnetion('vridhee-cur_english');
    const schema = new mongoose.Schema({}, { strict: false });
    try {
        let practiceTestObj = await practiceTest.findOne({
            _id: new mongoose.Types.ObjectId(p_t_id),
            user_id,
            sub_id,
            t_id
        })
        let correctCount = 0;
        let wrongCount = 0;
        let notAttemptedCount = 0;
        let correctAnswerTimeTaken = 0;
        let overallTimeTaken = 0;
        let overallQuestionTime = 0;
        let totalMarks = 0;
        let correctMarks = 0;
        for (let i = 0; i < practiceTestObj.ans_sheet.length; i++) {
            let ansSheet = practiceTestObj.ans_sheet[i];
            if (ansSheet.ans_sts === 1) {
                correctCount = correctCount + 1;
                correctAnswerTimeTaken = correctAnswerTimeTaken + ansSheet.time_taken;
                correctMarks = correctMarks + ansSheet.marks;
            } else if (ansSheet.ans_sts === 2) {
                wrongCount = wrongCount + 1;
            } else if (ansSheet.ans_sts === 3) {
                notAttemptedCount = notAttemptedCount + 1;
            }
            overallTimeTaken = overallTimeTaken + ansSheet.time_taken
            totalMarks = totalMarks + ansSheet.marks;
            for (let questionBank of questionBankCollections) {
                let modelName = dbConnection.model(questionBank, schema, questionBank);
                let questionBankData = await modelName.findOne({
                    "_id": new mongoose.Types.ObjectId(ansSheet.qb_id),
                })
                if (questionBankData) {
                    practiceTestObj['_doc'].ans_sheet[i]['_doc']['questionData'] = questionBankData;
                    overallQuestionTime = overallQuestionTime + questionBankData.uld[0].dur_sec;
                }
            }

        }
        practiceTestObj['_doc'].exam_statistics = {
            correctCount, wrongCount, notAttemptedCount
        };
        practiceTestObj['_doc'].avg_time_per_correct_answer = overallTimeTaken / correctCount;
        practiceTestObj['_doc'].accuracy = (overallTimeTaken / overallQuestionTime) * 100;
        practiceTestObj['_doc'].score = (correctMarks / totalMarks) * 100;
        // console.log(practiceTestObj)
        return practiceTestObj;
    } catch (error) {
        throw Error('getpracticeTestInfo: ' + error.message)
    }
}

export const getclassTest = async (test_type: string, dbName: string, sub_id: string) => {
    let dbConnection = await contentDBConnetion(dbName);
    let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
    const schema = new mongoose.Schema({}, { strict: false });
    let classTest = [];
    for (let collection of collectionList) {
        if (test_type === await shortHandCollectionName(collection.name)) {
            let modelName = dbConnection.model(collection.name, schema, collection.name);
            let classTestData = await modelName.find({
                sub_id
            })
            classTest = [...classTest, ...classTestData]
        }
    }
    for (let i = 0; i < classTest.length; i++) {
        let user = await userDetail.find({ _id: new mongoose.Types.ObjectId(classTest[i].user_id) }, { disp_name: 1 });
        if (user.length) {
            classTest[i]['_doc'].user_name = user[0].disp_name
        } else {
            classTest[i]['_doc'].user_name = ""
        }
        classTest[i]['_doc'].cr_dts = await epochToDate(classTest[i].cr_dts)
        classTest[i]['_doc'].up_dts = await epochToDate(classTest[i].up_dts)
    }
    return classTest;
}

export const addContentDoubt = async (dbName, collection_name, doubtObj) => {
    await metaDbConnetion(dbName, collection_name);
    try {
        if (!doubtObj.doubtId) {
            const createDoubt = await contentDoubt.create(
                {
                    "user_id": doubtObj.user_id,
                    "sub_id": doubtObj.sub_id,
                    "chapter_id": doubtObj.chapter_id,
                    "t_id": doubtObj.t_id,
                    "d_title": doubtObj.d_title,
                    "d_text": doubtObj.d_text,
                    "f_path": doubtObj.imageUrl,
                    "reply": doubtObj.reply
                }
            )
            return createDoubt;
        } else {
            let filter = {
                "_id": new mongoose.Types.ObjectId(doubtObj.doubtId),
                "user_id": doubtObj.user_id,
                "sub_id": doubtObj.sub_id,
                "chapter_id": doubtObj.chapter_id,
                "t_id": doubtObj.t_id
            };
            const updateDoubt = await contentDoubt.findOneAndUpdate(
                filter,
                {
                    $set: {
                        "user_id": doubtObj.user_id,
                        "sub_id": doubtObj.sub_id,
                        "chapter_id": doubtObj.chapter_id,
                        "t_id": doubtObj.t_id,
                        "d_title": doubtObj.d_title,
                        "d_text": doubtObj.d_text
                    }
                }, { upsert: true, new: true }
            )
            return updateDoubt;
        }
    }
    catch (error) {
        throw Error('addContentDoubt: ' + error.message)
    }
}

export const saveCollabaration = async (dbName: string, collectionName: string, collabarationInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        collabarationInfo.c_dt = moment().format('YYYY-MM-DD')
        collabarationInfo.c_ts = moment().format('HH:mm')
        const collabarationObj = await collabaration.create(collabarationInfo)
        return collabarationObj;
    } catch (error) {
        throw Error('collabaration: ' + error.message)
    }
}

export const updateCollabarationURL = async (collabarationId: string, dbName: string,
    userContentCollectionName: string, URL: string) => {
    try {
        let dbConnection = await contentDBConnetion(dbName);
        let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
        const schema = new mongoose.Schema({}, { strict: false });
        for (let collection of collectionList) {
            if (collection.name === userContentCollectionName) {
                let modelName = dbConnection.model(collection.name, schema, collection.name);
                await modelName.updateOne(
                    { _id: collabarationId },
                    {
                        $set: {
                            c_link: URL
                        }
                    }
                )
                return
            }
        }
        return
    } catch (error) {
        throw Error('collabaration update: ' + error.message)
    }
}

export const userwiseCollabaration = async (dbName: string, collectionName: string, user_id: string) => {
    try {
        let dbConnection = await contentDBConnetion(dbName);
        let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
        const schema = new mongoose.Schema({}, { strict: false });
        let modelName;
        for (let collection of collectionList) {
            if (collection.name === collectionName) {
                modelName = dbConnection.model(collection.name, schema, collection.name);
            }
        }
        let collabarationDocs = await modelName.find({ user_id })
        for (let i = 0; i < collabarationDocs.length; i++) {
            let chap_topic = await findChapterNameTopicName(collabarationDocs[i].t_id, collabarationDocs[i].chap_id);
            if (chap_topic) {
                collabarationDocs[i]['_doc'].chap_name = chap_topic.chap_name;
                collabarationDocs[i]['_doc'].topic_name = chap_topic.t_name;
            } else {
                collabarationDocs[i]['_doc'].chap_name = "";
                collabarationDocs[i]['_doc'].topic_name = "";
            }
            let subject = await getSubjectNames(collabarationDocs[i].sub_id);
            if (subject.length) {
                collabarationDocs[i]['_doc'].sub_name = subject[0].name;
            } else {
                collabarationDocs[i]['_doc'].sub_name = "";
            }
            let user = await userDetail.find({ _id: new mongoose.Types.ObjectId(collabarationDocs[i].user_id) }, { disp_name: 1 });
            if (user.length) {
                collabarationDocs[i]['_doc'].user_name = user[0].disp_name
            } else {
                collabarationDocs[i]['_doc'].user_name = ""
            }
            collabarationDocs[i]['_doc'].cr_dts = await epochToDate(collabarationDocs[i].cr_dts)
        }
        return collabarationDocs
    } catch (error) {
        throw Error('userwiseCollabaration ' + error.message)
    }
}

export const getcollabarations = async (dbName: string) => {
    let dbConnection = await contentDBConnetion(dbName);
    let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
    const schema = new mongoose.Schema({}, { strict: false });
    let collabarationDocs = [];
    for (let collection of collectionList) {
        let modelName = dbConnection.model(collection.name, schema, collection.name);
        let collabarationDoc = await modelName.find({})
        if (collabarationDoc.length) {
            collabarationDocs = [...collabarationDocs, ...collabarationDoc]
        }
    }
    for (let i = 0; i < collabarationDocs.length; i++) {
        let chap_topic = await findChapterNameTopicName(collabarationDocs[i].t_id, collabarationDocs[i].chap_id);
        if (chap_topic) {
            collabarationDocs[i]['_doc'].chap_name = chap_topic.chap_name;
            collabarationDocs[i]['_doc'].topic_name = chap_topic.t_name;
        } else {
            collabarationDocs[i]['_doc'].chap_name = "";
            collabarationDocs[i]['_doc'].topic_name = "";
        }
        let subject = await getSubjectNames(collabarationDocs[i].sub_id);
        if (subject.length) {
            collabarationDocs[i]['_doc'].sub_name = subject[0].name;
        } else {
            collabarationDocs[i]['_doc'].sub_name = "";
        }
        let user = await userDetail.find({ _id: new mongoose.Types.ObjectId(collabarationDocs[i].user_id) }, { disp_name: 1 });
        if (user.length) {
            collabarationDocs[i]['_doc'].user_name = user[0].disp_name
        } else {
            collabarationDocs[i]['_doc'].user_name = ""
        }
        collabarationDocs[i]['_doc'].cr_dts = await epochToDate(collabarationDocs[i].cr_dts)
    }
    return collabarationDocs;
}

export const updateDoubtReply = async (dbName, collection_name, replyObj) => {
    await metaDbConnetion(dbName, collection_name);
    try {
        if (!replyObj.replyId) {
            const doubtReply = await contentDoubt.updateOne(
                {
                    "_id": new mongoose.Types.ObjectId(replyObj.doubtId),
                    "user_id": replyObj.user_id,
                    "sub_id": replyObj.sub_id,
                    "t_id": replyObj.t_id
                }, {
                $push: {
                    "reply": {
                        $each:
                            [
                                {
                                    "src": replyObj.src,
                                    "user_id": replyObj.replyUserId,
                                    "r_text": replyObj.r_text,
                                    "r_path": replyObj.imageUrl
                                }
                            ]
                    }
                }
            }
            )
            return doubtReply;
        } else {
            const doubtReply = await contentDoubt.updateOne(
                {
                    "_id": new mongoose.Types.ObjectId(replyObj.doubtId),
                    "user_id": replyObj.user_id,
                    "sub_id": replyObj.sub_id,
                    "t_id": replyObj.t_id,
                    "reply._id": new mongoose.Types.ObjectId(replyObj.replyId)
                }, {
                $set: {
                    "reply.$.src": replyObj.src,
                    "reply.$.user_id": replyObj.replyUserId,
                    "reply.$.r_text": replyObj.r_text,
                    "reply.$.r_path": replyObj.imageUrl
                }
            }, { upsert: true, new: true }
            )
            return doubtReply;
        }
    } catch (error) {
        throw Error('addContentDoubt: ' + error.message)
    }
}

export const updateLikeDisLike = async (dbName, collection_name, likeDislikeObj) => {
    await metaDbConnetion(dbName, collection_name);
    try {
        if (likeDislikeObj.likeValue === 1 && likeDislikeObj.disLikeValue === 0) {
            const updateReplyLike = await contentDoubt.updateOne(
                {
                    "_id": new mongoose.Types.ObjectId(likeDislikeObj.doubtId),
                    "user_id": likeDislikeObj.user_id,
                    "sub_id": likeDislikeObj.sub_id,
                    "t_id": likeDislikeObj.t_id,
                    "reply._id": new mongoose.Types.ObjectId(likeDislikeObj.replyId)
                },
                {
                    $inc: {
                        "reply.$.ttl_like": 1
                    }
                }
            )
            return updateReplyLike
        } else if (likeDislikeObj.likeValue === 0 && likeDislikeObj.disLikeValue === 1) {
            const updateReplyDisLike = await contentDoubt.updateOne(
                {
                    "_id": new mongoose.Types.ObjectId(likeDislikeObj.doubtId),
                    "user_id": likeDislikeObj.user_id,
                    "sub_id": likeDislikeObj.sub_id,
                    "t_id": likeDislikeObj.t_id,
                    "reply._id": new mongoose.Types.ObjectId(likeDislikeObj.replyId)
                },
                {
                    $inc: {
                        "reply.$.ttl_dlike": 1
                    }
                }
            )
            return updateReplyDisLike
        }
    } catch (error) {
        throw Error('addContentDoubt: ' + error.message)
    }
}

export const getDoubtsList = async (dbName, collectionName, getDoubtObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        if (getDoubtObj.user_id) {
            const doubtsList = await contentDoubt.find({
                "user_id": getDoubtObj.user_id
            }).sort({ "c_ts": -1 });
            return doubtsList;
        } else if (getDoubtObj.sub_id && getDoubtObj.chapter_id && getDoubtObj.t_id) {
            let searchValue = getDoubtObj.searchText
            const doubtsList = await contentDoubt.find({
                "sub_id": getDoubtObj.sub_id,
                "chapter_id": getDoubtObj.chapter_id,
                "t_id": getDoubtObj.t_id,
                $or: [
                    { "d_title": { $regex: new RegExp(searchValue, "i") } },
                    { "d_text": { $regex: new RegExp(searchValue, "i") } }
                ]
            }).sort({ "c_ts": -1 });
            return doubtsList;
        } else {
            let searchValue = getDoubtObj.searchText
            const doubtsList = await contentDoubt.find({
                $or: [
                    { "d_title": { $regex: new RegExp(searchValue, "i") } },
                    { "d_text": { $regex: new RegExp(searchValue, "i") } }
                ]
            }).sort({ "c_ts": -1 });
            return doubtsList;
        }
    } catch (error) {
        throw Error('getDoubtsList: ' + error.message)
    }
}

export const updateUserIdInCollabaration = async (dbName: string, collectionName: string, user_id: string,
    collabarationId: string, new_user_id: string) => {
    try {
        await metaDbConnetion(dbName, collectionName);
        const collabarationObj = await collabaration.findOne({
            _id: new mongoose.Types.ObjectId(collabarationId),
            user_id: user_id
        })
        if (!collabarationObj) {
            return {
                status: 400,
                message: 'Collabaration is not available under this user id.'
            }
        }
        if (collabarationObj && collabarationObj.j_list.length) {
            let findExistingUser = collabarationObj.j_list.find(user => user.c_u_id === new_user_id)
            if (findExistingUser) {
                return { status: 400, message: 'User is already added in this collabaration.' }
            }
        }
        let newUser = {
            c_u_id: new_user_id
        }
        let updateCollabaration = await collabaration.updateOne(
            { _id: new mongoose.Types.ObjectId(collabarationId) },
            {
                $push: {
                    "j_list": newUser
                }
            }
        )
        if (updateCollabaration && updateCollabaration.modifiedCount === 1) {
            return { status: 200, message: 'User added' }
        } else {
            return { status: 400, message: 'User not added' }
        }
    } catch (error) {
        console.log(error, 'error')
        throw Error('updateUserIdInCollabaration ' + error.message)
    }
}

export const saveTaskInCollabaration = async (dbName: string, collectionName: string, taskInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        taskInfo.t_dt = moment().format('YYYY-MM-DD')
        taskInfo.t_ts = moment().format('HH:mm')
        const taskObj = await collabarationTasks.create(taskInfo)
        return taskObj;
    } catch (error) {
        throw Error('taskObj: ' + error.message)
    }
}

export const updateTaskURL = async (taskId: string, dbName: string,
    userContentCollectionName: string, URL: string) => {
    try {
        let dbConnection = await contentDBConnetion(dbName);
        let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
        const schema = new mongoose.Schema({}, { strict: false });
        for (let collection of collectionList) {
            if (collection.name === userContentCollectionName) {
                let modelName = dbConnection.model(collection.name, schema, collection.name);
                await modelName.updateOne(
                    { _id: taskId },
                    {
                        $set: {
                            t_link: URL
                        }
                    }
                )
                return
            }
        }
        return
    } catch (error) {
        throw Error('task update: ' + error.message)
    }
}

export const saveAssignments = async (dbName: string, collectionName: string, assignmentInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        let start = moment();
        let end = moment(assignmentInfo.last_sub_dt);
        // assignmentInfo.dur = moment.duration(start.diff(end)).asDays()
        assignmentInfo.dur = end.diff(start, 'days')
        const assignmentObj = await assignmentEnglish.create(assignmentInfo)
        return assignmentObj;
    } catch (error) {
        throw Error('assignmentObj: ' + error.message)
    }
}

export const updateAssignmentURL = async (assignmentId: string, dbName: string,
    userContentCollectionName: string, URL: string) => {
    try {
        let dbConnection = await contentDBConnetion(dbName);
        const schema = new mongoose.Schema({}, { strict: false });
        let modelName = await dbConnection.model(userContentCollectionName, schema, userContentCollectionName);
        await modelName.updateOne(
            { _id: assignmentId },
            {
                $set: {
                    f_path: URL
                }
            }
        )
        return
    } catch (error) {
        throw Error('assignment update: ' + error.message)
    }
}

export const getAssignmentList = async (dbName: string, collectionName: string, mnt_usr_id: string, sub_id: string, t_id: string) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const assignments = await assignmentEnglish.find({ mnt_usr_id, sub_id, t_id })
        return assignments;
    } catch (error) {
        throw Error('assignments: ' + error.message)
    }
}

export const submitAssignment = async (dbName: string, collectionName: string, assignmentInfo) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const assignmentObj = await assignmentSubmission.create(assignmentInfo)
        return assignmentObj;
    } catch (error) {
        throw Error('submitAssignment: ' + error.message)
    }
}

export const updateAssignmentSubmissionURL = async (assignmentId: string, dbName: string,
    userContentCollectionName: string, URL: string) => {
    try {
        let dbConnection = await contentDBConnetion(dbName);
        const schema = new mongoose.Schema({}, { strict: false });
        let modelName = await dbConnection.model(userContentCollectionName, schema, userContentCollectionName);
        await modelName.updateOne(
            { _id: assignmentId },
            {
                $set: {
                    f_path: URL
                }
            }
        )
        return
    } catch (error) {
        throw Error('assignment update: ' + error.message)
    }
}

export const getSubmittedAssignmentList = async (dbName: string, collectionName: string, user_id:
    string, sub_id: string) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const assignments = await assignmentSubmission.find({ user_id, sub_id })
        return assignments;
    } catch (error) {
        throw Error('assignments: ' + error.message)
    }
}

export const updateVideoComment = async (dbName: string, v_c_id: string, like, dlike, reply) => {
    try {
        let dbConnection = await contentDBConnetion(dbName);
        let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
        const schema = new mongoose.Schema({}, { strict: false });
        for (let collection of collectionList) {
            let modelName = dbConnection.model(collection.name, schema, collection.name);
            let videoCommentObj = await modelName.findOne({ _id: new mongoose.Types.ObjectId(v_c_id) })
            if (videoCommentObj) {
                let likeCount;
                let dLikeCount;
                if (like == 1) {
                    likeCount = videoCommentObj.like + 1;
                } else if (like == -1) {
                    if (videoCommentObj.like > 0) {
                        likeCount = videoCommentObj.like - 1;
                    } else {
                        likeCount = 0;
                    }
                } else if (dlike == 1) {
                    dLikeCount = videoCommentObj.dlike + 1;
                } else if (dlike == -1) {
                    if (videoCommentObj.dlike > 0) {
                        dLikeCount = videoCommentObj.dlike - 1;
                    } else {
                        dLikeCount = 0;
                    }
                }
                // if (like === true) {
                //     likeCount = videoCommentObj.like + 1
                //     if (videoCommentObj.dlike > 0) {
                //         dLikeCount = videoCommentObj.dlike - 1

                //     } else {
                //         dLikeCount = 0
                //     }
                // }
                // if (dlike === true) {
                //     dLikeCount = videoCommentObj.dlike + 1
                //     if (videoCommentObj.like > 0) {
                //         likeCount = videoCommentObj.like - 1

                //     } else {
                //         likeCount = 0
                //     }
                // }
                if (reply && reply.length) {
                    await modelName.updateOne(
                        { _id: new mongoose.Types.ObjectId(v_c_id) },
                        {
                            $push: {
                                "reply": {
                                    $each: [
                                        {
                                            "_id": new mongoose.Types.ObjectId(),
                                            "val": reply[0].val,
                                            "like": 0,
                                            "dlike": 0,
                                            "ref_c_user_id": reply[0].ref_c_user_id,
                                            "c_ts": new Date().getTime()
                                        }
                                    ]
                                }
                            }
                        }
                    )
                    return
                }
                await modelName.updateOne(
                    { _id: new mongoose.Types.ObjectId(v_c_id) },
                    {
                        $set: {
                            "like": likeCount,
                            "dlike": dLikeCount
                        }
                    }
                )
                return
            }
        }
        return
    } catch (error) {
        console.log(error, 'error')
        throw Error('updateUserIdInCollabaration ' + error.message)
    }
}

export const updateVideoCommentreply = async (dbName: string, v_c_id: string, reply_id: string, like, dlike, val: string) => {
    try {
        let dbConnection = await contentDBConnetion(dbName);
        let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
        const schema = new mongoose.Schema({}, { strict: false });
        for (let i = 0; i < collectionList.length; i++) {
            let modelName = await dbConnection.model(collectionList[i].name, schema, collectionList[i].name);
            let videoCommentObj = await modelName.aggregate([
                {
                    '$match': {
                        '_id': new ObjectId(v_c_id)
                    }
                }, {
                    '$unwind': {
                        'path': '$reply'
                    }
                }, {
                    '$match': {
                        'reply._id': new ObjectId(reply_id)
                    }
                }
            ])
            if (videoCommentObj.length) {
                let likeCount;
                let dLikeCount;
                if (like == 1) {
                    likeCount = videoCommentObj[0].reply.like + 1
                } else if (like == -1) {
                    if (videoCommentObj[0].reply.like > 0) {
                        likeCount = videoCommentObj[0].reply.like - 1;
                    } else {
                        likeCount = 0;
                    }
                } else if (dlike == 1) {
                    dLikeCount = videoCommentObj[0].reply.dlike + 1;
                } else if (dlike == -1) {
                    if (videoCommentObj[0].reply.dlike > 0) {
                        dLikeCount = videoCommentObj[0].reply.dlike - 1;
                    } else {
                        dLikeCount = 0;
                    }
                }
                // if (like === true) {
                //     likeCount = videoCommentObj[0].reply.like + 1
                //     if (videoCommentObj[0].reply.dlike > 0) {
                //         dLikeCount = videoCommentObj[0].reply.dlike - 1

                //     } else {
                //         dLikeCount = 0
                //     }
                // }
                // if (dlike === true) {
                //     dLikeCount = videoCommentObj[0].reply.dlike + 1
                //     if (videoCommentObj[0].reply.like > 0) {
                //         likeCount = videoCommentObj[0].reply.like - 1

                //     } else {
                //         likeCount = 0
                //     }
                // }
                await modelName.updateOne(
                    {
                        "_id": new mongoose.Types.ObjectId(v_c_id),
                        "reply._id": new mongoose.Types.ObjectId(reply_id)
                    },
                    {
                        $set: {
                            "reply.$.like": likeCount,
                            "reply.$.dlike": dLikeCount,
                            "reply.$.val": val
                        }
                    }
                )
                break;
            } else {
                continue;
            }
        }
        return
    } catch (error) {
        console.log(error, 'error')
        throw Error('updateUserIdInCollabaration ' + error.message)
    }
}

export const removeVideoCommentreply = async (dbName: string, v_c_id: string, reply_id: string) => {
    try {
        let dbConnection = await contentDBConnetion(dbName);
        let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
        const schema = new mongoose.Schema({}, { strict: false });
        for (let i = 0; i < collectionList.length; i++) {
            let modelName = await dbConnection.model(collectionList[i].name, schema, collectionList[i].name);
            let videoCommentObj = await modelName.aggregate([
                {
                    '$match': {
                        '_id': new ObjectId(v_c_id)
                    }
                }, {
                    '$unwind': {
                        'path': '$reply'
                    }
                }, {
                    '$match': {
                        'reply._id': new ObjectId(reply_id)
                    }
                }
            ])
            if (videoCommentObj.length) {
                await modelName.updateOne(
                    {
                        "_id": new mongoose.Types.ObjectId(v_c_id),
                    },
                    {
                        $pull: {
                            reply: {
                                "_id": new mongoose.Types.ObjectId(reply_id)
                            }
                        }
                    }
                )
                break;
            } else {
                continue;
            }
        }
        return
    } catch (error) {
        console.log(error, 'error')
        throw Error('updateUserIdInCollabaration ' + error.message)
    }
}

export const updateEContentComment = async (dbName: string, e_c_id: string, like, dlike, reply) => {
    try {
        let dbConnection = await contentDBConnetion(dbName);
        let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
        const schema = new mongoose.Schema({}, { strict: false });
        for (let collection of collectionList) {
            let modelName = dbConnection.model(collection.name, schema, collection.name);
            let videoCommentObj = await modelName.findOne({ _id: new mongoose.Types.ObjectId(e_c_id) })
            if (videoCommentObj) {
                let likeCount;
                let dLikeCount;
                if (like == 1) {
                    likeCount = videoCommentObj.like + 1;
                } else if (like == -1) {
                    if (videoCommentObj.like > 0) {
                        likeCount = videoCommentObj.like - 1;
                    } else {
                        likeCount = 0;
                    }
                } else if (dlike == 1) {
                    dLikeCount = videoCommentObj.dlike + 1;
                } else if (dlike == -1) {
                    if (videoCommentObj.dlike > 0) {
                        dLikeCount = videoCommentObj.dlike - 1;
                    } else {
                        dLikeCount = 0;
                    }
                }
                // if (like === true) {
                //     likeCount = videoCommentObj.like + 1
                //     if (videoCommentObj.dlike > 0) {
                //         dLikeCount = videoCommentObj.dlike - 1

                //     } else {
                //         dLikeCount = 0
                //     }
                // }
                // if (dlike === true) {
                //     dLikeCount = videoCommentObj.dlike + 1
                //     if (videoCommentObj.like > 0) {
                //         likeCount = videoCommentObj.like - 1

                //     } else {
                //         likeCount = 0
                //     }
                // }
                if (reply && reply.length) {
                    await modelName.updateOne(
                        { _id: new mongoose.Types.ObjectId(e_c_id) },
                        {
                            $push: {
                                "reply": {
                                    $each: [
                                        {
                                            "_id": new mongoose.Types.ObjectId(),
                                            "val": reply[0].val,
                                            "like": 0,
                                            "dlike": 0,
                                            "ref_c_user_id": reply[0].ref_c_user_id,
                                            "c_ts": new Date().getTime()
                                        }
                                    ]
                                }
                            }
                        },
                    )
                    return
                }
                await modelName.updateOne(
                    { _id: new mongoose.Types.ObjectId(e_c_id) },
                    {
                        $set: {
                            "like": likeCount,
                            "dlike": dLikeCount
                        }
                    }
                )
                return
            }
        }
        return
    } catch (error) {
        console.log(error, 'error')
        throw Error('updateEContentComment ' + error.message)
    }
}

export const eContentCommentReply = async (dbName: string, e_c_id: string, reply_id: string, like, dlike, val: string) => {
    try {
        let dbConnection = await contentDBConnetion(dbName);
        let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
        const schema = new mongoose.Schema({}, { strict: false });
        for (let i = 0; i < collectionList.length; i++) {
            let modelName = await dbConnection.model(collectionList[i].name, schema, collectionList[i].name);
            let videoCommentObj = await modelName.aggregate([
                {
                    '$match': {
                        '_id': new ObjectId(e_c_id)
                    }
                }, {
                    '$unwind': {
                        'path': '$reply'
                    }
                }, {
                    '$match': {
                        'reply._id': new ObjectId(reply_id)
                    }
                }
            ])
            if (videoCommentObj.length) {
                let likeCount;
                let dLikeCount;
                if (like == 1) {
                    likeCount = videoCommentObj[0].reply.like + 1;
                } else if (like == -1) {
                    if (videoCommentObj[0].reply.like > 0) {
                        likeCount = videoCommentObj[0].reply.like - 1;
                    } else {
                        likeCount = 0;
                    }
                } else if (dlike == 1) {
                    dLikeCount = videoCommentObj[0].reply.dlike + 1;
                } else if (dlike == -1) {
                    if (videoCommentObj[0].reply.dlike > 0) {
                        dLikeCount = videoCommentObj[0].reply.dlike - 1
                    } else {
                        dLikeCount = 0
                    }
                }
                // if (like === true) {
                //     likeCount = videoCommentObj[0].reply.like + 1
                //     if (videoCommentObj[0].reply.dlike > 0) {
                //         dLikeCount = videoCommentObj[0].reply.dlike - 1

                //     } else {
                //         dLikeCount = 0
                //     }
                // }
                // if (dlike === true) {
                //     dLikeCount = videoCommentObj[0].reply.dlike + 1
                //     if (videoCommentObj[0].reply.like > 0) {
                //         likeCount = videoCommentObj[0].reply.like - 1

                //     } else {
                //         likeCount = 0
                //     }
                // }
                await modelName.updateOne(
                    {
                        "_id": new mongoose.Types.ObjectId(e_c_id),
                        "reply._id": new mongoose.Types.ObjectId(reply_id)
                    },
                    {
                        $set: {
                            "reply.$.like": likeCount,
                            "reply.$.dlike": dLikeCount,
                            "reply.$.val": val
                        }
                    }
                )
                break;
            } else {
                continue;
            }
        }
        return
    } catch (error) {
        console.log(error, 'error')
        throw Error('updateUserIdInCollabaration ' + error.message)
    }
}

export const removeEContentCommentreply = async (dbName: string, e_c_id: string, reply_id: string) => {
    try {
        let dbConnection = await contentDBConnetion(dbName);
        let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
        const schema = new mongoose.Schema({}, { strict: false });
        for (let i = 0; i < collectionList.length; i++) {
            let modelName = await dbConnection.model(collectionList[i].name, schema, collectionList[i].name);
            let videoCommentObj = await modelName.aggregate([
                {
                    '$match': {
                        '_id': new ObjectId(e_c_id)
                    }
                }, {
                    '$unwind': {
                        'path': '$reply'
                    }
                }, {
                    '$match': {
                        'reply._id': new ObjectId(reply_id)
                    }
                }
            ])
            if (videoCommentObj.length) {
                await modelName.updateOne(
                    {
                        "_id": new mongoose.Types.ObjectId(e_c_id),
                    },
                    {
                        $pull: {
                            reply: {
                                "_id": new mongoose.Types.ObjectId(reply_id)
                            }
                        }
                    }
                )
                break;
            } else {
                continue;
            }
        }
        return
    } catch (error) {
        console.log(error, 'error')
        throw Error('updateUserIdInCollabaration ' + error.message)
    }
}

export const deleteDoubtByDoubtId = async (dbName, collectionName, doubtObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const doubts = await contentDoubt.deleteOne({
            "_id": new mongoose.Types.ObjectId(doubtObj.doubtId)
        })
        return doubts;
    } catch (error) {
        throw Error('deleteDoubtsByDoubtId: ' + error.message)
    }
}

export const deleteDoubtReplyByReplyId = async (dbName, collectionName, doubtObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const doubtReply = await contentDoubt.updateOne(
            {
                "_id": new mongoose.Types.ObjectId(doubtObj.doubtId),
            },
            {
                $pull: {
                    reply: {
                        "_id": new mongoose.Types.ObjectId(doubtObj.replyId)
                    }
                }
            }
        )
        return doubtReply;
    } catch (error) {
        throw Error('deleteDoubtReplyByReplyId: ' + error.message)
    }
}

export const getUserNameProfImg = async (userId) => {
    try {
        const userInfo = await userProfile.aggregate([
            {
                $match: {
                    user_id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "userdetail",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "userdetails"
                }
            },
            {
                $unwind: { path: "$userdetails" }
            },
            {
                $project: {
                    _id: 0,
                    "personal_info.image": 1,
                    "userdetails.disp_name": 1,
                    "userdetails.email": 1,
                    "learning": 1
                }
            }
        ])
        let img;
        if (userInfo.length > 0) {
            if (userInfo[0].personal_info.image.includes('https')) {
                img = userInfo[0].personal_info.image;
            } else {
                img = configData.s3BaseUrl + userInfo[0].personal_info.image;
            }
            userInfo[0].personal_info.image = img;
            return userInfo
        } else {
            return userInfo
        }
    } catch (error) {
        throw Error('getUserNameProfImg: ' + error.message)
    }
}

export const getTopicNames = async (subjectId, chapterId, topicId) => {
    try {
        const topicNames = await sub_chapter.aggregate([
            {
                $match: {
                    sub_id: subjectId,
                    _id: new mongoose.Types.ObjectId(chapterId)
                }
            },
            {
                $unwind: {
                    path: "$chapter.topics"
                }
            },
            {
                $match: {
                    "chapter.topics._id": new mongoose.Types.ObjectId(topicId)
                }
            },
            {
                $project: {
                    _id: 0,
                    "chapter.name": 1,
                    "chapter.topics.name": 1
                }
            }
        ])
        return topicNames
    } catch (error) {
        throw Error('getSubTopicNames: ' + error.message)
    }
}

export const getSubjectNames = async (subjectId) => {
    try {
        const subNames = await subject.find(
            {
                _id: new mongoose.Types.ObjectId(subjectId)
            },
            {
                _id: 0, "name": 1
            }
        )
        return subNames
    } catch (error) {
        throw Error('getSubjectNames: ' + error.message)
    }
}

export const getdoubtDBMetaDataName = async (db_metadata) => {
    return await actorDBMetaData.findOne({ db_id: +db_metadata }, { db_id: 1, db_name: 1 })
}

export const getDoubts = async (dbName, doubtsReqObj) => {
    try {
        let dbConnection = await contentDBConnetion(dbName);
        let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
        const schema = new mongoose.Schema({}, { strict: false });
        let doubtsDoc = [];
        for (let i = 0; i < collectionList.length; i++) {
            const modelName = dbConnection.model(collectionList[i].name, schema, collectionList[i].name);
            if (!doubtsReqObj.subjectId && !doubtsReqObj.chapterId && !doubtsReqObj.topicId) {
                const doubtsData = await modelName.find({
                    $or: [
                        { "d_title": { $regex: new RegExp(doubtsReqObj.searchText, "i") } },
                        { "d_text": { $regex: new RegExp(doubtsReqObj.searchText, "i") } }
                    ]
                }).sort({ "c_ts": -1 });
                if (doubtsData.length) {
                    doubtsDoc = [...doubtsDoc, ...doubtsData]
                }
            } else if (!doubtsReqObj.chapterId && !doubtsReqObj.topicId) {
                const doubtsData = await modelName.find({
                    "sub_id": doubtsReqObj.subjectId
                }).sort({ "c_ts": -1 });
                if (doubtsData.length) {
                    doubtsDoc = [...doubtsDoc, ...doubtsData]
                }
            } else if (!doubtsReqObj.topicId) {
                const doubtsData = await modelName.find({
                    "sub_id": doubtsReqObj.subjectId,
                    "chapter_id": doubtsReqObj.chapterId,
                }).sort({ "c_ts": -1 });
                if (doubtsData.length) {
                    doubtsDoc = [...doubtsDoc, ...doubtsData]
                }
            } else {
                const doubtsData = await modelName.find({
                    "sub_id": doubtsReqObj.subjectId,
                    "chapter_id": doubtsReqObj.chapterId,
                    "t_id": doubtsReqObj.topicId
                }).sort({ "c_ts": -1 });
                if (doubtsData.length) {
                    doubtsDoc = [...doubtsDoc, ...doubtsData]
                }
            }
        }
        return doubtsDoc
    } catch (error) {
        console.log(error)
        throw Error('getDoubts: ' + error.message)
    }
}

export const saveGmailContacts = async (dbName: string, collectionName: string, user_id: string, contacts) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        let connectionObj: any = {
            user_id,
            fol_ct: 0,
            con_ct: 0
        }
        let contactsArray = [];
        for (let i = 0; i < contacts.length; i++) {
            let emailFromContacts = contacts[i].email
            let user = await userDetail.find({ email: emailFromContacts }, { disp_name: 1 });
            if (user.length) {
                contacts[i].user_c_id = user[0]._id.toString();
                contacts[i].rel_ty = 0;
                contacts[i].rel_ty_id = [{ src: 'Buddy', rel_ty_id: 0 }];
                contacts[i].is_fol = false;
                contactsArray.push(contacts[i]);
            }
        }
        connectionObj.circle = contactsArray;
        const gmailContacts = await userConnection.create(connectionObj)
        return gmailContacts;
    } catch (error) {
        throw Error('gmailContacts : ' + error.message)
    }
}

export const getContacts = async (dbName: string, collectionName: string, user_id: string) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const connections = await userConnection.findOne({ user_id });
        return connections;
    } catch (error) {
        throw Error('get user connection: ' + error.message)
    }
}


export const newStudyPlan = async (dbName, collectionName, plannerObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const { userId, name, desc, freq: freqArray, plan: planArray } = plannerObj;
        const existingUser = await studyPlan.findOne({ "user_id": userId });

        if (!existingUser) {
            const newStudyPlan = new studyPlan({
                user_id: userId,
                name,
                desc,
                freq: freqArray,
                plan: planArray
            });

            const savedStudyPlan = await newStudyPlan.save();
            return { status: 200, message: "Study plan created successfully", data: savedStudyPlan };
        } else {
            let MatchTimeSlotBooked: any = [];
            let isTimeSlotBook: any = [];
            existingUser.name = name;
            existingUser.desc = desc;
            for (const freqData of freqArray) {
                const existingFreq = existingUser.freq.find(
                    (freq) =>
                        freq.sub_id === freqData.sub_id &&
                        freq.cat_id === freqData.cat_id &&
                        freq.grade_id === freqData.grade_id
                )
                if (!existingFreq) {
                    for (const planData of planArray) {
                        const matchingDate = existingUser.plan.find((item) => item.date === planData.date);
                        const notMatchedData = existingUser.plan.find((item) => item.date !== planData.date)
                        if (matchingDate) {
                            for (const timeSlot of planData.t_slot) {
                                const timeSlotBooked = matchingDate.t_slot.some(
                                    (slot) =>
                                        (timeSlot.f_ts >= slot.f_ts && timeSlot.f_ts <= slot.t_ts) ||
                                        (timeSlot.t_ts >= slot.f_ts && timeSlot.t_ts <= slot.t_ts)
                                )
                                if (timeSlotBooked === false) {
                                    matchingDate.t_slot.push(timeSlot);
                                } else {
                                    isTimeSlotBook.push(timeSlotBooked);
                                }
                            }
                        } else {
                            existingUser.plan.push(planData);
                        }
                    }
                    if (isTimeSlotBook[0] === true) {
                        return { status: 400, message: "This time slot is already booked" }
                    } else {
                        existingUser.freq.push(freqData);
                    }
                } else {
                    existingFreq.f_typ = freqData.f_typ;
                    existingFreq.end_on = freqData.end_on;
                    existingFreq.rpt_on = freqData.rpt_on;
                    for (const planData of planArray) {
                        const matchingDate = existingUser.plan.find((item) => item.date === planData.date);
                        const notMatchedData = existingUser.plan.find((item) => item.date !== planData.date)
                        if (matchingDate) {
                            for (const timeSlot of planData.t_slot) {
                                const timeSlotBooked = matchingDate.t_slot.some(
                                    (slot) =>
                                        (timeSlot.f_ts >= slot.f_ts && timeSlot.f_ts < slot.t_ts) ||
                                        (timeSlot.t_ts > slot.f_ts && timeSlot.t_ts <= slot.t_ts)
                                )
                                if (timeSlotBooked === true) {
                                    MatchTimeSlotBooked.push(timeSlotBooked);
                                }
                                const updatedMatchingDate = removeAndInsertSlot(matchingDate, timeSlot);
                                existingUser.plan.push(updatedMatchingDate);
                            }
                            if (MatchTimeSlotBooked[0] === true) {
                                return { status: 400, message: "This time slot is already booked" }
                            }
                        }
                        if (notMatchedData) {
                            for (const timeSlot of planData.t_slot) {
                                const timeSlotBooked = notMatchedData.t_slot.some(
                                    (slot) =>
                                        (timeSlot.f_ts >= slot.f_ts && timeSlot.f_ts < slot.t_ts) ||
                                        (timeSlot.t_ts > slot.f_ts && timeSlot.t_ts <= slot.t_ts)
                                )
                                if (timeSlotBooked === true) {
                                    isTimeSlotBook.push(timeSlotBooked);
                                }
                            }
                            existingUser.plan.push(planData);
                        }
                        if (isTimeSlotBook[0] === true) {
                            return { status: 400, message: "This time slot is already booked" }
                        }
                    }
                }
            }
            const savedStudyPlan = await existingUser.save();
            return { status: 200, message: "Study plan Updated successfully", data: savedStudyPlan }

        }
    } catch (error) {
        console.error(error);
        throw new Error('newStudyPlan: ' + error.message);
    }
};

const removeAndInsertSlot = (matchingDate, requestSlot) => {
    const { t_slot } = matchingDate;
    const { sub_id, cat_id, grade_id } = requestSlot;
    matchingDate.t_slot = t_slot.filter(
        slot => !(slot.sub_id === sub_id && slot.cat_id === cat_id && slot.grade_id === grade_id)
    );
    matchingDate.t_slot.push(requestSlot);
    return matchingDate;
};

export const getStudyPlan = async (dbName, collectionName, plannerObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const userPlan = await studyPlan.findOne({
            "user_id": plannerObj.userId
        })
        return userPlan
    } catch (error) {
        console.log(error);
        throw Error('getStudyPlan: ' + error.message)
    }
}

export const getSubjectDetails = async (plannerObj) => {
    try {
        const getSubName = await subject.find(
            { _id: new mongoose.Types.ObjectId(plannerObj) },
            { _id: 0, name: 1 }
        )
        return getSubName;
    } catch (error) {
        console.log(error);
        throw Error('getSubjectDetails: ' + error.message)
    }
}

export const userSubjectCollabarations = async (dbName: string, user_id: string, sub_id: string) => {
    let dbConnection = await contentDBConnetion(dbName);
    let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
    const schema = new mongoose.Schema({}, { strict: false });
    let collabarations = [];
    for (let collection of collectionList) {
        let modelName = dbConnection.model(collection.name, schema, collection.name);
        let collabaration = await modelName.aggregate([
            {
                $match: {
                    sub_id
                }
            },
            {
                $unwind: "$j_list"
            },
            {
                $match: {
                    "j_list.c_u_id": user_id
                }
            }
        ])
        if (collabaration.length) {
            collabarations = [...collabarations, ...collabaration]
        }
    }
    for (let i = 0; i < collabarations.length; i++) {
        let user = await getUserNameProfImg(collabarations[i].user_id)
        if (user.length) {
            collabarations[i].user_name = user[0].userdetails.disp_name ? user[0].userdetails.disp_name : ""
            collabarations[i].profile_image = user[0].personal_info.image ? user[0].personal_info.image : ""
        } else {
            collabarations[i].user_name = ""
            collabarations[i].profile_image = ""
        }
        let lookUpValue = await getLookup('c_u_sts', collabarations[i].j_list.c_u_sts);
        collabarations[i].j_list.c_u_status = lookUpValue[0].data.val
    }
    return collabarations;
}

export const updateCollabarationStatus = async (dbName: string, user_id: string, collabaration_id: string, status: number) => {
    try {
        let dbConnection = await contentDBConnetion(dbName);
        let collectionList = await dbConnection.client.db(dbName).listCollections().toArray();
        const schema = new mongoose.Schema({}, { strict: false });
        let modelIdentified = false;
        let modelName;
        for (let i = 0; i < collectionList.length; i++) {
            let model = dbConnection.model(collectionList[i].name, schema, collectionList[i].name);
            let found = model.findOne({
                _id: new ObjectId(collabaration_id)
            })
            if (found) {
                modelName = model;
                modelIdentified = true;
                break;
            } else {
                modelIdentified = false;
            }
        }
        if (modelIdentified) {
            const updateStatus = await modelName.updateOne(
                {
                    "_id": new mongoose.Types.ObjectId(collabaration_id),
                    "j_list.c_u_id": user_id
                },
                {
                    $set: {
                        "j_list.$.c_u_sts": status
                    }
                }
            )
            if (updateStatus && updateStatus.modifiedCount === 1) {
                return { status: 200, message: `Collabaration status ${UPDATED}` }
            } else {
                return { status: 200, message: `Collabaration status ${NOT_UPDATED}` }
            }
        } else {
            return { status: 400, message: noDataAvail }
        }
    } catch (error) {
        console.log(error);
        throw Error('getSubjectDetails: ' + error.message)
    }
}