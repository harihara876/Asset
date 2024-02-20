import mongoose from 'mongoose';

export const userdetailSChema = new mongoose.Schema({
    act_typ: [
        {
            typ_id: { type: String, required: true },
            sub_typ_id: { type: String, required: true },
            is_actv: { type: Number, required: true }
        }
    ],
    email: { type: String, required: true, unique: true },
    user_pwd: { type: String, default: '' },
    cont_num: { type: String, default: '' },
    disp_name: { type: String, required: true },
    vdisp_name: { type: String, required: true },
    otp: { type: String, default: '' },
    otpRef: { type: String, default: '' },
    otpExpTime: { type: String, default: '' },
    pwdUpdtd: { type: String, default: "false" },
    resetLinkTime: { type: String },
    isUserLogIn: { type: Boolean, default: false },
    lastLoginDt: { type: Date },
    cr_dts: { type: Date, required: true },
    up_dts: { type: Date, required: true }
})