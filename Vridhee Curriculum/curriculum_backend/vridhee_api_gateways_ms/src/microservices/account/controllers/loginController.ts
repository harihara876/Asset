import express, { Request, Response } from 'express';
import axios from 'axios';
import mongoose from 'mongoose';
import jwt, { verify } from 'jsonwebtoken';
import { isValidNumber, logger, microservicesurl } from '../utils/config';
import { ResponseWithObject, APIResponse, ResponseWithDataObject, APIResponseStatus } from '../utils/status';
import { done, CONTENT_TYPE_ERROR, userIdMsg, userId_Invalid, pwdErrMsg, ref, otpErrMsg, INVAILD_INPUT, TOKEN, PASSWORD_VAILD_MSG, confpwd, mismat, TOKEN_EXP, INVALID_TOKEN, RESET_EMAIL_MSG, location_MSG, INVAILD_USERID } from '../utils/errormsg';
import { VridheeSendEmail } from '../utils/smsEmailSend';
import { IUserLogin, IVerifyOTP, IForgetPassword, ISetPassword } from '../models/interfaces';
import { generateToken } from '../utils/generateToken';

const JWT_SECRET = microservicesurl.JWT_SECRET;
const REFRESH_JWT_SECRET = microservicesurl.REFRESH_JWT_SECRET;
const jwtExpiry = microservicesurl.REF_TOKEN_EXP; // 30days
const jwtMin = microservicesurl.TOKEN_EXP //30 min
const authURL = microservicesurl.authorization
const ismail = microservicesurl.ismail
const accountUrl = microservicesurl.accountUrl

const router = express.Router();

router.post('/login', async (req: Request<{}, {}, IUserLogin, {}>, res: Response) => {
    let body = req.body;
    let head = req.headers;
    try {
        //email and mobileno validation
        let user_check = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$/;
        if (head['content-type'] != "application/json") {
            return res.status(415).send(new APIResponse(415, CONTENT_TYPE_ERROR));
        }
        if (!body.userId) {
            return res.status(400).send(new APIResponse(400, userIdMsg));
        }
        if (!(body.userId.match(user_check))) {
            return res.status(400).send(new APIResponse(400, userId_Invalid));
        }
        else if (!body.pwd) {
            return res.status(400).send(new APIResponse(400, pwdErrMsg));
        }
        try {
            await axios.post(accountUrl + 'login', body).then(async result => {
                let response = result.data;
                //console.log("userInfo>>",result.data)
                if (response.code == 200 && response.data._id) {
                    const sid = new mongoose.Types.ObjectId().toString()
                    let resTokenObj = await generateToken(response.data);
                    let userObj: any = {};
                    userObj._2faEnabled = response.data._2fa ? true : false
                    userObj.accessToken = resTokenObj.token
                    userObj.expiresIn = resTokenObj.expiresIn
                    userObj.firstLogin = response.data.lastLoginDt ? false : true
                    userObj.refreshToken = resTokenObj.refreshToken
                    userObj.tokenType = "JWT"
                    userObj.user_id = response.data._id
                    userObj.sid = sid
                    await axios.post(`${accountUrl}logInUser`, {
                        jwtToken: {
                            jwtAccessToken: resTokenObj.token,
                            jwtRefreshToken: resTokenObj.refreshToken,
                            expiresin: resTokenObj.expiresIn
                        },
                        userId: response.data._id,
                        sid
                    })
                    return res.status(200).send(new ResponseWithObject(200, done, userObj));
                }
                else if (response.code == 200 && (response.data._2faEnabled == true)) {
                    return res.send(result.data);
                }
                else {
                    return res.status(response.code).send(result.data);
                }
            }).catch(error => {
                if (error.response == undefined) {
                    return res.status(502).send(new APIResponse(502, error.message));
                } else {
                    return res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText));
                }
            });
        }
        catch (error) {
            if (error.code == "ERR_OSSL_RSA_OAEP_DECODING_ERROR" || error.code == "ERR_OSSL_RSA_DATA_GREATER_THAN_MOD_LEN") {
                return res.status(400).send(new APIResponse(400, "Invalid password"));
            }
            else if (error.response == undefined) {
                return res.status(502).send(new APIResponse(502, error.message));
            } else {
                return res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText));
            }
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, error.message));
    }
});

router.post('/verifyOTP', async (req: Request<{}, {}, IVerifyOTP, {}>, res: Response) => {
    let body = req.body;
    let head = req.headers;
    try {
        if (head['content-type'] != "application/json") {
            return res.status(415).send(new APIResponse(415, CONTENT_TYPE_ERROR));
        }
        if (!body.ref) {
            return res.status(400).send(new APIResponse(400, ref));
        } else if (!body.otp) {
            return res.status(400).send(new APIResponse(400, otpErrMsg));
        }
        else if (!isValidNumber(body.otp)) {
            return res.status(400).send(new APIResponse(400, INVAILD_INPUT + " OTP"));
        }
        else {
            try {
                await axios.post(accountUrl + 'verifyOTP', body).then(async result => {
                    let response = result.data;
                    if (response.code == 400) {
                        return res.status(response.code).send(new APIResponse(400, response.message));
                    }
                    if (response.code == 200 && response.data._id) {
                        // let resTokenObj = await generateToken(response.data);
                        const token = jwt.sign({ userId: response.data._id }, microservicesurl.RESET_PWD_SECRET, {
                            algorithm: 'HS256'
                        });
                        let userObj: any = {};
                        // userObj._2faEnabled = response.data._2fa ? true : false
                        userObj.accessToken = token
                        userObj.firstLogin = response.data.lastLoginDt ? false : true
                        userObj.tokenType = "JWT"
                        return res.status(200).send(new ResponseWithObject(200, done, userObj));
                    }
                    else if (response.code == 200 && (response.data._2faEnabled == true)) {
                        return res.status(200).send(result.data);
                    }
                    else {
                        return res.status(response.code).send(result.data);
                    }
                }).catch(error => {
                    if (error.response == undefined) {
                        return res.status(502).send(new APIResponse(502, error.message))
                    } else {
                        return res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
                    }
                });
            }
            catch (error) {
                if (error.response == undefined) {
                    return res.status(502).send(new APIResponse(502, error.message))
                } else {
                    return res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
                }
            }
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, error.message));
    }
});

router.post('/forgetPassword', async (req: Request<{}, {}, IForgetPassword, {}>, res: Response) => {
    let body = req.body;
    let head = req.headers
    try {
        if (body) {
            if (head['content-type'] != "application/json") {
                return res.status(415).send(new APIResponse(415, CONTENT_TYPE_ERROR));
            }
            if (!body.userId) {
                return res.status(400).send(new APIResponse(400, userIdMsg));
            }
            else {
                await axios.post(accountUrl + 'forgetPassword', body).then(async result => {
                    let response = result.data.data
                    if (result.data.code == 200) {
                        // const token = jwt.sign({ userId: response._id }, microservicesurl.RESET_PWD_SECRET, {
                        //     algorithm: 'HS256'
                        // });
                        // if (Boolean(ismail)) {
                        //     try {
                        //         const msg = `Reset Password`
                        //         const subject: string = "Vridhee - Reset Password";
                        //         await VridheeSendEmail(msg, subject, body.userId, microservicesurl.email, true);
                        //     }
                        //     catch (error) {
                        //         console.log("Exception In mail : " + error.message);
                        //     }
                        // }
                        return res.status(200).send(new ResponseWithDataObject(200, RESET_EMAIL_MSG,
                            { otp: response.otp, otpRefId: response.otpRefId }))
                    } else {
                        return res.status(result.data.code).send(result.data);
                    }
                }).catch(error => {
                    if (error.response == undefined) {
                        return res.status(502).send(new APIResponse(502, error.message))
                    } else {
                        return res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
                    }
                })
            }
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, error.message))
    }
})

router.post('/setPassword', async (req: Request<{}, {}, ISetPassword, {}>, res: Response) => {
    let body = req.body;
    let head = req.headers
    try {
        let reg_Exp = new RegExp(/^(?=.*\d+)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%])[0-9a-zA-Z!@#$%]{8,100}$/);
        if (head['content-type'] != "application/json") {
            return res.status(415).send(new APIResponse(415, CONTENT_TYPE_ERROR));
        }
        if (!body.token) {
            return res.status(400).send(new APIResponse(400, TOKEN));
        }
        if (!body.pwd || body.pwd == "") {
            return res.status(400).send(new APIResponse(400, pwdErrMsg));
        }
        else if (body.pwd && !String(body.pwd).match(reg_Exp)) {
            return res.status(400).send(new APIResponse(400, PASSWORD_VAILD_MSG));
        }
        else if (!body.confPwd || body.confPwd == "") {
            return res.status(400).send(new APIResponse(400, confpwd));
        }
        else if (body.pwd !== body.confPwd) {
            return res.status(400).send(new APIResponse(400, mismat));
        }
        else {
            try {
                let decoded = jwt.verify(body.token, microservicesurl.RESET_PWD_SECRET)
                if (decoded) {
                    body.userId = decoded.userId
                    await axios.post(accountUrl + 'setPassword', body).then(async result => {
                        let response = result.data;
                        if (response.code == 200) {
                            return res.status(200).send(result.data);
                        }
                        else {
                            return res.send(result.data);
                        }
                    }).catch(error => {
                        if (error.response == undefined) {
                            return res.status(502).send(new APIResponse(502, error.message));
                        } else {
                            return res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText));
                        }
                    });
                } else {
                    return res.status(401).send(new APIResponse(401, INVALID_TOKEN));
                }
            }
            catch (error) {
                if (error.message == "invalid signature") {
                    return res.status(400).send(new APIResponse(400, INVALID_TOKEN));
                }
                else if (error.name == "JsonWebTokenError") {
                    return res.status(400).send(new APIResponse(400, INVALID_TOKEN));
                }
                else if (error.response == undefined) {
                    return res.status(502).send(new APIResponse(502, error.message));
                }
                else {
                    return res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText));
                }
            }
        }
    } catch (error) {
        return res.status(500).send(new APIResponse(500, error.message));
    }
});

/**Refresh Token API method */
router.post('/refreshToken', async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.send(new APIResponse(400, 'Refresh token is required'));
        return
    }
    verify(refreshToken, REFRESH_JWT_SECRET, async (err, data) => {
        //console.log("data>>",data)
        if (err) {
            res.send(new APIResponse(400, err.message));
            return
        }

        let userInfo = {
            user_id: data.user_id,
            act_typ: data.act_typ,
            email: data.email,
            cont_num: data.cont_num,
            disp_name: data.disp_name,
            vdisp_name: data.vdisp_name,
            profileId: data.profileId,
            gender: data.gender,
            dob: data.dob
        }
        let token = await jwt.sign(userInfo, JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: jwtMin
        });

        await axios.post(`${accountUrl}reNewAccessToken`, {
            jwtToken: {
                reNewJwtAccessToken: token,
                jwtRefreshToken: refreshToken,
            }, userId: data.user_id
        })

        let jsonResData: any = { token, refreshToken, jwtMin }
        return res.status(200).send(new ResponseWithObject(200, done, jsonResData));

    });
});

router.post('/location', async (req: Request, res: Response) => {
    let userId = req.body.user_id;
    let location = req.body.location;

    if (!userId) {
        return res.send(new APIResponseStatus(401, userIdMsg))
    }
    if (!location) {
        return res.send(new APIResponseStatus(401, location_MSG))
    }
    try {
        await axios.post(accountUrl + 'location', req.body).then(async result => {
            if (result.data.code === 200 && result.data.details.matchedCount > 0) {
                return res.send(new ResponseWithDataObject(200, result.data.message, result.data.details))
            } else if (result.data.details.matchedCount === 0) {
                return res.send(new APIResponseStatus(204, INVAILD_USERID))
            }
        }).catch(error => {
            return res.send(new APIResponseStatus(500, error.message))
        })
    } catch (error) {
        return res.send(new APIResponseStatus(500, error.message));
    }
})

router.post('/checkIsUserLogin', async (req: Request, res: Response) => {
    const { tokenuserid, authorization } = req.headers;
    if (!tokenuserid) {
        return res.send(new APIResponse(400, 'Please login'));
    }
    let token = authorization.split(' ')[1];
    try {
        await axios({
            method: 'post',
            url: `${accountUrl}checkIsUserLogin`,
            data: { tokenuserid: tokenuserid }
        }).then(async (result) => {
            let response = result.data;
            if (response.code == 200 && response.data._id) {
                await axios({
                    method: 'post',
                    url: `${accountUrl}isUserLogin`,
                    data: { tokenuserid: tokenuserid, apiKey: token }
                }).then(result => {
                    let userTokens = "";
                    if (result.data.tokens.jwtAccessToken == token) {
                        userTokens = result.data.tokens.jwtAccessToken;
                    } else if (result.data.googleAccessToken == token) {
                        userTokens = result.data.googleAccessToken;
                    } else {
                        userTokens = token;
                    }
                    verify(userTokens, microservicesurl.JWT_SECRET, async (error, decoded) => {
                        let userObj: any = {};
                        if (error) {
                            let resTokenObj = await generateToken(response.data);
                            userObj._2faEnabled = response.data._2fa ? true : false
                            userObj.accessToken = resTokenObj.token
                            userObj.expiresIn = resTokenObj.expiresIn
                            userObj.firstLogin = response.data.lastLoginDt ? false : true
                            userObj.refreshToken = resTokenObj.refreshToken
                            userObj.tokenType = "JWT"
                            userObj._id = response.data._id
                            await axios.post(`${accountUrl}logInUser`, {
                                jwtToken: {
                                    jwtAccessToken: resTokenObj.token,
                                    jwtRefreshToken: resTokenObj.refreshToken,
                                    expiresin: resTokenObj.expiresIn
                                }, userId: response.data._id
                            })
                            return res.status(200).send(new ResponseWithObject(200, done, userObj));
                        } else if (decoded) {
                            userObj._2faEnabled = response.data._2fa ? true : false;
                            userObj.accessToken = token;
                            userObj.firstLogin = response.data.lastLoginDt ? false : true;
                            userObj.refreshToken = token;
                            userObj.tokenType = "JWT"
                            userObj._id = response.data._id
                            return res.status(200).send(new ResponseWithObject(200, done, userObj));
                        } else {
                            return res.send({ status: 401, msg: "This access token or user id is not valid anymore, Please login again" });
                        }
                    });
                }).catch(error => {
                    return res.status(500).send(new APIResponse(500, error.message));
                })
            }
            else if (response.code == 200 && (response.data._2faEnabled == true)) {
                return res.send(result.data);
            }
            else {
                return res.status(response.code).send(result.data);
            }
        }).catch((error) => {
            if (error && error.response.data && error.response.data.code === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new APIResponse(400, error.message));
            }
        })
    } catch (error) {
        return res.status(500).send(new APIResponse(500, error.message));
    }
});

router.post('/getToken', async (req: Request, res: Response) => {
    const { tokenuserid } = req.headers;
    const { sid } = req.body
    if (!tokenuserid) {
        return res.send(new APIResponse(400, 'Please login'));
    }
    if (!sid) {
        return res.send(new APIResponse(400, 'sid is required parameter'));
    }
    try {
        await axios({
            method: 'post',
            url: `${accountUrl}getToken`,
            data: { tokenuserid, sid }
        }).then(async (result) => {
            let response = result.data;
            if (response.code == 200) {
                console.log(response, 'kkkkkkkkkkkkkkkkkkkk')
                let userObj: any = {};
                userObj.accessToken = response.data.jwtToken.jwtAccessToken;
                userObj.refreshToken = response.data.jwtToken.jwtRefreshToken;
                userObj.tokenType = "JWT";
                userObj._id = response.data.userId;
                userObj.sid = response.data.sid;
                return res.status(200).send(new ResponseWithObject(200, done, userObj));
            } else {
                return res.status(response.code).send(result.data);
            }
        }).catch((error) => {
            if (error && error.response.data && error.response.data.code === 400) {
                return res.send(new APIResponse(400, error.response.data.message));
            } else {
                return res.send(new APIResponse(400, error.message));
            }
        })
    } catch (error) {
        return res.status(500).send(new APIResponse(500, error.message));
    }
});

export = router;