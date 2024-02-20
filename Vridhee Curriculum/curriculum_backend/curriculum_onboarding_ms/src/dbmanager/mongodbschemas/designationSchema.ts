import mongoose from "mongoose";

export const designationSchema = new mongoose.Schema({
    name : { type: String, required: true},
    cr_dts : { type: Date, default: "" },
    up_dts : { type: Date, default: "" }
})