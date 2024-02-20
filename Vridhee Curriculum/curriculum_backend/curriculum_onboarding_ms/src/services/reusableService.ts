import { IData } from "../models/interfaces";

export async function getReusable(collectionName){
    try{
        let data: IData[] = await collectionName.find({});
        return data;
    }
    catch(error){
        throw Error('getReusable' + error.message)
    }
}