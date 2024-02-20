import express from 'express';
const router = express.Router();
import axios from 'axios';
import { microservicesurl } from '../utils/config';
import { APIResponse, Status } from '../utils/status';
const authURL = microservicesurl.authorization

router.get('/getGradesdropdown', async (req, res, next) => {
    try {
        let get_id = req.query._id;

        await axios.get(authURL + 'getGradesList?_id=' + get_id).then(async result => {
            // console.log(result)
            let response = result.data;
            if (response.status == 200) {
                res.status(200).send(response)
                // console.log(response)
            }
            else {
                res.status(response.code).send(result.data);
                // console.log(response.code)
            }
        }).catch(error => {
            if (error.response == undefined) {
                res.status(502).send(new APIResponse(502, error.message));
            }
            else {
                res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
            }
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

export = router;