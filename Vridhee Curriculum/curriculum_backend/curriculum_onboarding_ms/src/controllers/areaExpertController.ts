import { Request, Response, NextFunction } from 'express'
import { ResponseWithObject, APIResponse } from "../utils/status";
// import { getAreaExpert } from "../services/areaExpertService";
import { areaExpert } from "../dbmanager/dbconnection";
import { noDataAvail } from "../utils/errormsg";
import { getReusable } from '../services/reusableService';

export async function getAreaExpertData(req: Request, res: Response, next: NextFunction){
    try{
        let user = await getReusable(areaExpert);
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