import { actor, lookup } from '../dbmanager/dbconnection';
import { configData } from '../utils/config';

export async function getActorByType(query) {

    try {

        let data: any = {};

        data = await actor.findOne({ type: query });
        return data;

    } catch (error) {
        // logger.error("Time: " + dateFormat(new Date(), "yyyy-mm-dd h:MM:ss") + " Method: getDefaultRole" + " Exception :" + error.message);
        throw Error('getActorByType ' + error.message)
    }
}

export async function getlookupbyname(get_lookupName: string) {
    try {
        let data = await lookup.aggregate([
            {
                $match: {
                    "name" : get_lookupName
                }
            }, 
            {
                $project: {
                    _id: 1, 
                    name: 1, 
                    data: {
                        $map: {
                            "input": "$data", 
                        as: "dat", 
                        in: {
                            "id": "$$dat.id", 
                            "seq": "$$dat.seq", 
                            "name": "$$dat.val", 
                            "dval": "$$dat.dval", 
                            "desc": "$$dat.desc", 
                            "img_url": "$$dat.img_url"
                        }
                    }
                }
            }
        }
    ]
    )
    // console.log(">>>>",data[0].data)
    if (get_lookupName === 'profile_list') {
        for (let i =0; i < data[0].data.length; i++) {
                            
            data[0].data[i].img_url[0].inact_img_url = configData.s3BaseUrl+data[0].data[i].img_url[0].inact_img_url;
            data[0].data[i].img_url[0].act_img_url = configData.s3BaseUrl+data[0].data[i].img_url[0].act_img_url;
        }
    }
        return data;
    }
    catch (error) {
        throw Error('getlookupbyname' + error.message)
    }
}

export async function getActorProfileList() {
    try {
        const profileList = await lookup.aggregate([
            {
                $match: {
                    name: 'profile_list'
                }
            },
            {
                $unwind: {
                    path: "$data"

                }
            },
            {
                $sort: {
                    "data.seq": 1
                }
            }
        ])
        return profileList;
    } catch (error: any) {
        throw Error('getActorProfile ' + error.message)
    }
}

export async function getActorSubtypeList() {
    try {
        const profileList = await lookup.aggregate([
            {
                $match: {
                    name: 'act_subtyp'
                }
            },
            {
                $unwind: {
                    path: "$data"

                }
            },
            {
                $sort: {
                    "data.seq": 1
                }
            }
        ])
        return profileList;
    } catch (error: any) {
        throw Error('getActorSubTypes ' + error.message)
    }
}