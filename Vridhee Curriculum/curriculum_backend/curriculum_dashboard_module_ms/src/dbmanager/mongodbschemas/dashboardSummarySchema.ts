import mongoose from 'mongoose';

export const dashboardSummarySchema = new mongoose.Schema({
    act_type: { type: String, required: true },
    summary_type: { type: Number, required: true },
    login_cnt: 	{
        learner : { type: Number, required: true },
        mentor: { type: Number, required: true },
        course: { type: Number, required: true },
        campus: { type: Number, required: true },
        content: { type: Number, required: true },
        question: { type: Number, required: true }
    }
})