import express from 'express';
import axios from 'axios';
import { verify } from 'jsonwebtoken';

import commonVridheeCurriculumController from "../controllers/commonVridheeCurriculumController";
import curriculumSubChapTopicController from "../controllers/subChapTopicController";
import deleteUsersController from "../controllers/deleteController";
import curriculumCategories from "../controllers/currCategoryController";
import adminModulesController from "../controllers/modulesControllers/defaultadminmodulesController";
import adminAccessModulesController from "../controllers/modulesControllers/adminaccessmodulesController";
import adminuserDetailsController from "../controllers/userdetailsControllers/userDetailsController";
import accessmemberController from "../controllers/accessControllers/memberController";
import { configData, microservicesurl } from '../utils/config';

const router = express.Router();

let methods = [
    "adminlogin", "adminlogout", "adminsignup", "verifyOTP", "forgetPassword", "setPassword", "refreshToken", "sendOtpForEmailVerification", "checkEmailAndContactNumber",
    "checkIsUserLogin", "getToken"
];

router.use(async (req: any, res, next) => {
    let apiKey;
    let urlArray = req.originalUrl.split('/');
    let tokenuserid = req.headers.tokenuserid ? req.headers.tokenuserid : '';
    //  (/api/account/login)
    let method = urlArray[4] //Ex-: login
    console.log(method, 'inner method');
    let exceptionalMethod = methods.includes(method);
    if (exceptionalMethod) {
        next();
        return
    }
    else if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            apiKey = parts[1];
        };
        if (apiKey) {
            if (tokenuserid) {
                //This Api is used for checking is user login or not.
                await axios.post(configData.adminVridheeMsUrl + 'isUserLogin', { tokenuserid, apiKey })
                    .then(async (isUserLoginStatus) => {
                        const { isLogin, tokens } = isUserLoginStatus.data;
                        if (isLogin) {
                            const userTokens = tokens.jwtAccessToken;
                            verify(userTokens, microservicesurl.JWT_SECRET, async (error, decoded) => {
                                if (error) {
                                    return res.send({ status: 401, msg: error.message });
                                }
                                else if (decoded) {
                                    next();
                                    return;
                                }
                                else {
                                    return res.send({ status: 401, msg: "This access token or user id is not valid anymore, Please login again" });
                                };

                            });
                        }
                        else {
                            return res.send({ status: 401, msg: "This access token or user id is not valid anymore, Please login again 2" });
                        };
                    })
                    .catch((err) => {
                        return res.send({ status: 400, msg: err.message });
                    });
            }
            else {
                return res.send({ status: 401, msg: "Token userid is required" });
            };
        }
        else {
            return res.send({ status: 401, msg: "This access token or user id is not valid anymore, Please login again 1" });
        };
    }
    else {
        return res.send({ status: 401, msg: "Authorization failed" })
    };
});

router.use("/curriculum", curriculumSubChapTopicController);
router.use("/categories", curriculumCategories);
router.use("/modules", adminModulesController);
router.use("/adminmodules", adminAccessModulesController);
router.use("/users", adminuserDetailsController);
router.use("/members", accessmemberController);
router.use(deleteUsersController);
router.use(commonVridheeCurriculumController);

export default router;

