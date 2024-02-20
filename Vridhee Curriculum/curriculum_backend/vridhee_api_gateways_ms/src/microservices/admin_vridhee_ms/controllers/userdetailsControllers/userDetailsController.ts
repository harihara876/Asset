import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config"
import { ResponseWithObject, Status } from '../../utils/status';
import multer from 'multer';
import { APIResponse } from '../../utils/status';
const upload = multer();

router.post('/adminsignup', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        let bodyData = { file: req.file, data: req.body.data };
        await axios({
            method: 'post',
            url: `${configData.adminVridheeMsUrl}signup`,
            data: bodyData
        })
            .then((menuModule) => {
                return res.send(new ResponseWithObject(menuModule.data.code, menuModule.data.message, menuModule.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/adminlogin', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const { email, name, cont_num, pwd } = data;
        if (!email && !name && !cont_num) {
            return res.send(new ResponseWithObject(400, "Validation error", 'username is required in body.'));
        };

        if (!pwd) {
            return res.send(new ResponseWithObject(400, "Validation error", 'pwd is mandatory in body.'));
        };
        console.log(`${configData.adminVridheeMsUrl}login`);
        await axios({
            method: 'post',
            url: `${configData.adminVridheeMsUrl}login`,
            data: req.body
        })
            .then(async (result: any) => {
                let response = result.data
                if (response.code == 200) {
                    return res.status(200).send(new ResponseWithObject(200, "done", response));
                };
                return res.status(200).send(new ResponseWithObject(400, "Failure", response.message));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/updateadmindetails', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new APIResponse(400, "Body is required"));
        await axios({
            method: 'put',
            url: `${configData.adminVridheeMsUrl}uadmindetails`,
            data: req.body
        })
            .then((userDetails) => {
                return res.send(new ResponseWithObject(userDetails.data.code, userDetails.data.message, userDetails.data.data));
            }).catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.put('/adminlogout', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new APIResponse(400, "Body is required"));
        const data = req.body;
        if (!data.admin_id) {
            return res.send(new ResponseWithObject(400, "Validation error", 'admin_id is mandatory in body.'));
        };

        await axios({
            method: 'put',
            url: `${configData.adminVridheeMsUrl}userLogout`,
            data: req.body
        })
            .then((menuModule) => {
                return res.send(new ResponseWithObject(menuModule.data.code, menuModule.data.message, menuModule.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/forgetPassword', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new APIResponse(400, "Body is required"));
        const data = req.body;
        const { email } = data;

        if (!email) {
            return res.send(new ResponseWithObject(400, "Validation error", 'email is required in body.'));
        };
        await axios({
            method: 'post',
            url: `${configData.adminVridheeMsUrl}uforgetPassword`,
            data: req.body
        })
            .then((menuModule) => {
                return res.send(new ResponseWithObject(menuModule.data.code, menuModule.data.message, menuModule.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/verifyOtp', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new APIResponse(400, "Body is required"));
        const data = req.body;
        const { email, otp } = data;

        if (!email || !otp) {
            return res.send(new ResponseWithObject(400, "Validation error", 'email or otp is required in body.'));
        };

        await axios({
            method: 'post',
            url: `${configData.adminVridheeMsUrl}uverifyOtp`,
            data: req.body
        })
            .then((menuModule) => {
                return res.send(new ResponseWithObject(menuModule.data.code, menuModule.data.message, menuModule.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/getusers', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new APIResponse(400, "Body is required"));
        await axios({
            method: 'post',
            url: `${configData.adminVridheeMsUrl}gadminmembers`,
            data: req.body
        })
            .then((members) => {
                return res.send(new ResponseWithObject(members.data.code, members.data.message, members.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            });
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.delete('/deleteusercampuses', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new APIResponse(400, "Body is required"));
        await axios({
            method: 'put',
            url: `${configData.adminVridheeMsUrl}dusercampuses`,
            data: req.body
        })
            .then((members) => {
                return res.send(new ResponseWithObject(members.data.code, members.data.message, members.data.data));
            })
            .catch(function (error) {
                return res.send(new Status(400, error.message));
            });
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
});



export = router;
