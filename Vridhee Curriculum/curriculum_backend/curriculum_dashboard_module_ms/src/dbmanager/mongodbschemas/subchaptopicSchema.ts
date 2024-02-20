import mongoose, { Schema } from 'mongoose';

export const subchaptopicSchema = new mongoose.Schema({
    sub_id: { type: String, required: true },
    isUpdated: { type: Number, default: 0 },    //0,1,2
    // seq: { type: Number },
    chapter: {
        num: { type: Number },
        name: { type: String, required: true },
        // grade: { type: String, default: "" },
        ty_brd_grd: [
            {   
                cat_id: { type: String },
                grd_id: { type: String },
                brd_id: { type: String },
                prd: { type: Number },
                mar: { type: Number }
            }
        ],
        unit: { type: String, default: "" },
        marks: { type: Number, default: 0 },
        period: { type: Number, default: 0 },
        e_book: [
            {
                name: { type: String, default: "" },
                author: { type: String, default: "" },
                src: { type: String, default: "" },
                link: { type: String, default: "" },
                format: { type: String, default: "" }
            }
        ],
        topics: [
            {
                // rel_t_id: { type: String, default: "" },
                name: { type: String, default: "" },
                descr: { type: String, default: "" },
                seq: { type: Number, default: "" },
                isVerified: { type: Number, default: 0 },   //0,1,2
                // cur_tag: [
                //     {
                //         cur_cat: [],
                //         grd: [],
                //         brd: []
                //     }
                // ],
                cur_tag: [
                    {
                        cat_id: { type: String },
                        grd_id: { type: String },
                        brd_id: { type: String },
                        prd: { type: Number },
                        mar: { type: Number },
                        rel_t_id: { type: Schema.Types.ObjectId }
                    }
                ],
                ttl_cnt: {
                    t_vid: { type: Number },
                    t_e_book: { type: Number },
                    t_ai_e_cont: { type: Number },
                    t_tchr_e_cont: { type: Number },
                    t_imp_word: { type: Number },
                    t_exmp: { type: Number },
                    t_imp_pts: { type: Number },
                    t_exer: { type: Number },
                    t_ques: { type: Number },
                    t_revi: { type: Number },
                    t_assign: { type: Number },
                    t_discn: { type: Number }
                },
                cr_dts: { type: String, default: new Date().getTime() },
                cr_usr: { type: String, default: "" },
                up_dts: { type: String, default: new Date().getTime() },
                up_usr: { type: String, default: "" }
            }
        ]
    },
    cr_dts: { type: String, default: new Date().getTime() },
    up_dts: { type: String, default: new Date().getTime() },
    cr_usr: { type: String, default: "" },
    up_usr: { type: String, default: "" }
})