import mongoose from 'mongoose';

export const video_like_dislike = new mongoose.Schema({
    t_id: { type: String },
    user_id: { type: String },
    sts: { type: Number },
    video_id: { type: String },
    c_ts: { type: String, default: new Date().getTime() }
});
