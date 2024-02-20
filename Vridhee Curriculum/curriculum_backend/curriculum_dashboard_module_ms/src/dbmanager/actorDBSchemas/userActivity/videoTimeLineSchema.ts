import mongoose from 'mongoose';

export const videoTimeLine = new mongoose.Schema({
    name: { type: String },
    t_id: { type: String },
    user_id: { type: String },
    sts: { type: Number },
    video_id: { type: String },
    ttl_clk: { type: Number },
    f_ts: { type: String },
    c_ts: { type: String, default: new Date().getTime() }
});
