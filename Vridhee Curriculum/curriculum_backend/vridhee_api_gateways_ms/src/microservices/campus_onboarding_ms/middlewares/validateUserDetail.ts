import { Request, Response, NextFunction } from 'express';
import { Status } from '../utils/status';
import { ObjectSchema } from 'yup';

const validateCampusGroup = (schema: ObjectSchema<{
    group_name: string; group_type: string;
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
};

const validateCampus = (schema: ObjectSchema<{
    campus_group_id: string; campus_type: string;
    campus_name: string; campus_gender_type: string; country: string;
    state: string; district: string; user_id: string;
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
};


const validateUpdateCampus = (schema: ObjectSchema<{
    campus_group_id: string; campus_type: string;
    campus_name: string; campus_gender_type: string; campus_vridhee_url: string; country: string;
    state: string; district: string;
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
};

const validateCampusDesignation = (schema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
};


const validateCampusCourse = (schema: ObjectSchema<{
    campus_group_id: string; course_name: string; course_order: number;
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
};


const validateUserRelation = (schema: ObjectSchema<{
    user_id: string; user_type: string;
    campus_group_id: string; campus_id: string; designation_id: string;
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
};

const validateDefaultModule = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
};

const validateUserOnboard = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
};

const validateFeeCategory = (schema: ObjectSchema<{
    name: string; status: number;
    campus_group_id: string; campus_id: string;
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
};

const validateFeeType = (schema: ObjectSchema<{
    fee_for: string; apply_for: string; status: number;
    campus_group_id: string; campus_id: string;
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
};


export default { validateCampusGroup, validateCampusDesignation, validateCampus, validateUpdateCampus, validateCampusCourse, validateUserRelation, validateDefaultModule, validateUserOnboard, validateFeeCategory, validateFeeType }