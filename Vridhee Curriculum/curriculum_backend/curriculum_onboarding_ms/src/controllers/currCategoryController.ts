import { Request, Response, NextFunction } from 'express'
import { getGrades, getcurrCategory, getStudyField } from '../services/currCategoryService'
import { APIResponse, ResponseWithObject, Status } from '../utils/status';
import { noDataAvail } from '../utils/errormsg';
import { IGradeDataQuery } from '../models/interfaces';
import { ISubjectsQuery } from '../models/interfaces';

export async function getcurrCategoryTypes(req: Request, res: Response, next: NextFunction) {
    try {
        let user = await getcurrCategory();
        if (user) {
            res.status(200).send(new ResponseWithObject(200, "done", user));
        }
        else {
            res.status(200).send(new ResponseWithObject(200, "done", { message: noDataAvail }))
        }
    }
    catch (error) {
        res.send(new APIResponse(500, error.message))
    }
}

export async function getGradesList(req: Request<{}, {}, {}, IGradeDataQuery>, res: Response, next: NextFunction) {
    try {
        const { _id } = req.query;
        let user: any = await getGrades(_id);
        if (user) {
            res.status(200).send(new ResponseWithObject(200, "done", user));
        }
        else {
            res.status(200).send(new ResponseWithObject(200, "done", { message: noDataAvail }))
        }
    }
    catch (error) {
        res.send(new APIResponse(500, error.message))
    }
}

export const getStudyFields = async (req: Request<{}, {}, {}, ISubjectsQuery>, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.query;
        let studyFields = await getStudyField(categoryId);
        if (studyFields) {
            res.status(200).send(new ResponseWithObject(200, "Success", studyFields));
        }
        else {
            res.status(200).send(new APIResponse(204, noDataAvail))
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}