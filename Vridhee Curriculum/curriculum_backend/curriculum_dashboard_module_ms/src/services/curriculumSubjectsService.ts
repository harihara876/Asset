import mongoose from 'mongoose';
import { getChapterData, getCourse, getTopic } from '../services/curriculamService';
import {
    userProfile, currCategory, subject, learnerDashboardSummary, currActivitySummary, metaDbConnetion,
    lookUpMasterSchema
} from "../dbmanager/dbconnection";

export const findUserProfile = async (profileId) => {
    try {
        const profile = await userProfile.findOne({ _id: profileId }, { user_id: 1, learning: 1 })
        return profile
    }
    catch (error) {
        throw Error('findUserProfile ' + error.message)
    }
}

export const findCurriculumSubjects = async (learning) => {
    try {
        let categoryId = learning.curr_cat_id;
        let gradeId = learning.curr_grade_id;
        let currData = await currCategory.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(categoryId) } },
            {
                $unwind: {
                    path: "$grades"
                }
            },
            { $match: { "grades.id": gradeId } }
        ])
        let subjectsArray = [];
        // DOn't remove
        // for (let selectedSubject of learning.subjects) {
        //     for (let currSubject of currData[0].grades.sub_data) {
        //         let subjectData: any = {
        //             categoryId,
        //             gradeId
        //         }
        //         if (selectedSubject.id === currSubject.sub_id) {
        //             let subjectInfo = await subject.findOne({
        //                 _id: new mongoose.Types.ObjectId(currSubject.sub_id)
        //             })
        //             subjectData.sub_id = currSubject.sub_id
        //             subjectData.sub_name = subjectInfo.name
        //             subjectData.sub_desc = currSubject.desc
        //             subjectsArray.push(subjectData)
        //         }
        //     }
        // }
        for (let selectedSubject of learning.subjects) {
            for (let currSubject of currData[0].grades.sub_data) {
                let subjectData: any = {
                    categoryId,
                    gradeId
                }
                if (selectedSubject.id === currSubject.sub_id) {
                    let subjectInfo = await subject.findOne({
                        _id: new mongoose.Types.ObjectId(currSubject.sub_id)
                    })
                    subjectData.sub_id = currSubject.sub_id
                    subjectData.sub_name = subjectInfo.name
                    let chaptersData = await getChapterData(currSubject.sub_id)
                    if (chaptersData.length) {
                        subjectData.chapter = chaptersData[0].chapter.name
                    } else {
                        subjectData.chapter = ""
                    }
                    subjectData.sub_desc = currSubject.desc
                    if (subjectInfo.name === 'Phy Testing') {
                        subjectData.completed = 3
                        subjectData.progress = 3
                        subjectData.doubt = 0
                        subjectData.activities = 3
                        subjectData.collaboration = 0
                        subjectData.userMsg = 'Ashu asked help'
                        subjectData.studyHrsTime = "4:00 AM-6:00 AM"
                        subjectData.studyHrs = 2
                        subjectData.hrspercentage = 28
                        subjectData.hrscompleted = 30
                        subjectData.hrsleft = 108
                        subjectData.vCoins = 120
                        subjectData.plannerhours = 60
                    } else if (subjectInfo.name === 'Mathematics') {
                        subjectData.completed = 2
                        subjectData.progress = 2
                        subjectData.doubt = 1
                        subjectData.activities = 3
                        subjectData.collaboration = 0
                        subjectData.userMsg = 'Dipyaman responded to your challenge.'
                        subjectData.studyHrsTime = "04:15 PM-05:15 PM"
                        subjectData.studyHrs = 1
                        subjectData.hrspercentage = 52
                        subjectData.hrscompleted = 63
                        subjectData.hrsleft = 121
                        subjectData.vCoins = 150
                        subjectData.plannerhours = 120
                    } else if (subjectInfo.name === 'Chemistry') {
                        subjectData.completed = 3
                        subjectData.progress = 1
                        subjectData.doubt = 1
                        subjectData.activities = 1
                        subjectData.collaboration = 0
                        subjectData.userMsg = 'Indronil clarified your doubt'
                        subjectData.studyHrsTime = "03:00 PM-04:00 PM"
                        subjectData.studyHrs = 1
                        subjectData.hrspercentage = 50
                        subjectData.hrscompleted = "15"
                        subjectData.hrsleft = "30"
                        subjectData.vCoins = 90
                        subjectData.plannerhours = 60
                    } else if (subjectInfo.name === 'Semiconductors') {
                        subjectData.completed = 1
                        subjectData.progress = 2
                        subjectData.doubt = 0
                        subjectData.activities = 2
                        subjectData.collaboration = 0
                        subjectData.userMsg = 'Surya responded to your challenge.'
                        subjectData.studyHrsTime = "05:30 PM-06:30 PM"
                        subjectData.studyHrs = 1
                        subjectData.hrspercentage = 25
                        subjectData.hrscompleted = "1"
                        subjectData.hrsleft = "1"
                        subjectData.vCoins = 60
                        subjectData.plannerhours = 60
                    }
                    subjectsArray.push(subjectData)
                }
            }
        }
        return subjectsArray;
    }
    catch (error) {
        throw Error('findCurriculumSubjects ' + error.message)
    }
}

export const findCurriculumSubjectDetails = async (catId, gradeId, subId) => {
    try {
        let currData = await currCategory.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(catId) } },
            {
                $unwind: {
                    path: "$grades"
                }
            },
            { $match: { "grades.id": gradeId } }
        ])
        let subjectsArray = []
        // Don't remove
        // for (let currSubject of currData[0].grades.sub_data) {
        //     if (subId === currSubject.sub_id) {
        //         let subjectInfo = await subject.findOne({
        //             _id: new mongoose.Types.ObjectId(currSubject.sub_id)
        //         })
        //         currSubject.sub_name = subjectInfo.name
        //         subjectsArray.push(currSubject)
        //     }
        // }
        for (let currSubject of currData[0].grades.sub_data) {
            if (subId === currSubject.sub_id) {
                let subjectInfo = await subject.findOne({
                    _id: new mongoose.Types.ObjectId(currSubject.sub_id)
                })
                currSubject.sub_name = subjectInfo.name
                if (subjectInfo.name === 'Physics') {
                    currSubject.t_header = {
                        "rating": 4.7,
                        "ttl_user_rating": 58,
                        "ttl_learner": 128,
                        "ttl_mentor": 8,
                        "ttl_hour": 109,
                        "ttl_topic": 654,
                        "ttl_vcoin": 0,
                        "buddies_completed": 23,
                        "buddies_inprogress": 14
                    }
                    currSubject.t_content = {
                        "ttl_video": 654,
                        "user_video": 4,
                        "ttl_e_content": 18,
                        "user_e_content": 4,
                        "ttl_imp_notes": 10,
                        "user_imp_notes": 2,
                        "ttl_question": 25,
                        "user_question": 7,
                        "ttl_assignment": 14,
                        "user_assignment": 3,
                        "ttl_doubt": 2,
                        "user_doubt": 0,
                        "ttl_revision": 10,
                        "user_revision": 4,
                        "ttl_example": 8
                    }
                    currSubject.instructors = [
                        {
                            name: "Mr. Astro",
                            designation: "Assistant Professor",
                            rating: 4.7,
                            ttl_reviews: 4,
                            desc: "Dedicated physics tutor with over 10 years experience in teaching diverse students. Proven ability to create engaging, comprehensive lesson plans and foster a productive learning environment"
                        },
                        {
                            name: "Surya Kumar",
                            designation: "Physics",
                            rank: 7,
                            student_guided: 6,
                        }
                    ]
                    currSubject.imageURL = 'https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/physics.jpg'
                } else if (subjectInfo.name === 'Mathematics') {
                    currSubject.t_header = {
                        "rating": 4.6,
                        "ttl_user_rating": 89,
                        "ttl_learner": 98,
                        "ttl_mentor": 6,
                        "ttl_hour": 130,
                        "ttl_topic": 780,
                        "ttl_vcoin": 0,
                        "buddies_completed": 12,
                        "buddies_inprogress": 8
                    }
                    currSubject.t_content = {
                        "ttl_video": 780,
                        "user_video": 5,
                        "ttl_e_content": 22,
                        "user_e_content": 2,
                        "ttl_imp_notes": 12,
                        "user_imp_notes": 4,
                        "ttl_question": 29,
                        "user_question": 6,
                        "ttl_assignment": 13,
                        "user_assignment": 2,
                        "ttl_doubt": 4,
                        "user_doubt": 1,
                        "ttl_revision": 16,
                        "user_revision": 3,
                        "ttl_example": 10
                    }
                    currSubject.instructors = [
                        {
                            name: "Harsad Mehta",
                            designation: "Professor",
                            rating: 4.6,
                            ttl_reviews: 8,
                            desc: "Motivated math tutor with over 5 years experience in teaching students of all ages. Skilled in developing individualized learning plans to help students succeed."
                        },
                        {
                            name: "Prasad Kumar",
                            designation: "Maths, Physics",
                            rank: 5,
                            student_guided: 10,
                        }
                    ]
                    currSubject.imageURL = 'https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/maths.jpg'
                } else if (subjectInfo.name === 'Chemistry') {
                    currSubject.t_header = {
                        "rating": 4.4,
                        "ttl_user_rating": 34,
                        "ttl_learner": 68,
                        "ttl_mentor": 6,
                        "ttl_hour": 31,
                        "ttl_topic": 187,
                        "ttl_vcoin": 0,
                        "buddies_completed": 8,
                        "buddies_inprogress": 2
                    }
                    currSubject.t_content = {
                        "ttl_video": 187,
                        "user_video": 3,
                        "ttl_e_content": 19,
                        "user_e_content": 8,
                        "ttl_imp_notes": 7,
                        "user_imp_notes": 1,
                        "ttl_question": 12,
                        "user_question": 3,
                        "ttl_assignment": 9,
                        "user_assignment": 1,
                        "ttl_doubt": 8,
                        "user_doubt": 2,
                        "ttl_revision": 11,
                        "user_revision": 3,
                        "ttl_example": 3
                    }
                    currSubject.instructors = [
                        {
                            name: "Shishir Mittal",
                            designation: "Teacher",
                            rating: 4.8,
                            ttl_reviews: 7,
                            desc: "Accomplished chemistry tutor with a passion for teaching. Trained in a variety of teaching methods to provide a comprehensive and effective learning experience."
                        },
                        {
                            name: "Hardik Meher",
                            designation: "Chemistry",
                            rank: 9,
                            student_guided: 5,
                        }
                    ]
                    currSubject.imageURL = 'https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/chemistry.jpg'
                } else if (subjectInfo.name === 'Semiconductors') {
                    currSubject.t_header = {
                        "rating": 4.8,
                        "ttl_user_rating": 68,
                        "ttl_learner": 84,
                        "ttl_mentor": 21,
                        "ttl_hour": 4,
                        "ttl_topic": 26,
                        "ttl_vcoin": 0,
                        "buddies_completed": 12,
                        "buddies_inprogress": 8
                    }
                    currSubject.t_content = {
                        "ttl_video": 26,
                        "user_video": 2,
                        "ttl_e_content": 8,
                        "user_e_content": 2,
                        "ttl_imp_notes": 9,
                        "user_imp_notes": 6,
                        "ttl_question": 13,
                        "user_question": 6,
                        "ttl_assignment": 8,
                        "user_assignment": 3,
                        "ttl_doubt": 6,
                        "user_doubt": 2,
                        "ttl_revision": 13,
                        "user_revision": 1,
                        "ttl_example": 16
                    }
                    currSubject.instructors = [
                        {
                            name: "Alfredo Rhiel Madsen",
                            designation: "Professor",
                            rating: 4.8,
                            ttl_reviews: 6,
                            desc: "Highly organized Semiconductors tutor with 7 years experience in tutoring and teaching students of all grade levels. Adept at developing customized lesson plans to meet the individual needs of students."
                        },
                        {
                            name: "Mahesh Kumar",
                            designation: "Semiconductors",
                            rank: 3,
                            student_guided: 4,
                        }
                    ]
                    currSubject.imageURL = 'https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/semiconductor.jpg'
                }
                subjectsArray.push(currSubject)
            }
        }
        return subjectsArray[0]
    }
    catch (error) {
        throw Error('findCurriculumSubjectDetails ' + error.message)
    }
}

export const findCurriculumSubjectDetailsV2 = async (dbName, collectionName, currObj) => {
    try {
        let currData = await currCategory.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(currObj.categoryId) } },
            {
                $unwind: {
                    path: "$grades"
                }
            },
            { $match: { "grades.id": currObj.gradeId } },
            { $unwind: { path: "$grades.sub_data" } },
            { $match: { "grades.sub_data.sub_id": currObj.sub_id } },
            {
                $project: {
                    'grades.sub_data._id': 1,
                    'grades.sub_data.sub_id': 1,
                    'grades.sub_data.desc': 1,
                    'grades.sub_data.will_learn': 1,
                    'grades.sub_data.crs_incl': 1,
                    'grades.sub_data.t_content': 1
                }
            }
        ])
        if (currObj.sub_id === currData[0].grades.sub_data.sub_id) {
            let subjectInfo = await subject.findOne({
                _id: new mongoose.Types.ObjectId(currObj.sub_id)
            })
            currData[0].grades.sub_data.sub_name = subjectInfo.name
            const learnerActivity = await getCurrActivity(dbName, collectionName, currObj);
            currData[0].grades.sub_data.useractivityheader = learnerActivity.headerObj;
            currData[0].grades.sub_data.useractivitycontent = learnerActivity.userActivityContent;
        }
        return currData[0].grades.sub_data
    }
    catch (error) {
        throw Error('findCurriculumSubjectDetailsV2 ' + error.message)
    }
}

const staticCount = (name) => {
    if (name === 'Physics') {
        return { completed: 4, progress: 5, doubt: 2, activities: 6, collaboration: 0 }
    } else if (name === 'Mathematics') {
        return { completed: 6, progress: 2, doubt: 1, activities: 3, collaboration: 0 }
    } else if (name === 'Chemistry') {
        return { completed: 2, progress: 4, doubt: 3, activities: 2, collaboration: 0 }
    } else if (name === 'Semiconductors') {
        return { completed: 3, progress: 3, doubt: 2, activities: 4, collaboration: 0 }
    }
}

// APi for disply subjects & curriculum count in dashboard screen
export const findCurriculumSubjectsV2 = async (learning, user_id) => {
    try {
        let categoryId = learning.curr_cat_id;
        let gradeId = learning.curr_grade_id;
        let currData = await currCategory.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(categoryId) } },
            {
                $unwind: {
                    path: "$grades"
                }
            },
            { $match: { "grades.id": gradeId } }
        ])

        let subjectsArray = [];

        for (let selectedSubject of learning.subjects) {
            for (let currSubject of currData[0].grades.sub_data) {
                let subjectData: any = {
                    categoryId,
                    gradeId
                }
                if (selectedSubject.id === currSubject.sub_id) {
                    let subjectInfo = await subject.findOne({
                        _id: new mongoose.Types.ObjectId(currSubject.sub_id)
                    })
                    subjectData.sub_id = currSubject.sub_id
                    subjectData.sub_name = subjectInfo.name
                    let chaptersData = await getChapterData(currSubject.sub_id)
                    if (chaptersData.length) {
                        subjectData.chapter = chaptersData[0].chapter.name
                    } else {
                        subjectData.chapter = ""
                    }
                    subjectData.sub_desc = currSubject.desc;
                    let count = await getActorDashboard(subjectData, user_id);
                    subjectData.dashboardCountData = count;
                    subjectsArray.push(subjectData)
                }
            }
        }
        return subjectsArray;
    }
    catch (error) {
        throw Error('findCurriculumSubjects ' + error.message)
    }
}
//Don't change, This api we are using other places.
const getActorDashboard = async (actorSummaryObj, user_id) => {
    try {
        const countDetails = await learnerDashboardSummary.find({
            "user_id": user_id,
            "curr_cat_id": actorSummaryObj.categoryId,
            "curr_grade_id": actorSummaryObj.gradeId,
            "sub_id": actorSummaryObj.sub_id
        })
        return countDetails;
    }
    catch (error) {
        throw Error('getActorDashboard ' + error.message)
    }
}

export const getCurriculumHeaderCount = async (user_id: string, dbName: string, collectionName: string) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        let currHeaderCount = await currActivitySummary.aggregate([
            {
                $match: {
                    user_id
                }
            },
            {
                $group: {
                    _id: "$user_id",                                        // Group by user_id field
                    in_progress_count: {
                        $sum: { $cond: [{ $eq: ["$sub_sts", 1] }, 1, 0] }   // Increment count if sub_sts = 1
                    },
                    completed_count: {
                        $sum: { $cond: [{ $eq: ["$sub_sts", 2] }, 1, 0] }   // Increment count if sub_sts = 2
                    },
                    total_certificate: { $sum: "$tot_s_cert" },
                    total_assig_given: { $sum: "$tot_s_assig_given" },
                    total_learning_hrs: {
                        $sum: { $add: ["$tot_s_vid_dur", "$tot_s_e_con_dur", "$tot_s_ques_dur"] } // Combine and sum the values
                    },
                    total_doubt_raised: { $sum: "$tot_s_dbt_raised" },
                    total_vcoin: { $sum: "$tot_s_vcoin_earn" }
                }
            },
            {
                $project: {
                    _id: 0,                     // Exclude _id field
                    in_progress_count: 1,       // Include not_completed_count field
                    completed_count: 1,         // Include completed_count field
                    total_certificate: 1,       // Include total_certificate
                    total_assig_given: 1,       // Include total_assig_given
                    total_learning_hrs: 1,      // Include total_learning_hrs
                    total_doubt_raised: 1,      // Include total_doubt_raised
                    total_vcoin: 1              // Include total_vcoin
                }
            }
        ]);
        return currHeaderCount[0]
    }
    catch (error) {
        throw Error('getCurriculumHeaderCount ' + error.message)
    }
}

export const getCurrActivity = async (dbName, collectionName, getCountObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const [mentorsDetails, learnersDetails, topicsData] = await Promise.all([
            getMentorsData(dbName, collectionName, getCountObj),
            getLearnersData(dbName, collectionName, getCountObj),
            getActivityData(dbName, collectionName, getCountObj)
        ]);

        const headerObj = {
            sub_rating: topicsData[0].sub_rating,
            tot_students: learnersDetails,
            tot_mentors: mentorsDetails,
            tot_topics_completed: topicsData.filter(item => item.data.t_data.t_sts === 2).length,
            tot_topics: topicsData.length,
            tot_hours_Completed: topicsData.reduce((totalCount, existingCount) => {
                totalCount += (existingCount.data.t_data.c_t_data.tot_vid_dur || 0);
                totalCount += (existingCount.data.t_data.c_t_data.tot_e_con_dur || 0);
                totalCount += (existingCount.data.t_data.c_t_data.tot_L1_ques_dur || 0);
                totalCount += (existingCount.data.t_data.c_t_data.tot_L2_ques_dur || 0);
                totalCount += (existingCount.data.t_data.c_t_data.tot_L3_ques_dur || 0);
                totalCount += (existingCount.data.t_data.c_t_data.tot_L4_ques_dur || 0);
                return totalCount;
            }, 0) / 3600,
            tot_hours: (topicsData[0].tot_s_vid_dur + topicsData[0].tot_s_e_con_dur + topicsData[0].tot_s_ques_dur) / 3600,
            buddiesCompleted: 0,
            buddiesInprogress: 0
        };
        const userActivityContent = {
            ttl_video_completed: topicsData[0].tot_s_vid_watch,
            ttl_e_content_completed: topicsData[0].tot_s_e_con_watch,
            ttl_imp_notes_completed: 0,
            ttl_question_completed: topicsData[0].tot_s_ques_corr,
            ttl_assignment_completed: topicsData[0].tot_s_assig_given,
            ttl_doubt_completed: topicsData[0].tot_s_dbt_raised,
            ttl_revision_completed: topicsData[0].tot_s_revision,
            ttl_example_completed: 0
        };
        return { headerObj, userActivityContent };
    } catch (error) {
        throw Error('getCurrActivity: ' + error.message);
    }
};

export const getMentorsData = async (dbName, collectionName, getCountObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const mentorIds = await userProfile.find(
            { "teaching.subjects.id": getCountObj.sub_id },
            { '_id': 0, 'user_id': 1 }
        );
        const mentorUsers = mentorIds.map(user => user.user_id.toString());
        const mentorsData = await currActivitySummary.find(
            {
                "user_id": { $in: mentorUsers },
                "sub_id": getCountObj.sub_id
            },
            { '_id': 0, 'user_id': 1 }
        );
        return mentorsData.length;
    } catch (error) {
        console.log(error);
        throw Error('getMentorsData: ' + error.message);
    }
};

export const getLearnersData = async (dbName, collectionName, getCountObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const learnerIds = await userProfile.find(
            { "learning.subjects.id": getCountObj.sub_id },
            { '_id': 0, 'user_id': 1 }
        );
        const learnerUsers = learnerIds.map(user => user.user_id.toString());
        const studentsData = await currActivitySummary.find(
            {
                "user_id": { $in: learnerUsers },
                "sub_id": getCountObj.sub_id
            },
            { '_id': 0, 'user_id': 1 }
        );
        return studentsData.length;
    } catch (error) {
        console.log(error);
        throw Error('getLearnersData: ' + error.message);
    }
};

export const getActivityData = async (dbName, collectionName, getCountObj) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const topicsData = await currActivitySummary.aggregate([
            {
                $match: {
                    "user_id": getCountObj.userid,
                    "cat_id": getCountObj.categoryId,
                    "grade_id": getCountObj.gradeId,
                    "sub_id": getCountObj.sub_id
                }
            },
            {
                $project: {
                    '_id': 0,
                    'sub_rating': 1,
                    "tot_s_vid_dur": 1,
                    "tot_s_e_con_dur": 1,
                    'tot_s_vid_watch': 1,
                    'tot_s_e_con_watch': 1,
                    'tot_s_ques_corr': 1,
                    'tot_s_ques_score': 1,
                    'tot_s_ques_dur': 1,
                    'tot_s_test_score': 1,
                    'tot_s_test_per': 1,
                    'tot_s_assig_given': 1,
                    'tot_s_assig_score': 1,
                    'tot_s_dbt_raised': 1,
                    'tot_s_revision': 1,
                    'data': 1
                }
            },
            { $unwind: { path: '$data' } },
            { $unwind: { path: '$data.t_data' } },
            {
                $project: {
                    '_id': 0,
                    "sub_rating": 1,
                    "tot_s_vid_dur": 1,
                    'tot_s_vid_watch': 1,
                    'tot_s_e_con_watch': 1,
                    "tot_s_e_con_dur": 1,
                    "tot_s_ques_dur": 1,
                    'tot_s_ques_corr': 1,
                    'tot_s_assig_given': 1,
                    'tot_s_dbt_raised': 1,
                    'tot_s_revision': 1,
                    'data.t_data.t_id': 1,
                    'data.t_data.t_sts': 1,
                    'data.t_data.c_t_data.tot_vid_dur': 1,
                    'data.t_data.c_t_data.tot_e_con_dur': 1,
                    'data.t_data.c_t_data.tot_L1_ques_dur': 1,
                    'data.t_data.c_t_data.tot_L2_ques_dur': 1,
                    'data.t_data.c_t_data.tot_L3_ques_dur': 1,
                    'data.t_data.c_t_data.tot_L4_ques_dur': 1,
                    'count': 1
                }
            }
        ]);
        return topicsData;
    } catch (error) {
        console.log(error);
        throw Error('getActivityData: ' + error.message);
    }
};

export const curriculumData = async (user_id: string, dbName: string, collectionName: string, learning) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        let categoryId = learning.curr_cat_id;
        let gradeId = learning.curr_grade_id;
        let currData = await currCategory.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(categoryId) } },
            {
                $unwind: {
                    path: "$grades"
                }
            },
            { $match: { "grades.id": gradeId } }
        ])
        let subjectsArray = [];
        for (let selectedSubject of learning.subjects) {
            let subjectData: any = {
                categoryId,
                gradeId
            }
            for (let currSubject of currData[0].grades.sub_data) {
                if (selectedSubject.id === currSubject.sub_id) {
                    let subjectInfo = await subject.findOne({
                        _id: new mongoose.Types.ObjectId(currSubject.sub_id)
                    })
                    subjectData.sub_id = currSubject.sub_id;
                    subjectData.sub_name = subjectInfo.name;
                    subjectData.sub_desc = currSubject.desc;
                }
            }
            const currSummary = await currActivitySummary.findOne({
                user_id,
                cat_id: categoryId,
                grade_id: gradeId,
                sub_id: selectedSubject.id
            })
            let firstOccurrence;
            let topicInfo;
            let lookupValues;
            if(currSummary) {
                firstOccurrence = await findFirstOccurrenceWithCurrentTopic(currSummary?.data);
                if (firstOccurrence?.t_id) {
                    topicInfo = await getTopic(selectedSubject.id, firstOccurrence?.t_id);
                }
                lookupValues = await getLookup("sub_sts", currSummary.sub_sts);
            }
           

            // const topicInfo = await getTopic(selectedSubject.id, firstOccurrence?.t_id);
            // const lookupValues = await getLookup("sub_sts", currSummary.sub_sts);
            const getCurriculumCount = await getCurriculumTotalCount(categoryId, gradeId, selectedSubject.id, dbName, collectionName);
            if (currSummary) {
                subjectData.sub_status = lookupValues[0]?.data?.val;
                subjectData.t_id = topicInfo?._id.toString();
                subjectData.t_name = topicInfo?.name;
                subjectData.curriculumCount = getCurriculumCount;
            } else {
                subjectData.sub_status = "";
                subjectData.t_id = "";
                subjectData.t_name = "";
            }
            subjectsArray.push(subjectData)
        }
        return subjectsArray;
    }
    catch (error) {
        throw Error('curriculumData ' + error.message)
    }
}

const findFirstOccurrenceWithCurrentTopic = async (data) => {
    for (const item of data) {
        for (const tDataItem of item.t_data) {
            if (tDataItem.t_sts === 0 || tDataItem.t_sts === 1 || tDataItem.t_sts === "") {
                return tDataItem;
            }
        }
    }
    return null;
}

export const getLookup = async (name, id) => {
    const lookupinfo = await lookUpMasterSchema.aggregate([
        {
            $match: {
                "name": name
            }
        },
        {
            $unwind: "$data"
        },
        {
            $match: {
                "data.seq": id
            }
        },
        {
            $project: { "_id": 0, "name": 1, "data.val": 1 }
        }
    ])
    return lookupinfo;
}

const getCurriculumTotalCount = async (cat_id: string, grade_id: string, sub_id: string, dbName: string, collectionName: string) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        let totalCount = await currActivitySummary.aggregate([
            {
                $match: {
                    cat_id, grade_id, sub_id
                }
            },
            {
                $group: {
                    _id: {
                        cat_id: "$cat_id",
                        grade_id: "$grade_id",
                        sub_id: "&sub_id"
                    },                                                      // Group by fields
                    in_progress_count: {
                        $sum: { $cond: [{ $eq: ["$sub_sts", 1] }, 1, 0] }   // Increment count if sub_sts = 1
                    },
                    completed_count: {
                        $sum: { $cond: [{ $eq: ["$sub_sts", 2] }, 1, 0] }   // Increment count if sub_sts = 2
                    },
                    total_assig_given: { $sum: "$tot_s_assig_given" },
                    total_doubt_raised: { $sum: "$tot_s_dbt_raised" },
                    total_vcoin: { $sum: "$tot_s_vcoin_earn" },
                    total_collabaration: { $sum: { $add: ["$tot_s_help_received", "$tot_s_chal", "$tot_s_gs"] } }
                }
            },
            {
                $project: {
                    _id: 0,                     // Exclude _id field
                    in_progress_count: 1,       // Include not_completed_count field
                    completed_count: 1,         // Include completed_count field
                    total_assig_given: 1,       // Include total_assig_given
                    total_doubt_raised: 1,      // Include total_doubt_raised
                    total_collabaration: 1,     // Include total_collabaration
                    total_vcoin: 1              // Include total_vcoin
                }
            }
        ]);
        return totalCount[0]
    }
    catch (error) {
        throw Error('getCurriculumTotalCount ' + error.message)
    }
}