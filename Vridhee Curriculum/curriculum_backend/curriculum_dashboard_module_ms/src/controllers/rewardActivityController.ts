import { Request, Response, NextFunction } from "express";
import { ResponseWithObject, APIResponse } from "../utils/status";
import { findDbMetaDataDetails } from "../services/userActivity";
import { addVcoin, getUserData, getUserDataByRewardCoins, getUserDataByUserIds, getVCoinData, insertPGCampus, updateVCoinData } from "../services/rewardActivityService";
import { noDataAvailUpdate, noMentorsAvail, noMetaDataAvail } from "../utils/errormsg";

export async function addActorVCoin(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata } = req.query
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, noMetaDataAvail));
        } else {
            const dbName = dbMetaDataInfo[0].db_name;
            const collectionName = dbMetaDataInfo[0].act_collection[0].name;
            const findVCoinData = await getVCoinData(dbName, collectionName, req.body);
            if(findVCoinData.length > 0){
                return res.status(400).send(new APIResponse(400, 'Activity already exists for the user.'));
            } else {
                const vCoinData = await addVcoin(dbName, collectionName, req.body);
                if(vCoinData){
                    return res.status(200).send(new ResponseWithObject(200, 'Insert Success', vCoinData));
                } else {
                    return res.status(400).send(new APIResponse(400, 'vCoinData not inserted.'));
                }
            }
        }
    } catch ( error ){
        console.log(error);
        return res.status(500).send(new APIResponse(500, error.message));
    }
}

export async function updateActorVCoin(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, db_metadata } = req.query
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, noMetaDataAvail));
        } else {
            const dbName = dbMetaDataInfo[0].db_name;
            const collectionName = dbMetaDataInfo[0].act_collection[0].name;
            const updateVCoin = await updateVCoinData(dbName, collectionName, req.body);
            if(updateVCoin.modifiedCount === 1 && updateVCoin.matchedCount === 1){
                return res.status(200).send(new ResponseWithObject(200, 'Update Success', updateVCoin));
            } else {
                return res.status(400).send(new APIResponse(400, noDataAvailUpdate));
            }
        }
    } catch ( error ){
        console.log(error);
        return res.status(500).send(new APIResponse(500, error.message));
    }
}

export async function getMentorsList(req: Request, res: Response, next: NextFunction) {
    try{
        const getUserInfo = await getUserData(req.query.subjectId);
        let rewardDB_metadata = '66';
        const rewardDBMetaDataInfo = await findDbMetaDataDetails(getUserInfo[0], rewardDB_metadata);
        let rewardDBName = rewardDBMetaDataInfo[0].db_name;
        let rewardCollectionName = rewardDBMetaDataInfo[0].act_collection[0].name;
        
        const getUserIdsData = await getUserDataByRewardCoins(rewardDBName, rewardCollectionName, getUserInfo)
        
        const getMentorsData = await getUserDataByUserIds(getUserIdsData)
        let mentorsDetails = [];
        for(const mentor of getMentorsData){
            let mentorsData = {
                userId: mentor.user_id.toString(),
                profileImg: mentor.personal_info.image,
                userName: mentor.userdetails.disp_name,
            }
            mentorsDetails.push(mentorsData)
        }
        if(mentorsDetails.length > 0){
            return res.status(200).send(new ResponseWithObject(200, 'Mentors Available', mentorsDetails));
        } else {
            return res.status(400).send(new APIResponse(400, noMentorsAvail));
        }
    } catch (error){
        console.log(error.message)
        res.status(500).send(new APIResponse(500, error.message));
    }
}

export async function addPGCampus(req: Request, res: Response, next: NextFunction) {
    try{
        const { user_id, db_metadata } = req.query
        const dbMetaDataInfo = await findDbMetaDataDetails(user_id, db_metadata);
        if (!dbMetaDataInfo) {
            return res.status(400).send(new APIResponse(400, noMetaDataAvail));
        } else {
            const dbName = dbMetaDataInfo[0].db_name;
            const collectionName = dbMetaDataInfo[0].act_collection[0].name;
            const addPgCamp = await insertPGCampus(dbName, collectionName, req.body)
            if(addPgCamp){
                return res.status(200).send(new ResponseWithObject(200, 'Insert Success', addPgCamp));
            } else {
                
            }
        }
    } catch (error){
        console.log(error.message)
        res.status(500).send(new APIResponse(500, error.message));
    }
}