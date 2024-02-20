import express, { Request, Response } from 'express';
import axios from 'axios';
import { microservicesurl } from '../utils/config';
import { APIResponse } from '../utils/status';
const accountUrl = microservicesurl.accountUrl;

const router = express.Router();

router.post('/logout', async (req: Request, res: Response) => {
    const { tokenuserid } = req.headers;
    if (!tokenuserid) {
        return res.send(new APIResponse(400, 'User id is mandatory'));
    }
    try {
        await axios({
            method: 'post',
            url: `${accountUrl}logout`,
            data: { tokenuserid: tokenuserid }
        }).then((user) => {
            return res.send(new APIResponse(user.data.code, user.data.message));
        }).catch((error) => {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.status(500).send(new APIResponse(500, error.message));
    }
});

export = router;