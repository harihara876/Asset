import mongoose from 'mongoose';

export const contentCommentSchema = new mongoose.Schema({
    t_id: { type: String },
    user_id: { type: String },
    c_text: [{ 
        val: { type: String },
        ref_c_user_id: { type: String },
        c_ts: { type: String, default: new Date().getTime() }
    }],
    c_ts: { type: String, default: new Date().getTime() }
});
