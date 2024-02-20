import mongoose from 'mongoose';
import { subject, sub_chapter, currCategory, userProfile } from "../dbmanager/dbconnection";
const { ObjectId } = require('mongodb');
import { v4 as uuidv4 } from 'uuid';

export const findSubject = async (subName) => {
    try {
        const existingSubject = await subject.findOne({ "name": subName });
        return existingSubject
    }
    catch (error) {
        throw Error('findSubject ' + error.message)
    }
}

export const insertSubject = async (subName) => {
    try {
        const createSub = await subject.create({ "name": subName })
        return createSub
    }
    catch (error) {
        throw Error('insertSubject ' + error.message)
    }
}

export const getSubject = async () => {
    try {
        const getSub = await subject.find({}, { _id: 1, name: 1, type: 1 })
        return getSub;
    }
    catch (error) {
        throw Error('getSubject ' + error.message)
    }
}

export const findChapters = async (subId) => {
    try {
        const chapters = await sub_chapter.find({
            "sub_id": subId,
            // "chapter.num": chapterObj.num,
            // "chapter.name": new RegExp(`^${chapterObj.name}$`, 'i'),
        })
        return chapters;
    }
    catch (error) {
        throw Error('findChapter ' + error.message)
    }
}

export const addChapter = async (chapterObj) => {
    try {
        const chapter = await sub_chapter.create(chapterObj)
        return chapter;
    }
    catch (error) {
        throw Error('addChapter ' + error.message)
    }
}

export const addChapters = async (chapters) => {
    try {
        const chapter = await sub_chapter.insertMany(chapters)
        return chapter;
    }
    catch (error) {
        throw Error('addChapters ' + error.message)
    }
}

export const addtopics = async (chapterId, topics) => {
    try {
        let topicsArray = [];
        for (let topic of topics) {
            let topicObj = {}
            topicObj = { ...topic }
            topicObj['cr_usr'] = 'AI';
            topicObj['up_usr'] = 'AI';
            topicsArray.push(topicObj)
        }
        const existingTopics = await sub_chapter.findOne({
            "_id": chapterId
        })
        if (existingTopics) {
            topicsArray = [...existingTopics.chapter.topics, ...topicsArray]
        }
        const topicsResponse = await sub_chapter.findOneAndUpdate(
            {
                "_id": chapterId
            },
            {
                $set: {
                    "chapter.topics": topicsArray
                }
            },
            { new: true }
        )
        return topicsResponse;
    }
    catch (error) {
        throw Error('addTopics ' + error.message)
    }
}

export const gettopics = async (chapterId) => {
    try {
        const topicsResponse = await sub_chapter.findOne(
            {
                "_id": chapterId
            },
            {
                _id: 1,
                chapter: 1
            }
        )
        return topicsResponse;
    }
    catch (error) {
        throw Error('getTopics ' + error.message)
    }
}

export const getSubjectChapterById = async (subjectObj) => {
    // console.log("subjectId>>", subjectId)    
    try {
        const getSubChapter = await sub_chapter.find(
            { sub_id: subjectObj.subject_id },
            {
                _id: 1,
                num: "$chapter.num",
                name: "$chapter.name",
                grade: "$chapter.grade",
                e_book: "$chapter.e_book",
                topics: "$chapter.topics",
                ty_brd_grd: "$chapter.ty_brd_grd"
            }
        );

        return getSubChapter;
    }
    catch (error) {
        throw Error('getSubChapter ' + error.message)
    }
}

export const addCurTags = async (curTagInfo) => {
    try {
        let curTagArray = [];
        let curTagObj = {}
        for (let curTag of curTagInfo.cur_tag) {
            curTagObj = { ...curTag }
            curTagObj['cr_usr'] = 'AI';
            curTagObj['up_usr'] = 'AI';
            curTagArray.push(curTagObj)
        }

        const topicsResponse = await sub_chapter.findOneAndUpdate(
            {
                "_id": new ObjectId(curTagInfo.chapter_id),
                "chapter.topics._id": new ObjectId(curTagInfo.t_id)
            },
            {
                $push: {
                    "chapter.topics.$.cur_tag": curTagArray
                }
            },
            { new: true }
        )
        return topicsResponse;
    }
    catch (error) {
        throw Error('addCurTag ' + error.message)
    }
}

export const addTotalCount = async (totalCountInfo) => {
    try {
        const topicsResponse = await sub_chapter.findOneAndUpdate(
            {
                "_id": new ObjectId(totalCountInfo.chapter_id),
                "chapter.topics._id": new ObjectId(totalCountInfo.t_id)
            },
            {
                $set: {
                    "chapter.topics.$.ttl_cnt": totalCountInfo.ttl_cnt
                }
            },
            { upsert: true, returnDocument: "after" }
        )
        return topicsResponse;
    }
    catch (error) {
        throw Error('Total count ' + error.message)
    }
}

export const addSubjectInCurrCategory = async (subject, catId, gradeId) => {
    let subId = subject._id;
    const curriculumResponse = await currCategory.findOneAndUpdate(
        {
            "_id": catId,
            "grades.id": gradeId
        },
        {
            $push: {
                "grades.$.sub_data": [{ sub_id: subId }]
            }
        },
        { new: true }
    )
    return curriculumResponse;
}

export const addCurriculum = async (currObj) => {
    try {
        let gradesArray = [];
        for (let grade of currObj.grades) {
            grade = { ...grade }
            grade.id = new mongoose.Types.ObjectId().toString()
            gradesArray.push(grade)
        }
        currObj.grades = gradesArray;
        let curriculumResponse = await currCategory.findOne({
            "name": currObj.name
        })
        if (curriculumResponse) {
            curriculumResponse = await currCategory.findOneAndUpdate(
                {
                    "name": currObj.name
                },
                {
                    "$push": {
                        "grades": {
                            "$each": currObj.grades
                        }
                    }
                },
                { new: true }
            )
        } else {
            curriculumResponse = await currCategory.create(currObj)
        }
        return curriculumResponse;
    } catch (error) {
        console.log(error)
        throw Error('addCurriculum ' + error.message)
    }
}

export async function updateCurriculumCategory(newData) {
    let updateResults = [];

    await Promise.all(newData.map(async (updatedDoc) => {

        const filter = {
            "name": updatedDoc.category,
            "grades.val": updatedDoc.grade,
            "grades.sub_data.sub_id": updatedDoc.sub_id
        }
        try {
            // const originalDocument = await currCategory.findOne(filter);
            const currCategoryResponse = await currCategory.findOneAndUpdate(
                filter,
                {
                    $set: {
                        "grades.$.sub_data.$[elem].desc": updatedDoc.desc,
                        "grades.$.sub_data.$[elem].will_learn": updatedDoc.will_learn,
                        "grades.$.sub_data.$[elem].crs_incl": updatedDoc.crs_incl,
                        "grades.$.sub_data.$[elem].t_header": updatedDoc.t_header,
                        "grades.$.sub_data.$[elem].t_content": updatedDoc.t_content,
                    }
                },
                {
                    arrayFilters: [
                        { "elem.sub_id": updatedDoc.sub_id }
                    ],
                    new: true
                }
            );

            // Determine if the document was updated
            const isUpdated = currCategoryResponse ? "true" : "false";

            // Push information about the update to the array
            updateResults.push({
                "category": updatedDoc.category,
                "grade": updatedDoc.grade,
                "sub_id": updatedDoc.sub_id,
                //  updatedDocument: updatedDoc,
                isUpdated
            });

            // return result if needed
        } catch (error) {
            console.error(error);

            // handle error
            throw error
        }
    }));

    return updateResults;
}

export const insertSubjectAndCurriculum = async (name, type, curriculumArray) => {
    try {
        let subjectData = await subject.findOne({
            name: name
        })
        if (!subjectData) {
            subjectData = await subject.create({ name: name, type: type })
        }
        let created = false;
        for (let curriculum of curriculumArray) {
            for (let grade of curriculum.grade) {
                await currCategory.findOneAndUpdate(
                    {
                        "name": curriculum.category,
                        "grades.val": grade
                    },
                    {
                        $push: {
                            "grades.$.sub_data": [{ sub_id: subjectData._id }]
                        }
                    },
                    { new: true }
                )
            }
            created = true;
        }
        return created
    } catch (error) {
        throw Error('insertSubjectAndCurriculum ' + error.message)
    }
}

export const addebooks = async (chapterId, ebooks) => {
    try {
        let eBooksArray = [];
        const existingEbooks = await sub_chapter.findOne({
            "_id": chapterId
        })
        if (existingEbooks) {
            eBooksArray = [...existingEbooks.chapter.e_book, ...ebooks]
        }
        const eBookResponse = await sub_chapter.findOneAndUpdate(
            {
                "_id": chapterId
            },
            {
                $set: {
                    "chapter.e_book": eBooksArray
                }
            },
            { new: true }
        )
        return eBookResponse;
    }
    catch (error) {
        throw Error('addEbooks ' + error.message)
    }
}

export const getChapterData = async (getSub_id) => {
    try {
        const course = await sub_chapter.aggregate([
            {
                $match: {
                    sub_id: getSub_id
                }
            },
            {
                $project: {
                    _id: 0,
                    "chapter.name": 1,
                    "chapter.topics": {
                        $map: {
                            input: "$chapter.topics",
                            as: "topic",
                            in: {
                                name: "$$topic.name",
                                completed: {
                                    $cond: {
                                        if: {
                                            $lt: [
                                                { $indexOfArray: ["$chapter.topics", "$$topic"] }, 2
                                            ]
                                        },
                                        then: true,
                                        else: false
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ])
        return course;
    } catch (error) {
        throw new Error('getChapterData: ' + error.message);
    }
};

export const getCourse = async (getSub_id) => {
    try {
        //const get_chapter = await sub_chapter.find({sub_id: getSub_id});
        const getSubject = await subject.find({ _id: new mongoose.Types.ObjectId(getSub_id) }, { _id: 0, "name": 1 })
        let total_index: any = [];

        if (getSubject[0].name === 'Mathematics') {
            const index_maths = 5
            total_index.push(index_maths);
        } else if (getSubject[0].name === 'Physics') {
            const index_physics = 4
            total_index.push(index_physics);
        } else if (getSubject[0].name === 'Chemistry') {
            const index_chemistry = 3
            total_index.push(index_chemistry);
        } else if (getSubject[0].name === 'Semiconductors') {
            const index_conductors = 2
            total_index.push(index_conductors);
        }

        const course = await sub_chapter.aggregate([
            {
                $match: {
                    sub_id: getSub_id,
                }
            },
            {
                $project: {
                    "chapter.name": 1,
                    "chapter.topics": {
                        $map: {
                            input: "$chapter.topics",
                            as: "topic",
                            in: {
                                name: "$$topic.name",
                                topic_id: "$$topic._id",
                            }
                        }
                    }
                }
            }
        ]);

        const total_chapter = course.length;
        const totalTopicsLength = course.reduce((total, chapter) => {
            return total + chapter.chapter.topics.length;
        }, 0);
        const total_time = Math.round((totalTopicsLength * 10) / 60);

        for (let i = 0; i < course.length; i++) {
            const chapter = course[i].chapter;
            const completedTopics = total_index;
            const totalTopics = chapter.topics.length;
            const totalTopicHours = (totalTopics * 10) / 60;

            const completedTopicsValue = i === 0 ? completedTopics : 0;
            const completedHours = (completedTopicsValue * 10) / 60;
            const buddiesCompleted = completedTopicsValue;

            Object.assign(chapter, {
                completed_topics: completedTopicsValue,
                total_topics: totalTopics,
                completed_hours: completedHours.toFixed(2),
                total_topic_hours: totalTopicHours.toFixed(2),
                buddies_completed: buddiesCompleted
            });

            for (let j = 0; j < chapter.topics.length; j++) {
                const completedValue = j < completedTopicsValue;
                chapter.topics[j].completed = completedValue;
            }
        }

        return { total_chapter, totalTopicsLength, total_time, course }
    } catch (error) {
        throw new Error('getCourse: ' + error.message);
    }
};


export const updateDescr = async (topicObj) => {
    try {
        const description = await sub_chapter.updateOne(
            {
                "_id": new mongoose.Types.ObjectId(topicObj.chapterId),
                "chapter.topics._id": new mongoose.Types.ObjectId(topicObj.topicId)
            },
            {
                $set: {
                    "chapter.topics.$.descr": topicObj.descr
                }
            }
        )
        return description;
    } catch (error) {
        throw new Error('updateDescr: ' + error.message)
    }
}


export const getchaptertopics = async (subId, gradeId) => {
    try {
        console.log(subId, gradeId);
        const topicsResponse = await sub_chapter.aggregate([
            {
                $match: { sub_id: subId },
            },
            {
                $unwind: "$chapter",
            },
            {
                $unwind: "$chapter.topics",
            },
            {
                $unwind: {
                    path: "$chapter.topics.cur_tag"
                },
            },
            {
                $unwind: "$chapter.topics.cur_tag.grd",
            },
            {
                $match: {
                    "chapter.topics.cur_tag.grd": gradeId,
                },
            },
            {
                $group: {
                    _id: "$chapter.name",
                    topics: {
                        $push: {
                            topic_name: "$chapter.topics.name",
                            topic_id: "$chapter.topics._id",
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    chapter_name: "$_id",
                    topics: 1,
                },
            },
            {
                $sort: {
                    chapter_name: 1,
                },
            },
        ])
        return topicsResponse;
    }
    catch (error) {
        throw Error('getchaptertopics ' + error.message)
    }
}

export const updateChap = async (chapObj) => {
    try {
        const chapter = await sub_chapter.updateOne(
            {
                "_id": new mongoose.Types.ObjectId(chapObj.chapterId)
            },
            {
                $set: {
                    "chapter.name": chapObj.name,
                    "chapter.unit": chapObj.unit,
                    "chapter.marks": chapObj.marks,
                    "chapter.period": chapObj.period,
                    "chapter.num": chapObj.num,
                    "up_usr": chapObj.up_usr
                }
            }
        )
        return chapter;
    } catch (error) {
        throw new Error('updateChap: ' + error.message)
    }
}

export const addTyBrdGrd = async (brdGrdObj) => {
    try {
        const tyBrdGrd = await sub_chapter.find(
            {
                "_id": new mongoose.Types.ObjectId(brdGrdObj.chapterId),
                "chapter.ty_brd_grd.cat_id": brdGrdObj.cat_id,
                "chapter.ty_brd_grd.grd_id": brdGrdObj.grd_id,
                "chapter.ty_brd_grd.brd_id": brdGrdObj.brd_id
            }
        )
        if (tyBrdGrd.length > 0) {
            return { "status": 404, "message": "Data already exists" }
        } else {
            const tyBrdGrdAdd = await sub_chapter.updateOne(
                {
                    "_id": new mongoose.Types.ObjectId(brdGrdObj.chapterId)
                },
                {
                    $push: {
                        "chapter.ty_brd_grd": {
                            $each:
                                [
                                    {
                                        "cat_id": brdGrdObj.cat_id,
                                        "grd_id": brdGrdObj.grd_id,
                                        "brd_id": brdGrdObj.brd_id,
                                        "prd": brdGrdObj.prd,
                                        "mar": brdGrdObj.mar
                                    }
                                ]
                        }
                    }
                }
            )
            return tyBrdGrdAdd;
        }
    } catch (error) {
        throw new Error('addTyBrdGrd: ' + error.message)
    }
}

export const updateTyBrdGrd = async (brdGrdObj) => {
    try {
        const tyBrdGrd = await sub_chapter.updateOne(
            {
                "_id": new mongoose.Types.ObjectId(brdGrdObj.chapterId),
                "chapter.ty_brd_grd._id": new mongoose.Types.ObjectId(brdGrdObj.brdGrdId)
            },
            {
                $set: {
                    "chapter.ty_brd_grd.$.cat_id": brdGrdObj.cat_id,
                    "chapter.ty_brd_grd.$.grd_id": brdGrdObj.grd_id,
                    "chapter.ty_brd_grd.$.brd_id": brdGrdObj.brd_id,
                    "chapter.ty_brd_grd.$.prd": brdGrdObj.prd,
                    "chapter.ty_brd_grd.$.mar": brdGrdObj.mar
                }
            }
        )
        return tyBrdGrd;
    } catch (error) {
        throw new Error('updateTyBrdGrd: ' + error.message)
    }
}

export const updateEbooks = async (ebookObj) => {
    try {
        const ebookRes = await sub_chapter.updateOne(
            {
                "_id": new mongoose.Types.ObjectId(ebookObj.chapterId),
                "chapter.e_book._id": new mongoose.Types.ObjectId(ebookObj.ebookId)
            },
            {
                $set: {
                    "chapter.e_book.$.name": ebookObj.name,
                    "chapter.e_book.$.author": ebookObj.author,
                    "chapter.e_book.$.src": ebookObj.src,
                    "chapter.e_book.$.link": ebookObj.link,
                    "chapter.e_book.$.format": ebookObj.format
                }
            }
        )
        return ebookRes;
    } catch (error) {
        throw new Error('updateEbooks: ' + error.message)
    }
}

export const updateTopics = async (topicObj) => {
    try {
        const topicResponse = await sub_chapter.updateOne(
            {
                "_id": new mongoose.Types.ObjectId(topicObj.chapterId),
                "chapter.topics._id": new mongoose.Types.ObjectId(topicObj.topicId)
            },
            {
                $set: {
                    "chapter.topics.$.name": topicObj.name,
                    "chapter.topics.$.descr": topicObj.descr,
                    "chapter.topics.$.up_usr": topicObj.up_usr,
                    "chapter.topics.$.seq": topicObj.seq
                }
            }
        )
        return topicResponse;
    } catch (error) {
        throw new Error('updateTopics: ' + error.message)
    }
}

export const updateCurTag = async (currTagObj) => {
    try {

        const curTagRes = await sub_chapter.updateOne(
            {
                "_id": new mongoose.Types.ObjectId(currTagObj.chapterId),
                "chapter.topics._id": new mongoose.Types.ObjectId(currTagObj.topicId),
                "chapter.topics.cur_tag._id": new mongoose.Types.ObjectId(currTagObj.curTagId),
            },
            {
                $set: {
                    "chapter.topics.$[topic].cur_tag.$[tag].cat_id": currTagObj.cat_id,
                    "chapter.topics.$[topic].cur_tag.$[tag].grd_id": currTagObj.grd_id,
                    "chapter.topics.$[topic].cur_tag.$[tag].brd_id": currTagObj.brd_id,
                    "chapter.topics.$[topic].cur_tag.$[tag].prd": currTagObj.prd,
                    "chapter.topics.$[topic].cur_tag.$[tag].rel_t_id": currTagObj.rel_t_id
                }
            },
            {
                arrayFilters: [
                    { "topic._id": new mongoose.Types.ObjectId(currTagObj.topicId) },
                    { "tag._id": new mongoose.Types.ObjectId(currTagObj.curTagId) }
                ]
            }
        );
        return curTagRes;
    } catch (error) {
        console.log(error.message);
        throw new Error('updateCurTag: ' + error.message);
    }
}

export const getTopic = async (sub_id, t_id) => {
    try {
        const topic = await sub_chapter.aggregate([
            {
                '$match': {
                    'sub_id': sub_id
                }
            }, {
                '$unwind': {
                    'path': '$chapter.topics'
                }
            }, {
                '$match': {
                    'chapter.topics._id': new mongoose.Types.ObjectId(t_id)
                }
            }
        ])
        return topic[0].chapter.topics;
    } catch (error) {
        throw new Error('getChapterData: ' + error.message);
    }
};