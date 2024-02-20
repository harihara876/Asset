import mongoose from "mongoose";

export const userConnectionSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    fol_ct: { type: Number },  //total following_me
    con_ct: { type: Number },  //total my connection
    circle: [
        {
            user_c_id: { type: String },
            sts: {
                type: Number,
                default: 0
            },
            rel_ty: { type: Number },    // Refer below from Lookup
            rel_ty_id: [
                {
                    src: { type: String },      // Refer below from Lookup
                    rel_ty_id: { type: Number }, // From Lookup
                    is_fol: { type: Boolean }
                }
            ],
        }
    ],
    cr_dts: { type: String, default: new Date().getTime() },
    up_dts: { type: String, default: new Date().getTime() }
})

// rel_ty / src
// =====
// 0-Buddy                rel_ty_id  = can be of any
// 1-Best Buddy         rel_ty_id  = can be of any
// 2-Mentor                  rel_ty_id = can be campus
// 3-Course Buddy       rel_ty = can be ins & campus
// 4-Subject Buddy     rel_ty - sub, course, pro, cam, coll
// 5-Collaboration Buddy     rel_ty = only project
// 6-Campus Buddy   rel = only campus
// 7-Community Buddy
// 8-Colleague            rel = Organization
// 9-Family                  rel_ty = below

// src
// ====
// Mentor
// Grade
// Course
// Subject
// Collaboration
// Campus
// Community
// Colleague
// Family

// Family Relations
// ===================
// 0-Mother,
// 1-Father,
// 2-Daughter,
// 3-Son,
// 4-Sister,
// 5-Brother,
// 6-Wife,
// 7-Husband,
// 8-Girlfriend,
// 9-Boyfriend,
// 10-Aunt,
// 11-Uncle,
// 12-Niece,
// 13-Nephew,
// 14-Cousin,
// 15-Grandmother,
// 16-Grandfather,
// 17-Granddaughter,
// 18-Grandson,
// 19-Stepmother,
// 20-Stepfather,
// 21-Stepson,
// 22-Stepdaughter,
// 23-Mother-In-Law,
// 24-Father-In-Law
// 25-Daughter-In-Law,
// 26-Son-In-Law,
// 27-Sister-In-Law
// 28-Brother-In-Law,
// 29-Guardian,
// 30-Sibling