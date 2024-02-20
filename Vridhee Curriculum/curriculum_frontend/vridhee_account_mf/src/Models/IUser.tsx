export default interface IUser {
    type?: string;
    desc?: string;
    img_url?: string;
    _id?: string | undefined;

    val?: string;

    name?: string;
    password?: string

    token?: string;
    pwd?: string;
    confPwd?: string;

    userId?: string;
    email?: string;

    otp?: string;
    ref?: string;

}
