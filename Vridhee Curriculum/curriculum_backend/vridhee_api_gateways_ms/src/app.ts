import bodyParser from 'body-parser';
import app from './api';
// import routes from './routers/routes';
import accountRoutes from './microservices/account/routers/routes';
import onboardingRoutes from './microservices/onboarding/routers/routes';
import commonRoutes from './microservices/common/routers/routes';
import campusOnBoardingMs from './microservices/campus_onboarding_ms/routers/routes';
import curriculumDashboardModuleMs from './microservices/curriculum_dashboard_module_ms/routers/routes';
import campusDashboarModuleMs from "./microservices/campus_dashboard_module_ms/routers/route"
import adminVridhee from "./microservices/admin_vridhee_ms/routers/routes"
import { microservicesurl } from './microservices/account/utils/config';
import axios from 'axios';
import { verify } from 'jsonwebtoken';
// import { rateLimit } from 'express-rate-limit';
import { configData } from './utils/config';

import moment from 'moment';
let config: any = configData;
let secretkey = config.secretkey;
const accountUrl = microservicesurl.accountUrl;
let port = 3010;

// const createAccountLimiter = rateLimit({
// windowMs: 1 * 60 * 1000, // 1 minute
// limit: 3, // Limit each IP to 3 requests per `window` 
// message: 'Too many requests from this IP, please try again after one minute',
// message: (req, res, options) => {
//     res.status(429).json({ message: 'Rate limit exceeded' });
// },
// standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
// legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// handler: (req, res, next, options) =>
//     // console.log(options)
//     // res.status(options.statusCode).send(options.message),
//     res.json(new Status(options.statusCode, options.message))
// })
// app.use((err, req, res, next) => {
//     res.status(500).json({ message: 'Internal Server Error' });
// });
// app.use("/", async (req, res) => {
//     res.send("Welcome to Vridhee API gateway...")
// });
// app.use(createAccountLimiter)

//after 22 nov demo we need to remove
app.get('/api/curriculum_dashboard_module_ms/activity', async (req, res) => {
    // console.log("activity");
    const activity = [
        {
            "sub_name": "Mathematics",
            "author": "Harsad Mehta",
            "hour": 120,
            "date": moment(new Date()).format("MM/DD/YYYY")
        },
        {
            "sub_name": "Chemistry",
            "author": "Shishir Mittal",
            "hour": 60,
            "date": moment(new Date()).add(1, 'days').format("MM/DD/YYYY")
        },
        {
            "sub_name": "Physics",
            "author": "Mr. Astro",
            "hour": 60,
            "date": moment(new Date()).add(2, 'days').format("MM/DD/YYYY")
        },
        {
            "sub_name": "Semiconductors",
            "author": "Alfredo Rhiel Madsen",
            "hour": 60,
            "date": moment(new Date()).add(3, 'days').format("MM/DD/YYYY")
        }
    ]
    return res.send({ "status": 200, "data": activity });;
});

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))
let methods = [
    "login", "verifyOTP", "forgetPassword", "setPassword", "refreshToken", "getCommonConfig",
    "getActors", "oauth", "signup", "sendOtpForEmailVerification", "checkEmailAndContactNumber",
    "getGradesdropdown", "getCurriculumTypes", "updateCurrCategory", "deleteCurrDetails", "getCourseContent", "updateTopicDescr", "getUsersCount",
    "updateUserDbMetadata", "checkIsUserLogin", "getToken", "syncGmailContacts"
];

//Common Authentication 
app.use(async (req: any, res, next) => {
    let apiKey;
    // console.log("req.originalUrl>>", req.originalUrl);
    // console.log("req.>>",req.query);
    let urlArray = req.originalUrl.split('/');
    let mainMethod = urlArray[2];
    console.log(mainMethod, urlArray[3], 'main methoddddddddddd')
    if (mainMethod === "campus_onboarding_ms" || mainMethod === "campus_dashboard_module_ms" || mainMethod === "curriculum_dashboard_module_ms") {
        next()
    }
    else if (mainMethod === "admin_vridhee_ms" || mainMethod.includes("admin_vridhee_ms")) {
        next();
    }
    else if (urlArray[3] === "ai" || urlArray[3] === "uploadImages") {
        next();
    } else {
        //  (/api/account/login)
        let method = urlArray[3] //Ex-: login
        console.log(method, 'inner method')
        let exceptionalMethod = methods.includes(method);
        let tokenuserid = req.headers.tokenuserid ? req.headers.tokenuserid : ''; //req.body.loginid
        if (method) {
            if (exceptionalMethod || method.includes('_id') || method.includes('subject') || method.includes('gradeSection') || method.includes('getLookUpDetails')) {
                next()
            }
            else if (req.headers && req.headers.authorization) {
                const parts = req.headers.authorization.split(' ');
                if (parts.length === 2 && parts[0] === 'Bearer') {
                    apiKey = parts[1];
                }
                if (apiKey) {
                    if (tokenuserid) {

                        //This Api is used for checking is user login or not.
                        await axios.post(accountUrl + 'isUserLogin', { tokenuserid, apiKey }).then(async (isUserLoginStatus) => {

                            if (isUserLoginStatus.data.isLogin) {
                                // const metadata = {
                                //     "db_id" : 1,
                                //     "collection_id": 2
                                //  }
                                //  req.body.metadata = metadata
                                let userTokens = "";
                                if (isUserLoginStatus.data.tokens.jwtAccessToken == apiKey) {
                                    //console.log("JWT Auth>>")
                                    userTokens = isUserLoginStatus.data.tokens.jwtAccessToken;
                                } else if (isUserLoginStatus.data.googleAccessToken == apiKey) {
                                    //console.log("Google Auth>>")
                                    userTokens = isUserLoginStatus.data.googleAccessToken;
                                }

                                //Verify User token
                                verify(userTokens, microservicesurl.JWT_SECRET, async (error, decoded) => {
                                    //console.log("req.query>>",req.query)
                                    //console.log("decoded>>",decoded)
                                    if (error) {
                                        res.send({ status: 401, msg: error.message })
                                        return
                                    }

                                    else if (decoded) {

                                        if (req.query && req.query.profileId || req.query.actorId) {
                                            // console.log("req.query.profileId>>1")
                                            //Checking user accessibility
                                            if (req.query.profileId == decoded.profileId) {
                                                // console.log("req.query.profileId>>2")
                                                next();
                                                return
                                            } else if (req.query.actorId && decoded.act_typ.some(item => item.typ_id === req.query.actorId)) {

                                                // Use the some() method to check if any object in the array has a matching typ_id
                                                // const typIdExists = decoded.act_typ.some(item => item.typ_id === req.query.actorId);
                                                // console.log("typIdExists>>", typIdExists);
                                                next();
                                                return
                                            } else {
                                                res.send({ status: 403, msg: "Access denied" })
                                                return
                                            }
                                        }
                                        next();
                                    }
                                    else {
                                        res.send({ status: 401, msg: "This access token or user id is not valid anymore, Please login again" });
                                        return
                                    }
                                });

                            } else {
                                res.send({ status: 401, msg: "This access token or user id is not valid anymore, Please login again 2" });
                                return
                            }
                        });

                    } else {
                        res.send({ status: 401, msg: "Token userid is required" });
                        return
                    }
                } else {
                    res.send({ status: 401, msg: "This access token or user id is not valid anymore, Please login again 1" });
                    return
                }
            }
            else {
                res.send({ status: 401, msg: "Authorization failed" })
                return
            }
        } else {
            res.send({ sts: 400, msg: "Bad Request" })
            return
        }
    }
    // //  (/api/account/login)
    // let method = urlArray[3] //Ex-: login
    // let tokenuserid = req.headers.tokenuserid ? req.headers.tokenuserid : ''; //req.body.loginid
    // if (method) {
    //     if (method == "login" || method == "verifyOTP" || method == "forgetPassword" || method == "setPassword" || method == "refreshToken" || method == "getCommonConfig" || method == "getActors") {
    //         next()
    //     } 
    //     else if (req.headers && req.headers.authorization) {
    //         const parts = req.headers.authorization.split(' ');
    //         if (parts.length === 2 && parts[0] === 'Bearer') {
    //             apiKey = parts[1];
    //         }
    //         if (apiKey) {
    //             if (tokenuserid) {

    //             //This Api is used for checking is user login or not.
    //             await axios.post(accountUrl + 'isUserLogin', {tokenuserid, apiKey}).then(async (isUserLoginStatus) => {

    //                 if (isUserLoginStatus.data.isLogin) {
    //                     let userTokens = "";
    //                     if (isUserLoginStatus.data.tokens.jwtAccessToken == apiKey) {
    //                         userTokens = isUserLoginStatus.data.tokens.jwtAccessToken;
    //                     } 

    //                     //Verify User token
    //                     verify(userTokens, microservicesurl.JWT_SECRET, async (error, decoded) => {
    //                         console.log("req.query>>",req.query)
    //                         console.log("decoded>>",decoded)
    //                         if (error) {
    //                             res.send({ status: 401, msg: error.message })
    //                             return
    //                         }

    //                         else if (decoded) {

    //                             if (req.query && req.query.profileId || req.query.actorId) {
    //                                 // console.log("req.query.profileId>>1")
    //                                 //Checking user accessibility
    //                                 if (req.query.profileId == decoded.profileId) {
    //                                     // console.log("req.query.profileId>>2")
    //                                     next();
    //                                     return
    //                                 } else if(req.query.actorId && decoded.act_typ.some(item => item.typ_id === req.query.actorId) ) {

    //                                     // Use the some() method to check if any object in the array has a matching typ_id
    //                                     // const typIdExists = decoded.act_typ.some(item => item.typ_id === req.query.actorId);
    //                                     // console.log("typIdExists>>", typIdExists);
    //                                     next();
    //                                     return
    //                                 } else {
    //                                     res.send({ status: 403, msg: "Access denied" })
    //                                     return
    //                                 } 
    //                             } 
    //                             next();
    //                         }
    //                         else {
    //                             res.send({ status: 401, msg: "This access token or user id is not valid anymore, Please login again" });
    //                             return
    //                         }
    //                     });

    //                 } else {
    //                     res.send({ status: 401, msg: "This access token or user id is not valid anymore, Please login again 2" });
    //                     return
    //                 }
    //             });

    //             } else {
    //                 res.send({status: 401, msg: "Token userid is required"});
    //                 return
    //             }
    //         } else {
    //             res.send({ status: 401, msg: "This access token or user id is not valid anymore, Please login again 1" });
    //             return
    //         }
    //     }
    //     else {
    //         res.send({ status: 401, msg: "Authorization failed" })
    //         return
    //     }
    // } else {
    //     res.send({ sts: 400, msg: "Bad Request" })
    //     return
    // }
});


app.use('/api/account', accountRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/common', commonRoutes);
app.use("/api/v1/ai/curriculum_dashboard_module_ms", curriculumDashboardModuleMs);
app.use("/api/campus_onboarding_ms", campusOnBoardingMs);
app.use("/api/campus_dashboard_module_ms", campusDashboarModuleMs);
app.use("/api/curriculum_dashboard_module_ms", curriculumDashboardModuleMs);
app.use("/api/admin_vridhee_ms", adminVridhee);

app.listen(port, () => {
    console.log("port listen on " + port);
});
