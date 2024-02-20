import mongoose from 'mongoose';

export const practiceTestSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    sub_id: { type: String, required: true },
    t_id: { type: String, required: true },
    ans_sheet: [{
        qb_id: { type: String, required: true },
        qb_typ: { type: Number, required: true },
        ans: { type: Array },
        ans_sts: { type: Number, required: true },
        time_taken: { type: Number, required: true },       // Time in seconds
        marks: { type: Number, required: true },
    }],
    ttl_marks: { type: Number, required: true },
    ttl_std_marks: { type: Number, required: true },
    ttl_exp_dur: { type: Number, required: true },
    ttl_act_dur: { type: Number, required: true },
    t_std_ts: { type: String, default: new Date().getTime() },
    sts: { type: Number, default: 1 },
    std_rat: { type: Number, default: 0 },
    std_fd: { type: String, default: "" },
    is_chal: { type: Number, default: 0 },
    chal_t_id: { type: String, default: "" },
    chal_rank: { type: Number, default: 0 },
    cr_dts: { type: String, default: new Date().getTime() },
    up_dts: { type: String, default: new Date().getTime() }
});