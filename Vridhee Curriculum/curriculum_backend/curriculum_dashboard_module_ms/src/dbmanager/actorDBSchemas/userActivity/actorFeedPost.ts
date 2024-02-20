import mongoose from 'mongoose';

export const actorFeedPostSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    tot_like: { type: Number, default: 0 },
    tot_comment: { type: Number, default: 0 },
    tot_share: { type: Number, default: 0 },
    header: {
        h_text: { type: String, default: "" },
        desc: { type: String, default: "" },
        img_path: { type: String, default: "" }
    },
    body: {
        fd_ty: { type: Number, default: 0 },
        fd_sub_ty: { type: Number, default: 0 },
        b_title: { type: String, default: "" },
        b_text: { type: String, default: "" },
        b_desc: { type: String, default: "" },
        f_path: { type: String, default: "" },     // image path
        v_path: { type: String, default: "" },     // video path
        src: { type: String, default: "" },
        a_id: { type: String, default: "" },
        a_type: { type: String, default: "" },     // activity type	=	online/offline
        a_loc: { type: String, default: "" },
        a_url: { type: String, default: "" },      // if online only
        f_ts: { type: String, default: "" },
        t_ts: { type: String, default: "" },
        poll: {
            q_name: { type: String, default: "" },
            q_desc: { type: String, default: "" },
            opts: [
                {
                    id: { type: String, default: "" },
                    text: { type: String, default: "" },
                    seq: { type: String, default: "" } 
                }
            ]
        },
        quiz: {
            name: { type: String, default: "" },
            desc: { type: String, default: "" },
            sub_id: { type: String, default: "" },
            ques: [
                {
                    t_id: { type: String, default: "" },
                    qb_id: { type: String, default: "" },
                    qb_typ: { type: Number, default: 0 },
                    marks: { type: Number, default: 0 }
                }
            ],
            ttl_marks: { type: Number, default: 0 },
            ttl_exp_dur: { type: Number, default: 0 }     // in minutes
        }
    }
})