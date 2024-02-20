import moment from 'moment';
import {
    hindiVideoLevel1, hindiBookEContentLevel1Schema, hindiAiEContentLevel1Schema,
    hindiAiEContentLevel2Schema, hindiAiEContentLevel3Schema, hindiAiEContentLevel4Schema,
    hindiTeacherEContentLevel1Schema, hindiExamplesLevel1Schema, hindiImportantPointsLevel1Schema,
    hindiExcerciseLevel1Schema, hindiQuestionFillBlankLevel1Schema, hindiQuestionFillBlankLevel2Schema,
    hindiQuestionFillBlankLevel3Schema, hindiQuestionFillBlankLevel4Schema, hindiQuestionChoiceLevel1Schema,
    hindiQuestionChoiceLevel2Schema, hindiQuestionChoiceLevel3Schema, hindiQuestionChoiceLevel4Schema,
    hindiQuestionPassageLevel1Schema, hindiQuestionPassageLevel2Schema, hindiQuestionPassageLevel3Schema,
    hindiQuestionPassageLevel4Schema, hindiAssignmentLevel1Schema
} from '../dbmanager/languagesDBSchemas/vridheeCurriculumHindi/dbconnection';
import { noDataAvail } from '../utils/errormsg';
import { sub_chapter } from '../dbmanager/dbconnection';
const { ObjectId } = require('mongodb');

const addVideoLevel1 = async (videoContentLevel1Obj) => {
    let filter = { "t_id": videoContentLevel1Obj.t_id };
    let videoContentDetails: any;
    try {
        const findTopic = await hindiVideoLevel1.find(filter);
        if (findTopic.length > 0) {
            videoContentDetails = await hindiVideoLevel1.updateOne(filter, { $push: { data: { $each: videoContentLevel1Obj.data } } });
            if (videoContentDetails.matchedCount === 1 && videoContentDetails.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await hindiVideoLevel1.findOne(filter);
                return updatedDocument;
            } else {
                console.log('Update did not match or modify any documents.');
            }
        } else {
            videoContentDetails = await hindiVideoLevel1.create(videoContentLevel1Obj)
        }
        return videoContentDetails;
    } catch (error) {
        throw Error('add hindiVideoLevel1' + error.message)
    }
}

const addBookEContentLevel1 = async (bookEContentLevel1Obj) => {
    let filter = { "t_id": bookEContentLevel1Obj.t_id };
    let topicDetails: any;
    try {
        const findTopic = await hindiBookEContentLevel1Schema.find(filter);
        if (findTopic.length > 0) {
            topicDetails = await hindiBookEContentLevel1Schema.updateOne(filter, { $push: { data: { $each: bookEContentLevel1Obj.data } } });
            if (topicDetails.matchedCount === 1 && topicDetails.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await hindiBookEContentLevel1Schema.findOne(filter);
                return updatedDocument;
            } else {
                console.log('Update did not match or modify any documents.');
            }
        } else {
            topicDetails = await hindiBookEContentLevel1Schema.create(bookEContentLevel1Obj)
        }
        return topicDetails;
    } catch (error) {
        throw Error('add hindiBookEContentLevel1Schema' + error.message)
    }
}

const addAiEContentLevel1 = async (aiEContentLevel1Obj) => {
    let filter = { "t_id": aiEContentLevel1Obj.t_id };
    let aiEContentLevel1Details: any;
    try {
        const findTopic = await hindiAiEContentLevel1Schema.find(filter);
        if (findTopic.length > 0) {

            aiEContentLevel1Details = await hindiAiEContentLevel1Schema.updateOne(filter, { $push: { data: { $each: aiEContentLevel1Obj.data } } });
            if (aiEContentLevel1Details.matchedCount === 1 && aiEContentLevel1Details.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await hindiAiEContentLevel1Schema.findOne(filter);
                return updatedDocument;
            } else {
                console.log('Update did not match or modify any documents.');
            }
        } else {
            aiEContentLevel1Details = await hindiAiEContentLevel1Schema.create(aiEContentLevel1Obj)
        }
        return aiEContentLevel1Details;
    } catch (error) {
        throw Error('add hindiAiEContentLevel1Schema ' + error.message)
    }
}

const addAiEContentLevel2 = async (aiEContentLevel2Obj) => {
    let filter = { "t_id": aiEContentLevel2Obj.t_id };
    let aiEContentLevel2Details: any;
    try {
        const findTopic = await hindiAiEContentLevel2Schema.find(filter);
        if (findTopic.length > 0) {
            aiEContentLevel2Details = await hindiAiEContentLevel2Schema.updateOne(filter, { $push: { data: { $each: aiEContentLevel2Obj.data } } });
            if (aiEContentLevel2Details.matchedCount === 1 && aiEContentLevel2Details.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await hindiAiEContentLevel2Schema.findOne(filter);
                return updatedDocument;
            } else {
                console.log('Update did not match or modify any documents.');
            }
        } else {
            aiEContentLevel2Details = await hindiAiEContentLevel2Schema.create(aiEContentLevel2Obj)
        }
        return aiEContentLevel2Details;
    } catch (error) {
        throw Error('add hindiAiEContentLevel2Schema ' + error.message)
    }
}

const addAiEContentLevel3 = async (aiEContentLevel3Obj) => {
    let filter = { "t_id": aiEContentLevel3Obj.t_id };
    let aiEContentLevel3Details: any;
    try {
        const findTopic = await hindiAiEContentLevel3Schema.find(filter);
        if (findTopic.length > 0) {
            aiEContentLevel3Details = await hindiAiEContentLevel3Schema.updateOne(filter, { $push: { data: { $each: aiEContentLevel3Obj.data } } });
            if (aiEContentLevel3Details.matchedCount === 1 && aiEContentLevel3Details.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await hindiAiEContentLevel3Schema.findOne(filter);
                return updatedDocument;
            } else {
                console.log('Update did not match or modify any documents.');
            }
        } else {
            aiEContentLevel3Details = await hindiAiEContentLevel3Schema.create(aiEContentLevel3Obj)
        }
        return aiEContentLevel3Details;
    } catch (error) {
        throw Error('add hindiAiEContentLevel3Schema ' + error.message)
    }
}

const addAiEContentLevel4 = async (aiEContentLevel4Obj) => {
    let filter = { "t_id": aiEContentLevel4Obj.t_id };
    let aiEContentLevel4Details: any;
    try {
        const findTopic = await hindiAiEContentLevel4Schema.find(filter);
        if (findTopic.length > 0) {
            aiEContentLevel4Details = await hindiAiEContentLevel4Schema.updateOne(filter, { $push: { data: { $each: aiEContentLevel4Obj.data } } });
            if (aiEContentLevel4Details.matchedCount === 1 && aiEContentLevel4Details.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await hindiAiEContentLevel4Schema.findOne(filter);
                return updatedDocument;
            } else {
                console.log('Update did not match or modify any documents.');
            }
        } else {
            aiEContentLevel4Details = await hindiAiEContentLevel4Schema.create(aiEContentLevel4Obj)
        }
        return aiEContentLevel4Details;
    } catch (error) {
        throw Error('add hindiAiEContentLevel4Schema ' + error.message)
    }
}

const addTeacherEContentLevel1 = async (teacherEContentLevel1Obj) => {
    let filter = { "t_id": teacherEContentLevel1Obj.t_id };
    let teacherEContentDetails: any;
    try {
        const findTopic = await hindiTeacherEContentLevel1Schema.find(filter);
        if (findTopic.length > 0) {
            teacherEContentDetails = await hindiTeacherEContentLevel1Schema.updateOne(filter, { $push: { data: { $each: teacherEContentLevel1Obj.data } } });
            if (teacherEContentDetails.matchedCount === 1 && teacherEContentDetails.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await hindiTeacherEContentLevel1Schema.findOne(filter);
                return updatedDocument;
            } else {
                console.log('Update did not match or modify any documents.');
            }
        } else {
            teacherEContentDetails = await hindiTeacherEContentLevel1Schema.create(teacherEContentLevel1Obj)
        }
        return teacherEContentDetails;
    } catch (error) {
        throw Error('add hindiTeacherEContentLevel1Schema' + error.message)
    }
}

const addExamplesLevel1 = async (examplesLevel1Obj) => {
    let filter = { "t_id": examplesLevel1Obj.t_id };
    let examplesLevel1Details: any;
    try {
        const findTopic = await hindiExamplesLevel1Schema.find(filter);
        if (findTopic.length > 0) {
            examplesLevel1Details = await hindiExamplesLevel1Schema.updateOne(filter, { $push: { data: { $each: examplesLevel1Obj.data } } });
            if (examplesLevel1Details.matchedCount === 1 && examplesLevel1Details.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await hindiExamplesLevel1Schema.findOne(filter);
                return updatedDocument;
            } else {
                console.log('Update did not match or modify any documents.');
            }
        } else {
            examplesLevel1Details = await hindiExamplesLevel1Schema.create(examplesLevel1Obj)
        }
        return examplesLevel1Details;
    } catch (error) {
        throw Error('add hindiExamplesLevel1Schema ' + error.message)
    }
}

const addImportantPointsLevel1 = async (importantPointsLevel1Obj) => {
    let filter = { "t_id": importantPointsLevel1Obj.t_id };
    let importantPointsLevel1Details: any;
    try {
        const findTopic = await hindiImportantPointsLevel1Schema.find(filter);
        if (findTopic.length > 0) {
            importantPointsLevel1Details = await hindiImportantPointsLevel1Schema.updateOne(filter, { $push: { data: { $each: importantPointsLevel1Obj.data } } });
            if (importantPointsLevel1Details.matchedCount === 1 && importantPointsLevel1Details.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await hindiImportantPointsLevel1Schema.findOne(filter);
                return updatedDocument;
            } else {
                console.log('Update did not match or modify any documents.');
            }
        } else {
            importantPointsLevel1Details = await hindiImportantPointsLevel1Schema.create(importantPointsLevel1Obj)
        }
        return importantPointsLevel1Details;
    } catch (error) {
        throw Error('add hindiImportantPointsLevel1Schema' + error.message)
    }
}

const addExcerciseLevel1 = async (excerciseLevel1Obj) => {
    let filter = { "t_id": excerciseLevel1Obj.t_id };
    let excerciseDetails: any;
    try {
        const findTopic = await hindiExcerciseLevel1Schema.find(filter);
        if (findTopic.length > 0) {
            excerciseDetails = await hindiExcerciseLevel1Schema.updateOne(filter, { $push: { data: { $each: excerciseLevel1Obj.data } } });
            if (excerciseDetails.matchedCount === 1 && excerciseDetails.modifiedCount === 1) {
                // Update was successful, now retrieve the updated document
                const updatedDocument = await hindiExcerciseLevel1Schema.findOne(filter);
                return updatedDocument;
            } else {
                console.log('Update did not match or modify any documents.');
            }
        } else {
            excerciseDetails = await hindiExcerciseLevel1Schema.create(excerciseLevel1Obj)
        }
        return excerciseDetails;
    } catch (error) {
        throw Error('add hindiExcerciseLevel1Schema' + error.message)
    }
}

const addquestionChoiceLevel1 = async (qChoiceLevel1Obj) => {
    try {
        let questionStatus = await hindiQuestionChoiceLevel1Schema.aggregate([
            {
                $match: {
                    "t_id": qChoiceLevel1Obj.t_id,
                    "question": { $regex: qChoiceLevel1Obj.question, $options: "i" }
                }
            },
        ])
        if (questionStatus.length === 0) {
            const questionDetails = await hindiQuestionChoiceLevel1Schema.create(qChoiceLevel1Obj)
            return { "status": 200, "data": questionDetails };
        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };
        }
    } catch (error) {
        throw Error('add hindiQuestionChoiceLevel1Schema' + error.message)
    }
}

const addquestionChoiceLevel2 = async (qChoiceLevel2Obj) => {
    try {
        let questionStatus = await hindiQuestionChoiceLevel2Schema.aggregate([
            {
                $match: {
                    "t_id": qChoiceLevel2Obj.t_id,
                    "question": { $regex: qChoiceLevel2Obj.question, $options: "i" }
                }
            },
        ])
        if (questionStatus.length === 0) {
            const questionDetails = await hindiQuestionChoiceLevel2Schema.create(qChoiceLevel2Obj)
            return { "status": 200, "data": questionDetails };
        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };
        }
    } catch (error) {
        throw Error('add hindiQuestionChoiceLevel2Schema' + error.message)
    }
}

const addquestionChoiceLevel3 = async (qChoiceLevel3Obj) => {
    try {
        let questionStatus = await hindiQuestionChoiceLevel3Schema.aggregate([
            {
                $match: {
                    "t_id": qChoiceLevel3Obj.t_id,
                    "question": { $regex: qChoiceLevel3Obj.question, $options: "i" }
                }
            },
        ])
        if (questionStatus.length === 0) {
            const questionDetails = await hindiQuestionChoiceLevel3Schema.create(qChoiceLevel3Obj)
            return { "status": 200, "data": questionDetails };
        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };
        }
    } catch (error) {
        throw Error('add hindiQuestionChoiceLevel3Schema' + error.message)
    }
}

const addquestionChoiceLevel4 = async (qChoiceLevel4Obj) => {
    try {
        let questionStatus = await hindiQuestionChoiceLevel4Schema.aggregate([
            {
                $match: {
                    "t_id": qChoiceLevel4Obj.t_id,
                    "question": { $regex: qChoiceLevel4Obj.question, $options: "i" }
                }
            },
        ])
        if (questionStatus.length === 0) {
            const questionDetails = await hindiQuestionChoiceLevel4Schema.create(qChoiceLevel4Obj)
            return { "status": 200, "data": questionDetails };
        } else {
            return { "status": 409, "message": "Questions is Already exists in our question Bank" };
        }
    } catch (error) {
        throw Error('add hindiQuestionChoiceLevel4Schema' + error.message)
    }
}

const addquestionFillBlankLevel1 = async (questionFillBlankLevel1Obj) => {
    try {
        let questionStatus = await hindiQuestionFillBlankLevel1Schema.aggregate([
            {
                $match: {
                    "t_id": questionFillBlankLevel1Obj.t_id,
                    "question": { $regex: questionFillBlankLevel1Obj.question, $options: "i" }
                }
            },
        ])
        if (questionStatus.length === 0) {
            const questionDetails = await hindiQuestionFillBlankLevel1Schema.create(questionFillBlankLevel1Obj)
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
        let questionStatus = await hindiQuestionFillBlankLevel2Schema.aggregate([
            {
                $match: {
                    "t_id": questionFillBlankLevel2Obj.t_id,
                    "question": { $regex: questionFillBlankLevel2Obj.question, $options: "i" }
                }
            },
        ])

        if (questionStatus.length === 0) {
            const questionDetails = await hindiQuestionFillBlankLevel2Schema.create(questionFillBlankLevel2Obj)
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
        let questionStatus = await hindiQuestionFillBlankLevel3Schema.aggregate([
            {
                $match: {
                    "t_id": questionFillBlankLevel3Obj.t_id,
                    "question": { $regex: questionFillBlankLevel3Obj.question, $options: "i" }
                }
            },
        ])

        if (questionStatus.length === 0) {
            const questionDetails = await hindiQuestionFillBlankLevel3Schema.create(questionFillBlankLevel3Obj)
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
        let questionStatus = await hindiQuestionFillBlankLevel4Schema.aggregate([
            {
                $match: {
                    "t_id": questionFillBlankLevel4Obj.t_id,
                    "question": { $regex: questionFillBlankLevel4Obj.question, $options: "i" }
                }
            },
        ])

        if (questionStatus.length === 0) {
            const questionDetails = await hindiQuestionFillBlankLevel4Schema.create(questionFillBlankLevel4Obj)
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
        let question = await hindiQuestionPassageLevel1Schema.aggregate([
            {
                $match: {
                    "passage": { $regex: questionPassageLevel1Obj.passage, $options: "i" }
                }
            },
        ])
        if (question.length === 0) {
            const questionDetails = await hindiQuestionPassageLevel1Schema.create(questionPassageLevel1Obj)
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
        let question = await hindiQuestionPassageLevel2Schema.aggregate([
            {
                $match: {
                    "passage": { $regex: questionPassageLevel2Obj.passage, $options: "i" }
                }
            },
        ])
        if (question.length === 0) {
            const questionDetails = await hindiQuestionPassageLevel2Schema.create(questionPassageLevel2Obj)
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
        let question = await hindiQuestionPassageLevel3Schema.aggregate([
            {
                $match: {
                    "passage": { $regex: questionPassageLevel3Obj.passage, $options: "i" }
                }
            },
        ])
        if (question.length === 0) {
            const questionDetails = await hindiQuestionPassageLevel3Schema.create(questionPassageLevel3Obj)
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
        let question = await hindiQuestionPassageLevel4Schema.aggregate([
            {
                $match: {
                    "passage": { $regex: questionPassageLevel4Obj.passage, $options: "i" }
                }
            },
        ])
        if (question.length === 0) {
            const questionDetails = await hindiQuestionPassageLevel4Schema.create(questionPassageLevel4Obj)
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
        bookEContentDetails = await hindiBookEContentLevel1Schema.find(filter);
        if (bookEContentDetails.length > 0) {

            return bookEContentDetails;

        } else {

            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add hindiBookEContentLevel1Schema' + error.message)
    }
}

const getQuestionFillBankLevel1 = async (questionFillBankLevel1Obj) => {
    try {
        const questionFillBank1Details = await hindiQuestionFillBlankLevel1Schema.find({
            "t_id": { $in: questionFillBankLevel1Obj.t_id },
            "kind": questionFillBankLevel1Obj.kind,
            "for": questionFillBankLevel1Obj.for
        });

        if (questionFillBank1Details.length > 0) {
            return questionFillBank1Details;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        console.log("hindiQuestionFillBankLevel1Schema' + error.message", error.message)
        throw Error('add hindiQuestionFillBankLevel1Schema' + error.message)
    }
}

const getQuestionFillBankLevel2 = async (questionFillBankLevel2Obj) => {
    try {
        const questionFillBank2Details = await hindiQuestionFillBlankLevel2Schema.find({
            "t_id": { $in: questionFillBankLevel2Obj.t_id },
            "kind": questionFillBankLevel2Obj.kind,
            "for": questionFillBankLevel2Obj.for
        });

        if (questionFillBank2Details.length > 0) {
            return questionFillBank2Details;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        console.log("hindiQuestionFillBankLevel2Schema' + error.message", error.message)
        throw Error('add hindiQuestionFillBankLevel2Schema' + error.message)
    }
}

const getQuestionFillBankLevel3 = async (questionFillBankLevel3Obj) => {
    try {
        const questionFillBank3Details = await hindiQuestionFillBlankLevel3Schema.find({
            "t_id": { $in: questionFillBankLevel3Obj.t_id },
            "kind": questionFillBankLevel3Obj.kind,
            "for": questionFillBankLevel3Obj.for
        });

        if (questionFillBank3Details.length > 0) {
            return questionFillBank3Details;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        console.log("hindiQuestionFillBankLevel3Schema' + error.message", error.message)
        throw Error('add hindiQuestionFillBankLevel3Schema' + error.message)
    }
}

const getQuestionFillBankLevel4 = async (questionFillBankLevel4Obj) => {
    try {
        const questionFillBank4Details = await hindiQuestionFillBlankLevel4Schema.find({
            "t_id": { $in: questionFillBankLevel4Obj.t_id },
            "kind": questionFillBankLevel4Obj.kind,
            "for": questionFillBankLevel4Obj.for
        });

        if (questionFillBank4Details.length > 0) {
            return questionFillBank4Details;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        console.log("hindiQuestionFillBankLevel4Schema' + error.message", error.message)
        throw Error('add hindiQuestionFillBankLevel4Schema' + error.message)
    }
}

const getQuestionChoiceLevel1 = async (questionChoiceLevel1Obj) => {
    try {
        const questionChoiceDetails = await hindiQuestionChoiceLevel1Schema.find({
            "t_id": { $in: questionChoiceLevel1Obj.t_id },
            "kind": questionChoiceLevel1Obj.kind,
            "for": questionChoiceLevel1Obj.for
        });
        if (questionChoiceDetails.length > 0) {
            return questionChoiceDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add hindiQuestionChoiceLevel1Schema' + error.message)
    }
}


const getQuestionChoiceLevel2 = async (questionChoiceLevel2Obj) => {
    try {
        const questionChoiceDetails = await hindiQuestionChoiceLevel2Schema.find({
            "t_id": { $in: questionChoiceLevel2Obj.t_id },
            "kind": questionChoiceLevel2Obj.kind,
            "for": questionChoiceLevel2Obj.for
        });
        if (questionChoiceDetails.length > 0) {
            return questionChoiceDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add hindiQuestionChoiceLevel2Schema' + error.message)
    }
}


const getQuestionChoiceLevel3 = async (questionChoiceLevel3Obj) => {
    try {
        const questionChoiceDetails = await hindiQuestionChoiceLevel3Schema.find({
            "t_id": { $in: questionChoiceLevel3Obj.t_id },
            "kind": questionChoiceLevel3Obj.kind,
            "for": questionChoiceLevel3Obj.for
        });
        if (questionChoiceDetails.length > 0) {
            return questionChoiceDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add hindiQuestionChoiceLevel3Schema' + error.message)
    }
}


const getQuestionChoiceLevel4 = async (questionChoiceLevel4Obj) => {
    try {
        const questionChoiceDetails = await hindiQuestionChoiceLevel4Schema.find({
            "t_id": { $in: questionChoiceLevel4Obj.t_id },
            "kind": questionChoiceLevel4Obj.kind,
            "for": questionChoiceLevel4Obj.for
        });
        if (questionChoiceDetails.length > 0) {
            return questionChoiceDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add hindiQuestionChoiceLevel4Schema' + error.message)
    }
}


const getQuestionPassageLevel1 = async (questionPassageLevel1Obj) => {
    try {
        const questionPassage1Details = await hindiQuestionPassageLevel1Schema.find({
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
        console.log("hindiQuestionPassageLevel1Schema' + error.message", error.message)
        throw Error('add hindiQuestionPassageLevel1Schema' + error.message)
    }
}


const getQuestionPassageLevel2 = async (questionPassageLevel2Obj) => {
    try {
        const questionPassage2Details = await hindiQuestionPassageLevel2Schema.find({
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
        console.log("hindiQuestionPassageLevel2Schema' + error.message", error.message)
        throw Error('add hindiQuestionPassageLevel2Schema' + error.message)
    }
}


const getQuestionPassageLevel3 = async (questionPassageLevel3Obj) => {
    try {
        const questionPassage3Details = await hindiQuestionPassageLevel3Schema.find({
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
        console.log("hindiQuestionPassageLevel3Schema' + error.message", error.message)
        throw Error('add hindiQuestionPassageLevel3Schema' + error.message)
    }
}


const getQuestionPassageLevel4 = async (questionPassageLevel4Obj) => {
    try {
        const questionPassage4Details = await hindiQuestionPassageLevel4Schema.find({
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
        console.log("hindiQuestionPassageLevel4Schema' + error.message", error.message)
        throw Error('add hindiQuestionPassageLevel4Schema' + error.message)
    }
}

const getTeacherEContentLevel1 = async (teacherEContentReq) => {
    let filter = { "t_id": teacherEContentReq.t_id };
    let teacherEContentData: any;
    try {
        teacherEContentData = await hindiTeacherEContentLevel1Schema.find(filter);
        if (teacherEContentData.length > 0) {

            return teacherEContentData;

        } else {

            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add hindiTeacherEContentLevel1Schema' + error.message)
    }
}

const getAiEContentLevel1 = async (aiEContentLevel1Req) => {
    let filter = { "t_id": aiEContentLevel1Req.t_id };
    let aiEContentLevel1Data: any;
    try {
        aiEContentLevel1Data = await hindiAiEContentLevel1Schema.find(filter);
        if (aiEContentLevel1Data.length > 0) {

            return aiEContentLevel1Data;

        } else {

            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add hindiAiEContentLevel1Schema' + error.message)
    }
}

const getAiEContentLevel2 = async (aiEContentLevel2Req) => {
    let filter = { "t_id": aiEContentLevel2Req.t_id };
    let aiEContentLevel2Data: any;
    try {
        aiEContentLevel2Data = await hindiAiEContentLevel2Schema.find(filter);
        if (aiEContentLevel2Data.length > 0) {

            return aiEContentLevel2Data;

        } else {

            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add hindiAiEContentLevel2Schema' + error.message)
    }
}

const getAiEContentLevel3 = async (aiEContentLevel3Req) => {
    let filter = { "t_id": aiEContentLevel3Req.t_id };
    let aiEContentLevel3Data: any;
    try {
        aiEContentLevel3Data = await hindiAiEContentLevel3Schema.find(filter);
        if (aiEContentLevel3Data.length > 0) {

            return aiEContentLevel3Data;

        } else {

            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add hindiAiEContentLevel3Schema' + error.message)
    }
}

const getAiEContentLevel4 = async (aiEContentLevel4Req) => {
    let filter = { "t_id": aiEContentLevel4Req.t_id };
    let aiEContentLevel4Data: any;
    try {
        aiEContentLevel4Data = await hindiAiEContentLevel4Schema.find(filter);
        if (aiEContentLevel4Data.length > 0) {

            return aiEContentLevel4Data;

        } else {

            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('add hindiAiEContentLevel4Schema' + error.message)
    }
}

const getQuestionsInfo = async (questionsReq) => {
    const { subjects, chapters, topics, question_type } = questionsReq;
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

        // Combine arrays
        const combineTopics = topicList === undefined || !topicList.length ? topics : topicList[0].topics.concat(topics);
        // Remove duplicates using Set
        const allTopics = [...new Set(combineTopics)];

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

            const questionLists = await getQuestionsByuserSelection(question_type, t_idFilter, passageTopicIds);

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

const getQuestionsByuserSelection = async (type, t_idFilter, passageTopicIds) => {
    switch (type) {
        case 0:
            return await hindiQuestionChoiceLevel1Schema.find(t_idFilter);
        case 1:
            return await hindiQuestionChoiceLevel2Schema.find(t_idFilter);
        case 2:
            return await hindiQuestionChoiceLevel3Schema.find(t_idFilter);
        case 3:
            return await hindiQuestionChoiceLevel4Schema.find(t_idFilter);
        case 4:
            return await hindiQuestionFillBlankLevel1Schema.find(t_idFilter);
        case 5:
            return await hindiQuestionFillBlankLevel2Schema.find(t_idFilter);
        case 6:
            return await hindiQuestionFillBlankLevel3Schema.find(t_idFilter);
        case 7:
            return await hindiQuestionFillBlankLevel4Schema.find(t_idFilter);
        case 8:
            return await hindiQuestionPassageLevel1Schema.aggregate(passageTopicIds);
        case 9:
            return await hindiQuestionPassageLevel2Schema.aggregate(passageTopicIds);
        case 10:
            return await hindiQuestionPassageLevel3Schema.aggregate(passageTopicIds);
        case 11:
            return await hindiQuestionPassageLevel4Schema.aggregate(passageTopicIds);
        default:
            return 'Invalid type';
    }
};


const getVideoContentLevel1 = async (videoContentLevel1Obj) => {
    let filter = { "t_id": videoContentLevel1Obj.t_id };
    let videoContentDetails: any;
    try {
        videoContentDetails = await hindiVideoLevel1.find(filter);
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
        exampleLevelDetails = await hindiExamplesLevel1Schema.find(filter);
        console.log(hindiExamplesLevel1Schema)
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
        importantPointsDetails = await hindiImportantPointsLevel1Schema.find(filter);
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
        exerciseLevelDetails = await hindiExcerciseLevel1Schema.find(filter);
        if (exerciseLevelDetails.length > 0) {
            return exerciseLevelDetails;
        } else {
            return { "status": 404, "message": noDataAvail }
        }
    } catch (error) {
        throw Error('getExerciseLevel: ' + error.message)
    }
}

const saveAssignments = async (assignmentInfo) => {
    try {
        let start = moment();
        let end = moment(assignmentInfo.last_sub_dt);
        // assignmentInfo.dur = moment.duration(start.diff(end)).asDays()
        assignmentInfo.dur = end.diff(start, 'days')
        const assignmentObj = await hindiAssignmentLevel1Schema.create(assignmentInfo)
        return assignmentObj;
    } catch (error) {
        throw Error('assignmentObj: ' + error.message)
    }
}

const updateAssignmentURL = async (assignmentId: string, URL: string) => {
    try {
        const updateUrl = await hindiAssignmentLevel1Schema.updateOne(
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
        const assignments = await hindiAssignmentLevel1Schema.find({ mnt_usr_id, sub_id, t_id })
        return assignments;
    } catch (error) {
        throw new Error('Get Assignment ' + error.message);
    }
}

export {
    addVideoLevel1, addBookEContentLevel1, addAiEContentLevel1, addAiEContentLevel2, addAiEContentLevel3,
    addAiEContentLevel4, addTeacherEContentLevel1, addExamplesLevel1, addImportantPointsLevel1, addExcerciseLevel1,
    addquestionChoiceLevel1, addquestionChoiceLevel2, addquestionChoiceLevel3, addquestionChoiceLevel4,
    addquestionFillBlankLevel1, addquestionFillBlankLevel2, addquestionFillBlankLevel3, addquestionFillBlankLevel4,
    addQuestionPassageLevel1, addQuestionPassageLevel2, addQuestionPassageLevel3, addQuestionPassageLevel4,
    getbookEContentLevel1, getQuestionFillBankLevel1, getQuestionFillBankLevel2, getQuestionFillBankLevel3,
    getQuestionFillBankLevel4, getQuestionChoiceLevel1, getQuestionChoiceLevel2, getQuestionChoiceLevel3,
    getQuestionChoiceLevel4, getQuestionPassageLevel1, getQuestionPassageLevel2, getQuestionPassageLevel3,
    getQuestionPassageLevel4, getTeacherEContentLevel1, getAiEContentLevel1, getAiEContentLevel2, getAiEContentLevel3,
    getAiEContentLevel4, getQuestionsInfo, getVideoContentLevel1, getExampleLevel, getImportantPointsLevel, getExerciseLevel,
    saveAssignments, updateAssignmentURL, getAssignments
}