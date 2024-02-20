import mongoose from 'mongoose';

export const actorSchema = new mongoose.Schema({
    type : { type: String, required: true},
    desc : { type: String, required: true},
    seq : { type: Number, required: true},
    img_url : { type: String, default: ""},
    prf_list : [],
    sub_typ : [],
    cr_dts : { type: Date, required: true }
})

// export const actordataSchema = mongoose.model("actor", actorSchema, "actor")