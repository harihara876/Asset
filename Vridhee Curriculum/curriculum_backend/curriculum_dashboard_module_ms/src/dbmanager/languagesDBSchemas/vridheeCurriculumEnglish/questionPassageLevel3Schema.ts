import mongoose from 'mongoose';

export const questionPassageLevel3Schema = new mongoose.Schema({
    passage: { type: String, required: true },
    ques: [{
        t_id: { type: String, required: true },
        question: { type: String, required: true },
        options: [
            {
                oid: { type: String, required: true },
                val: { type: String, required: true },
                ans: { type: Boolean, required: true },
                file_url: { type: String, default: "" },
                file_type: { type: String, default: "" }
            }
        ],
        file_url: { type: String, default: "" },
        file_typ: { type: String, default: "" },
        q_typ: { type: Number },
        hint: { type: Array, default: [] },
        expIn: [
            {
                eid: { type: String, default: "" },
                val: { type: String, default: "" },
                file_url: { type: String, default: "" },
                file_typ: { type: String, default: "" },
                l_cnt: { type: String, default: "" },
                d_cnt: { type: String, default: "" },
                c_cnt: { type: String, default: "" }
            }
        ],
        uId: [
            {
                ul: { type: Number },
                dur_sec: { type: Number }
            }
        ],
        marks: { type: Number },
        sts: { type: Number },
        cr_dts: { type: String, default: new Date().getTime() },
        cr_usr: { type: String },
        up_dts: { type: String, default: new Date().getTime() },
        up_usr: { type: String }
    }],
    kind: { type: Number, required: true },
    for: { type: Number, required: true },
    level: { type: Number, required: true }
});