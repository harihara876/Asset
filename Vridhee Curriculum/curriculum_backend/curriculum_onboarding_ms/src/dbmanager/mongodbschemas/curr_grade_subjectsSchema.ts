import mongoose from 'mongoose';

export const subjectsSchema = new mongoose.Schema({
    curr_cat_id : { type: String, required: true },
    curr_grade_id : { type: String, required: true },
    Subject : { type: String, required: true } 
})