import { actor } from '../dbmanager/dbconnection';
import { IActor, IActorProfile } from '../models/interfaces';

const getActorList = async () => {
    try {
        const actorList: IActor[] = await actor.find({}).sort({ seq: 1 });
        return actorList;
    } catch (error) {
        throw Error('getActorList ' + error.message)
    }
}

const getActor = async (id: string) => {
    try {
        const actorRecord: IActorProfile = await actor.findById({ _id: id });
        return actorRecord;
    } catch (error) {
        throw Error('getActor ' + error.message)
    }
}

export { getActorList, getActor }