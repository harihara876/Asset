import mongoose from 'mongoose';

export const lookupmasterSchema = new mongoose.Schema({
    name : { type: String, required: true },
    data: [
        {
            id: { type: String },
            seq: { type: Number },
            val: { type: String },
            desc: { type: String },
            min: { type: Number },
            max: { type: Number }
        }
    ]
})