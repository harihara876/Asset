import mongoose from 'mongoose'

export const userDashboardSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    ttl_cnt : {
        curr_inprogress : { type: Number, required: true },
        curr_completed : { type: Number, required: true },
        certificates : { type: Number, required: true },
        activities : { type: Number, required: true },
        learning_hrs : { type: Number, required: true },
        doubts : { type: Number, required: true },
        vcoins_earned : { type: Number, required: true }
    }
})