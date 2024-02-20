import { Request, Response, NextFunction } from 'express'
import { noDataAvail } from '../utils/errormsg';
import { getActorByType, getlookupbyname } from '../services/lookupservice';
import { APIResponse, ResponseWithObject } from '../utils/status'
import { ILookUpDataQuery } from '../models/interfaces';

export async function getActorDetails(req, res, next) {
    let body = req.query.actorType;
try {
    let user = await getActorByType(body);
    if (user) {    
        res.status(200).send(new ResponseWithObject(200, "done", user));
    } else {
        res.status(200).send(new ResponseWithObject(200, "done", { message: noDataAvail }));
    }
} catch (error) {
    res.send(new APIResponse(500, error.message));
}
}

export async function getlookupdata(req: Request<{}, {}, {}, ILookUpDataQuery>, res: Response, next: NextFunction){
    let get_lookupName = req.query.name;
    try{
        let user = await getlookupbyname(get_lookupName);
        if(user){
            res.status(200).send(new ResponseWithObject(200, "done", user)); 
        }
        else{
            res.status(200).send(new ResponseWithObject(200, "done", { message: noDataAvail }));
        }
    }
    catch(error){
        res.send(new APIResponse(500, error.message));
    }
}