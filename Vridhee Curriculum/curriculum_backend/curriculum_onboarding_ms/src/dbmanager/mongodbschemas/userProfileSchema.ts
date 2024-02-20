import mongoose from 'mongoose';
import moment from 'moment';

export const userProfileSchema = new mongoose.Schema({
    act_typ: [
        {
            typ_id: { type: String, required: true },
            sub_typ_id: { type: String, required: true },
            is_actv: { type: Number, required: true },
        }
    ],
    db_metadata: [
        {
            db_id: { type: Number },
            collection_id: { type: String }
        }
    ],
    user_id: { type: mongoose.Schema.ObjectId, ref: "userdetail", unique: true },
    personal_info: {
        gender: { type: String, required: true },
        dob: { type: Date, default: "" },
        desc: { type: String, default: "" },
        image: { type: String, default: "" },
        pref_language: { type: String, default: "" },
        vcoins: { type: Number },
    },
    learning: {
        curr_cat_id: { type: String, default: "" },
        // curr_cat_name: { type: String, default: "" },
        curr_grade_id: { type: String, default: "" },
        // curr_grade_name: { type: String, default: "" },
        subjects: [
            {
                id: { type: String, default: "" },
                // name: { type: String, default: "" },
                rating: { type: Number, default: "" },
                no_of_months: { type: Number, default: "" },
                start_date: { type: Date, default: "" },
                end_date: { type: Date, default: "" },
                target_rating: { type: Number, default: "" },
                have_mentor: { type: String, default: "" },
                mentorMailId: { type: String, default: "" },
            }
        ],
        cr_dts: { type: Date, default: moment().utc().toISOString() },
        up_dts: { type: Date, default: "" },
        vcoins: { type: Number },
    },
    teaching: {
        curr_cat_id: { type: String, default: "" },
        // curr_cat_name: { type: String, default: "" },
        curr_grade_id: { type: String, default: "" },
        // curr_grade_name: { type: String, default: "" },
        institute_id: { type: String, default: "" },
        // institute_name: { type: String, default: "" },
        students_count: { type: Number, default: "" },
        subjects: [
            {
                id: { type: String, default: "" },
                // name: { type: String, default: "" },
                rating: { type: Number, default: "" },
            }
        ],
        cr_dts: { type: Date, default: moment().utc().toISOString() },
        up_dts: { type: Date, default: "" },
        vcoins: { type: Number },
    },
    education_details: {
        data: [
            {
                institute_id: { type: String, default: "" },
                // institute_name: { type: String, default: "" },
                curr_cat_id: { type: String, default: "" },
                // curr_cat_name: { type: String, default: "" },
                curr_grade_id: { type: String, default: "" },
                // curr_grade_name: { type: String, default: "" },
                study_field_id: { type: String, default: "" },
                // study_field: { type: String, default: "" },
                start_date: { type: Date, default: "" },
                end_date: { type: Date, default: "" },
                grade: { type: String, default: "" },
                achievements: { type: String, default: "" },
                desc: { type: String, default: "" }
            }
        ],
        cr_dts: { type: Date, default: moment().utc().toISOString() },
        up_dts: { type: Date, default: "" },
        vcoins: { type: Number },
    },
    profession_details: {
        data: [
            {
                comp_id: { type: String, default: "" },
                // company_name: { type: String, default: "" },
                design_id: { type: String, default: "" },
                // designation: { type: String, default: "" },
                area_exp_id: { type: String, default: "" },
                // area_expert: { type: String, default: "" },
                start_date: { type: Date, default: "" },
                end_date: { type: Date, default: "" },
                achievements: { type: String, default: "" },
                Descr: { type: String, default: "" }
            }
        ],
        cr_dts: { type: Date, default: moment().utc().toISOString() },
        up_dts: { type: Date, default: "" },
        vcoins: { type: Number },
    },
    awards_certificates: {
        data: [
            {
                cert_id: { type: String, default: "" },
                // cert_name: { type: String, default: "" },
                univ_id: { type: String, default: "" },
                // univ_name: { type: String, default: "" },
                cert_img: { type: String, default: "" },
                cert_no: { type: String, default: "" },
                cert_url: { type: String, default: "" },
                start_date: { type: Date, default: "" },
                end_date: { type: Date, default: "" }
            },
        ],
        cr_dts: { type: Date, default: moment().utc().toISOString() },
        up_dts: { type: Date, default: "" },
        vcoins: { type: Number },
    },
    skill_interest: {
        skill: {
            data: [
                {
                    id: { type: String, default: "" },
                    // name: { type: String, default: "" },
                    rating: { type: Number, default: "" },
                    status: { type: Number, default: "" },
                },
            ],
        },
        interest: {
            data: [
                {
                    id: { type: String, default: "" },
                    // name: { type: String, default: "" },
                    rating: { type: Number, default: "" },
                    status: { type: Number, default: "" },
                },
            ],
        },
        cr_dts: { type: Date, default: moment().utc().toISOString() },
        up_dts: { type: Date, default: "" },
        vcoins: { type: Number },
    },
    hobbies_passion: {
        hobbies: {
            data: [
                {
                    id: { type: String, default: "" },
                    // name: { type: String, default: "" },
                    rating: { type: Number, default: "" },
                    status: { type: Number, default: "" },
                },
            ],
        },
        passion: {
            data: [
                {
                    id: { type: String, default: "" },
                    // name: { type: String, default: "" },
                    rating: { type: Number, default: "" },
                    status: { type: Number, default: "" },
                },
            ],
        },
        cr_dts: { type: Date, default: moment().utc().toISOString() },
        up_dts: { type: Date, default: "" },
        vcoins: { type: Number },
    },
    // passion: {
    //     data: [
    //         {
    //             id: { type: String, default: "" },
    //             name: { type: String, default: "" },
    //             rating: { type: Number, default: "" },
    //             status: { type: Number, default: "" },
    //         },
    //     ],
    //     cr_dts: { type: Date, default: moment().utc().toISOString() },
    //     up_dts: { type: Date, default: "" },
    //     vcoins: { type: Number },
    // },
    cr_dts: { type: Date, required: true },
    up_dts: { type: Date, required: true }
})