import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from "../utils/config"
import { Status } from '../utils/status';
import { ICountryQuery } from '../models/interfaces';

router.post('/addCountries', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}addCountries`
        })
        .then((countries) => 
        {
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


router.put('/addStates', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}addStates`,
            data: req.body
        })
        .then((states) => 
        {
            return res.send(new Status(states.data.code, states.data.message, states.data.data));
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


router.get('/getStates', async (req: Request<{},{},{},ICountryQuery>, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'get',
            url: `${configData.campusOnBoardingMsUrl}getStates?country_id=${req.query.country_id}`,
            data: req.body
        })
        .then((states) => 
        {
            if(states.data.code===400)
            {
                return res.send(new Status(states.data.code, states.data.message));
            }
            return res.send(new Status(states.data.code, states.data.message, states.data.data));
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


router.put('/addDistricts', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}addDistricts`,
            data:req.body
        })
        .then((countries) => 
        {
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


router.get('/getDistricts', async (req: Request<{},{},{},ICountryQuery>, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'get',
            url: `${configData.campusOnBoardingMsUrl}getDistricts?state_id=${req.query.state_id}`,
            data: req.body
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


router.put('/addCities', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}addCities`,
            data: req.body
        })
        .then((states) => 
        {
            return res.send(new Status(states.data.code, states.data.message, states.data.data));
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


router.get('/getCities', async (req: Request<{},{},{},ICountryQuery>, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'get',
            url: `${configData.campusOnBoardingMsUrl}getCities?district_id=${req.query.district_id}`,
            data: req.body
        })
        .then((states) => 
        {
            if(states.data.code===400)
            {
                return res.send(new Status(states.data.code, states.data.message));
            }
            return res.send(new Status(states.data.code, states.data.message, states.data.data));
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