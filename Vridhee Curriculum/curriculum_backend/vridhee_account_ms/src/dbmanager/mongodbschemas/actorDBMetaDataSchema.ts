import mongoose from 'mongoose';

export const actorDBMetaDataSchema = new mongoose.Schema({
    db_id: { type: Number, required: true },
    db_name: { type: String, default: "" },
    act_collection: [],
})