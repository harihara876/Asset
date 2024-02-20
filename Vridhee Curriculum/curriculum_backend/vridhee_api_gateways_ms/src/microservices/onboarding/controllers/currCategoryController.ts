import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
import axios from 'axios';
import { microservicesurl } from '../utils/config';
import { APIResponse, Status } from '../utils/status';
import { ICategoryId } from '../models/interfaces';
import mongoose from 'mongoose';
import { configData } from '../utils/config';
const authURL = microservicesurl.authorization;

router.get('/getCurriculumTypes', async(req, res, next)=>{
    try{
        await axios.get(authURL + 'getcurrCategoryTypes?').then(async result =>{
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

router.get('/getStudyField', async(req: Request<{}, {}, {}, ICategoryId>, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.query;
        if(!categoryId) {
            res.send(new APIResponse(400, 'Category Id is mandatory'));
        } 
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.send(new Status(400, 'Invalid Category Id'));
        }
        await axios.get(`${configData.onboardingUrl}getStudyFields?categoryId=${categoryId.trim()}`)
           .then((studyField) => {
                return res.send(new Status(studyField.data.code, studyField.data.message, studyField.data.data));
            }).catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

export = router;