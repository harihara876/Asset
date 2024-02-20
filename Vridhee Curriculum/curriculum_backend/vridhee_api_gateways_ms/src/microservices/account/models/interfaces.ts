export interface IActorQuery {
    "actorId": string
}

export interface IUserLogin {
    "userId": string,
    "pwd": string
}

export interface IVerifyOTP {
    "ref": string,
    "otp": number
}

export interface IForgetPassword {
    "userId": string
}

export interface ISetPassword {
    "userId": string,
    "token": string,
    "pwd": string,
    "confPwd": string
}

// export interface IProfileQuery {
//     "profileId": string,
//     "profileSection": string
// }

// export interface IProfileId {
//     "profileId": string
// }

// export interface IS3BucketKey {
//     "key": string
// }