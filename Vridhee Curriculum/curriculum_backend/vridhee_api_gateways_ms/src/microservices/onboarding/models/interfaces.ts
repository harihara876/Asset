// export interface IActorQuery {
//     "actorId": string
// }

// export interface IUserLogin {
//     "userId": string,
//     "pwd": string
// }

// export interface IVerifyOTP {
//     "ref": string,
//     "otp": number
// }

// export interface IForgetPassword {
//     "userId": string
// }

// export interface ISetPassword {
//     "userId": string,
//     "token": string,
//     "pwd": string,
//     "confPwd": string
// }

export interface IProfileQuery {
    "profileId": string,
    "profileSection": string
}

export interface IProfileId {
    "profileId": string
}

export interface IS3BucketKey {
    "key": string
}

export interface IDeleteAwardQuery {
    "awards_id": string,
    "_id": string
}

export interface IDeleteProfessionQuery {
    "profession_id": string,
    "_id": string
}

export interface IDeleteEducationQuery {
    "education_id": string,
    "_id": string
}

// export interface IUpdateAwardQuery {
//     "awards_id": string, 
//     "_id": string, 
//     "cert_name": string, 
//     "univ_name": string, 
//     "cert_no": string, 
//     "cert_url": string, 
//     "start_date": Date, 
//     "end_date": Date
// }

// export interface IupdateAwardData {
//     awards_id: string,
//     _id: string,
//     cert_name: string,
//     univ_name: string,
//     cert_no: string,
//     cert_url: string,
//     start_date: Date,
//     end_date: Date
// }

export interface ICategoryId {
    "categoryId": string
}

export interface IUserIdQuery {
    "userId": string
}