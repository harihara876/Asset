import mongoose from 'mongoose';

export const videoFeedbackSchema = new mongoose.Schema({
    t_id: { type: String },
    v_id: { type: String },
    user_id: { type: String },
    f_text: { type: String },
    rat: { type: Number },
    c_ts: { type: String, default: new Date().getTime() }
});