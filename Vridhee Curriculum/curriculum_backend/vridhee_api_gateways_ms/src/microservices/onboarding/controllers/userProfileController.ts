import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { configData, microservicesurl } from '../utils/config';
import { APIResponse, Status, ResponseWithData } from '../utils/status';
import validateUserProfile from '../middlewares/validateUserProfile';
import userProfileSchema from '../validationSchemas/userProfileSchema';
const authURL = microservicesurl.authorization
import { IProfileQuery, IProfileId, IDeleteAwardQuery, IDeleteProfessionQuery, IDeleteEducationQuery, IUserIdQuery } from '../models/interfaces';
import multer from 'multer';
const upload = multer();

router.post('/userprofile', validateUserProfile.validateUserProfile(userProfileSchema.addProfileSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await axios({
                method: 'post',
                url: `${configData.onboardingUrl}addUserProfile`,
                data: req.body
            }).then((user) => {
                return res.send(new Status(user.data.code, user.data.message, user.data.data));
            }).catch(function (error) {
                return res.send(new Status(400, error.message));
            })
        } catch (error) {
            return res.send(new Status(400, error.message));
        }
    })

router.put('/userprofile', validateUserProfile.updateUserProfile(userProfileSchema),
    async (req: Request<{}, {}, {}, IProfileQuery>, res: Response, next: NextFunction) => {
        const { profileId, profileSection } = req.query;
        if (!profileId) {
            return res.send(new Status(400, 'Profile id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(profileId)) {
            return res.send(new Status(400, 'Invalid profile id'));
        }
        if (!profileSection) {
            return res.send(new Status(400, 'Profile section is mandatory'));
        }
        try {
            await axios({
                method: 'put',
                url: `${configData.onboardingUrl}updateUserProfile?profileId=${profileId}&profileSection=${profileSection}`,
                data: req.body
            }).then((user) => {
                return res.send(new Status(user.data.code, user.data.message, user.data.data));
            }).catch((error) => {
                return res.send(new Status(400, error.message));
            })
        } catch (error) {
            return res.send(new Status(400, error.message));
        }
    })

router.put('/userprofile/awardsCertificates', upload.single('image'),
    async (req: any, res: any, next: any) => {
        const { profileId, profileSection } = req.query;
        let bodyData = { file: req.file, data: req.body.data }
        if (!profileId) {
            return res.send(new Status(400, 'Profile id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(profileId)) {
            return res.send(new Status(400, 'Invalid profile id'));
        }
        if (!profileSection) {
            return res.send(new Status(400, 'Profile section is mandatory'));
        }
        try {
            await axios({
                method: 'put',
                url: `${configData.onboardingUrl}updateUserProfile/awardsCertificates?profileId=${profileId}&profileSection=${profileSection}`,
                data: bodyData
            }).then((user) => {
                return res.send(new Status(user.data.code, user.data.message, user.data.data));
            }).catch((error) => {
                return res.send(new Status(400, error.message));
            })
        } catch (error) {
            return res.send(new Status(400, error.message));
        }
    })

router.get('/userprofile', async (req: Request<{}, {}, {}, IProfileId>, res: Response, next: NextFunction) => {
    const { profileId } = req.query;
    if (!profileId) {
        return res.send(new Status(400, 'Profile id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
        return res.send(new Status(400, 'Invalid profile id'));
    }
    try {
        await axios({
            method: 'get',
            url: `${configData.onboardingUrl}getUserProfile?profileId=${profileId}`,
        }).then((user) => {
            return res.send(new Status(user.data.code, user.data.message, user.data.data));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.put('/deleteAwardDetails', validateUserProfile.deleteAward(userProfileSchema.awardDeleteSchema),
    async (req: Request<{}, {}, {}, IDeleteAwardQuery>, res: Response, next: NextFunction) => {
        let getAwards_id = req.query.awards_id;
        let get_id = req.query._id;

        if (!mongoose.Types.ObjectId.isValid(get_id)) {
            return res.send(new Status(400, 'Invalid Object _id'));
        }

        try {
            await axios.put(authURL + 'deleteAwardData?awards_id=' + getAwards_id + '&_id=' + get_id).then(async result => {
                let response = result.data;
                if (response.status == 200) {
                    res.status(200).send(result.data)
                }
                else {
                    res.status(response.code).send(result.data);
                }
            }).catch(error => {
                if (error.response == undefined) {
                    res.status(502).send(new APIResponse(502, error.message))
                }
                else {
                    res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
                }
            })
        }
        catch (error) {
            res.send(new APIResponse(400, error.message));
        }
    })

router.put('/deleteProfessionalDetails', validateUserProfile.deleteProfession(userProfileSchema.professionDeleteSchema),
    async (req: Request<{}, {}, {}, IDeleteProfessionQuery>, res: Response, next: NextFunction) => {
        let getProfession_id = req.query.profession_id;
        let get_id = req.query._id;

        if (!mongoose.Types.ObjectId.isValid(get_id)) {
            return res.send(new Status(400, 'Invalid Object _id'));
        }

        try {
            await axios.put(authURL + 'deleteProfessionalData?profession_id=' + getProfession_id + '&_id=' + get_id).then(async result => {
                let response = result.data;
                if (response.status == 200) {
                    res.status(200).send(result.data)
                }
                else {
                    res.status(response.code).send(result.data);
                }
            }).catch(error => {
                if (error.response == undefined) {
                    res.status(502).send(new APIResponse(502, error.message))
                }
                else {
                    res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
                }
            })
        }
        catch (error) {
            res.send(new APIResponse(400, error.message));
        }
    })

router.put('/deleteEducationDetails', validateUserProfile.deleteEducation(userProfileSchema.educationDeleteSchema),
    async (req: Request<{}, {}, {}, IDeleteEducationQuery>, res: Response, next: NextFunction) => {
        let getEducation_id = req.query.education_id;
        let get_id = req.query._id;

        if (!mongoose.Types.ObjectId.isValid(get_id)) {
            return res.send(new Status(400, 'Invalid Object _id'));
        }

        try {
            await axios.put(authURL + 'deleteEducationalData?education_id=' + getEducation_id + '&_id=' + get_id).then(async result => {
                let response = result.data;
                if (response.status == 200) {
                    res.status(200).send(result.data)
                }
                else {
                    res.status(response.code).send(result.data);
                }
            }).catch(error => {
                if (error.response == undefined) {
                    res.status(502).send(new APIResponse(502, error.message))
                }
                else {
                    res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
                }
            })
        }
        catch (error) {
            res.send(new APIResponse(400, error.message));
        }
    })

router.put('/updateAwardDetails', upload.single('image'), async (req: any, res: any, next: any) => {
    let bodyData = { file: req.file, data: req.body.data }

    try {
        await axios.put(authURL + 'updateAwardData', bodyData).then(async result => {

            let response = result.data;
            if (response.status == 200) {
                res.status(200).send(result.data)
            }
            else {
                res.status(response.code).send(result.data);
            }
        }).catch(error => {
            if (error.response == undefined) {
                res.status(502).send(new APIResponse(502, error.message))
            }
            else {
                res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
            }
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.put('/updateProfessionalDetails', validateUserProfile.updateProfession(userProfileSchema.professionUpdateSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            profession_id, _id, comp_id, company_name, design_id, designation, area_exp_id, area_expert, start_date, end_date, achievements, Descr
        } = req.body;

        const professionDetail = { profession_id, _id, comp_id, company_name, design_id, designation, area_exp_id, area_expert, start_date, end_date, achievements, Descr }
        try {
            await axios.put(authURL + 'updateProfessionData', professionDetail).then(async result => {
                let response = result.data;
                if (response.status == 200) {
                    res.status(200).send(result.data)
                }
                else {
                    res.status(response.code).send(result.data);
                }
            }).catch(error => {
                if (error.response == undefined) {
                    res.status(502).send(new APIResponse(502, error.message))
                }
                else {
                    res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
                }
            })
        }
        catch (error) {
            res.send(new APIResponse(400, error.message));
        }
    })

router.put('/updateEducationalDetails', validateUserProfile.updateEducation(userProfileSchema.educationUpdateSchema),
    async (req, res, next) => {
        const {
            education_id, _id, institute_id, institute_name, curr_cat_id, curr_cat_name, curr_grade_id, curr_grade_name, study_field_id, study_field, start_date, end_date, achievements, desc, grade
        } = req.body;

        const educationDetail = { education_id, _id, institute_id, institute_name, curr_cat_id, curr_cat_name, curr_grade_id, curr_grade_name, study_field_id, study_field, start_date, end_date, achievements, desc, grade }
        try {
            await axios.put(authURL + 'updateEducationData', educationDetail).then(async result => {
                let response = result.data;
                if (response.status == 200) {
                    res.status(200).send(result.data)
                }
                else {
                    res.status(response.code).send(result.data);
                }
            }).catch(error => {
                if (error.response == undefined) {
                    res.status(502).send(new APIResponse(502, error.message))
                }
                else {
                    res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
                }
            })
        }
        catch (error) {
            res.send(new APIResponse(400, error.message));
        }
    })

router.get('/userVerify', async (req: Request<{}, {}, {}, IUserIdQuery>, res: Response, next: NextFunction) => {
    const { userId } = req.query;
    if (!userId) {
        return res.send(new Status(400, 'userId id is mandatory'));
    }

    try {
        await axios({
            method: 'get',
            url: `${configData.onboardingUrl}getUserDetails?userId=${userId}`,
        }).then((user) => {
            return res.send(new Status(user.data.code, user.data.message, user.data.data));
        }).catch((error) => {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getMentors', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'get',
            url: `${configData.onboardingUrl}getMentors`,
            data: req.query
        }).then((mentors) => {
            return res.send(new ResponseWithData(mentors.data.status,  mentors.data.details));
        }).catch(function (error) {
            return res.send(new Status(400, error.message));
        })
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

export = router