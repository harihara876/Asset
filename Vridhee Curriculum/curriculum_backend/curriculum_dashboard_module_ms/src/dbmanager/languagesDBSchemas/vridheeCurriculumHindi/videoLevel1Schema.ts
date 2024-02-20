import mongoose from 'mongoose';

export const videoLevel1Schema = new mongoose.Schema({
    t_id: { type: String },
    data: [{
        s_url: { type: String },
        src: { type: String },
        owner: { type: String },
        dur: { type: String },
        trsc: { type: String },
        descr: { type: String },
        seq: { type: Number },
        sts: { type: Number },
        cr_dts: { type: String, default: new Date().getTime() },
        cr_usr: { type: String },
        up_dts: { type: String, default: new Date().getTime() },
        up_usr: { type: String },
        ttl_cnt: {
            like: { type: Number }, 
            dlike: { type: Number }, 
            share: { type: Number }, 
            comment: { type: Number }
        },
        t_line: [
            {
                name: { type: String},
                user_id: { type: String },
                time: { type: String },
                rating: { type: Number, default: 0 },
                ttl_urate: {type: Number, default: 0 }
            }
        ]
    }],
});
