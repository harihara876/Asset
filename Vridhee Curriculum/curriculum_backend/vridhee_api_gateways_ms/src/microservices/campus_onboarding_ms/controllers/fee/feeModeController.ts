import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import { configData } from "../../utils/config"
import { Status } from '../../utils/status';

router.get('/getAllCampusFeePaymentMode', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'get',
            url: `${configData.campusOnBoardingMsUrl}getAllCampusFeePaymentMode`
        })
        .then((feePaymentMode) => 
        {
            return res.send(new Status(feePaymentMode.data.code, feePaymentMode.data.message, feePaymentMode.data.data));
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


router.post('/createCampusFeePaymentMode', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'post',
            url: `${configData.campusOnBoardingMsUrl}createCampusFeePaymentMode`,
            data: req.body
        })
        .then((feePaymentMode) => 
        {
            return res.send(new Status(feePaymentMode.data.code, feePaymentMode.data.message, feePaymentMode.data.data));
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


router.put('/updateCampusFeePaymentMode', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'put',
            url: `${configData.campusOnBoardingMsUrl}updateCampusFeePaymentMode?id=${req.query.id}`,
            data: req.body
        })
        .then((feePaymentMode) => 
        {
            return res.send(new Status(feePaymentMode.data.code, feePaymentMode.data.message, feePaymentMode.data.data));
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


router.delete('/deleteCampusFeePaymentMode', async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        await axios({
            method: 'delete',
            url: `${configData.campusOnBoardingMsUrl}deleteCampusFeePaymentMode?id=${req.query.id}`
        })
        .then((feePaymentMode) => 
        {
            return res.send(new Status(feePaymentMode.data.code, feePaymentMode.data.message, feePaymentMode.data.data));
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
;

export = router;