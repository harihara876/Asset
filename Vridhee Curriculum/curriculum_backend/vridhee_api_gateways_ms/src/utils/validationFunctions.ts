import {  APIResponse } from './status';
import mongoose from 'mongoose';

export function validatePresence(allFields, data, res) {
    for (const field of allFields) {
        if (!data[field] || data[field] == "" || data[field] == undefined) {
            res.send(new APIResponse(400, `${field} is required.`));
            return true;
        }
    }
return false;
}

export function validateMongoId(allFields, data, res) {
    for (const field of allFields) {
        if (data[field] !== "" && data[field]  != undefined) {
            if (!mongoose.Types.ObjectId.isValid(data[field])) {
                res.send(new APIResponse(400, `invalid ${field}.`));
                return true;
            }
        };
    }
return false;
}





// export function validatePresence(allFields, data,res) {
//     for (const i of allFields) {
//         if (!data[i] || data[i] == "" || data[i] == undefined) {
//             return {
//                 flag: 1,
//                 fieldName: i
//             };        
//         }
//     }
//     return {falg:0,fieldName:""};
// }

