import * as yup from 'yup';
const emailRegExP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const userDetailSchema = yup.object({
    vdisp_name: yup.string()
        .min(1, "Please enter a name more than 1 character")
        .required(),
    disp_name: yup.string()
        .min(1, "Please enter a display name more than 1 character")
        .required(),
    cont_num: yup.string().required(),
    user_pwd: yup.string()
        .required('Please Enter your password')
        .matches(
            passwordRegExp,
            "Password must contain 5 Characters, 1 Uppercase, 1 Lowercase, 1 Number"
        ),
    email: yup.string().required().matches(emailRegExP, "Invalid email address"),
    act_typ: yup.array().required(),
    dob: yup.string().required(),
    gender: yup.string().required()
});

export default userDetailSchema;