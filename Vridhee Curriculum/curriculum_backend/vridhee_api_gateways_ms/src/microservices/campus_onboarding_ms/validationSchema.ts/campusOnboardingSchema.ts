import * as yup from 'yup';

const campusGroupSchema = yup.object({
    group_name: yup.string().required(),
    group_type: yup.string().required().oneOf(["Single", "SubGroup"]),
});

const campusDesignationSchema = yup.object({
    campus_group_id: yup.string().required(),
    designation_name: yup.string().required(),
    priority: yup.number().required(),
    status: yup.string().required(),
    module_menu_data: yup.array(yup.object().shape({
        campus_module_id: yup.string().required(),
        module_menu_id: yup.string().required(),
        isAdd: yup.string().required().oneOf(["Yes", "No"]),
        isEdit: yup.string().required().oneOf(["Yes", "No"]),
        isDelete: yup.string().required().oneOf(["Yes", "No"]),
    })).required()
});

const campusDefaultModuleSchema = yup.object({
    mod_name: yup.string().required(),
    mod_priority: yup.string().required(),
    mod_status: yup.number().required(),
    mod_icon: yup.string().required(),
    module_menu: yup.array(yup.object().shape({
        mod_menu_name: yup.string().required(),
        mod_menu_priority: yup.string().required(),
        mod_menu_status: yup.string().required(),
        mod_menu_url: yup.string().required(),
        type: yup.string().required(),
        for: yup.string().required(),
    })).required()
});

const campusSchema = yup.object({
    campus_group_id: yup.string().required(),
    campus_type: yup.string().required(),
    campus_name: yup.string().required(),
    campus_gender_type: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    district: yup.string().required(),
    user_id: yup.string().required(),
});

const campusCourseSchema = yup.object({
    campus_group_id: yup.string().required(),
    course_name: yup.string().required(),
    course_order: yup.number().required()
});

const campusUserSchema = yup.object({
    user_type: yup.string().required(),
    user_id: yup.string().required(),
    campus_group_id: yup.string().required(),
    campus_id: yup.string().required(),
    designation_id: yup.string().required()
});


const campusUserOnboardSchema = yup.object({
    disp_name: yup.string().required(),
    email: yup.string().required(),
    cont_num: yup.string().required(),
    user_type: yup.string().required(),
    campus_group_id: yup.string().required(),
    campus_id: yup.string().required(),
});

const campusFeeCategory = yup.object({
    name: yup.string().required(),
    status: yup.number().required().oneOf([0, 1]),
    campus_group_id: yup.string().required(),
    campus_id: yup.string().required()
});

const campusFeeType = yup.object({
    apply_for: yup.string().required(),
    fee_for: yup.string().required(),
    status: yup.number().required().oneOf([0, 1]),
    campus_group_id: yup.string().required(),
    campus_id: yup.string().required()
});

export default { campusGroupSchema, campusDesignationSchema, campusSchema, campusCourseSchema, campusUserSchema, campusDefaultModuleSchema, campusUserOnboardSchema, campusFeeCategory, campusFeeType }