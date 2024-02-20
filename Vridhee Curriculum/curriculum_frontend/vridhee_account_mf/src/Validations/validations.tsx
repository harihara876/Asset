import IUser from "../Models/IUser"

const Validation = (values: IUser) => {

    let errors = {
        name: '',
        password: ''
    }

    if (!values.name) {
        errors.name = "Usename Required";
    } else if (values.name.length <= 8) {
        errors.name = "Usename Must be morethan 8 characters";
    }

    if (!values.password) {
        errors.password = "Password Required";
    } else if (values.password.length <= 8) {
        errors.password = "Password Must be morethan 8 characters";
    }
    return errors;
}
export default Validation;
