import { Request, Response, NextFunction } from 'express';
import { Status } from '../../campus_onboarding_ms/utils/status';
import { ObjectSchema } from 'yup';

const validateDefaultNotifications = (schema: ObjectSchema<{
    module_id: string;
    menu_id: string;
    name: string;
    for: string;
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
}

const validateCampusNotificationConfig = (schema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
}

const validateCampusNotificationInfo = (schema: ObjectSchema<{
    campus_group_id: string;
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
}

const validateGetCampusNotificationInfo = (schema: ObjectSchema<{
    campus_group_id: string;
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
}

const validateGetCampusDetailsByGroupId = (schema: ObjectSchema<{
    campus_group_id: string;
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
}
const validateNotificationSmsPushWhatsapp = (schema: ObjectSchema<{
    user_id: string;
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
};

const validateNotificationEmail = (schema: ObjectSchema<{
    campus_group_id: string; user_id: string; user_email_id: string; email_subject: string;
    email_body: string; is_sent: string;
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
};


const validateNotificationCount = (schema: ObjectSchema<{
    campus_group_id: string; campus_id: string; module_id: string; sms_count: number;
    email_count: number; push_count: number; whatsapp_count: number; month: number; year: number;
}>) => async (req: Request, res: Response, next: NextFunction) => {
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


export default { validateDefaultNotifications, validateCampusNotificationConfig, validateCampusNotificationInfo, validateNotificationEmail, validateNotificationCount, validateGetCampusNotificationInfo, validateGetCampusDetailsByGroupId, validateNotificationSmsPushWhatsapp, validateUserOnboard }

