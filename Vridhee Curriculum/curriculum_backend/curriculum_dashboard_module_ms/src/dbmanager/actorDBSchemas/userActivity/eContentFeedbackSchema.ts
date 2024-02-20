import mongoose from 'mongoose';

export const eContentFeedbackSchema = new mongoose.Schema({
    t_id: { type: String },
    user_id: { type: String },
    f_text: { type: String },
    rat: { type: Number },
    content_type_id: { type: String },
    level_id: { type: String },
    c_ts: { type: String, default: new Date().getTime() }
});
