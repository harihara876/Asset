import mongoose from 'mongoose';
import { configData } from '../../../utils/config';
import { videoLevel1Schema } from './videoLevel1Schema';
import { bookEContentLevel1Schema } from './bookEContentLevel1Schema';
import { aiEContentLevel1Schema } from './aiEContentLevel1Schema';
import { aiEContentLevel2Schema } from './aiEContentLevel2Schema';
import { aiEContentLevel3Schema } from './aiEContentLevel3Schema';
import { aiEContentLevel4Schema } from './aiEContentLevel4Schema';
import { teacherEContentLevel1Schema } from './teacherEContentLevel1Schema';
import { examplesLevel1Schema } from './examplesLevel1Schema';
import { importantPointsLevel1Schema } from './importantPointsLevel1Schema';
import { excerciseLevel1Schema } from './excerciseLevel1Schema';
import { questionChoiceLevel1Schema } from './questionChoiceLevel1Schema';
import { questionChoiceLevel2Schema } from './questionChoiceLevel2Schema';
import { questionChoiceLevel3Schema } from './questionChoiceLevel3Schema';
import { questionChoiceLevel4Schema } from './questionChoiceLevel4Schema';
import { questionFillBlankLevel1Schema } from './questionFillBlankLevel1Schema';
import { questionFillBlankLevel2Schema } from './questionFillBlankLevel2Schema';
import { questionFillBlankLevel3Schema } from './questionFillBlankLevel3Schema';
import { questionFillBlankLevel4Schema } from './questionFillBlankLevel4Schema';
import { questionPassageLevel1Schema } from './questionPassageLevel1Schema';
import { questionPassageLevel2Schema } from './questionPassageLevel2Schema';
import { questionPassageLevel3Schema } from './questionPassageLevel3Schema';
import { questionPassageLevel4Schema } from './questionPassageLevel4Schema';
import { assignmentLevel1Schema } from './assignmentLevel1Schema';

let config: any = configData

let dbURL = config.dbURL;
let defdb = config.vridheeCurriculumHindi.defdb;
let dbConnect: any
let primaryConnection: any

let hindiVideoLevel1, hindiBookEContentLevel1Schema, hindiAiEContentLevel1Schema,
    hindiAiEContentLevel2Schema, hindiAiEContentLevel3Schema, hindiAiEContentLevel4Schema,
    hindiTeacherEContentLevel1Schema, hindiExamplesLevel1Schema, hindiImportantPointsLevel1Schema,
    hindiExcerciseLevel1Schema,
    hindiQuestionFillBlankLevel1Schema, hindiQuestionFillBlankLevel2Schema,
    hindiQuestionFillBlankLevel3Schema, hindiQuestionFillBlankLevel4Schema, hindiQuestionChoiceLevel1Schema,
    hindiQuestionChoiceLevel2Schema, hindiQuestionChoiceLevel3Schema, hindiQuestionChoiceLevel4Schema,
    hindiQuestionPassageLevel1Schema, hindiQuestionPassageLevel2Schema, hindiQuestionPassageLevel3Schema,
    hindiQuestionPassageLevel4Schema, hindiAssignmentLevel1Schema

let hindiDBURL;
export async function makeHindiConnection() {
    const db = mongoose.createConnection(dbURL, { maxPoolSize: 1000, maxConnecting: 100, maxIdleTimeMS: 100 });

    db.on('error', function (error) {
        db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
    });
    db.on('connected', function () {
        console.log(`Connected to server: ${defdb}: ${dbURL}`)
    });

    db.on('disconnected', function () {
    });

    return db;
}

export {
    primaryConnection, hindiVideoLevel1, hindiBookEContentLevel1Schema, hindiAiEContentLevel1Schema,
    hindiAiEContentLevel2Schema, hindiAiEContentLevel3Schema, hindiAiEContentLevel4Schema,
    hindiTeacherEContentLevel1Schema, hindiExamplesLevel1Schema, hindiImportantPointsLevel1Schema,
    hindiExcerciseLevel1Schema,
    hindiQuestionFillBlankLevel1Schema, hindiQuestionFillBlankLevel2Schema,
    hindiQuestionFillBlankLevel3Schema, hindiQuestionFillBlankLevel4Schema, hindiQuestionChoiceLevel1Schema,
    hindiQuestionChoiceLevel2Schema, hindiQuestionChoiceLevel3Schema, hindiQuestionChoiceLevel4Schema,
    hindiQuestionPassageLevel1Schema, hindiQuestionPassageLevel2Schema, hindiQuestionPassageLevel3Schema,
    hindiQuestionPassageLevel4Schema, hindiAssignmentLevel1Schema
}

export { hindiDBURL }
export async function createHindiConnection() {
    return dbConnect = await makeHindiConnection();
}

export async function createHindiSecondaryConnection(dbConnect) {
    primaryConnection = await dbConnect.useDb(defdb)
    hindiDBURL = primaryConnection; // this is only used for User Activity Service or meta data.
    hindiVideoLevel1 = primaryConnection.model("video_level_1", videoLevel1Schema, "video_level_1")
    hindiBookEContentLevel1Schema = primaryConnection.model("book_e-content_level_1", bookEContentLevel1Schema, "book_e-content_level_1")
    hindiAiEContentLevel1Schema = primaryConnection.model("ai_e-content_level_1", aiEContentLevel1Schema, "ai_e-content_level_1")
    hindiAiEContentLevel2Schema = primaryConnection.model("ai_e-content_level_2", aiEContentLevel2Schema, "ai_e-content_level_2")
    hindiAiEContentLevel3Schema = primaryConnection.model("ai_e-content_level_3", aiEContentLevel3Schema, "ai_e-content_level_3")
    hindiAiEContentLevel4Schema = primaryConnection.model("ai_e-content_level_4", aiEContentLevel4Schema, "ai_e-content_level_4")
    hindiTeacherEContentLevel1Schema = primaryConnection.model("teacher_e-content_level_1", teacherEContentLevel1Schema, "teacher_e-content_level_1")
    hindiExamplesLevel1Schema = primaryConnection.model("examples_level_1", examplesLevel1Schema, "examples_level_1")
    hindiImportantPointsLevel1Schema = primaryConnection.model("important_points_level_1", importantPointsLevel1Schema, "important_points_level_1")
    hindiExcerciseLevel1Schema = primaryConnection.model("excercise_level_1", excerciseLevel1Schema, "excercise_level_1")

    hindiQuestionFillBlankLevel1Schema = primaryConnection.model("question_fill_blank_level_1", questionFillBlankLevel1Schema, "question_fill_blank_level_1")
    hindiQuestionFillBlankLevel2Schema = primaryConnection.model("question_fill_blank_level_2", questionFillBlankLevel2Schema, "question_fill_blank_level_2")
    hindiQuestionFillBlankLevel3Schema = primaryConnection.model("question_fill_blank_level_3", questionFillBlankLevel3Schema, "question_fill_blank_level_3")
    hindiQuestionFillBlankLevel4Schema = primaryConnection.model("question_fill_blank_level_4", questionFillBlankLevel4Schema, "question_fill_blank_level_4")

    hindiQuestionChoiceLevel1Schema = primaryConnection.model("question_choice_level_1", questionChoiceLevel1Schema, "question_choice_level_1")
    hindiQuestionChoiceLevel2Schema = primaryConnection.model("question_choice_level_2", questionChoiceLevel2Schema, "question_choice_level_2")
    hindiQuestionChoiceLevel3Schema = primaryConnection.model("question_choice_level_3", questionChoiceLevel3Schema, "question_choice_level_3")
    hindiQuestionChoiceLevel4Schema = primaryConnection.model("question_choice_level_4", questionChoiceLevel4Schema, "question_choice_level_4")

    hindiQuestionPassageLevel1Schema = primaryConnection.model("question_passage_level_1", questionPassageLevel1Schema, "question_passage_level_1")
    hindiQuestionPassageLevel2Schema = primaryConnection.model("question_passage_level_2", questionPassageLevel2Schema, "question_passage_level_2")
    hindiQuestionPassageLevel3Schema = primaryConnection.model("question_passage_level_3", questionPassageLevel3Schema, "question_passage_level_3")
    hindiQuestionPassageLevel4Schema = primaryConnection.model("question_passage_level_4", questionPassageLevel4Schema, "question_passage_level_4")

    hindiAssignmentLevel1Schema = primaryConnection.model("assignment_level_1", assignmentLevel1Schema, "assignment_level_1")

}