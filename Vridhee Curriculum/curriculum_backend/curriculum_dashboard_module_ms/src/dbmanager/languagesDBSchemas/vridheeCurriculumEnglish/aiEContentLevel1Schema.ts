import mongoose from 'mongoose';

export const aiEContentLevel1Schema = new mongoose.Schema({
    t_id: { type: String },
    data: [{ 
        text: { type: String },
        src: { type: String },
        owner: { type: String },
        seq: { type: Number },
        sts: { type: Number },
        ttl_cnt: {
            like: { type: Number, default: 0}, //0 means no count or no user activity
            dlike: { type: Number, default: 0}, //0 means no count or no user activity
            share: { type: Number, default: 0}, 
            comment: { type: Number, default: 0}
        },
        cr_dts: { type: String, default: new Date().getTime() },
        cr_usr: { type: String },
        up_dts: { type: String, default: new Date().getTime() },
        up_usr: { type: String }
    }]
});
