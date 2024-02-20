export default interface IUser {
    type: string;
    desc: string;
    img_url: string;
    _id: string;

    val: string;

    name: string;
    seq: string;
    grades: [];
    cr_dts: string;
    up_dts: string;
    Subject: string;

    id: string;

    study_field: [];

    designation: string
    company_name: string
    achievements: string;
    area_expert: string
    Descr: string

    curr_cat_name: string
    institute_name: string
    curr_grade_name: string
    action: string

    target_rating: number
    have_mentor: string
    mentorMailId: string
    no_of_months: string

    rating: number
    value: string
    status: string | number

    userName: string
    profileImage: string
    rel_ty_id: any

}

export default interface ISchool {
    _id: string;
    name: string;
    desc: string;
    seq: string;
    grades: [];
    cr_dts: string;
    up_dts: string;
    Subject: string;
}

export default interface IGrade {
    id: string;
    val: string;
    _id: string;
    seq: string;
}

export default interface IAwards {
    certname: string;
    uname: string;
    certid: string;
    certurl: string;
    endmonth: string;
    endyear: string;
    startmonth: string;
    startyear: string;
    cert_name: string;
    univ_name: string;
    cert_no: string;
    cert_url: string;
    end_date: string;
    start_date: string;
    cert_img: string;
    comp_id: string;
    design_id: string;
    area_exp_id: string;
}