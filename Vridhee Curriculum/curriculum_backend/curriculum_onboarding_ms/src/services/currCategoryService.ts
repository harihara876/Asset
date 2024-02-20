import mongoose, { mongo } from 'mongoose';
import { ICurrData, IGradeData } from "../models/interfaces";
import { currCategory, newsubject } from "../dbmanager/dbconnection";

export async function getcurrCategory() {
  try {
    let data: ICurrData[] = await currCategory.find({}, { "name": 1 });
    return data;
  }
  catch (error) {
    throw Error('getcurrcategory' + error.message)
  }
}

export async function getGrades(get_id: string) {
  try {
    let data: IGradeData[] = await currCategory.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(get_id)
        }
      },
      {
        $project: {
          grades: {
            $map: {
              input: "$grades",
              as: "grade",
              in: {
                "id": "$$grade.id",
                "seq": "$$grade.seq",
                "name": "$$grade.val",
                "sub_ids": "$$grade.sub_ids"
              }
            }
          }
        }
      }
    ]
    )
    return data;
  }
  catch (error) {
    throw Error('getGrades' + error.message)
  }
}

export async function getStudyField(id: string) {
  try {
    let studyFields = await currCategory.aggregate(
      [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id)
          }
        },
        {
          $project: {
            study_field: {
              $map: {
                input: "$study_field",
                as: "study",
                in: {
                  "id": "$$study.id",
                  "name": "$$study.val"
                }
              }
            }
          }
        }
      ])

    return studyFields;
  } catch (error) {
    throw Error('getActor ' + error.message)
  }
}

