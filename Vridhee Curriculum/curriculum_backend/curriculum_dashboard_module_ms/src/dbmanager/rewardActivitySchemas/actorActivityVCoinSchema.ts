import mongoose from 'mongoose';

export const actorActivityVCoinSchema = new mongoose.Schema({
    user_id: { type: String, required: true },		// (learner)
    activity_id: { type: String, required: true },  // (comes from loyalty_coin (_id))
    u_vcoin_earn: { type: Number, default : 0 },    // (default 0),
    vcoin_reedem: { type: Number, default : 0 },    // (default 0),,
    ref_trans: [
        {
            ref_typ: { type: Number, default : 0 }, // (default 0),
            ref_typ_id: { type: String, default: "" }, 
            vcoin_earn: { type: Number, default : 0 }, // (default 0),
        }
    ],
    v_take_coin: { type: Number, default : 0 },	    // (default 0),
    v_take_amt: { type: Number, default : 0 },
    trans_details: [
        {
            pg_id: { type: String, default: "" }, // (comes from payment_gateway), 
            ref_trans_id: { type: String, default: "" }, 
            amt_paid: { type: Number, default : 0 }, 
            trans_sts: { type: Number, default : 0 }, 
            rec_email_id: { type: String, default: "" }, 
            trans_typ: { type: String, default: "" },        // credit or debit or net banking, 
            bank_trans_id:{ type: String, default: "" }, 
            trans_remark: { type: String, default: "" }, 
            gw_trans_id: { type: String, default: "" }, 
            bank: { type: String, default: "" },  
            trans_ts: { type: String, default: new Date().getTime() }
        }
    ],	
    country_code: { type: String, default: "" },
    cr_ts: { type: String, default: new Date().getTime() }
}
)