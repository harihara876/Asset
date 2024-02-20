import * as yup from 'yup';

const addProfileSchema = yup.object({
    personal_info: yup.object().required(),
    user_id: yup.string().required(),
    act_typ: yup.array().required(),
});

const personalInfoSchema = yup.object({
    gender: yup.string(),
    dob: yup.date(),
    desc: yup.string(),
});

const learningSchema = yup.object({
    curr_cat_id: yup.string().required(),
    curr_cat_name: yup.string().required(),
    curr_grade_id: yup.string().required(),
    curr_grade_name: yup.string().required(),
    subjects: yup.array().required()
})

const teachingSchema = yup.object({
    curr_cat_id: yup.string().required(),
    curr_cat_name: yup.string().required(),
    curr_grade_id: yup.string().required(),
    curr_grade_name: yup.string().required(),
    institute_id: yup.string().required(),
    institute_name: yup.string().required(),
    students_count: yup.number().required(),
    subjects: yup.array().required()
})

const educationalDetailSchema = yup.object({
    data: yup.array().required()
})

const professionDetailSchema = yup.object({
    data: yup.array().required()
})

const skillInterestSchema = yup.object({
    // data: yup.array().required()
    skill: yup.object(),
    interest: yup.object()
})

const awardsCertificatesSchema = yup.object({
    data: yup.array().required()
})

const hobbiesPassionSchema = yup.object({
    // data: yup.array().required()
    hobbies: yup.object(),
    passion: yup.object(),
})

const passionSchema = yup.object({
    data: yup.array(
        yup.object({
            name: yup.string().required(),
            rating: yup.number().required(),
            status: yup.number().required()
        })
    ).required()
})

const awardDeleteSchema = yup.object({
    awards_id: yup.string().required(),
    _id: yup.string().required()
})

const professionDeleteSchema = yup.object({
    profession_id: yup.string().required(),
    _id: yup.string().required()
})

const educationDeleteSchema = yup.object({
    education_id: yup.string().required(),
    _id: yup.string().required()
})

// const awardUpdateSchema = yup.object({
//     awards_id: yup.string().required(),
//     _id: yup.string().required(),
//     cert_name: yup.string().required(),
//     univ_name: yup.string().required(),
//     cert_no: yup.string().required(),
//     cert_url: yup.string().required(),
//     start_date: yup.date().required(),
//     end_date: yup.date().required()
// })

const professionUpdateSchema = yup.object({
    profession_id: yup.string().required(),
    _id: yup.string().required(),
    company_name: yup.string().required(),
    designation: yup.string().required(),
    area_expert: yup.string().required(),
    start_date: yup.date().required()
})

const educationUpdateSchema = yup.object({
    education_id: yup.string().required(),
    _id: yup.string().required(),
    institute_name: yup.string().required(),
    curr_cat_id: yup.string().required(),
    curr_cat_name: yup.string().required(),
    study_field_id: yup.string().required(),
    study_field: yup.string().required(),
    start_date: yup.date().required()
})

export default {
    addProfileSchema, personalInfoSchema, learningSchema, teachingSchema,
    educationalDetailSchema, professionDetailSchema, skillInterestSchema, awardsCertificatesSchema,
    hobbiesPassionSchema, passionSchema, awardDeleteSchema, professionDeleteSchema, educationDeleteSchema, professionUpdateSchema, educationUpdateSchema
};