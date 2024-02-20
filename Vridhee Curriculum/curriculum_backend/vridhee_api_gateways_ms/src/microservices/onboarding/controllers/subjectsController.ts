import express from 'express';
const router = express.Router();
import axios from 'axios';
import { microservicesurl } from '../utils/config';
import { APIResponse, Status } from '../utils/status';
import mongoose from 'mongoose';
const authURL = microservicesurl.authorization

// router.get('/getSubjectsdropdown', async(req, res, next)=>{
//     try{
//         let get_curr_cat_id = req.query.curr_cat_id
//         let get_curr_grade_id = req.query.curr_grade_id

//         if(!get_curr_cat_id && !get_curr_grade_id){
//             return res.send(new Status(400, 'Invalid Credentails'));
//         }

//         if(!get_curr_cat_id){
//             return res.send(new Status(400, 'curr_cat_id is required'));
//         }

//         if(!get_curr_grade_id){
//             return res.send(new Status(400, 'curr_grade_id is required'));
//         }

//         await axios.get(authURL + 'getsubjectsList?curr_cat_id=' + get_curr_cat_id + '&curr_grade_id=' + get_curr_grade_id).then(async result=>{
//             let response = result.data;
//             if(response.status == 200){
//                 res.status(200).send(result.data)
//             }
//             else{
//                 res.status(response.code).send(result.data);
//             }
//         }).catch(error => {
//             if(error.response == undefined){
//                 res.status(502).send(new APIResponse(502, error.message))
//             }
//             else{
//                 res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
//             }
//         })
//     }
//     catch(error){
//         res.send(new APIResponse(400, error.message));
//     }
// })

router.get('/getSubjectsdropdown', async(req, res, next)=>{
    try{
        let get_id = req.query._id;
        let grade_id = req.query.id;

        await axios.get(authURL + 'getsubjectsList?_id=' + get_id + '&id=' + grade_id).then(async result=>{
            let response = result.data;
            if(response.status == 200){
                res.status(200).send(result.data)
            }
            else{
                res.status(response.code).send(result.data);
            }
        }).catch(error => {
            if(error.response == undefined){
                res.status(502).send(new APIResponse(502, error.message))
            }
            else{
                res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
            }
        })
    }
    catch(error){
        res.send(new APIResponse(400, error.message));
    }
})

export = router;