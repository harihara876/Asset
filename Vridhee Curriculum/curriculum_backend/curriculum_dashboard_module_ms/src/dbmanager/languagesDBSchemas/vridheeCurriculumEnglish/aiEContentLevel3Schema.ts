import mongoose from 'mongoose';

export const aiEContentLevel3Schema = new mongoose.Schema({
    t_id: { type: String },
    data: [{
        text: { type: String },
        src: { type: String },
        owner: { type: String },
        seq: { type: Number },
        sts: { type: Number },
        ttl_cnt: {
            like: { type: Number }, 
            dlike: { type: Number }, 
            share: { type: Number }, 
            comment: { type: Number }
        },
        cr_dts: { type: String, default: new Date().getTime() },
        cr_usr: { type: String },
        up_dts: { type: String, default: new Date().getTime() },
        up_usr: { type: String }
    }]
});
