import mongoose from 'mongoose';

export const actorCurrActivitySummarySchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    cat_id: { type: String, required: true },
    grade_id: { type: String, required: true },
    sub_id: { type: String, required: true },
    sub_sts: { type: Number, default: 0 },
    sub_rating: { type: Number, default: 0 },
    tot_s_vid_watch: { type: Number, default: 0 },  // no of video watched so 1 vid = 1 count
    tot_s_vid_dur: { type: Number, default: 0 },
    tot_s_e_con_watch: { type: Number, default: 0 },
    tot_s_e_con_dur: { type: Number, default: 0 },
    tot_s_ques_attem : { type: Number, default: 0 },
    tot_s_ques_corr: { type: Number, default: 0 },
    tot_s_ques_attem_score: { type: Number, default: 0 },
    tot_s_ques_score: { type: Number, default: 0 },
    tot_s_ques_dur: { type: Number, default: 0 },   //In Second
    tot_s_test_given: { type: Number, default: 0 },
    tot_s_test_given_score: { type: Number, default: 0 },
    tot_s_test_score: { type: Number, default: 0 },
    tot_s_test_per: { type: Number, default: 0 },
    tot_s_assig_given: { type: Number, default: 0 },
    tot_s_assig_given_score: { type: Number, default: 0 },
    tot_s_assig_score: { type: Number, default: 0 },
    tot_s_assig_per: { type: Number, default: 0 },
    tot_s_dbt_raised: { type: Number, default: 0 },
    tot_s_dbt_ans: { type: Number, default: 0 },
    tot_s_revision: { type: Number, default: 0 },
    tot_s_note: { type: Number, default: 0 },
    tot_s_vcoin_earn: { type: Number, default: 0 },
    tot_s_help_given: { type: Number, default: 0 },
    tot_s_help_received: { type: Number, default: 0 },  
    tot_s_chal: { type: Number, default: 0 },       //(challenge)
    tot_s_prac: { type: Number, default: 0 },       //(practice test)
    tot_s_ct: { type: Number, default: 0 },         //(class test)
    tot_s_cert: { type: Number, default: 0 },       //(certificate)
    tot_s_men_msg: { type: Number, default: 0 },    //(mentor message)
    tot_s_gs: { type: Number, default: 0 },
    data: [
        {
            chap_id: { type: String, required: true },
            c_t_com: { type: Number, default: 0 },      // Total topic completed
            c_dur: { type: Number, default: 0 },        // In Second
            t_data: [
                {
                    t_id: { type: String },
                    t_u_s_lev: { type: Number, default: 0 },    // User selected level while onboarding / subject selection
                    t_u_c_lev: { type: Number, default: 0 },    // User current level - when starting a topic it wil be selected level of subject then as per tot_test_per it will be updated
                    t_sts: { type: Number, default: 0 },
                    t_dur: { type: Number, default: 0 },        // In Second
                    c_t_data:{
                        tot_vid_watch: { type: Number, default: 0 },    // no of times video watched - 1 video watched 5 times so count = 5
                        tot_vid_dur: { type: Number, default: 0 },       //In Second
                        tot_e_con_watch: { type: Number, default: 0 },
                        tot_e_con_dur: { type: Number, default: 0 },        //In Second
                        tot_L1_ques_attem: { type: Number, default: 0 },
                        tot_L1_ques_corr: { type: Number, default: 0 },
                        tot_L1_ques_attem_score: { type: Number, default: 0 },
                        tot_L1_ques_score: { type: Number, default: 0 },
                        tot_L1_ques_dur: { type: Number, default: 0 },      //In Second
                        tot_L2_ques_attem: { type: Number, default: 0 },
                        tot_L2_ques_corr: { type: Number, default: 0 },
                        tot_L2_ques_attem_score : { type: Number, default: 0 },
                        tot_L2_ques_score: { type: Number, default: 0 },
                        tot_L2_ques_dur: { type: Number, default: 0 },      //In Second
                        tot_L3_ques_attem: { type: Number, default: 0 },
                        tot_L3_ques_corr: { type: Number, default: 0 },
                        tot_L3_ques_attem_score: { type: Number, default: 0 },
                        tot_L3_ques_score: { type: Number, default: 0 },
                        tot_L3_ques_dur: { type: Number, default: 0 },      //In Second
                        tot_L4_ques_attem: { type: Number, default: 0 },
                        tot_L4_ques_corr: { type: Number, default: 0 },
                        tot_L4_ques_attem_score: { type: Number, default: 0 },
                        tot_L4_ques_score: { type: Number, default: 0 },
                        tot_L4_ques_dur: { type: Number, default: 0 },      //In Second
                        tot_test_given: { type: Number, default: 0 },
                        tot_test_given_score: { type: Number, default: 0 },
                        tot_test_score: { type: Number, default: 0 },
                        tot_test_per: { type: Number, default: 0 },         // Will decide user level
                        tot_assig_given: { type: Number, default: 0 },
                        tot_assig_given_score : { type: Number, default: 0 },
                        tot_assig_score: { type: Number, default: 0 },
                        tot_assig_per: { type: Number, default: 0 },
                        tot_dbt_raised: { type: Number, default: 0 },
                        tot_dbt_ans: { type: Number, default: 0 },
                        tot_revision: { type: Number, default: 0 },
                        tot_note: { type: Number, default: 0 },
                        tot_vcoin_earn: { type: Number, default: 0 },
                        tot_chal: { type: Number, default: 0 },
                        tot_prac: { type: Number, default: 0 },
                        tot_ct: { type: Number, default: 0 },
                        tot_men_msg: { type: Number, default: 0 }
                    }
                }
            ]
        }
    ],
    cr_dts: { type: String, default: new Date().getTime() },
    up_dts: { type: String, default: new Date().getTime() }
});