import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import axios from 'axios';
import { configData } from '../utils/config';
import { Status } from '../utils/status';
import { IActorQuery } from '../models/interfaces';

router.get('/getActorProfileDetails', async (req: Request<{}, {}, {}, IActorQuery>, res: Response, next: NextFunction) => {
    try {
        const { actorId } = req.query;
        if (!actorId) {
            return res.send(new Status(400, 'Actor id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(actorId)) {
            return res.send(new Status(400, 'Invalid id'));
        }
        await axios.get(`${configData.accountUrl}getActorProfileDetails?actorId=${actorId.trim()}`)
            .then((actorProfiles) => {
                return res.send(new Status(actorProfiles.data.code, actorProfiles.data.message, actorProfiles.data.data));
            }).catch(function (error) {
                return res.send(new Status(400, error.message));
            })
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

export = router