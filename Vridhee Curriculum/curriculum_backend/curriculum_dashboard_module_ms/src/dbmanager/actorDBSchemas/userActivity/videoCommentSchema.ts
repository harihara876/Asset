import mongoose from 'mongoose';

export const videoCommentSchema = new mongoose.Schema({
    t_id: { type: String },
    user_id: { type: String },
    c_text: { type: String },
    v_id: { type: String },
    like: { type: Number, default: 0 },
    dlike: { type: Number, default: 0 },
    reply: [
        {
            val: { type: String },
            like: { type: Number },
            dlike: { type: Number },
            ref_c_user_id: { type: String },
            c_ts: { type: String, default: new Date().getTime() }
        }
    ],
    c_ts: { type: String, default: new Date().getTime() }
});