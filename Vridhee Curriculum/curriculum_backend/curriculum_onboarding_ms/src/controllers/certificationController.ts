import { APIResponse, ResponseWithObject } from "../utils/status";
import { Request, Response, NextFunction } from 'express'
//import { getCertifcation } from "../services/certificationService";
import { certification } from "../dbmanager/dbconnection";
import { getReusable } from '../services/reusableService';
import { noDataAvail } from "../utils/errormsg";

export async function getCertificationData(req: Request, res: Response, next: NextFunction){
    try{
        let user = await getReusable(certification);
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