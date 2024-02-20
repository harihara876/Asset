import { configData } from '../utils/config';
import { actor } from '../dbmanager/dbconnection';
import { IActor, IActorProfile } from '../models/interfaces';

const getActorList = async () => {
    try {
        const actorList: IActor[] = await actor.find({}).sort({ seq: 1 });
        for (let i = 0; i < actorList.length; i++) {
            actorList[i].img_url = configData.s3BaseUrl + actorList[i].img_url;
        }
        
        return actorList;
    } catch (error) {
        throw Error('getActorList ' + error.message)
    }
}

const getActor = async (id: string) => {
    try {
        const actorRecord: IActorProfile = await actor.findById({ _id: id });
            
        actorRecord.img_url = configData.s3BaseUrl + actorRecord.img_url;
        
        return actorRecord;
    } catch (error) {
        throw Error('getActor ' + error.message)
    }
}

export { getActorList, getActor }