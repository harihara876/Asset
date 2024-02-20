import mongoose from 'mongoose';

export const classTestAnswerSchema = new mongoose.Schema({
    c_test_id: { type: String, required: true },
    user_id: { type: String, required: true },
    ans_sheet: [{
        t_id: { type: String, required: true },
        qb_id: { type: String, required: true },
        ans: [],
        ans_sts: { type: Number, required: true },
        marks: { type: Number, required: true },
    }],
    ttl_std_marks: { type: Number, required: true },
    ttl_act_dur: { type: Number, required: true },
    t_std_ts: { type: String, required: true },
    sts: { type: Number, default: 1 },
    std_rat: { type: Number, default: 0 },
    std_fd: { type: String, default: "" },
    cr_dts: { type: String, default: new Date().getTime() },
    up_dts: { type: String, default: new Date().getTime() }
});