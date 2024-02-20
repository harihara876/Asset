import express from 'express';
const router = express.Router();
import axios from 'axios';
import { microservicesurl } from '../utils/config';
import { APIResponse, Status } from '../utils/status';
const authURL = microservicesurl.authorization

router.get('/getLookUpDetails', async(req, res, next)=>{
    try{
        let get_lookupName = req.query.name;

        if(!get_lookupName){
            return res.send(new Status(400, 'Name is required'));
        }

        await axios.get(authURL + 'getlookupdata?name=' + get_lookupName).then(async result => {
            let response = result.data;
            if(response.status == 200){
                res.status(200).send(result.data)
            }
            else{
                res.status(response.code).send(result.data);
            }
        }).catch(error => {
            if(error.response == undefined){
                res.status(502).send(new APIResponse(502, error.message));
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