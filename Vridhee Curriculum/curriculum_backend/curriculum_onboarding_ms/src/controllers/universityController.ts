import { ResponseWithObject, APIResponse } from '../utils/status';
//import { getUniversity } from '../services/universityService';
import { Request, Response, NextFunction } from 'express';
import { noDataAvail } from '../utils/errormsg';
import { university } from "../dbmanager/dbconnection";
import { getReusable } from '../services/reusableService';

export async function getUniversityData(req: Request, res: Response, next: NextFunction){
    try{
        let user = await getReusable(university);
        if(user){
            res.status(200).send(new ResponseWithObject(200, "done", user));
        }
        else{
            res.status(200).send(new ResponseWithObject(200, "done", { message: noDataAvail }))
        }
    }
    catch(error){
        res.send(new APIResponse(500, error.message))
    }
}