export default interface IActorProfile {
    id: string;
    val: string;
    desc: string;
    seq: string;
    path: string;
    img_url: [{
        inact_img_url: string;
        act_img_url: string;
    }];
}

export default interface IEducation {
    curr_cat_name: string
    institute_name: string
    study_field: string;
    curr_grade_name: string;
    end_date: string;
    start_date: string;
    achievements: string;
    _id: string;
    study_field_id: string;
    curr_cat_id: string;
    institute_id: string;
    curr_grade_id: string;
    grade: string;
    Authorization: string;
    Tokenuserid: string | null;
}


