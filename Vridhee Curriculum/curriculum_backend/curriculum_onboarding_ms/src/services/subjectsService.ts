import { ISubjects } from "../models/interfaces";
import { currCategory, newsubject, subjects } from "../dbmanager/dbconnection";
import mongoose from "mongoose";

// export async function getsubjects(get_curr_cat_id, get_curr_grade_id) {
//     try {
//         let data: ISubjects[] = await subjects.find({ curr_cat_id: get_curr_cat_id, curr_grade_id: get_curr_grade_id }, {_id: 0, "name": "$Subject"})
//         return data;
//     }
//     catch (error) {
//         throw Error('getsubjects ' + error.message)
//     }
// }

export async function getsubjects(get_id, grade_id){
    try{
        let data = await currCategory.aggregate(
          [
            {
              $match: {
                _id: new mongoose.Types.ObjectId(get_id)
              }
            },
            { 
              $unwind: { 
                path: "$grades" 
              } 
            },
            {
                $match: {
                    "grades.id": grade_id
                }
            },
            { 
              $project: { 
                "_id":0, 
                "grades.sub_data": 1 
              } 
            }
          ]
         );
         
      let response = data[0].grades.sub_data
      const subjectIds = [];
      for(let i = 0; i < response.length; i++) {
        const subId = response[i].sub_id;
        subjectIds.push(subId)
      }
      let subjectData = await newsubject.find({
        "_id": { $in : subjectIds } 
      }, 
      { 
        "_id": 1, "name":1 
      })
      return subjectData;
    }
    catch(error){
      throw Error('getsubjects ' + error.message)
    }
  }