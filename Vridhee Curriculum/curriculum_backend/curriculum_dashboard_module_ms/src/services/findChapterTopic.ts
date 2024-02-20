import { APIResponse } from '../utils/status';
import {
    sub_chapter
} from '../dbmanager/dbconnection';
const { ObjectId } = require('mongodb');
import { noDataAvail } from '../utils/errormsg';
import mongoose from 'mongoose';

const findChapterTopic = async (chapterName: string, topicName: string) => {
    let chapterTopic = await sub_chapter.findOne({
        "chapter.name": new RegExp(`^${chapterName}$`, 'i'),
        "chapter.topics.name": new RegExp(`^${topicName}$`, 'i')
        // "chapter.topics": {
        //     $elemMatch: {
        //         name: new RegExp(`^${topicName}$`, 'i'),
        //     }
        // }
    })
    if (chapterTopic === null || chapterTopic === undefined || chapterTopic === '') {
        return { "status": 404, "message": noDataAvail };
    }

    chapterTopic.chapter.topics = chapterTopic.chapter.topics.filter(topic => topic.name.toLowerCase() == topicName.toLowerCase())
    return chapterTopic.chapter;
}

const findTopics = async (t_id: string, cId: string) => {
    try {
        // let chapterTopic = await sub_chapter.aggregate([
        //     { $match: { "_id":new ObjectId(cId) } },
        //     { $unwind: "$chapter.topics" },
        //     { $match: { "chapter.topics._id":new ObjectId(t_id) } }
        //     ])

        let chapterTopic = await sub_chapter.findOne({
            "_id": new ObjectId(cId),
            "chapter.topics._id": new ObjectId(t_id)
        })
        // console.log("chapterTopic>>",chapterTopic)
        if (chapterTopic.length === 0) {
            return { "status": 404, "message": noDataAvail };
        }

        return chapterTopic;
    } catch (err) {
        console.log("Error finding documents: ", err.message)
        return { "status": 404, "message": err.message };
    }

}
//New api for checking existing status of topics by topic id
const findTopic = async (t_id: string) => {
    try {
        let topic = await sub_chapter.aggregate([
            { $unwind: "$chapter.topics" },
            { $match: { "chapter.topics._id": new mongoose.Types.ObjectId(t_id) } }
        ])
        if (topic.length === 0) {
            return { "status": 404, "message": noDataAvail };
        }

        return topic;
    } catch (err) {
        console.log("Error finding documents: ", err.message)
        return { "status": 404, "message": err.message };
    }

}

const findTopicBasedOnName = async (topicName: string) => {
    try {
        let topic = await sub_chapter.aggregate([
            { $unwind: "$chapter.topics" },
            { $match: { "chapter.topics.name": new RegExp(`^${topicName}$`, 'i') } }
        ])
        if (topic.length === 0) {
            return { "status": 404, "message": noDataAvail };
        }
        return topic[0].chapter;
    } catch (err) {
        console.log("findTopicBasedOnName: ", err.message)
        return { "status": 404, "message": err.message };
    }
}

const findChapterNameTopicName = async (t_id: string, cId: string) => {
    try {
        let chapterTopic = await sub_chapter.aggregate([
            {
                $match: {
                    "_id": new ObjectId(cId),
                }
            },
            {
                $unwind: { path: "$chapter.topics" }
            },
            {
                $match: {
                    "chapter.topics._id": new ObjectId(t_id),
                }
            },
            {
                $project: {
                    _id: 0,
                    chap_name: "$chapter.name",
                    t_name: "$chapter.topics.name"
                }
            }
        ])
        return chapterTopic[0];
    } catch (err) {
        console.log("Error finding documents: ", err.message)
        return { "status": 404, "message": err.message };
    }

}

export { findChapterTopic, findTopics, findTopic, findTopicBasedOnName, findChapterNameTopicName }
