import otpGenerator from "otp-generator";

const generateOtp = async () => {
    let OTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, });
    let otpRefId = "REF" + otpGenerator.generate(10, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, }).toString();
    let otpval = OTP.substring(0, 1);
    if (otpval == "0") {
        let subStr = OTP.substring(1);
        OTP = "7" + subStr;
    }
    return { OTP, otpRefId };
}

export { generateOtp }