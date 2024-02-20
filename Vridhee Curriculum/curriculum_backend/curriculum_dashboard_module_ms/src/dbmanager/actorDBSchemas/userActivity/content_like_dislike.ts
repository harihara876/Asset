import mongoose from 'mongoose';

export const content_like_dislike = new mongoose.Schema({
    t_id: { type: String },
    user_id: { type: String },
    sts: { type: Number },
    content_type_id: { type: String },
    level_id: { type: String },
    content_level_object_id: { type: String },
    c_ts: { type: String, default: new Date().getTime() }
});
