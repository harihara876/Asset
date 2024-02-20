import mongoose from 'mongoose';

export const classTestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mnt_user_id: { type: String, required: true },
    batch_id: { type: String, default: "" },
    sub_id: { type: String, required: true },
    ques_sheet: [{
        t_id: { type: String, required: true },
        qb_id: { type: String, required: true },
        qb_typ: { type: Number, required: true },
        marks: { type: Number, required: true },
    }],
    ttl_marks: { type: Number, required: true },
    ttl_exp_dur: { type: Number, required: true },
    sts: { type: Number, default: 1 },
    avg_rat: { type: Number, default: 0 },
    cr_dts: { type: String, default: new Date().getTime() },
    up_dts: { type: String, default: new Date().getTime() }
});