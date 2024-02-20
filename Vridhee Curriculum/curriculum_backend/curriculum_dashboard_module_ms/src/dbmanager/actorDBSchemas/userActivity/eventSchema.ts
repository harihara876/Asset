import mongoose from "mongoose";

export const eventSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    freq: {
        f_typ: { type: Number, required: true },        //  1 -- daily, 2 -- weekly (from lookupmaster)
        str_on: { type: String, required: true },       // (epoch time)
        end_on: { type: String, required: true },	    // (epoch time)
        rpt_on: { type: Array },                        // (weeknames in lookupmaster)
    },
    plan: [
        {
            date: { type: String, required: true },     // (epoch time)
            t_slot: [
                {
                    f_ts: { type: String, required: true },
                    t_ts: { type: String, required: true },
                    dur: { type: Number, required: true },
                    a_typ: { type: Number, required: true },    // (activity_type from lookupmaster)
                    name: { type: String, default: '' },
                    desc: { type: String, default: '' },
                    image: { type: String, default: '' },
                    f_path: { type: String, default: '' }
                }
            ]
        }
    ],
    created_ts: { type: String, default: new Date().getTime() },
	updated_ts: { type: String, default: new Date().getTime() }
})