import mongoose from 'mongoose';

export const questionFillBlankLevel2Schema = new mongoose.Schema({
    t_id: String,
    question: String,
    bloom_cat_id: String,
    ans: String,
    file_url: String,
    file_typ: String,
    q_fill_typ: Number,
    src: String,
    hint: [String],
    expln: [
        {
            eid: String,
            val: String,
            file_url: String,
            file_typ: String,
            l_cnt: String,
            d_cnt: String,
            c_cnt: String,
        },
    ],
    level: Number,
    uld: [
        {
            ul: Number,
            dur_sec: Number,
        },
    ],
    kind: Number,
    for: Number,
    marks: Number,
    sts: Number,
    cr_dts: { type: String, default: new Date().getTime() },
    cr_usr: { type: String },
    up_dts: { type: String, default: new Date().getTime() },
    up_usr: { type: String }
})