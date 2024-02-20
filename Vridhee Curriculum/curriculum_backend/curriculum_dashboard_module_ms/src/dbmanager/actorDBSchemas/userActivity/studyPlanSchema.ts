import mongoose from 'mongoose';

export const studyPlanSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, default: "" },
    freq: [
        {
            sub_id: { type: String, required: true },      // Subject Id
            cat_id: { type: String, required: true },     // curr_cat_id 
			grade_id: { type: String, required: true },   // curr_grade_id
			f_typ: { type: Number, required: true },      //  1 -- daily, 2 -- weekly (from lookupmaster)
			str_on: { type: String, required: true },     // (epoch time)
			end_on: { type: String, required: true },     // (epoch time)
			rpt_on: { type: Array }                       // (weeknames in lookupmaster)
        }
    ],
    plan: [
        {
            date: { type: String, required: true },     // (epoch time)
            t_slot: [
                {
                    f_ts: { type: String, required: true },
                    t_ts: { type: String, required: true },
                    dur: { type: Number, required: true },      // in seconds
                    sub_id: { type: String, required: true },   // Subject Id
                    cat_id: { type: String, required: true },   // curr_cat_id
                    grade_id: { type: String, required: true }  // curr_grade_id
                }
            ]
        }
    ],
    created_ts: { type: String, default: new Date().getTime() },
	updated_ts: { type: String, default: new Date().getTime() }
})