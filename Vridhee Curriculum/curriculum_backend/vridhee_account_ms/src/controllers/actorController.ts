import { Request, Response, NextFunction } from 'express'
import { getActorList, getActor } from '../services/actorService';
import { getActorProfileList, getActorSubtypeList } from '../services/lookupservice';
import { APIResponse, ResponseWithObject, details } from '../utils/status';
import { IActor, IActorProfile, IActorQuery } from '../models/interfaces';
import { configData } from '../utils/config';


export const getActors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let actorList: IActor[] = await getActorList();
        if (actorList && actorList.length) {
            return res.status(200).send(new ResponseWithObject(200, "done", actorList));
        } else {
            return res.status(200).send(new details(200, "done", "Actors data not available"));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export const getActorProfileDetails = async (req: Request<{}, {}, {}, IActorQuery>, res: Response, next: NextFunction) => {
    try {
        const { actorId } = req.query;
        let actorRecord: IActorProfile = await getActor(actorId);
        if (actorRecord && actorRecord.prf_list.length) {
            actorRecord['_doc']['actorProfileList'] = [];
            actorRecord['_doc']['actorSubtypeList'] = [];
            const profileList = await getActorProfileList();
            const subtypeList = await getActorSubtypeList();
            if (profileList.length && subtypeList.length) {
                for (let profile of profileList) {
                    
                    const result: any = actorRecord.prf_list.includes(profile.data.id);
                    // console.log("result>>>",result);
                    if (result) {

                        profile.data.img_url[0].inact_img_url = configData.s3BaseUrl+profile.data.img_url[0].inact_img_url;
                        profile.data.img_url[0].act_img_url = configData.s3BaseUrl+profile.data.img_url[0].act_img_url;

                        actorRecord['_doc']['actorProfileList'].push(profile.data)
                    }
                }
                for (let subType of subtypeList) {
                    const result: any = actorRecord.sub_typ.includes(subType.data.id);
                    if (result) {
                        actorRecord['_doc']['actorSubtypeList'].push(subType.data)
                    }
                }
                return res.status(200).send(new ResponseWithObject(200, "done", actorRecord));
            } else {
                return res.status(200).send(new details(200, "done", "Profile lookup data not available"));
            }
        } else {
            return res.status(200).send(new details(200, "done", "Actor profile data not available"));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}