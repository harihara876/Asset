import * as yup from 'yup';

const defaultAdminModuleSchema = yup.object({
    mod_name: yup.string().required(),
    mod_priority: yup.string().required(),
    module_menu: yup.array(yup.object().shape({
        mod_menu_name: yup.string().required(),
        mod_menu_priority: yup.string().required(),
        mod_menu_url: yup.string().required()
    })).required()
});

const accessModuleSchema = yup.object({
    admin_id: yup.string().required(),
    module_menu_data: yup.array(yup.object().shape({
        admin_module_id: yup.string().required(),
        module_menu_id: yup.string().required(),
        // isAdd: yup.number().required(),
        // isEdit: yup.number().required(),
        // isDelete: yup.number().required()
    })).required()
});


export default { defaultAdminModuleSchema, accessModuleSchema };

