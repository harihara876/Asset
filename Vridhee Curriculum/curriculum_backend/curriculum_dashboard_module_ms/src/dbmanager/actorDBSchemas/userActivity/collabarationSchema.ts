import mongoose from 'mongoose';

export const collabarationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user_id: { type: String, required: true },
    sub_id: { type: String, required: true },
    chap_id: { type: String, required: true },
    t_id: { type: String, required: true },
    c_text: { type: String, required: true },
    c_dt: { type: String, required: true },                 // Collabaration Date
    c_ts: { type: String, required: true },                 // Collabaration Time
    c_type: { type: Number, required: true },               // Collabaration type from lookup
    c_avg_rate: { type: Number, default: 0 },
    c_link: { type: String },
    t_allow: { type: Number, default: 0 },                  // Time allow before join
    is_allow: { type: Number, required: true },
    j_list: [{
        c_u_id: { type: String, required: true },
        c_u_sts: { type: Number, default: 2 },              // Collabaration user status from lookup
        c_rate: { type: Number, default: 0 }
    }],
    cr_dts: { type: String, default: new Date().getTime() },
    up_dts: { type: String, default: new Date().getTime() }
});