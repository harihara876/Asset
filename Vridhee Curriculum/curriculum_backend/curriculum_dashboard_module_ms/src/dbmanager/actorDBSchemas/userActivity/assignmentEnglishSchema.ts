import mongoose from 'mongoose';

export const assignmentEnglishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    src: { type: String, required: true },
    mnt_usr_id: { type: String, required: true },
    batch_id: { type: String, required: true },
    sub_id: { type: String, required: true },
    t_id: { type: String, required: true },
    a_text: { type: String, required: true },
    i_text: { type: String, required: true }, // Instruction text
    f_path: { type: String },
    a_pts: [{ rub_name: { type: String }, rub_pt: { type: Number } }],
    last_sub_dt: { type: Date, required: true },
    dur: { type: Number, required: true }, //Duration in days
    cr_dts: { type: String, default: new Date().getTime() },
    up_dts: { type: String, default: new Date().getTime() }
});