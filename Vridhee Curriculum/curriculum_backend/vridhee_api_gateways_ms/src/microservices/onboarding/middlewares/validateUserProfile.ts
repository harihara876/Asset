import { Request, Response, NextFunction } from 'express';
import { Status } from '../utils/status';
import { ObjectSchema } from 'yup';

const validateUserProfile = (schema: ObjectSchema<{
    personal_info: object; user_id: string; act_typ: any[];
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
}

const updateUserProfile = (schema: any) => async (req: any, res: any, next: any) => {
    try {
        const { profileSection } = req.query;
        const { personal_info, learning, teaching, education_details, profession_details,
            skill_interest, awards_certificates, hobbies_passion } = req.body;
        if (profileSection === 'personal_info') {
            await schema.personalInfoSchema.validate(personal_info);
            next();
        } else if (profileSection === 'learning') {
            await schema.learningSchema.validate(learning);
            next();
        } else if (profileSection === 'teaching') {
            await schema.teachingSchema.validate(teaching);
            next();
        } else if (profileSection === 'education_details') {
            await schema.educationalDetailSchema.validate(education_details);
            next();
        } else if (profileSection === 'profession_details') {
            await schema.professionDetailSchema.validate(profession_details);
            next();
        } else if (profileSection === 'skill_interest') {
            await schema.skillInterestSchema.validate(skill_interest);
            next();
        } else if (profileSection === 'awards_certificates') {
            await schema.awardsCertificatesSchema.validate(awards_certificates);
            next();
        } else if (profileSection === 'hobbies_passion') {
            await schema.hobbiesPassionSchema.validate(hobbies_passion);
            next();
        }
    } catch (error: any) {
        return res.send(new Status(400, error.errors[0]));
    }
}


const deleteAward = (schema: any) => async (req: any, res: any, next: any) => {
    try {
        await schema.validate(req.query);
        next();
    } catch (error: any) {
        return res.send(new Status(400, error.errors[0]));
    }
}

const deleteProfession = (schema: any) => async (req: any, res: any, next: any) => {
    try {
        await schema.validate(req.query);
        next();
    } catch (error: any) {
        return res.send(new Status(400, error.errors[0]));
    }
}

const deleteEducation = (schema: any) => async (req: any, res: any, next: any) => {
    try {
        await schema.validate(req.query);
        next();
    } catch (error: any) {
        return res.send(new Status(400, error.errors[0]));
    }
}

// const updateAward = (schema: ObjectSchema<{
//     awards_id: string, _id: string, cert_name: string, univ_name: string, cert_no: string, cert_url: string, start_date: Date, end_date: Date
// }>) => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         await schema.validate(req.body);
//         next();
//     } catch (error) {
//         return res.send(new Status(400, error.errors[0]));
//     }
// }

const updateProfession = (schema: ObjectSchema<{
    profession_id: string, _id: string, company_name: string, designation: string, area_expert: string, start_date: Date
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
}

const updateEducation = (schema: ObjectSchema<{
    education_id: string, _id: string, institute_name: string, curr_cat_id: string, curr_cat_name: string, study_field_id: string, study_field: string, start_date: Date
}>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.send(new Status(400, error.errors[0]));
    }
}

export default { validateUserProfile, updateUserProfile, deleteAward, deleteProfession, deleteEducation, updateProfession, updateEducation };