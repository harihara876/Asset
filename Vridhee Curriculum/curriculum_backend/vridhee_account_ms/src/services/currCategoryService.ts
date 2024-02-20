import { ICurrData } from "../models/interfaces";
import { currCategory } from "../dbmanager/dbconnection";

export async function getcurrCategory(){
    try{
        let data: ICurrData[] = await currCategory.find({});
        return data;
    }
    catch(error){
        throw Error('getcurrcategory' + error.message)
    }
}