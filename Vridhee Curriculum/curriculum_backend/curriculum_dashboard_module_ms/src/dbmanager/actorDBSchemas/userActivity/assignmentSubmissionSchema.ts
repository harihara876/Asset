import mongoose from 'mongoose';

export const assignmentSubmissionSchema = new mongoose.Schema({
    a_id: { type: String, required: true },
    user_id: { type: String, required: true },
    sub_id: { type: String, required: true },
    t_id: { type: String, required: true },
    s_text: { type: String, required: true },
    f_path: { type: String },
    rec_pts: [{ a_p_id: { type: String }, rec_pt: { type: Number } }],
    oth_lnr_pts: [{
        a_p_id: { type: String },
        user_id: { type: String },
        t_rec_pt: { type: Number },
        l_rec_pt: { type: Number },
        my_rec_pt: { type: Number }
    }],
    my_avg_pts: { type: Number, default: 0 },
    my_rank: { type: Number, default: 0 },
    last_sub_dt: { type: Date, required: true },
    cr_dts: { type: String, default: new Date().getTime() },
    up_dts: { type: String, default: new Date().getTime() }
});