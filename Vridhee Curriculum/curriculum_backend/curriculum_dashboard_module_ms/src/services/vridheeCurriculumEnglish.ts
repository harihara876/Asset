import moment from 'moment';
import { noDataAvail } from '../utils/errormsg';
import {
    englishVideoLevel1,
    englishBookEContentLevel1Schema,
    englishAiEContentLevel1Schema,
    englishAiEContentLevel2Schema, englishAiEContentLevel3Schema, englishAiEContentLevel4Schema,
    englishTeacherEContentLevel1Schema, englishExamplesLevel1Schema, englishImportantPointsLevel1Schema,
    englishExcerciseLevel1Schema, qChoiceLevel1Schema, qChoiceLevel2Schema, qChoiceLevel3Schema,
    qChoiceLevel4Schema, englishQuestionFillBlankLevel1Schema, englishQuestionFillBlankLevel2Schema,
    englishQuestionFillBlankLevel3Schema, englishQuestionFillBlankLevel4Schema,
    englishQuestionPassageLevel1Schema, englishQuestionPassageLevel2Schema,
    englishQuestionPassageLevel3Schema, englishQuestionPassageLevel4Schema,
    englishAssignmentLevel1Schema

} from '../dbmanager/languagesDBSchemas/vridheeCurriculumEnglish/dbconnection';

import { sub_chapter } from '../dbmanager/dbconnection';
const { ObjectId } = require('mongodb');

const addVideoLevel1 = async (videoContentLevel1Obj) => {
    console.log("videoContentLevel1Obj>>", videoContentLevel1Obj)
    let filter = { "t_id": videoContentLevel1Obj.t_id };
    let videoContentDetails: any;
    try {
        // const findTopic = await englishVideoLevel1.find(filter);
        // if (findTopic.length > 0) {

        //     videoContentDetails = await englishVideoLevel1.updateOne(filter, { $push: { data: { $each: videoContentLevel1Obj.data } } });
        //     if (videoContentDetails.matchedCount === 1 && videoContentDetails.modifiedCount === 1) {
        //         // Update was successful, now retrieve the updated document
        //         const updatedDocument = await englishVideoLevel1.findOne(filter);
        //         return updatedDocument;

        //     } else {
        //         console.log('Update did not match or modify any documents.');

        //     }
        // } else {

        //     videoContentDetails = await englishVideoLevel1.create(videoContentLevel1Obj)
        // }

        videoContentDetails = await englishVideoLevel1.findOneAndUpdate(
            filter,
            {
                $push: {
                    data: { $each: videoContentLevel1Obj.data }
                }
            },
            { upsert: true, new: true }
        )

        return videoContentDetails;
    } catch (error) {
        throw Error('add englishVideoLevel1' + error.message)
    }
}

const addBookEContentLevel1 = async (bookEContentLevel1Obj) => {
    let filter = { "t_id": bookEContentLevel1Obj.t_id };
    let topicDetails: any;
    try {
        const findTopic = await englishBookEContentLevel1Schema.find(filter);
        if (findTopic.length > 0) {

            topicDetails = await englishBookEContentLevel1Schema.updateOne(filter, { $push: { data: { $each: bookEContentLevel1Obj.data } } });
            if (topicDetails.matchedCount === 1 && topicDetails.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await englishBookEContentLevel1Schema.findOne(filter);
                return updatedDocument;

            } else {
                console.log('Update did not match or modify any documents.');

            }
        } else {

            topicDetails = await englishBookEContentLevel1Schema.create(bookEContentLevel1Obj)
        }
        return topicDetails;
    } catch (error) {
        throw Error('add englishBookEContentLevel1Schema' + error.message)
    }
}

const addAiEContentLevel1 = async (aiEContentLevel1Obj) => {

    let filter = { "t_id": aiEContentLevel1Obj.t_id };
    let aiEContentLevel1Details: any;
    try {
        const findTopic = await englishAiEContentLevel1Schema.find(filter);
        if (findTopic.length > 0) {

            aiEContentLevel1Details = await englishAiEContentLevel1Schema.updateOne(filter, { $push: { data: { $each: aiEContentLevel1Obj.data } } });
            if (aiEContentLevel1Details.matchedCount === 1 && aiEContentLevel1Details.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await englishAiEContentLevel1Schema.findOne(filter);
                return updatedDocument;

            } else {
                console.log('Update did not match or modify any documents.');

            }
        } else {

            aiEContentLevel1Details = await englishAiEContentLevel1Schema.create(aiEContentLevel1Obj)
        }
        return aiEContentLevel1Details;
    } catch (error) {
        throw Error('add addAiEContentLevel1 ' + error.message)
    }
}

const addAiEContentLevel2 = async (aiEContentLevel2Obj) => {

    let filter = { "t_id": aiEContentLevel2Obj.t_id };
    let aiEContentLevel2Details: any;
    try {
        const findTopic = await englishAiEContentLevel2Schema.find(filter);
        if (findTopic.length > 0) {

            aiEContentLevel2Details = await englishAiEContentLevel2Schema.updateOne(filter, { $push: { data: { $each: aiEContentLevel2Obj.data } } });
            if (aiEContentLevel2Details.matchedCount === 1 && aiEContentLevel2Details.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await englishAiEContentLevel2Schema.findOne(filter);
                return updatedDocument;

            } else {
                console.log('Update did not match or modify any documents.');

            }
        } else {

            aiEContentLevel2Details = await englishAiEContentLevel2Schema.create(aiEContentLevel2Obj)
        }
        return aiEContentLevel2Details;
    } catch (error) {
        throw Error('add addAiEContentLevel2 ' + error.message)
    }
}

const addAiEContentLevel3 = async (aiEContentLevel3Obj) => {

    let filter = { "t_id": aiEContentLevel3Obj.t_id };
    let aiEContentLevel3Details: any;
    try {
        const findTopic = await englishAiEContentLevel3Schema.find(filter);
        if (findTopic.length > 0) {

            aiEContentLevel3Details = await englishAiEContentLevel3Schema.updateOne(filter, { $push: { data: { $each: aiEContentLevel3Obj.data } } });
            if (aiEContentLevel3Details.matchedCount === 1 && aiEContentLevel3Details.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await englishAiEContentLevel3Schema.findOne(filter);
                return updatedDocument;

            } else {
                console.log('Update did not match or modify any documents.');

            }
        } else {

            aiEContentLevel3Details = await englishAiEContentLevel3Schema.create(aiEContentLevel3Obj)
        }
        return aiEContentLevel3Details;
    } catch (error) {
        throw Error('add addAiEContentLevel3 ' + error.message)
    }
}

const addAiEContentLevel4 = async (aiEContentLevel4Obj) => {

    let filter = { "t_id": aiEContentLevel4Obj.t_id };
    let aiEContentLevel4Details: any;
    try {
        const findTopic = await englishAiEContentLevel4Schema.find(filter);
        if (findTopic.length > 0) {

            aiEContentLevel4Details = await englishAiEContentLevel4Schema.updateOne(filter, { $push: { data: { $each: aiEContentLevel4Obj.data } } });
            if (aiEContentLevel4Details.matchedCount === 1 && aiEContentLevel4Details.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await englishAiEContentLevel4Schema.findOne(filter);
                return updatedDocument;

            } else {
                console.log('Update did not match or modify any documents.');

            }
        } else {

            aiEContentLevel4Details = await englishAiEContentLevel4Schema.create(aiEContentLevel4Obj)
        }
        return aiEContentLevel4Details;
    } catch (error) {
        throw Error('add addAiEContentLevel4 ' + error.message)
    }
}

const addTeacherEContentLevel1 = async (teacherEContentLevel1Obj) => {

    let filter = { "t_id": teacherEContentLevel1Obj.t_id };
    let teacherEContentDetails: any;
    try {
        const findTopic = await englishTeacherEContentLevel1Schema.find(filter);
        if (findTopic.length > 0) {

            teacherEContentDetails = await englishTeacherEContentLevel1Schema.updateOne(filter, { $push: { data: { $each: teacherEContentLevel1Obj.data } } });
            if (teacherEContentDetails.matchedCount === 1 && teacherEContentDetails.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await englishTeacherEContentLevel1Schema.findOne(filter);
                return updatedDocument;

            } else {
                console.log('Update did not match or modify any documents.');

            }
        } else {

            teacherEContentDetails = await englishTeacherEContentLevel1Schema.create(teacherEContentLevel1Obj)
        }
        return teacherEContentDetails;
    } catch (error) {
        throw Error('add englishTeacherEContentLevel1Schema' + error.message)
    }
}

const addExamplesLevel1 = async (examplesLevel1Obj) => {

    let filter = { "t_id": examplesLevel1Obj.t_id };
    let examplesLevel1Details: any;
    try {
        const findTopic = await englishExamplesLevel1Schema.find(filter);
        if (findTopic.length > 0) {

            examplesLevel1Details = await englishExamplesLevel1Schema.updateOne(filter, { $push: { data: { $each: examplesLevel1Obj.data } } });
            if (examplesLevel1Details.matchedCount === 1 && examplesLevel1Details.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await englishExamplesLevel1Schema.findOne(filter);
                return updatedDocument;

            } else {
                console.log('Update did not match or modify any documents.');

            }
        } else {

            examplesLevel1Details = await englishExamplesLevel1Schema.create(examplesLevel1Obj)
        }
        return examplesLevel1Details;
    } catch (error) {
        throw Error('add addExamplesLevel1 ' + error.message)
    }
}

const addImportantPointsLevel1 = async (importantPointsLevel1Obj) => {

    let filter = { "t_id": importantPointsLevel1Obj.t_id };
    let importantPointsLevel1Details: any;
    try {
        const findTopic = await englishImportantPointsLevel1Schema.find(filter);
        if (findTopic.length > 0) {

            importantPointsLevel1Details = await englishImportantPointsLevel1Schema.updateOne(filter, { $push: { data: { $each: importantPointsLevel1Obj.data } } });
            if (importantPointsLevel1Details.matchedCount === 1 && importantPointsLevel1Details.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await englishImportantPointsLevel1Schema.findOne(filter);
                return updatedDocument;

            } else {
                console.log('Update did not match or modify any documents.');

            }
        } else {

            importantPointsLevel1Details = await englishImportantPointsLevel1Schema.create(importantPointsLevel1Obj)
        }
        return importantPointsLevel1Details;
    } catch (error) {
        throw Error('add englishImportantPointsLevel1Schema' + error.message)
    }
}

const addExcerciseLevel1 = async (excerciseLevel1Obj) => {

    let filter = { "t_id": excerciseLevel1Obj.t_id };
    let excerciseDetails: any;
    try {
        const findTopic = await englishExcerciseLevel1Schema.find(filter);
        if (findTopic.length > 0) {

            excerciseDetails = await englishExcerciseLevel1Schema.updateOne(filter, { $push: { data: { $each: excerciseLevel1Obj.data } } });
            if (excerciseDetails.matchedCount === 1 && excerciseDetails.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await englishExcerciseLevel1Schema.findOne(filter);
                return updatedDocument;

            } else {
                console.log('Update did not match or modify any documents.');

            }
        } else {

            excerciseDetails = await englishExcerciseLevel1Schema.create(excerciseLevel1Obj)
        }
        return excerciseDetails;
    } catch (error) {
        throw Error('add englishExcerciseLevel1Schema' + error.message)
    }

}

const addquestionChoiceLevel1 = async (qChoiceLevel1Obj) => {
    try {
        let questionStatus = await qChoiceLevel1Schema.aggregate([
            {
                $match: {
                    "t_id": qChoiceLevel1Obj.t_id,
                    "question": { $regex: qChoiceLevel1Obj.question, $options: "i" }
                }
            },
        ])

        if (questionStatus.length === 0) {
            const questionDetails = await qChoiceLevel1Schema.create(qChoiceLevel1Obj)
            return { "status": 200, "data": questionDetails };

        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };

        }
    } catch (error) {
        throw Error('add questionChoiceLevel1' + error.message)
    }
}

const addquestionChoiceLevel2 = async (qChoiceLevel2Obj) => {
    // console.log("qChoiceLevel1Obj>>service2", qChoiceLevel1Obj)
    try {
        let questionStatus = await qChoiceLevel2Schema.aggregate([
            {
                $match: {
                    "t_id": qChoiceLevel2Obj.t_id,
                    "question": { $regex: qChoiceLevel2Obj.question, $options: "i" }
                }
            },
        ])

        if (questionStatus.length === 0) {
            const questionDetails = await qChoiceLevel2Schema.create(qChoiceLevel2Obj)
            return { "status": 200, "data": questionDetails };

        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };

        }
    } catch (error) {
        throw Error('add addquestionChoiceLevel2' + error.message)
    }
}

const addquestionChoiceLevel3 = async (qChoiceLevel3Obj) => {
    // console.log("qChoiceLevel1Obj>>service3", qChoiceLevel1Obj)
    try {
        let questionStatus = await qChoiceLevel3Schema.aggregate([
            {
                $match: {
                    "t_id": qChoiceLevel3Obj.t_id,
                    "question": { $regex: qChoiceLevel3Obj.question, $options: "i" }
                }
            },
        ])

        if (questionStatus.length === 0) {
            const questionDetails = await qChoiceLevel3Schema.create(qChoiceLevel3Obj)
            return { "status": 200, "data": questionDetails };

        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };

        }
    } catch (error) {
        throw Error('add addquestionChoiceLevel3' + error.message)
    }
}

const addquestionChoiceLevel4 = async (qChoiceLevel4Obj) => {
    try {
        let questionStatus = await qChoiceLevel4Schema.aggregate([
            {
                $match: {
                    "t_id": qChoiceLevel4Obj.t_id,
                    "question": { $regex: qChoiceLevel4Obj.question, $options: "i" }
                }
            },
        ])

        if (questionStatus.length === 0) {
            const questionDetails = await qChoiceLevel4Schema.create(qChoiceLevel4Obj)
            return { "status": 200, "data": questionDetails };

        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };

        }
    } catch (error) {
        throw Error('add addquestionChoiceLevel4' + error.message)
    }
}

const addquestionFillBlankLevel1 = async (questionFillBlankLevel1Obj) => {
    try {
        let questionStatus = await englishQuestionFillBlankLevel1Schema.aggregate([
            {
                $match: {
                    "t_id": questionFillBlankLevel1Obj.t_id,
                    "question": { $regex: questionFillBlankLevel1Obj.question, $options: "i" }
                }
            },
        ])

        if (questionStatus.length === 0) {
            const questionDetails = await englishQuestionFillBlankLevel1Schema.create(questionFillBlankLevel1Obj)
            return { "status": 200, "data": questionDetails };

        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };

        }
    } catch (error) {
        throw Error('addquestionFillBlankLevel1 ' + error.message)
    }
}

const addquestionFillBlankLevel2 = async (questionFillBlankLevel2Obj) => {
    try {
        let questionStatus = await englishQuestionFillBlankLevel2Schema.aggregate([
            {
                $match: {
                    "t_id": questionFillBlankLevel2Obj.t_id,
                    "question": { $regex: questionFillBlankLevel2Obj.question, $options: "i" }
                }
            },
        ])

        if (questionStatus.length === 0) {
            const questionDetails = await englishQuestionFillBlankLevel2Schema.create(questionFillBlankLevel2Obj)
            return { "status": 200, "data": questionDetails };

        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };

        }
    } catch (error) {
        throw Error('addquestionFillBlankLevel2 ' + error.message)
    }
}

const addquestionFillBlankLevel3 = async (questionFillBlankLevel3Obj) => {
    try {
        let questionStatus = await englishQuestionFillBlankLevel3Schema.aggregate([
            {
                $match: {
                    "t_id": questionFillBlankLevel3Obj.t_id,
                    "question": { $regex: questionFillBlankLevel3Obj.question, $options: "i" }
                }
            },
        ])

        if (questionStatus.length === 0) {
            const questionDetails = await englishQuestionFillBlankLevel3Schema.create(questionFillBlankLevel3Obj)
            return { "status": 200, "data": questionDetails };

        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };

        }
    } catch (error) {
        throw Error('addquestionFillBlankLevel3 ' + error.message)
    }
}

const addquestionFillBlankLevel4 = async (questionFillBlankLevel4Obj) => {
    try {
        let questionStatus = await englishQuestionFillBlankLevel4Schema.aggregate([
            {
                $match: {
                    "t_id": questionFillBlankLevel4Obj.t_id,
                    "question": { $regex: questionFillBlankLevel4Obj.question, $options: "i" }
                }
            },
        ])

        if (questionStatus.length === 0) {
            const questionDetails = await englishQuestionFillBlankLevel4Schema.create(questionFillBlankLevel4Obj)
            return { "status": 200, "data": questionDetails };

        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };

        }
    } catch (error) {
        throw Error('addquestionFillBlankLevel4 ' + error.message)
    }
}

const addQuestionPassageLevel1 = async (questionPassageLevel1Obj) => {
    try {
        let question = await englishQuestionPassageLevel1Schema.aggregate([
            {
                $match: {
                    "passage": { $regex: questionPassageLevel1Obj.passage, $options: "i" }
                }
            },
        ])
        if (question.length === 0) {
            const questionDetails = await englishQuestionPassageLevel1Schema.create(questionPassageLevel1Obj)
            return { "status": 200, "data": questionDetails };

        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };
        }
    } catch (error) {
        throw Error('questionPassageLevel1 ' + error.message)
    }
}

const addQuestionPassageLevel2 = async (questionPassageLevel2Obj) => {
    try {
        let question = await englishQuestionPassageLevel2Schema.aggregate([
            {
                $match: {
                    "passage": { $regex: questionPassageLevel2Obj.passage, $options: "i" }
                }
            },
        ])
        if (question.length === 0) {
            const questionDetails = await englishQuestionPassageLevel2Schema.create(questionPassageLevel2Obj)
            return { "status": 200, "data": questionDetails };

        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };

        }
    } catch (error) {
        throw Error('questionPassageLevel2' + error.message)
    }
}

const addQuestionPassageLevel3 = async (questionPassageLevel3Obj) => {
    try {
        let question = await englishQuestionPassageLevel3Schema.aggregate([
            {
                $match: {
                    "passage": { $regex: questionPassageLevel3Obj.passage, $options: "i" }
                }
            },
        ])
        if (question.length === 0) {
            const questionDetails = await englishQuestionPassageLevel3Schema.create(questionPassageLevel3Obj)
            return { "status": 200, "data": questionDetails };

        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };

        }
    } catch (error) {
        throw Error('questionPassageLevel3 ' + error.message)
    }
}

const addQuestionPassageLevel4 = async (questionPassageLevel4Obj) => {
    try {
        let question = await englishQuestionPassageLevel4Schema.aggregate([
            {
                $match: {
                    "passage": { $regex: questionPassageLevel4Obj.passage, $options: "i" }
                }
            },
        ])
        if (question.length === 0) {
            const questionDetails = await englishQuestionPassageLevel4Schema.create(questionPassageLevel4Obj)
            return { "status": 200, "data": questionDetails };

        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };

        }
    } catch (error) {
        throw Error('questionPassageLevel4' + error.message)
    }
}

const getbookEContentLevel1 = async (bookEContentLevel1Obj) => {
    let filter = { "t_id": bookEContentLevel1Obj.t_id };
    let bookEContentDetails: any;
    try {
        bookEContentDetails = await englishBookEContentLevel1Schema.find(filter);
        if (bookEContentDetails.length > 0) {

            return bookEContentDetails;

        } else {

            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add englishBookEContentLevel1Schema' + error.message)
    }
}

const getQuestionChoiceLevel1 = async (questionChoiceLevel1Obj) => {
    try {
        const questionChoiceDetails = await qChoiceLevel1Schema.find({
            "t_id": { $in: questionChoiceLevel1Obj.t_id },
            "kind": questionChoiceLevel1Obj.kind,
            "for": questionChoiceLevel1Obj.for,
            "bloom_cat_id": questionChoiceLevel1Obj.bloom_cat_id
        });
        if (questionChoiceDetails.length > 0) {
            return questionChoiceDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add englishQuestionChoiceLevel1Schema ' + error.message)
    }
}

const getQuestionChoiceLevel2 = async (questionChoiceLevel2Obj) => {
    try {
        const questionChoiceDetails = await qChoiceLevel2Schema.find({
            "t_id": { $in: questionChoiceLevel2Obj.t_id },
            "kind": questionChoiceLevel2Obj.kind,
            "for": questionChoiceLevel2Obj.for,
            "bloom_cat_id": questionChoiceLevel2Obj.bloom_cat_id
        });
        if (questionChoiceDetails.length > 0) {
            return questionChoiceDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add englishQuestionChoiceLevel2Schema ' + error.message)
    }
}

const getQuestionChoiceLevel3 = async (questionChoiceLevel3Obj) => {
    try {
        const questionChoiceDetails = await qChoiceLevel3Schema.find({
            "t_id": { $in: questionChoiceLevel3Obj.t_id },
            "kind": questionChoiceLevel3Obj.kind,
            "for": questionChoiceLevel3Obj.for,
            "bloom_cat_id": questionChoiceLevel3Obj.bloom_cat_id
        });
        if (questionChoiceDetails.length > 0) {
            return questionChoiceDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add englishQuestionChoiceLevel3Schema ' + error.message)
    }
}

const getQuestionChoiceLevel4 = async (questionChoiceLevel4Obj) => {
    try {
        const questionChoiceDetails = await qChoiceLevel4Schema.find({
            "t_id": { $in: questionChoiceLevel4Obj.t_id },
            "kind": questionChoiceLevel4Obj.kind,
            "for": questionChoiceLevel4Obj.for,
            "bloom_cat_id": questionChoiceLevel4Obj.bloom_cat_id
        });
        if (questionChoiceDetails.length > 0) {
            return questionChoiceDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add englishQuestionChoiceLevel4Schema ' + error.message)
    }
}

const getQuestionFillBankLevel1 = async (questionFillBankLevel1Obj) => {
    try {
        const questionFillBankDetails = await englishQuestionFillBlankLevel1Schema.find({
            "t_id": { $in: questionFillBankLevel1Obj.t_id },
            "kind": questionFillBankLevel1Obj.kind,
            "for": questionFillBankLevel1Obj.for,
            "bloom_cat_id": questionFillBankLevel1Obj.bloom_cat_id
        });

        if (questionFillBankDetails.length > 0) {
            return questionFillBankDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        console.log("englishQuestionFillBankLevel1Schema' + error.message", error.message)
        throw Error('add englishQuestionFillBankLevel1Schema' + error.message)
    }
}

const getQuestionFillBankLevel2 = async (questionFillBankLevel2Obj) => {
    try {
        const questionFillBankDetails = await englishQuestionFillBlankLevel2Schema.find({
            "t_id": { $in: questionFillBankLevel2Obj.t_id },
            "kind": questionFillBankLevel2Obj.kind,
            "for": questionFillBankLevel2Obj.for,
            "bloom_cat_id": questionFillBankLevel2Obj.bloom_cat_id
        });

        if (questionFillBankDetails.length > 0) {
            return questionFillBankDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        console.log("englishQuestionFillBankLevel2Schema' + error.message", error.message)
        throw Error('add englishQuestionFillBankLevel2Schema' + error.message)
    }
}

const getQuestionFillBankLevel3 = async (questionFillBankLevel3Obj) => {
    try {
        const questionFillBankDetails = await englishQuestionFillBlankLevel3Schema.find({
            "t_id": { $in: questionFillBankLevel3Obj.t_id },
            "kind": questionFillBankLevel3Obj.kind,
            "for": questionFillBankLevel3Obj.for,
            "bloom_cat_id": questionFillBankLevel3Obj.bloom_cat_id
        });

        if (questionFillBankDetails.length > 0) {
            return questionFillBankDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        console.log("englishQuestionFillBankLevel3Schema' + error.message", error.message)
        throw Error('add englishQuestionFillBankLevel3Schema' + error.message)
    }
}

const getQuestionFillBankLevel4 = async (questionFillBankLevel4Obj) => {
    try {
        const questionFillBankDetails = await englishQuestionFillBlankLevel4Schema.find({
            "t_id": { $in: questionFillBankLevel4Obj.t_id },
            "kind": questionFillBankLevel4Obj.kind,
            "for": questionFillBankLevel4Obj.for,
            "bloom_cat_id": questionFillBankLevel4Obj.bloom_cat_id
        });

        if (questionFillBankDetails.length > 0) {
            return questionFillBankDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        console.log("englishQuestionFillBankLevel4Schema' + error.message", error.message)
        throw Error('add englishQuestionFillBankLevel4Schema' + error.message)
    }
}

const getQuestionPassageLevel1 = async (questionPassageLevel1Obj) => {
    try {
        const questionPassage1Details = await englishQuestionPassageLevel1Schema.find({
            "ques.t_id": { $in: questionPassageLevel1Obj.t_id },
            "kind": questionPassageLevel1Obj.kind,
            "for": questionPassageLevel1Obj.for,
            "level": questionPassageLevel1Obj.level
        });

        if (questionPassage1Details.length > 0) {
            return questionPassage1Details;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        console.log("englishQuestionPassageLevel1Schema' + error.message", error.message)
        throw Error('add englishQuestionPassageLevel1Schema' + error.message)
    }
}

const getQuestionPassageLevel2 = async (questionPassageLevel2Obj) => {
    try {
        const questionPassage2Details = await englishQuestionPassageLevel2Schema.find({
            "ques.t_id": { $in: questionPassageLevel2Obj.t_id },
            "kind": questionPassageLevel2Obj.kind,
            "for": questionPassageLevel2Obj.for,
            "level": questionPassageLevel2Obj.level
        });

        if (questionPassage2Details.length > 0) {
            return questionPassage2Details;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        console.log("englishQuestionPassageLevel2Schema' + error.message", error.message)
        throw Error('add englishQuestionPassageLevel2Schema' + error.message)
    }
}

const getQuestionPassageLevel3 = async (questionPassageLevel3Obj) => {
    try {
        const questionPassage3Details = await englishQuestionPassageLevel3Schema.find({
            "ques.t_id": { $in: questionPassageLevel3Obj.t_id },
            "kind": questionPassageLevel3Obj.kind,
            "for": questionPassageLevel3Obj.for,
            "level": questionPassageLevel3Obj.level
        });

        if (questionPassage3Details.length > 0) {
            return questionPassage3Details;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        console.log("englishQuestionPassageLevel3Schema' + error.message", error.message)
        throw Error('add englishQuestionPassageLevel3Schema' + error.message)
    }
}

const getQuestionPassageLevel4 = async (questionPassageLevel4Obj) => {
    try {
        const questionPassage4Details = await englishQuestionPassageLevel4Schema.find({
            "ques.t_id": { $in: questionPassageLevel4Obj.t_id },
            "kind": questionPassageLevel4Obj.kind,
            "for": questionPassageLevel4Obj.for,
            "level": questionPassageLevel4Obj.level
        });

        if (questionPassage4Details.length > 0) {
            return questionPassage4Details;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        console.log("englishQuestionPassageLevel4Schema' + error.message", error.message)
        throw Error('add englishQuestionPassageLevel4Schema' + error.message)
    }
}

const getTeacherEContentLevel1 = async (teacherEContentReq) => {
    let filter = { "t_id": teacherEContentReq.t_id };
    let teacherEContentData: any;
    try {
        teacherEContentData = await englishTeacherEContentLevel1Schema.find(filter);
        if (teacherEContentData.length > 0) {

            return teacherEContentData;

        } else {

            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('get teacherEContentLevel1Schema' + error.message)
    }
}

const getAiEContentLevel1 = async (aiEContentLevel1Req) => {
    let filter = { "t_id": aiEContentLevel1Req.t_id };
    let aiEContentLevel1Data: any;
    try {
        aiEContentLevel1Data = await englishAiEContentLevel1Schema.find(filter);
        if (aiEContentLevel1Data.length > 0) {

            return aiEContentLevel1Data;

        } else {

            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('get englishAiEContentLevel1Schema' + error.message)
    }
}

const getAiEContentLevel2 = async (aiEContentLevel2Req) => {
    let filter = { "t_id": aiEContentLevel2Req.t_id };
    let aiEContentLevel2Data: any;
    try {
        aiEContentLevel2Data = await englishAiEContentLevel2Schema.find(filter);
        if (aiEContentLevel2Data.length > 0) {

            return aiEContentLevel2Data;

        } else {

            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('get englishAiEContentLevel2Schema' + error.message)
    }
}

const getAiEContentLevel3 = async (aiEContentLevel3Req) => {
    let filter = { "t_id": aiEContentLevel3Req.t_id };
    let aiEContentLevel3Data: any;
    try {
        aiEContentLevel3Data = await englishAiEContentLevel3Schema.find(filter);
        if (aiEContentLevel3Data.length > 0) {

            return aiEContentLevel3Data;

        } else {

            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('get englishAiEContentLevel3Schema' + error.message)
    }
}

const getAiEContentLevel4 = async (aiEContentLevel4Req) => {
    let filter = { "t_id": aiEContentLevel4Req.t_id };
    let aiEContentLevel4Data: any;
    try {
        aiEContentLevel4Data = await englishAiEContentLevel4Schema.find(filter);
        if (aiEContentLevel4Data.length > 0) {

            return aiEContentLevel4Data;

        } else {

            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('get englishAiEContentLevel4Schema' + error.message)
    }
}

const getQuestionsInfo = async (questionsReq) => {
    const { subjects, chapters, topics, question_type, limit } = questionsReq;
    let filter;
    let topicList;
    try {
        if (subjects.length || chapters.length) {

            // Build the $or condition dynamically
            var orCondition = [];
            if (subjects.length > 0) {
                orCondition.push({ "sub_id": { $in: subjects } });
            }
            // Convert the string representations to ObjectId types
            const objectIdChapters = chapters.map(id => new ObjectId(id));

            // Now, `objectIdChapters` contains an array of ObjectId types
            if (objectIdChapters.length > 0) {
                orCondition.push({ "_id": { $in: objectIdChapters } });
            }

            filter = {
                $or: orCondition
            }

            // console.log("filter>>", filter)
            topicList = await sub_chapter.aggregate([
                {
                    $match: filter
                },
                {
                    $unwind: "$chapter.topics"
                },
                {
                    $group: {
                        _id: 0,
                        topics: { $push: { $toString: "$chapter.topics._id" } }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        topics: 1
                    }
                }
            ])
        }
        console.log("topicList>>", topicList);
        // Combine arrays
        const combineTopics = topicList === undefined || !topicList.length ? topics : topicList[0].topics.concat(topics);
        // Remove duplicates using Set
        const allTopics = [...new Set(combineTopics)];
        console.log("allTopics>>", allTopics);
        if (allTopics) {
            const t_idFilter = { "t_id": { $in: allTopics } };
            const passageTopicIds = [
                {
                    $unwind: "$ques"
                },
                {
                    $match: {
                        "ques.t_id": { $in: allTopics }
                    }
                }
            ]

            const questionLists = await getQuestionsByuserSelection(question_type, t_idFilter, passageTopicIds, limit);

            if (questionLists.length > 0) {
                return questionLists
            } else {
                return { "status": 404, "message": noDataAvail }
            }
        }

    } catch (error) {
        throw Error('' + error.message)
    }
}

const getQuestionsByuserSelection = async (type, t_idFilter, passageTopicIds, limit) => {
    switch (type) {
        case 0:
            return await qChoiceLevel1Schema.find(t_idFilter).limit(limit);
        case 1:
            return await qChoiceLevel2Schema.find(t_idFilter).limit(limit);
        case 2:
            return await qChoiceLevel3Schema.find(t_idFilter).limit(limit);
        case 3:
            return await qChoiceLevel4Schema.find(t_idFilter).limit(limit);
        case 4:
            return await englishQuestionFillBlankLevel1Schema.find(t_idFilter).limit(limit);
        case 5:
            return await englishQuestionFillBlankLevel2Schema.find(t_idFilter).limit(limit);
        case 6:
            return await englishQuestionFillBlankLevel3Schema.find(t_idFilter).limit(limit);
        case 7:
            return await englishQuestionFillBlankLevel4Schema.find(t_idFilter).limit(limit);
        case 8:
            return await englishQuestionPassageLevel1Schema.aggregate(passageTopicIds).limit(limit);
        case 9:
            return await englishQuestionPassageLevel2Schema.aggregate(passageTopicIds).limit(limit);
        case 10:
            return await englishQuestionPassageLevel3Schema.aggregate(passageTopicIds).limit(limit);
        case 11:
            return await englishQuestionPassageLevel4Schema.aggregate(passageTopicIds).limit(limit);
        default:
            return 'Invalid type';
    }
};


const getVideoContentLevel1 = async (videoContentLevel1Obj) => {
    let filter = { "t_id": videoContentLevel1Obj.t_id };
    let videoContentDetails: any;
    try {
        videoContentDetails = await englishVideoLevel1.find(filter);
        if (videoContentDetails.length > 0) {

            return videoContentDetails;

        } else {

            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('getVideoContentLevel1: ' + error.message)
    }
}

const getExampleLevel = async (exampleLevelObj) => {
    let filter = { "t_id": exampleLevelObj.t_id };
    let exampleLevelDetails: any;
    try {
        exampleLevelDetails = await englishExamplesLevel1Schema.find(filter);
        if (exampleLevelDetails.length > 0) {
            return exampleLevelDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('getExampleLevel: ' + error.message)
    }
}

const getImportantPointsLevel = async (importantPointsObj) => {
    let filter = { "t_id": importantPointsObj.t_id };
    let importantPointsDetails: any;
    try {
        importantPointsDetails = await englishImportantPointsLevel1Schema.find(filter);
        if (importantPointsDetails.length > 0) {
            return importantPointsDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('getImportantPointsLevel: ' + error.message)
    }
}

const getExerciseLevel = async (exerciseLevelObj) => {
    let filter = { "t_id": exerciseLevelObj.t_id };
    let exerciseLevelDetails: any;
    try {
        exerciseLevelDetails = await englishExcerciseLevel1Schema.find(filter);
        if (exerciseLevelDetails.length > 0) {
            return exerciseLevelDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('getExerciseLevel: ' + error.message)
    }
}
//push Video Time Line in t_line array if that time line is not exist based upon the filter.
const createVideoTLine = async (createVTimeLReq) => {
    try {
        const filter = {
            $and: [
                { "t_id": createVTimeLReq.t_id },
                {
                    "data": {
                        $elemMatch: {
                            "_id": new ObjectId(createVTimeLReq.video_id)
                        }
                    }
                },
                {
                    "data.t_line": {
                        $elemMatch: {
                            "user_id": createVTimeLReq.user_id,
                            "time": createVTimeLReq.time
                        }
                    }
                }
            ]
        }

        const findVTL = await englishVideoLevel1.find(filter);
        if (findVTL.length) {

            return { "status": 409, "message": "Time Line Already Exist" }
        }
        //------------------------------------create new common func to check time line
        const filter2 = {
            "t_id": createVTimeLReq.t_id,
            "data": {
                $elemMatch: {
                    "_id": new ObjectId(createVTimeLReq.video_id)
                }
            }
        }

        const update = {
            $push: {
                "data.$.t_line": {
                    "user_id": createVTimeLReq.user_id,
                    "time": createVTimeLReq.time,
                    "name": createVTimeLReq.name
                }
            }
        }

        await englishVideoLevel1.findOneAndUpdate(filter2, update, { new: true })

        const projectionResult = await englishVideoLevel1.aggregate([
            {
                $match: {
                    "t_id": createVTimeLReq.t_id
                }
            },
            {
                $unwind: "$data"
            },
            {
                $match: {
                    "data._id": new ObjectId(createVTimeLReq.video_id)
                }
            },
            {
                $unwind: "$data.t_line"
            },
            {
                $match: {
                    "data.t_line.user_id": createVTimeLReq.user_id
                }
            },
            {
                $group: {
                    _id: {
                        t_id: "$t_id",
                        video_id: "$data._id",
                        user_id: "$data.t_line.user_id"
                    },
                    t_lines: {
                        $push: "$data.t_line"
                    }
                }
            }
        ]);

        return { "status": 200, "message": "Time Line Created", "data": projectionResult };

    } catch (error) {
        console.error("Error video timeline:", error);
        throw new Error(' Video Time Line failed: ' + error.message);
    }
};

//Update Existing Video Time Line in t_line array if same time is not exists in time line array
// based upon the filter.
const updateVideoTLine = async (createVTimeLReq) => {
    try {
        const aggregationPipeline = [
            {
                $match: {
                    "t_id": createVTimeLReq.t_id
                }
            },
            {
                $unwind: "$data"
            },
            {
                $match: {
                    "data._id": new ObjectId(createVTimeLReq.video_id),
                    "data.t_line": {
                        $elemMatch: {
                            "user_id": createVTimeLReq.user_id,
                            "time": createVTimeLReq.time
                        }
                    }
                }
            }
        ];

        const findVTL = await englishVideoLevel1.aggregate(aggregationPipeline);
        if (findVTL.length) {

            return { "status": 409, "message": "Time Line Already Exist" }
        }
        const filter2 = {
            $and: [
                { "t_id": createVTimeLReq.t_id },
                {
                    "data": {
                        $elemMatch: {
                            "_id": new ObjectId(createVTimeLReq.video_id)
                        }
                    }
                },
                {
                    "data.t_line": {
                        $elemMatch: {
                            "user_id": createVTimeLReq.user_id,
                            "_id": new ObjectId(createVTimeLReq.time_line_id)
                        }
                    }
                }
            ]
        }

        const update = {
            $set: {
                "data.$[outer].t_line.$[inner].time": createVTimeLReq.time
            }
        }

        const options = {
            arrayFilters: [
                { "outer._id": new ObjectId(createVTimeLReq.video_id) },
                { "inner._id": new ObjectId(createVTimeLReq.time_line_id) }
            ]
        };

        await englishVideoLevel1.findOneAndUpdate(filter2, update, options)

        const projectionResult = await englishVideoLevel1.aggregate([
            {
                $match: {
                    "t_id": createVTimeLReq.t_id
                }
            },
            {
                $unwind: "$data"
            },
            {
                $match: {
                    "data._id": new ObjectId(createVTimeLReq.video_id)
                }
            },
            {
                $unwind: "$data.t_line"
            },
            {
                $match: {
                    "data.t_line.user_id": createVTimeLReq.user_id,
                    "data.t_line._id": new ObjectId(createVTimeLReq.time_line_id)
                }
            },
            // {
            //     $group: {
            //         _id: {
            //             t_id: "$t_id",
            //             video_id: "$data._id",
            //             user_id: "$data.t_line.user_id"
            //         },
            //         t_lines: {
            //             $push: "$data.t_line"
            //         }
            //     }
            // }
        ]);
        console.log("projectionResult>>", projectionResult[0].data.t_line)
        return { "status": 200, "message": "Time Line Created", "data": projectionResult[0].data.t_line };

    } catch (error) {
        console.error("Error video timeline:", error);
        throw new Error(' Video Time Line failed: ' + error.message);
    }
};

//Delete Video Time Line in t_line array based upon the filter.
const deleteVideoTLine = async (createVTimeLReq) => {
    try {
        const filter2 = {
            "t_id": createVTimeLReq.t_id,
            "data": {
                $elemMatch: {
                    "_id": new ObjectId(createVTimeLReq.video_id)
                }
            }
        }

        const update = {
            $pull: {
                "data.$.t_line": {
                    "_id": new ObjectId(createVTimeLReq.time_line_id)
                }
            }
        }

        const result = await englishVideoLevel1.findOneAndUpdate(filter2, update)
        if (result) {
            return { "status": 200, "message": "Time Line Deleted" };
        } else {
            console.log('No document found matching the filter.');
            return { "status": 404, "message": "No document found matching the filter" };
        }

    } catch (error) {
        console.error("Error video timeline:", error);
        throw new Error(' Video Time Line delete failed: ' + error.message);
    }
};

// const updateVideoTLine = async (videoTimeLineReq) => {
//     try {
//         // Construct filter and update objects
//         const filter = {
//             "t_id": videoTimeLineReq.t_id,
//             "data._id": new ObjectId(videoTimeLineReq.video_id),
//             "data.t_line.user_id": videoTimeLineReq.user_id
//         };

//         const update = {
//             $set: {
//                 "data.$.t_line.$[elem]": {
//                     "user_id": videoTimeLineReq.user_id,
//                     "time": videoTimeLineReq.time
//                 }
//             }
//         };

//         const options = {
//             arrayFilters: [
//                 {"elem.user_id": videoTimeLineReq.user_id},
//                 {"data._id": new ObjectId(videoTimeLineReq.video_id)}
//             ]
//         };

//         // Update existing element
//         const updateResult = await englishVideoLevel1.updateOne(filter, update, options);

//         // If no match was found, insert a new element
//         if (updateResult.matchedCount === 0) {
//             const insertResult = await englishVideoLevel1.updateOne(
//                 {
//                     "t_id": videoTimeLineReq.t_id,
//                     "data._id": new ObjectId(videoTimeLineReq.video_id),
//                     "data.t_line.user_id": { $ne: videoTimeLineReq.user_id }
//                 },
//                 {
//                     $push: { "data.$.t_line": videoTimeLineReq }
//                 }
//             );
//             console.log("Insert Result:", insertResult);
//             // return {"status": 200, "data": insertResult};
//         }

//         console.log("Update Result:", updateResult);
//         return updateResult;
//     } catch (error) {
//         console.error("Error updating video timeline:", error);
//         throw new Error('Update Video Time Line failed: ' + error.message);
//     }
// };

//Get Video & Time Line based upon the filter.
const getVideoAndTLine = async (getVTimeLReq) => {
    try {

        const projectionResult = await englishVideoLevel1.aggregate([
            {
                $match: {
                    "t_id": getVTimeLReq.t_id
                }
            },
            {
                $unwind: "$data"
            },
            {
                $match: {
                    "data._id": new ObjectId(getVTimeLReq.video_id)
                }
            },
            {
                $unwind: "$data.t_line"
            },
            {
                $match: {
                    "data.t_line.user_id": getVTimeLReq.user_id
                }
            },
            {
                $group: {
                    _id: {
                        t_id: "$t_id",
                        video_id: "$data._id",
                        s_url: "$data.s_url",
                        owner: "$data.owner",
                        dur: "$data.dur",
                        trsc: "$data.trsc",
                        descr: "$data.descr",
                        seq: "$data.seq",
                        sts: "$data.sts",
                        ttl_cnt: "$data.ttl_cnt"
                    },
                    t_lines: {
                        $push: "$data.t_line"
                    }
                }
            }
        ]);

        if (!projectionResult.length) {

            return { "status": 404, "message": "Video not Exist" }
        }
        return { "status": 200, "message": "Success", "data": projectionResult };

    } catch (error) {
        console.error("Error in Get video timeline:", error);
        throw new Error('Get Video Time Line failed: ' + error.message);
    }
};

const saveAssignments = async (assignmentInfo) => {
    try {
        let start = moment();
        let end = moment(assignmentInfo.last_sub_dt);
        // assignmentInfo.dur = moment.duration(start.diff(end)).asDays()
        assignmentInfo.dur = end.diff(start, 'days')
        const assignmentObj = await englishAssignmentLevel1Schema.create(assignmentInfo)
        return assignmentObj;
    } catch (error) {
        throw Error('assignmentObj: ' + error.message)
    }
}

const updateAssignmentURL = async (assignmentId: string, URL: string) => {
    try {
        const updateUrl = await englishAssignmentLevel1Schema.updateOne(
            { _id: assignmentId },
            {
                $set: {
                    f_path: URL
                }
            }
        )
        return updateUrl;
    } catch (error) {
        throw Error('assignment update: ' + error.message)
    }
}

const getAssignments = async (mnt_usr_id: string, sub_id: string, t_id: string) => {
    try {
        const assignments = await englishAssignmentLevel1Schema.find({ mnt_usr_id, sub_id, t_id })
        return assignments;
    } catch (error) {
        throw new Error('Get Assignment ' + error.message);
    }
}

const addQuesChoiceLevel1 = async (questionlevel1Data) => {
    try {
        let questionsArrayLevel1 = [];
        for (let i = 0; i < questionlevel1Data.length; i++) {
            let questionStatusLevel1 = await qChoiceLevel1Schema.aggregate([
                {
                    $match: {
                        "t_id": questionlevel1Data[i].t_id,
                        "question": { $regex: questionlevel1Data[i].question, $options: "i" }
                    }
                }
            ])
            if (!questionStatusLevel1.length) {
                questionsArrayLevel1.push(questionlevel1Data[i])
            }
        }
        if (questionsArrayLevel1.length) {
            const questionDetailsLevel1 = await qChoiceLevel1Schema.insertMany(questionsArrayLevel1)
            return { "status": 200, "data": questionDetailsLevel1 };
        } else {
            return { "status": 409, "message": "Questions are Already exists in our question Bank" };
        }
    } catch (error) {
        throw new Error('addQuesChoiceLevel1 ' + error.message);
    }
}

const addQuesChoiceLevel2 = async (questionlevel2Data) => {
    try {
        let questionsArrayLevel2 = [];
        for (let i = 0; i < questionlevel2Data.length; i++) {
            let questionStatusLevel2 = await qChoiceLevel2Schema.aggregate([
                {
                    $match: {
                        "t_id": questionlevel2Data[i].t_id,
                        "question": { $regex: questionlevel2Data[i].question, $options: "i" }
                    }
                }
            ])
            if (!questionStatusLevel2.length) {
                questionsArrayLevel2.push(questionlevel2Data[i])
            }
        }
        if (questionsArrayLevel2.length) {
            const questionDetailsLevel2 = await qChoiceLevel2Schema.insertMany(questionsArrayLevel2)
            return { "status": 200, "data": questionDetailsLevel2 };
        } else {
            return { "status": 409, "message": "Questions are Already exists in our question Bank" };
        }
    } catch (error) {
        throw new Error('addQuesChoiceLevel2 ' + error.message);
    }
}

const addQuesChoiceLevel3 = async (questionlevel3Data) => {
    try {
        let questionsArrayLevel3 = [];
        for (let i = 0; i < questionlevel3Data.length; i++) {
            let questionStatusLevel3 = await qChoiceLevel3Schema.aggregate([
                {
                    $match: {
                        "t_id": questionlevel3Data[i].t_id,
                        "question": { $regex: questionlevel3Data[i].question, $options: "i" }
                    }
                }
            ])
            if (!questionStatusLevel3.length) {
                questionsArrayLevel3.push(questionlevel3Data[i])
            }
        }
        if (questionsArrayLevel3.length) {
            const questionDetailsLevel3 = await qChoiceLevel3Schema.insertMany(questionsArrayLevel3)
            return { "status": 200, "data": questionDetailsLevel3 };
        } else {
            return { "status": 409, "message": "Questions are Already exists in our question Bank" };
        }
    } catch (error) {
        throw new Error('addQuesChoiceLevel3 ' + error.message);
    }
}

const addQuesChoiceLevel4 = async (questionlevel4Data) => {
    try {
        let questionsArrayLevel4 = [];
        for (let i = 0; i < questionlevel4Data.length; i++) {
            let questionStatusLevel4 = await qChoiceLevel4Schema.aggregate([
                {
                    $match: {
                        "t_id": questionlevel4Data[i].t_id,
                        "question": { $regex: questionlevel4Data[i].question, $options: "i" }
                    }
                }
            ])
            if (!questionStatusLevel4.length) {
                questionsArrayLevel4.push(questionlevel4Data[i])
            }
        }
        if (questionsArrayLevel4.length) {
            const questionDetailsLevel4 = await qChoiceLevel4Schema.insertMany(questionsArrayLevel4)
            return { "status": 200, "data": questionDetailsLevel4 };
        } else {
            return { "status": 409, "message": "Questions are Already exists in our question Bank" };
        }
    } catch (error) {
        throw new Error('addQuesChoiceLevel4 ' + error.message);
    }
}

const addQuesFillBlanksLevel1 = async (questionlevel1Data) => {
    try {
        let questionsArrayLevel1 = [];
        for (let i = 0; i < questionlevel1Data.length; i++) {
            let questionStatusLevel1 = await englishQuestionFillBlankLevel1Schema.aggregate([
                {
                    $match: {
                        "t_id": questionlevel1Data[i].t_id,
                        "question": { $regex: questionlevel1Data[i].question, $options: "i" }
                    }
                }
            ])
            if (!questionStatusLevel1.length) {
                questionsArrayLevel1.push(questionlevel1Data[i])
            }
        }
        if (questionsArrayLevel1.length) {
            const questionDetailsLevel4 = await englishQuestionFillBlankLevel1Schema.insertMany(questionsArrayLevel1)
            return { "status": 200, "data": questionDetailsLevel4 };
        } else {
            return { "status": 409, "message": "Questions are Already exists in our question Bank" };
        }
    } catch (error) {
        console.log(error.message + " addQuesFillBlanksLevel1");
        return { "status": 400, "message": error.message };
        // throw new Error('addQuesFillBlanksLevel1 ' + error.message);
    }
}

const addQuesFillBlanksLevel2 = async (questionlevel2Data) => {
    try {
        let questionsArrayLevel2 = [];
        for (let i = 0; i < questionlevel2Data.length; i++) {
            let questionStatusLevel2 = await englishQuestionFillBlankLevel2Schema.aggregate([
                {
                    $match: {
                        "t_id": questionlevel2Data[i].t_id,
                        "question": { $regex: questionlevel2Data[i].question, $options: "i" }
                    }
                }
            ])
            if (!questionStatusLevel2.length) {
                questionsArrayLevel2.push(questionlevel2Data[i])
            }
        }
        if (questionsArrayLevel2.length) {
            const questionDetailsLevel2 = await englishQuestionFillBlankLevel2Schema.insertMany(questionsArrayLevel2)
            return { "status": 200, "data": questionDetailsLevel2 };
        } else {
            return { "status": 409, "message": "Questions are Already exists in our question Bank" };
        }
    } catch (error) {
        return { "status": 400, "message": error.message };
        // throw new Error('addQuesFillBlanksLevel2 ' + error.message);
    }
}

const addQuesFillBlanksLevel3 = async (questionlevel3Data) => {
    try {
        let questionsArrayLevel3 = [];
        for (let i = 0; i < questionlevel3Data.length; i++) {
            let questionStatusLevel3 = await englishQuestionFillBlankLevel3Schema.aggregate([
                {
                    $match: {
                        "t_id": questionlevel3Data[i].t_id,
                        "question": { $regex: questionlevel3Data[i].question, $options: "i" }
                    }
                }
            ])
            if (!questionStatusLevel3.length) {
                questionsArrayLevel3.push(questionlevel3Data[i])
            }
        }
        if (questionsArrayLevel3.length) {
            const questionDetailsLevel3 = await englishQuestionFillBlankLevel3Schema.insertMany(questionsArrayLevel3)
            return { "status": 200, "data": questionDetailsLevel3 };
        } else {
            return { "status": 409, "message": "Questions are Already exists in our question Bank" };
        }
    } catch (error) {
        return { "status": 400, "message": error.message };
        // throw new Error('addQuesFillBlanksLevel3 ' + error.message);
    }
}

const addQuesFillBlanksLevel4 = async (questionlevel4Data) => {
    try {
        let questionsArrayLevel4 = [];
        for (let i = 0; i < questionlevel4Data.length; i++) {
            let questionStatusLevel4 = await englishQuestionFillBlankLevel4Schema.aggregate([
                {
                    $match: {
                        "t_id": questionlevel4Data[i].t_id,
                        "question": { $regex: questionlevel4Data[i].question, $options: "i" }
                    }
                }
            ])
            if (!questionStatusLevel4.length) {
                questionsArrayLevel4.push(questionlevel4Data[i])
            }
        }
        if (questionsArrayLevel4.length) {
            const questionDetailsLevel4 = await englishQuestionFillBlankLevel4Schema.insertMany(questionsArrayLevel4)
            return { "status": 200, "data": questionDetailsLevel4 };
        } else {
            return { "status": 409, "message": "Questions are Already exists in our question Bank" };
        }
    } catch (error) {
        return { "status": 400, "message": error.message };
        // throw new Error('addQuesFillBlanksLevel4 ' + error.message);
    }
}

const addQuesPassageLevel1 = async (questionlevel1Data) => {
    try {
        let questionsArrayLevel1 = [];
        for (let i = 0; i < questionlevel1Data.length; i++) {
            let questionStatusLevel1 = await englishQuestionPassageLevel1Schema.aggregate([
                {
                    $match: {
                        "passage": { $regex: questionlevel1Data[i].passage, $options: "i" }
                    }
                }
            ])
            if (!questionStatusLevel1.length) {
                questionsArrayLevel1.push(questionlevel1Data[i])
            }
        }
        if (questionsArrayLevel1.length) {
            const questionDetailsLevel4 = await englishQuestionPassageLevel1Schema.insertMany(questionsArrayLevel1)
            return { "status": 200, "data": questionDetailsLevel4 };
        } else {
            return { "status": 409, "message": "Questions are Already exists in our question Bank" };
        }
    } catch (error) {
        console.log(error.message + " addQuesPassageLevel1");
        return { "status": 400, "message": error.message };
        // throw new Error('addQuesPassageLevel1 ' + error.message);
    }
}

const addQuesPassageLevel2 = async (questionlevel2Data) => {
    try {
        let questionsArrayLevel2 = [];
        for (let i = 0; i < questionlevel2Data.length; i++) {
            let questionStatusLevel2 = await englishQuestionPassageLevel2Schema.aggregate([
                {
                    $match: {
                        "passage": { $regex: questionlevel2Data[i].passage, $options: "i" }
                    }
                }
            ])
            if (!questionStatusLevel2.length) {
                questionsArrayLevel2.push(questionlevel2Data[i])
            }
        }
        if (questionsArrayLevel2.length) {
            const questionDetailsLevel4 = await englishQuestionPassageLevel2Schema.insertMany(questionsArrayLevel2)
            return { "status": 200, "data": questionDetailsLevel4 };
        } else {
            return { "status": 409, "message": "Questions are Already exists in our question Bank" };
        }
    } catch (error) {
        console.log(error.message + " addQuesPassageLevel2");
        return { "status": 400, "message": error.message };
        // throw new Error('addQuesPassageLevel2 ' + error.message);
    }
}

const addQuesPassageLevel3 = async (questionlevel3Data) => {
    try {
        let questionsArrayLevel3 = [];
        for (let i = 0; i < questionlevel3Data.length; i++) {
            let questionStatusLevel3 = await englishQuestionPassageLevel3Schema.aggregate([
                {
                    $match: {
                        "passage": { $regex: questionlevel3Data[i].passage, $options: "i" }
                    }
                }
            ])
            if (!questionStatusLevel3.length) {
                questionsArrayLevel3.push(questionlevel3Data[i])
            }
        }
        if (questionsArrayLevel3.length) {
            const questionDetailsLevel4 = await englishQuestionPassageLevel3Schema.insertMany(questionsArrayLevel3)
            return { "status": 300, "data": questionDetailsLevel4 };
        } else {
            return { "status": 409, "message": "Questions are Already exists in our question Bank" };
        }
    } catch (error) {
        console.log(error.message + " addQuesPassageLevel3");
        return { "status": 400, "message": error.message };
        // throw new Error('addQuesPassageLevel3 ' + error.message);
    }
}

const addQuesPassageLevel4 = async (questionlevel4Data) => {
    try {
        let questionsArrayLevel4 = [];
        for (let i = 0; i < questionlevel4Data.length; i++) {
            let questionStatusLevel4 = await englishQuestionPassageLevel4Schema.aggregate([
                {
                    $match: {
                        "passage": { $regex: questionlevel4Data[i].passage, $options: "i" }
                    }
                }
            ])
            if (!questionStatusLevel4.length) {
                questionsArrayLevel4.push(questionlevel4Data[i])
            }
        }
        if (questionsArrayLevel4.length) {
            const questionDetailsLevel4 = await englishQuestionPassageLevel4Schema.insertMany(questionsArrayLevel4)
            return { "status": 400, "data": questionDetailsLevel4 };
        } else {
            return { "status": 409, "message": "Questions are Already exists in our question Bank" };
        }
    } catch (error) {
        console.log(error.message + " addQuesPassageLevel4");
        return { "status": 400, "message": error.message };
        // throw new Error('addQuesPassageLevel4 ' + error.message);
    }
}

export {
    addVideoLevel1, addBookEContentLevel1, addAiEContentLevel1, addAiEContentLevel2, addAiEContentLevel3,
    addAiEContentLevel4, addTeacherEContentLevel1, addExamplesLevel1, addImportantPointsLevel1, addExcerciseLevel1,
    addquestionChoiceLevel1, addquestionChoiceLevel2, addquestionChoiceLevel3, addquestionChoiceLevel4,
    addquestionFillBlankLevel1, addquestionFillBlankLevel2, addquestionFillBlankLevel3, addquestionFillBlankLevel4,
    addQuestionPassageLevel1, addQuestionPassageLevel2, addQuestionPassageLevel3, addQuestionPassageLevel4,
    getbookEContentLevel1, getQuestionChoiceLevel1, getQuestionChoiceLevel2, getQuestionChoiceLevel3, getQuestionChoiceLevel4,
    getQuestionFillBankLevel1, getQuestionFillBankLevel2, getQuestionFillBankLevel3, getQuestionFillBankLevel4,
    getQuestionPassageLevel1, getQuestionPassageLevel2, getQuestionPassageLevel3, getQuestionPassageLevel4, getTeacherEContentLevel1, getAiEContentLevel1, getAiEContentLevel2, getAiEContentLevel3,
    getAiEContentLevel4, getQuestionsInfo, getVideoContentLevel1, getExampleLevel, getImportantPointsLevel, getExerciseLevel,
    createVideoTLine, updateVideoTLine, deleteVideoTLine, getVideoAndTLine, saveAssignments, updateAssignmentURL, getAssignments, addQuesChoiceLevel1, addQuesChoiceLevel2, addQuesChoiceLevel3, addQuesChoiceLevel4, addQuesFillBlanksLevel1, addQuesFillBlanksLevel2, addQuesFillBlanksLevel3, addQuesFillBlanksLevel4, addQuesPassageLevel1, addQuesPassageLevel2, addQuesPassageLevel3, addQuesPassageLevel4
}
