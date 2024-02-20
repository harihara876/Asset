import { Request, Response, NextFunction } from 'express'
import { checkEmailAndContactnumber, verifyUser } from '../services/userDetailService';
import { APIResponse } from '../utils/status';


export const checkEmailAndContactNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { checkEmail, emailOrContactNumber } = req.body;
        const user = await checkEmailAndContactnumber(checkEmail, emailOrContactNumber);
        let innerContent = checkEmail ? 'email' : 'contact number'
        if (user) {
            return res.status(400).send(new APIResponse(400, `User is already exist with this ${innerContent}.`))
        } else {
            return res.status(200).send(new APIResponse(200, `${innerContent} is available`));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const user = await verifyUser(email);
        if (user) {
            return res.status(200).send(new APIResponse(200, `User is exist.`));
        } else {
            return res.status(400).send(new APIResponse(400, `User is not exist.`))
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}