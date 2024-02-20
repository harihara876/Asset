export default interface IDashboard {
    tot_students: number;
    t_data: any;
    t_content: any;
    useractivitycontent: any;
    useractivityheader: any;
    t_header: any;
    dashboardCountData: any;
    answer:string;
    exam_statistics:any
    score:number
    cr_dts:string;
    ans_sheet:any
    ttl_exp_dur:number
    ttl_act_dur:number
    questionData:[{}]
    marks:number
    time_taken:number
    uld:[{

    }]

     in_progress_count : number;
     completed_count : number;
     total_certificate :number;
     total_assig_given : number;
     total_learning_hrs : number;
     total_doubt_raised : number;
     total_vcoin : number;
     t_name:string,
     sub_status:string;

     curriculumCount:{
        total_collabaration:number
         in_progress_count : number;
         completed_count :  number;
         total_assig_given :  number;
         total_doubt_raised :  number;
         total_vcoin : number;
     }

    accuracy:number
    time_questions:{
        ttl_time:number,
        ttl_questions:number
    }
    Challenge:number;
    MentorMessage:number ;
    Doubt:number;
    Reward:number;
    Certificate:number

    _id?: string | undefined;
    id?: string | undefined;
    rat?:any;
    a_text:string;
    reply:[];
    userName:string;
    last_sub_dt:string
    profileImage:string | undefined;
    subjectName:string;
    chapter_id:string;
    topicName:string;
    d_title:string;
    d_text:string;
    c_dt?: string;
    c_link?: string;
    val?: string;
    ref_c_user_id?: string;
    isAnswered?:boolean
    hint?:string
    content_type_id?: string;
    level_id?: string;
    name?: string;
    t_id: string;
    question?: string;
    n_text?: string;
    c_text: string;
    num?: number
    v_id?: string;
    user_name?: string;
    c_ts?: string;
    f_text?: string;
    ttl_cnt: {
        activities?: number
        certificates?: number
        curr_completed?: number
        curr_inprogress?: number
        doubts?: number
        learning_hrs?: number
        vcoins_earned?: number
        like?:string
        dlike?:string
        comment?:string
        share?:string
    }


    topics:[]
    ttl_buddy_cnt: {
        activity?: number
        collabration_participated?: number
        completed?: number
        doubt?: number
        inprogress?: number
        desc?: number
    }
    topic_id?:string
    options?:any,
    chap_name?: string,
    chap_id?: string, 
    completed_topics?: number,
    totalTopics?: number,
    completed_hours?: any,
    totalTopicHours?: any,
    buddiesCompleted?: any,
    chapter: {
        s_url?:string
        name?:string
        completed_topics?: number
            total_topics?: number
            completed_hours?: number
            buddies_completed  ?: number
    total_topic_hours?: number
        topics:[{
            name?:string
            completed?: boolean
            
        }]
    }
    topic_name:string
    seq:number
    rating?: number
    ttl_buddies_completed?: number
    ttl_buddies_inprogress?: number
    ttl_hour?: number
    ttl_learner?: number
    ttl_mentor?: number
    ttl_topic?: number
    ttl_topic_attempted?: number
    ttl_user_rating?: number
    ttl_vcoin?: number
    desc: string
    message?: string
    ttl_course?: number
    userid?: string
    s_url?: string
    hrs_sts: {
        hrs_completed?: number
        hrs_left?: number
        nxt_std_hr?: number
        prgs_percentage?: number
        sts?: number
        ttl_completed?: number
        ttl_vcoins_completed?: number
    }
    total_chapter?: number
    totalChapter?: number
    totalTime?: number
    profileId: string
    disp_name?: string | undefined
    user_id?: string | undefined
    rank?: number
    total_time?: number

    totalTopicsLength?: number
    buddies_completed?: number
    ttl_assignment?: number
    ttl_discussion?: number
    ttl_doubt?: number
    student_guided?: number
    ttl_e_content?: number
    ttl_imp_notes?: number
    ttl_question?: number
    ttl_revision?: number | undefined
    ttl_video?: number
    ttl_example?: number

    curr_body?: {
        curr_chap_topic: string;
        short_desc: string;
        last_mentor_msg: string;
        last_help_asked: string;
        nxt_std_hr: string;
        chapter_name: string;
    }
    curr_chap_topic: string;
    descr: string;

    sub_name?: string;
    sub_desc?: string;
    activities?: number;
categoryId?: string;
collaboration?: number;
completed?: number;
doubt?: number;
gradeId?: string;
hrscompleted?: number;
hrsleft?: number;
hrstotal?: number;
plannerhours?: number;
progress?: number;
sub_id?: string;
vCoins?: number;
studyHrs?: string;
studyHrsTime?: string;
imageURL?: string;
hrspercentage?: number
hour?: number;
user_assignment?: number;
user_doubt?: number;
author?: string;
totalHours: number;
ttl_reviews?: string;
designation?: string;
date?: string;
activity?: number;
j_list:any
inProgress?: number;
certificate?: number;
userMsg?: string;
profileImg:string
profile_image:string
f_ts:number
t_slot:any
hours:number;
points:number;
Rank:number;

user_e_content?: number;
user_imp_notes?: number;
user_question?: number;
user_revision?: number;
user_video?: number;
// buddies_completed?: number;
buddies_inprogress?: number;
topicSummaries :{
    t_header?:{
    rating?: number;
    ttl_hour?: number;
    ttl_learner?: number;
    ttl_mentor?: number;
    ttl_topic?: number;
    ttl_user_rating?: number;
    ttl_vcoin?: number;
    }
}
}
