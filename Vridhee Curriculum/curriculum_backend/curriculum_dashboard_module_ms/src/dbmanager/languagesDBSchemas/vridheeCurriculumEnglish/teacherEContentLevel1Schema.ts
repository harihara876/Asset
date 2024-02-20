import mongoose from 'mongoose';

export const teacherEContentLevel1Schema = new mongoose.Schema({
    chapterId: { type: Number },
    chapterName: { type: String },
    t_id: { type: String },
    topicName: { type: String },
    data: [{
        text: { type: String },
        src: { type: String },
        owner: { type: String },
        seq: { type: Number },
        sts: { type: Number },
        cr_dts: { type: String, default: new Date().getTime() },
        cr_usr: { type: String },
        up_dts: { type: String, default: new Date().getTime() },
        up_usr: { type: String }
    }]
});