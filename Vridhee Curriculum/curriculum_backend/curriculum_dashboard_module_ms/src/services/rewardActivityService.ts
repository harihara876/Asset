import mongoose from "mongoose";
import { actorActivityVCoin, metaDbConnetion, pgCampus, userDetail, userProfile } from "../dbmanager/dbconnection";
import { configData } from "../utils/config";

export const getVCoinData = async (dbName, collectionName, vCoinObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const vCoinData = await actorActivityVCoin.find(
            {
                "user_id": vCoinObj.user_id,
                "activity_id": vCoinObj.activity_id
            }
        )
        return vCoinData;
    } catch (error) {
        console.log(error)
        throw Error('addVcoin: ' + error.message)
    }
}

export const addVcoin = async (dbName, collectionName, vCoinObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const vCoinData = await actorActivityVCoin.create(
            {
                "user_id": vCoinObj.user_id,
                "activity_id": vCoinObj.activity_id,
                "u_vcoin_earn": vCoinObj.u_vcoin_earn,
                "vcoin_reedem": vCoinObj.vcoin_reedem,
                "ref_trans": vCoinObj.ref_trans,
                "v_take_coin": vCoinObj.v_take_coin,
                "v_take_amt": vCoinObj.v_take_amt,
                "trans_details": vCoinObj.trans_details,
                "country_code": vCoinObj.country_code
            }
        )
        return vCoinData;
    } catch (error) {
        console.log(error)
        throw Error('addVcoin: ' + error.message)
    }
}

export const updateVCoinData = async (dbName, collectionName, vCoinObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const vCoinData = await actorActivityVCoin.updateOne(
            {
                "user_id" : vCoinObj.user_id,
                "activity_id" : vCoinObj.activity_id,
                "trans_details._id": new mongoose.Types.ObjectId(vCoinObj.transactionId)
            },
            {
                $set: {
                    "trans_details.$.trans_typ" : vCoinObj.trans_typ,
                    "trans_details.$.bank_trans_id" : vCoinObj.bank_trans_id,
                    "trans_details.$.trans_remark" : vCoinObj.trans_remark,
                    "trans_details.$.gw_trans_id" : vCoinObj.gw_trans_id,
                    "trans_details.$.bank" : vCoinObj.bank,
                }
            }
        )
        return vCoinData;
    } catch (error) {
        console.log(error)
        throw Error('addVcoin: ' + error.message)
    }
}

export const getUserData = async(subjectId) => {
    try{
        const userIds = await userProfile.find(
            {
                "teaching.subjects.id": subjectId
            },
            {
                _id: 0,
                user_id: 1
            }
        )
        let userArray = [];
        for(const user of userIds){
            let userId = user.user_id.toString();
            userArray.push(userId)
        }
        return userArray;
    } catch (error){
        console.log(error);
        throw Error('updateCountsForCollabration: ' + error.message)
    }
}

export const getUserDataByRewardCoins = async(rewardDBName, rewardCollectionName, userArray) => {
    await metaDbConnetion(rewardDBName, rewardCollectionName);
    try{
        const userIds = await actorActivityVCoin.find(
            {
                user_id: { $in: userArray }
            },
            {
                _id: 0,
                user_id: 1
            }
        ).sort({"u_vcoin_earn" :-1})
        let userIdArray = [];
        for(const user of userIds){
            let userId = user.user_id.toString();
            userIdArray.push(userId)
        }
        return userIdArray;
    } catch (error){
        console.log(error);
        throw Error('getUserDataByRewardCoins: ' + error.message)
    }
}

export const getUserDataByUserIds = async(userInfo) => {
    try{
        const userIds = userInfo.map(userId => new mongoose.Types.ObjectId(userId))
        const userImages = await userProfile.aggregate([
            {
                $match: {
                    user_id: {$in : userIds} 
                }
            },
            {
                $lookup: {
                    from: "userdetail",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "userdetails"
                }
            },
            {
                $unwind: { path: "$userdetails" }
            },
            {
                $project: {
                    _id: 0,
                    user_id: 1,
                    'personal_info.image': 1,
                    "userdetails.disp_name": 1,
                }
            },
            { $sort: { user_id: -1 } }
        ])
        let img;
        let userImagesRes = []
        for(let i = 0; i < userImages.length; i++){
            if (userImages[i].personal_info.image) {
                if (userImages[i].personal_info.image.includes('https')) {
                    img = userImages[i].personal_info.image;
                } else {
                    img = configData.s3BaseUrl + userImages[i].personal_info.image;
                }
            } else {
                img = '';
            }
            userImages[i].personal_info.image = img;
            userImagesRes.push(userImages[i])
        }
        return userImages;
    } catch (error){
        console.log(error);
        throw Error('getUserDataByUserIds: ' + error.message)
    }
}

export const insertPGCampus = async (dbName, collectionName, pgCampusObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const pgCampusData = await pgCampus.create(
            {
                pg_id: pgCampusObj.pg_id,
                campus_group_id: pgCampusObj.campus_group_id,
                sub_group_id: pgCampusObj.sub_group_id,
                merchant_id: pgCampusObj.merchant_id,
                merchant_name: pgCampusObj.merchant_name,
                auth_code: pgCampusObj.auth_code,
                curr_typ: pgCampusObj.curr_typ,
                security_id: pgCampusObj.security_id,
                cam_pg_login: pgCampusObj.cam_pg_login,
                cam_pg_pass: pgCampusObj.cam_pg_pass,
                cam_pg_pass_key: pgCampusObj.cam_pg_pass_key,
                cam_pg_acc: pgCampusObj.cam_pg_acc,
                cam_pg_product_id: pgCampusObj.cam_pg_product_id,
                cc_per: pgCampusObj.cc_per,
                dc_per: pgCampusObj.dc_per,
                online_per: pgCampusObj.online_per,
                pg_plat_chrg: pgCampusObj.pg_plat_chrg,
                v_plat_chrg: pgCampusObj.v_plat_chrg,
                cam_pg_sts: pgCampusObj.cam_pg_sts,
                cam_rec_email_id: pgCampusObj.cam_rec_email_id,
                pg_doc_col: pgCampusObj.pg_doc_col,
                cam_bank_acc: pgCampusObj.cam_bank_acc
            }
        )
        return pgCampusData;
    } catch (error) {
        console.log(error)
        throw Error('insertPGCampus: ' + error.message)
    }
}