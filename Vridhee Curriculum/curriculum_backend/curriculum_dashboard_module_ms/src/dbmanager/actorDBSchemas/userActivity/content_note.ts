import mongoose from 'mongoose';

export const content_note = new mongoose.Schema({
    t_id: { type: String },
    user_id: { type: String },
    n_text: { type: String },
    c_ts: { type: String, default: new Date().getTime() }
});
