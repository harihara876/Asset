import { ISubjects } from "../models/interfaces";
import { subjects } from "../dbmanager/dbconnection";

export async function getsubjects(get_curr_cat_id, get_curr_grade_id) {
    try {
        let data: ISubjects[] = await subjects.find({ curr_cat_id: get_curr_cat_id, curr_grade_id: get_curr_grade_id })
        return data;
    }
    catch (error) {
        throw Error('getsubjects ' + error.message)
    }
}