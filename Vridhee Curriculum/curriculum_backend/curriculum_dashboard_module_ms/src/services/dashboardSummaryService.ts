import { dashboardSummary, curriculamTopicSummary, sub_chapter, learnerDashboardSummary,
        parentDashboardSummary, teacherDashboardSummary, campusDashboardSummary, 
        buddiesDashboardSummary, userProfile, subject, currCategory,
        userDashboard
    } from '../dbmanager/dbconnection';
const { ObjectId } = require('mongodb');

export const getDashboard = async (summaryObj) => {
    try {
        const getSummary = await dashboardSummary.find({ act_type: summaryObj.act_type, summary_type: summaryObj.summary_type })
        return getSummary;
    }
    catch (error) {
        throw Error('getDashboard ' + error.message)
    }
}

export const addcurriculumTopicSummary = async (curriculumTopicSummaryObj) => {
    try {
        const curriculamSummary = await curriculamTopicSummary.updateOne(
            {
                t_id: curriculumTopicSummaryObj.t_id
            },
            {
                $set: {
                    t_header: curriculumTopicSummaryObj.t_header,
                    t_content: curriculumTopicSummaryObj.t_content,
                    t_body: curriculumTopicSummaryObj.t_body,
                    t_includes: curriculumTopicSummaryObj.t_includes
                }
            },
            { upsert: true }
        )
        return curriculamSummary;
    }
    catch (error) {
        throw Error('add curriculamTopicSummary ' + error.message)
    }
}

export const getCurriculumTopicSummaryByTIdAsync = async (topicId) => {
    try {
        const getTopicSummaryDetails = await curriculamTopicSummary.find({
            "t_id": topicId.topic_id
        })
        if(getTopicSummaryDetails.length) {
            const getTopicInfo = await sub_chapter.aggregate([
                { $unwind : "$chapter.topics" },
                { $match: { "chapter.topics._id": new ObjectId(topicId.topic_id) } },
                { $project : { "chapter.topics.name": 1, "chapter.topics.descr": 1}}
            ])
            
            if (!getTopicInfo.length) {
                return {"status": 404, "message": "Data not available in Subject Chapter Topic" }
            }

            getTopicSummaryDetails[0]['_doc']["t_details"] = getTopicInfo[0].chapter.topics;
            // console.log("getTopicSummaryDetails>>", getTopicSummaryDetails)
            // getTopicInfo.chapter.topics;
            return getTopicSummaryDetails;
        }
        return getTopicSummaryDetails
       
    } catch (error) {
        throw Error(error.message);
    }
}

export const getActorDashboard = async (actorSummaryObj) => {
    try{
        const countDetails = await learnerDashboardSummary.find({
            "user_id": actorSummaryObj.user_id,
            "curr_cat_id": actorSummaryObj.catId,
            "curr_grade_id": actorSummaryObj.gradeId,
            "sub_id": actorSummaryObj.subjectId
        })
        return countDetails;
    }
    catch(error){
        throw Error('getActorDashboard ' + error.message)
    }
}

export const addActordashboardSummary = async (type, actorSummaryObj) => {
    try {
        let selectCollection;
        if (type === 'Learner') {
            selectCollection = learnerDashboardSummary;
        } else if (type === 'Parent') {
            selectCollection = parentDashboardSummary;
        } else if (type === 'Program Buddies') {
            selectCollection = buddiesDashboardSummary;
        } else if (type === 'Campus') {
            selectCollection = campusDashboardSummary
        } else if (type === 'Teacher') {
            selectCollection = teacherDashboardSummary
        }
        const actorSummary = await selectCollection.updateOne(
            {
                user_id: actorSummaryObj.user_id
            },
            {
                $set: {
                    ttl_cnt: actorSummaryObj.ttl_cnt,
                    curr_body: actorSummaryObj.curr_body,
                    ttl_buddy_cnt: actorSummaryObj.ttl_buddy_cnt,
                    hrs_sts: actorSummaryObj.hrs_sts,
                    studyplan: actorSummaryObj.studyplan,
                    activities: actorSummaryObj.activities,
                    collaboration: actorSummaryObj.collaboration,
                    header: actorSummaryObj.header,
                    body: actorSummaryObj.body
                }
            },
            { upsert: true }
        )
        return actorSummary;
    }
    catch (error) {
        throw Error('add actorSummary ' + error.message)
    }
}

export const getUserNeedToJoinSubjects = async (userId) => {
    try {
        const usersubjectList = await userProfile.aggregate([
            {
                $match: {"user_id": new ObjectId(userId)}
            },
            {
                $unwind: "$learning.subjects"
            },
            {
                $group: {
                    _id: null,
                    learningSubjectIds: {
                        $addToSet: "$learning.subjects.id"
                    },
                    teachingSubjectIds: {
                        $addToSet: "$teaching.subjects.id"
                    },
                    curr_cat_id: { $first: "$learning.curr_cat_id" },
                    curr_grade_id: { $first: "$learning.curr_grade_id"}
                }
            }
        ])
        const currCatId = usersubjectList[0].curr_cat_id;
        const currGadeId = usersubjectList[0].curr_grade_id;
        const learningSubList = usersubjectList[0].learningSubjectIds;
        const needTojoinSubjects = await findNeedTojoinSubjectList(currCatId, currGadeId, learningSubList);
       
        return needTojoinSubjects;
    } catch (error) {
        throw Error("getUserNeedToJoinSubjects : "+ error.message)
    }
}

const findNeedTojoinSubjectList = async(CatId, GadeId, subIds) => {
    try {
        const subLists = await currCategory.aggregate([
            {
                $match: { 
                    "_id": new ObjectId(CatId),
                    "grades.id": GadeId
                }
            },
            {
                $unwind: "$grades"
            },
            {
                $unwind: "$grades.sub_data"
            },
            {
                $match: {
                    "grades.sub_data.sub_id": { $nin: subIds }
                }
            },
            {
                $project:{
                    "grades.sub_data.sub_id": 1
                }
            },
            {
             $group: {
                    _id: null,
                    subjectIds:{
                        $addToSet: "$grades.sub_data.sub_id"
                    }
                }
            }
        ]);
    const needToJoinSubList = await subject.find({ "_id": { $in: subLists[0].subjectIds } })
    const topicCnt = await findSubjectTopicCnt(subLists[0].subjectIds);

    const subjectLists = needToJoinSubList.map(item1 => {
    const item2 = topicCnt.find(item2 => item1._id.toString() === item2._id);
        return {
            _id: item1._id,
            name: item1.name,
            cr_dts: item1.cr_dts,
            up_dts: item1.up_dts,
            __v: item1.__v,
            topicCount: item2 ? item2.topicCount : 0
        };
    });
  
    // Check if any data is found
    if (!subjectLists || subjectLists.length === 0) {
        throw new Error('No data found');
    }
    return subjectLists;
    } catch (error) {
        throw Error("findNeedTojoinSubjectList : "+ error.message);
    }
}

const findSubjectTopicCnt = async(subjectIds) => {
    // const subId = subjectId.toString()
    try {
        const topicCnt = await sub_chapter.aggregate([
            {
                $match: { 
                    "sub_id": { $in: subjectIds }
                }
            },
            {
                $group: {
                _id: "$sub_id",
                topicCount: {
                    $sum: { $size: "$chapter.topics" }
                }
                }
            }
        ]);
    return topicCnt;
    } catch (error) {
        throw Error("findNeedTojoinSubjectList : "+ error.message);
    }
}

export const getUserDashboard = async (dashboardObj) => {
    try {
        const getSummary = await userDashboard.find(
            {
                "user_id": dashboardObj.userId
            }
        )
        return getSummary;
    }
    catch (error) {
        throw Error('getUserDashboard ' + error.message)
    }
}