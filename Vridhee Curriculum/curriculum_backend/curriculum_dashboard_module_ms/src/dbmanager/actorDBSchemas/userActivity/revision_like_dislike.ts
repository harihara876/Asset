import mongoose from 'mongoose';

export const revision_like_dislike = new mongoose.Schema({
    t_id: { type: String },
    user_id: { type: String },
    sts: { type: Number },
    c_ts: { type: String, default: new Date().getTime() }
});
