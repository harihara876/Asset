import mongoose from 'mongoose';

export const actorDBMetaDataSchema = new mongoose.Schema({
    db_id : { type: Number, required: true },
    db_name : { type: String, required: true },
    act_collection : []
})