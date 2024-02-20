import { actor, lookup } from '../dbmanager/dbconnection';

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

export async function getlookupbyname(get_lookupName) {
    try {
        let data: any = {};

        data = await lookup.find({ name: get_lookupName });
        return data;
    }
    catch (error) {
        throw Error('getlookupbyname' + error.message)
    }
}

export async function getGrades(get_gradeName, get_curr_cat_id) {
    try {
        let data: any = {};

        data = await lookup.aggregate([
            {
                $match: { name: get_gradeName }
            },
            {
                $unwind: { path: "$data" }
            },
            {
                $match: { "data.curr_cat_id": get_curr_cat_id }
            }
        ]);
        return data;
    }
    catch (error) {
        throw Error('getGrades' + error.message)
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