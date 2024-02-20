import mongoose from 'mongoose';

export const assignTasksToCollabarationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user_id: { type: String, required: true },
    collabaration_id: { type: String, required: true },
    assigned_users: [],
    sub_id: { type: String, required: true },
    t_id: { type: String, required: true },
    t_text: { type: String, required: true },
    t_dt: { type: String, required: true },
    t_ts: { type: String, required: true },
    t_link: { type: String },
    cr_dts: { type: String, default: new Date().getTime() },
    up_dts: { type: String, default: new Date().getTime() }
});