import { Request, Response, NextFunction } from 'express';
import { Status } from '../utils/status';
import { ObjectSchema } from 'yup';

const validateUserDetail = (schema: ObjectSchema<{
    vdisp_name: string;
    disp_name: string; cont_num: string; user_pwd: string; email: string; act_typ: any[]; dob: string; gender: string
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
}

export default validateUserDetail