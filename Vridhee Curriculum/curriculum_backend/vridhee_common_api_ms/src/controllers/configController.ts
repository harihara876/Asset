import Router from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Status } from '../utils/status';
const fs = require("fs")


let router = Router();

router.get("/get_config_details", async (req, res) => {
    try {
        var config = fs.readFileSync("./webconfig.json")
        let config_details = JSON.parse(config);
        if (config_details) {
            res.send(new Status(200, "", config_details));
        }
        else {
            res.send(new Status(201, 'no data'));
        }
    } catch (error:any) {
        res.send(new Status(400, error.message));
    }
});

export default router;