import mongoose from 'mongoose';

export const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, default: "" },
    cr_dts: { type: String, default: new Date().getTime() },
    up_dts: { type: String, default: new Date().getTime() }
})