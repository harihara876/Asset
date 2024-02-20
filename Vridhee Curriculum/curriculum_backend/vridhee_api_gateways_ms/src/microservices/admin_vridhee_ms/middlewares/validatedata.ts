import { Request, Response, NextFunction } from 'express';
import { Status } from '../utils/status';

const validateCommonFunctionSchema = (schema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
};
export default { validateCommonFunctionSchema }