import { Request, Response, NextFunction } from 'express'
import { ResponseWithObject, APIResponse } from "../utils/status";
//import { getCompany } from "../services/companyService";
import { noDataAvail } from "../utils/errormsg";
import { company } from "../dbmanager/dbconnection";
import { getReusable } from "../services/reusableService";

export async function getCompanyData(req: Request, res: Response, next: NextFunction){
    try{
        let user = await getReusable(company);
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