import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from '../utils/config';
import { Status } from '../utils/status';

router.get('/getActors', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios.get(`${configData.accountUrl}actors`)
            .then((actorList) => {
                return res.send(new Status(actorList.data.code, actorList.data.message, actorList.data.data));
            }).catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

export = router