import * as yup from 'yup';


const defaultNotificationSchema = yup.object({
  module_id: yup.string().required(),
  menu_id: yup.string().required(),
  name: yup.string().required(),
  for: yup.string().required().oneOf(['Student', 'Employee', 'Parent']),
});

const campusNotificationSchema = yup.array().of(yup.object({
  campus_group_id: yup.string().required(),
  module_id: yup.string().required(),
  menu_id: yup.string().required(),
  default_notification_id: yup.number().required(),
  is_default: yup.number()
}));

const campusNotificationInfoSchema = yup.object({
  campus_group_id: yup.string().required(),
});

const getNoftificationInfoSchema = yup.object({
  campus_group_id: yup.string().required()
});

const getCampusDetailsByGroupIdSchema = yup.object({
  campus_group_id: yup.string().required()
});

const campusNotificationSmsPushWhatsappSchema = yup.object({
  user_id: yup.string().required()
});

const campusNotificationEmailSchema = yup.object({
  campus_group_id: yup.string().required(),
  user_id: yup.string().required(),
  user_email_id: yup.string().required(),
  email_subject: yup.string().required(),
  email_body: yup.string().required(),
  is_sent: yup.string().required(),
});

const campusUserOnboardSchema = yup.object({
  disp_name: yup.string().required(),
  email: yup.string().required(),
  cont_num: yup.string().required(),
  user_type: yup.string().required(),
  campus_group_id: yup.string().required(),
  campus_id: yup.string().required(),
});


export default { defaultNotificationSchema, campusNotificationSchema, campusNotificationInfoSchema, campusNotificationEmailSchema, getNoftificationInfoSchema, getCampusDetailsByGroupIdSchema, campusNotificationSmsPushWhatsappSchema, campusUserOnboardSchema };

