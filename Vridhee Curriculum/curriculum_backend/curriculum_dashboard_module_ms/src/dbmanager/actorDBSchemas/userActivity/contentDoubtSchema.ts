import mongoose from 'mongoose';

export const contentDoubtSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    sub_id : { type: String, required: true },
    chapter_id: { type: String, required: true },
    t_id: { type: String, required: true },
    d_title: { type: String, required: true },
    d_text: { type: String, required: true },
    f_path: { type: String },
    reply: [
        {
            src: { type: String }, 
            user_id: { type: String }, 
            r_text: { type: String }, 
            r_path: { type: String }, 
            ttl_like: { type: Number, default: 0 }, 
            ttl_dlike: { type: Number, default: 0 }
        }
    ],
    c_ts: { type: String, default: new Date().getTime() }
});