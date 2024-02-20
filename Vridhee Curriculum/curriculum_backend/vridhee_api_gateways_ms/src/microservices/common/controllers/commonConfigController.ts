import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { Status, ResponseWithObject, APIResponse } from '../utils/status';
import fs from 'fs';

router.get('/getCommonConfig', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const config: any = fs.readFileSync("./webconfig.json");
        let configDetails = JSON.parse(config);
        if (configDetails) {
            return res.send(new ResponseWithObject(200, "Common config data.", configDetails));
        } else {
            return res.send(new APIResponse(400, "Common config data not found."));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

export = router