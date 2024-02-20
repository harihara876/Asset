import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config"
import { Status } from '../../utils/status';
//import { IUserOnboardQuery } from '../models/interfaces';

router.post('/createEmployeeOnboard', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}cEmOnbrd`,
            data: req.body
        })
        .then((createdData) => 
        {
            return res.send(new Status(createdData.data.code, createdData.data.message, createdData.data.data));
        })
        .catch(function (error) 
        {
            return res.send(new Status(400, error.message));
        })
    } 
    catch (error) 
    {
        return res.send(new Status(400, error.message));
    }
})


router.get('/getCountries', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'get',
            url: `${configData.campusOnBoardingMsUrl}getCountries`
        })
        .then((countries) => 
        {
            if(countries.data.code===400)
            {
                return res.send(new Status(countries.data.code, countries.data.message));
            }
            return res.send(new Status(countries.data.code, countries.data.message, countries.data.data));
        })
        .catch(function (error) 
        {
            return res.send(new Status(400, error.message));
        })
    } 
    catch (error) 
    {
        return res.send(new Status(400, error.message));
    }
})


export = router;