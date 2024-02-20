import { Request, Response, NextFunction } from 'express'
import { noDataAvail } from "../utils/errormsg";
import { getsubjects } from "../services/subjectsService";
import { APIResponse, ResponseWithObject } from "../utils/status";
import { ISubjectsQuery } from '../models/interfaces';

// export async function getsubjectsList(req: Request<{}, {}, {}, ISubjectsQuery>, res: Response, next: NextFunction) {
//     let get_curr_cat_id = req.query.curr_cat_id
//     let get_curr_grade_id = req.query.curr_grade_id
//     try{
//         let user = await getsubjects(get_curr_cat_id, get_curr_grade_id);
//         if(user){
//             res.status(200).send(new ResponseWithObject(200, "done", user));
//         }
//         else{
//             res.status(200).send(new ResponseWithObject(200, "done", { message: noDataAvail }))
//         }
//     }
//     catch(error){
//         res.send(new APIResponse(500, error.message))
//     }
// }

export async function getsubjectsList(req, res, next){
    try{
        let get_id = req.query._id;
        let grade_id = req.query.id;

        let subject = await getsubjects(get_id, grade_id)
            if(subject){
                res.status(200).send(new ResponseWithObject(200, "done", subject));
            }
            else{
                res.status(200).send(new ResponseWithObject(200, "done", { message: noDataAvail }))
            }
    }
    catch(error){
        res.send(new APIResponse(500, error.message))
    }
}