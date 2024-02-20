import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

import { findChapterTopic, findTopic, findTopics, findTopicBasedOnName } from '../services/findChapterTopic';
import { Status, ResponseWithObject, APIResponse } from '../utils/status';
import { noDataAvail, topicId } from '../utils/errormsg';
import { questionTypes } from '../utils/questionCollectionType'
import mongoose from 'mongoose';
import { uploadFileIntoS3 } from "../utils/s3Config";
import { addQuesChoiceLevel1, addQuesChoiceLevel2, addQuesChoiceLevel3, addQuesChoiceLevel4 } from '../services/vridheeCurriculumEnglish';
import { getUserNameProfImg } from '../services/userActivity';

router.post('/videoContentLevel1', async (req: Request, res: Response, next: NextFunction) => {
    console.log("language>>", req.originalUrl);
    try {
        const { chapterName, topicName, data } = req.body;
        // if (!chapterName) {
        //     return res.send(new APIResponse(400, 'Chapter name is mandatory in body'));
        // }
        if (!topicName) {
            return res.send(new APIResponse(400, 'Topic name is mandatory in body'));
        }
        let videoContentLevel1 = {}
        // const chapterTopic = await findChapterTopic(chapterName, topicName);
        const chapterTopic = await findTopicBasedOnName(topicName);
        if (chapterTopic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }
        videoContentLevel1['t_id'] = chapterTopic.topics._id;
        videoContentLevel1['topicName'] = chapterTopic.topics.name;
        videoContentLevel1['data'] = data;
        const addvideoLevel1 = await global.service.addVideoLevel1(videoContentLevel1);
        if (addvideoLevel1) {
            return res.status(201).send(new ResponseWithObject(201, "done", addvideoLevel1));
        } else {
            return res.send(new APIResponse(400, 'videoContentLevel1 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/bookEContentLevel1', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }
        let bookEContentLevel1 = {}
        const { chapterName, topicName, data } = req.body;
        const chapterTopic = await findTopics(req.body.t_id, req.body.chapter_id);

        if (chapterTopic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }
        bookEContentLevel1['data'] = data;
        bookEContentLevel1['t_id'] = req.body.t_id;
        const addbookEContentLevel1 = await global.service.addBookEContentLevel1(bookEContentLevel1);
        if (addbookEContentLevel1) {
            return res.status(201).send(new ResponseWithObject(201, "done", addbookEContentLevel1));
        } else {
            return res.send(new APIResponse(400, 'bookEContentLevel1 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/aiEContentLevel1', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chapterName, topicName, data } = req.body;
        if (!chapterName) {
            return res.send(new APIResponse(400, 'Chapter name is mandatory in body'));
        }
        if (!topicName) {
            return res.send(new APIResponse(400, 'Topic name is mandatory in body'));
        }
        let aiEContentLevel1 = {}

        const chapterTopic = await findChapterTopic(chapterName, topicName);
        if (chapterTopic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }
        aiEContentLevel1['chapterId'] = chapterTopic.id;
        aiEContentLevel1['chapterName'] = chapterTopic.name;
        aiEContentLevel1['t_id'] = chapterTopic.topics[0]._id;
        aiEContentLevel1['topicName'] = chapterTopic.topics[0].name;
        aiEContentLevel1['data'] = data;
        const addAiEContentLevel1 = await global.service.addAiEContentLevel1(aiEContentLevel1);
        if (addAiEContentLevel1) {
            return res.status(201).send(new ResponseWithObject(201, "done", addAiEContentLevel1));
        } else {
            return res.send(new APIResponse(400, 'aiEContentLevel1 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/aiEContentLevel2', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chapterName, topicName, data } = req.body;
        if (!chapterName) {
            return res.send(new APIResponse(400, 'Chapter name is mandatory in body'));
        }
        if (!topicName) {
            return res.send(new APIResponse(400, 'Topic name is mandatory in body'));
        }
        let aiEContentLevel2 = {}

        const chapterTopic = await findChapterTopic(chapterName, topicName);
        if (chapterTopic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }
        aiEContentLevel2['chapterId'] = chapterTopic.id;
        aiEContentLevel2['chapterName'] = chapterTopic.name;
        aiEContentLevel2['t_id'] = chapterTopic.topics[0]._id;
        aiEContentLevel2['topicName'] = chapterTopic.topics[0].name;
        aiEContentLevel2['data'] = data;
        const addAiEContentLevel2 = await global.service.addAiEContentLevel2(aiEContentLevel2);
        if (addAiEContentLevel2) {
            return res.status(201).send(new ResponseWithObject(201, "done", addAiEContentLevel2));
        } else {
            return res.send(new APIResponse(400, 'aiEContentLevel2 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/aiEContentLevel3', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chapterName, topicName, data } = req.body;
        if (!chapterName) {
            return res.send(new APIResponse(400, 'Chapter name is mandatory in body'));
        }
        if (!topicName) {
            return res.send(new APIResponse(400, 'Topic name is mandatory in body'));
        }
        let aiEContentLevel3 = {}

        const chapterTopic = await findChapterTopic(chapterName, topicName);
        if (chapterTopic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }
        aiEContentLevel3['chapterId'] = chapterTopic.id;
        aiEContentLevel3['chapterName'] = chapterTopic.name;
        aiEContentLevel3['t_id'] = chapterTopic.topics[0]._id;
        aiEContentLevel3['topicName'] = chapterTopic.topics[0].name;
        aiEContentLevel3['data'] = data;
        const addAiEContentLevel3 = await global.service.addAiEContentLevel3(aiEContentLevel3);
        if (addAiEContentLevel3) {
            return res.status(201).send(new ResponseWithObject(201, "done", addAiEContentLevel3));
        } else {
            return res.send(new APIResponse(400, 'aiEContentLevel3 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/aiEContentLevel4', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chapterName, topicName, data } = req.body;
        if (!chapterName) {
            return res.send(new APIResponse(400, 'Chapter name is mandatory in body'));
        }
        if (!topicName) {
            return res.send(new APIResponse(400, 'Topic name is mandatory in body'));
        }
        let aiEContentLevel4 = {}

        const chapterTopic = await findChapterTopic(chapterName, topicName);
        if (chapterTopic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }
        aiEContentLevel4['chapterId'] = chapterTopic.id;
        aiEContentLevel4['chapterName'] = chapterTopic.name;
        aiEContentLevel4['t_id'] = chapterTopic.topics[0]._id;
        aiEContentLevel4['topicName'] = chapterTopic.topics[0].name;
        aiEContentLevel4['data'] = data;
        const addAiEContentLevel4 = await global.service.addAiEContentLevel4(aiEContentLevel4);
        if (addAiEContentLevel4) {
            return res.status(201).send(new ResponseWithObject(201, "done", addAiEContentLevel4));
        } else {
            return res.send(new APIResponse(400, 'aiEContentLevel4 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/teacherEContentLevel1', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chapterName, topicName, data } = req.body;
        if (!chapterName) {
            return res.send(new APIResponse(400, 'Chapter name is mandatory in body'));
        }
        if (!topicName) {
            return res.send(new APIResponse(400, 'Topic name is mandatory in body'));
        }
        let teacherEContentLevel1 = {}
        const chapterTopic = await findChapterTopic(chapterName, topicName);
        if (chapterTopic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }
        teacherEContentLevel1['chapterId'] = chapterTopic.id;
        teacherEContentLevel1['chapterName'] = chapterTopic.name;
        teacherEContentLevel1['t_id'] = chapterTopic.topics[0]._id;
        teacherEContentLevel1['topicName'] = chapterTopic.topics[0].name;
        teacherEContentLevel1['data'] = data;
        const addteacherEContentLevel1 = await global.service.addTeacherEContentLevel1(teacherEContentLevel1);
        if (addteacherEContentLevel1) {
            return res.status(201).send(new ResponseWithObject(201, "done", addteacherEContentLevel1));
        } else {
            return res.send(new APIResponse(400, 'teacherEContentLevel1 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/examplesLevel1', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chapterName, topicName, data } = req.body;
        if (!chapterName) {
            return res.send(new APIResponse(400, 'Chapter name is mandatory in body'));
        }
        if (!topicName) {
            return res.send(new APIResponse(400, 'Topic name is mandatory in body'));
        }
        let examplesLevel1 = {}

        const chapterTopic = await findChapterTopic(chapterName, topicName);
        if (chapterTopic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }
        examplesLevel1['chapterId'] = chapterTopic.id;
        examplesLevel1['chapterName'] = chapterTopic.name;
        examplesLevel1['t_id'] = chapterTopic.topics[0]._id;
        examplesLevel1['topicName'] = chapterTopic.topics[0].name;
        examplesLevel1['data'] = data;
        const addExamplesLevel1 = await global.service.addExamplesLevel1(examplesLevel1);
        if (addExamplesLevel1) {
            return res.status(201).send(new ResponseWithObject(201, "done", addExamplesLevel1));
        } else {
            return res.send(new APIResponse(400, 'examplesLevel1 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/importantPointsLevel1', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chapterName, topicName, data } = req.body;
        if (!chapterName) {
            return res.send(new APIResponse(400, 'Chapter name is mandatory in body'));
        }
        if (!topicName) {
            return res.send(new APIResponse(400, 'Topic name is mandatory in body'));
        }
        let importantPointsLevel1 = {}

        const chapterTopic = await findChapterTopic(chapterName, topicName);
        if (chapterTopic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }
        importantPointsLevel1['chapterId'] = chapterTopic.id;
        importantPointsLevel1['chapterName'] = chapterTopic.name;
        importantPointsLevel1['t_id'] = chapterTopic.topics[0]._id;
        importantPointsLevel1['topicName'] = chapterTopic.topics[0].name;
        importantPointsLevel1['data'] = data;
        const addimportantPointsLevel1 = await global.service.addImportantPointsLevel1(importantPointsLevel1);
        if (addimportantPointsLevel1) {
            return res.status(201).send(new ResponseWithObject(201, "done", addimportantPointsLevel1));
        } else {
            return res.send(new APIResponse(400, 'importantPointsLevel1 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/excerciseLevel1', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chapterName, topicName, data } = req.body;
        if (!chapterName) {
            return res.send(new APIResponse(400, 'Chapter name is mandatory in body'));
        }
        if (!topicName) {
            return res.send(new APIResponse(400, 'Topic name is mandatory in body'));
        }
        let excerciseLevel1 = {}

        const chapterTopic = await findChapterTopic(chapterName, topicName);
        if (chapterTopic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }
        excerciseLevel1['chapterId'] = chapterTopic.id;
        excerciseLevel1['chapterName'] = chapterTopic.name;
        excerciseLevel1['t_id'] = chapterTopic.topics[0]._id;
        excerciseLevel1['topicName'] = chapterTopic.topics[0].name;
        excerciseLevel1['data'] = data;
        const addexcerciseLevel1 = await global.service.addExcerciseLevel1(excerciseLevel1);
        if (addexcerciseLevel1) {
            return res.status(201).send(new ResponseWithObject(201, "done", addexcerciseLevel1));
        } else {
            return res.send(new APIResponse(400, 'excerciseLevel1 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/questionChoiceLevel1', async (req: Request, res: Response, next: NextFunction) => {
    // console.log("body>>", req.body);
    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }
        const topic = await findTopic(req.body.t_id);
        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        const addquestionChoiceLevel1 = await global.service.addquestionChoiceLevel1(req.body);
        if (addquestionChoiceLevel1.status === 200) {
            return res.status(201).send(new ResponseWithObject(201, "done", addquestionChoiceLevel1));
        } else if (addquestionChoiceLevel1.status === 409) {
            return res.send(new APIResponse(409, "Questions is Already exists in our question Bank"));
        } else {
            return res.send(new APIResponse(400, 'addquestionChoiceLevel1 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/questionChoiceLevel2', async (req: Request, res: Response, next: NextFunction) => {
    // console.log("body>>2", req.body);
    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }
        const topic = await findTopic(req.body.t_id);
        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        const addquestionChoiceLevel2 = await global.service.addquestionChoiceLevel2(req.body);
        if (addquestionChoiceLevel2.status === 200) {
            return res.status(201).send(new ResponseWithObject(201, "done", addquestionChoiceLevel2));
        } else if (addquestionChoiceLevel2.status === 409) {
            return res.send(new APIResponse(409, "Questions is Already exists in our question Bank"));
        } else {
            return res.send(new APIResponse(400, 'questionChoiceLevel2 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/questionChoiceLevel3', async (req: Request, res: Response, next: NextFunction) => {
    // console.log("body>>3", req.body);
    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }
        const topic = await findTopic(req.body.t_id);
        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        const addquestionChoiceLevel3 = await global.service.addquestionChoiceLevel3(req.body);
        if (addquestionChoiceLevel3.status === 200) {
            return res.status(201).send(new ResponseWithObject(201, "done", addquestionChoiceLevel3));
        } else if (addquestionChoiceLevel3.status === 409) {
            return res.send(new APIResponse(409, "Questions is Already exists in our question Bank"));
        } else {
            return res.send(new APIResponse(400, 'questionChoiceLevel3 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/questionChoiceLevel4', async (req: Request, res: Response, next: NextFunction) => {
    // console.log("body>>4", req.body);
    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }
        const topic = await findTopic(req.body.t_id);
        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        const addquestionChoiceLevel4 = await global.service.addquestionChoiceLevel4(req.body);
        if (addquestionChoiceLevel4.status === 200) {
            return res.status(201).send(new ResponseWithObject(201, "done", addquestionChoiceLevel4));
        } else if (addquestionChoiceLevel4.status === 409) {
            return res.send(new APIResponse(409, "Questions is Already exists in our question Bank"));
        } else {
            return res.send(new APIResponse(400, 'questionChoiceLevel4 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/questionFillBlankLevel1', async (req: Request, res: Response, next: NextFunction) => {
    // console.log("body>>", req.body);
    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }
        const topic = await findTopic(req.body.t_id);
        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        const qFillBlankLevel1 = await global.service.addquestionFillBlankLevel1(req.body);
        if (qFillBlankLevel1.status === 200) {
            return res.status(201).send(new ResponseWithObject(201, "done", qFillBlankLevel1));
        } else if (qFillBlankLevel1.status === 409) {
            return res.send(new APIResponse(409, "Questions is Already exists in our question Bank"));
        } else {
            return res.send(new APIResponse(400, 'questionFillBlankLevel1 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/questionFillBlankLevel2', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }
        const topic = await findTopic(req.body.t_id);
        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        const qFillBlankLevel2 = await global.service.addquestionFillBlankLevel2(req.body);
        if (qFillBlankLevel2.status === 200) {
            return res.status(201).send(new ResponseWithObject(201, "done", qFillBlankLevel2));
        } else if (qFillBlankLevel2.status === 409) {
            return res.send(new APIResponse(409, "Questions is Already exists in our question Bank"));
        } else {
            return res.send(new APIResponse(400, 'questionFillBlankLevel2 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/questionFillBlankLevel3', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }
        const topic = await findTopic(req.body.t_id);
        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        const qFillBlankLevel3 = await global.service.addquestionFillBlankLevel3(req.body);
        if (qFillBlankLevel3.status === 200) {
            return res.status(201).send(new ResponseWithObject(201, "done", qFillBlankLevel3));
        } else if (qFillBlankLevel3.status === 409) {
            return res.send(new APIResponse(409, "Questions is Already exists in our question Bank"));
        } else {
            return res.send(new APIResponse(400, 'questionFillBlankLevel3 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/questionFillBlankLevel4', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }
        const topic = await findTopic(req.body.t_id);
        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        const qFillBlankLevel4 = await global.service.addquestionFillBlankLevel4(req.body);
        if (qFillBlankLevel4.status === 200) {
            return res.status(201).send(new ResponseWithObject(201, "done", qFillBlankLevel4));
        } else if (qFillBlankLevel4.status === 409) {
            return res.send(new APIResponse(409, "Questions is Already exists in our question Bank"));
        } else {
            return res.send(new APIResponse(400, 'questionFillBlankLevel4 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/questionPassageLevel1', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const questionPassageLevel1 = await global.service.addQuestionPassageLevel1(req.body);
        if (questionPassageLevel1.status === 200) {
            return res.status(201).send(new ResponseWithObject(201, "done", questionPassageLevel1));
        } else if (questionPassageLevel1.status === 409) {
            return res.send(new APIResponse(400, questionPassageLevel1.message));
        } else {
            return res.send(new APIResponse(400, 'questionPassageLevel1 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/questionPassageLevel2', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const questionPassageLevel2 = await global.service.addQuestionPassageLevel2(req.body);
        if (questionPassageLevel2.status === 200) {
            return res.status(201).send(new ResponseWithObject(201, "done", questionPassageLevel2));
        } else if (questionPassageLevel2.status === 409) {
            return res.send(new APIResponse(400, questionPassageLevel2.message));
        } else {
            return res.send(new APIResponse(400, 'questionPassageLevel2 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/questionPassageLevel3', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const questionPassageLevel3 = await global.service.addQuestionPassageLevel3(req.body);
        if (questionPassageLevel3.status === 200) {
            return res.status(201).send(new ResponseWithObject(201, "done", questionPassageLevel3));
        } else if (questionPassageLevel3.status === 409) {
            return res.send(new APIResponse(400, questionPassageLevel3.message));
        } else {
            return res.send(new APIResponse(400, 'questionPassageLevel3 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/questionPassageLevel4', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const questionPassageLevel4 = await global.service.addQuestionPassageLevel4(req.body);
        if (questionPassageLevel4.status === 200) {
            return res.status(201).send(new ResponseWithObject(201, "done", questionPassageLevel4));
        } else if (questionPassageLevel4.status === 409) {
            return res.send(new APIResponse(400, questionPassageLevel4.message));
        } else {
            return res.send(new APIResponse(400, 'questionPassageLevel4 are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getbookEContentLevel1', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        const contentDetails = await global.service.getbookEContentLevel1(req.body);

        if (contentDetails.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", contentDetails));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getQuestionChoiceLevel1', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        if (!req.body.kind) {
            return res.send(new APIResponse(400, 'Kind is mandatory in body'));
        }

        if (!req.body.for) {
            return res.send(new APIResponse(400, 'For is mandatory in body'));
        }

        if (!req.body.bloom_cat_id) {
            return res.send(new APIResponse(400, 'bloom_cat_id is mandatory in body'));
        }

        const questionChoiceDetails = await global.service.getQuestionChoiceLevel1(req.body);

        if (questionChoiceDetails.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", questionChoiceDetails));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getQuestionChoiceLevel2', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        if (!req.body.kind) {
            return res.send(new APIResponse(400, 'Kind is mandatory in body'));
        }

        if (!req.body.for) {
            return res.send(new APIResponse(400, 'For is mandatory in body'));
        }

        if (!req.body.bloom_cat_id) {
            return res.send(new APIResponse(400, 'bloom_cat_id is mandatory in body'));
        }

        const questionChoiceDetails = await global.service.getQuestionChoiceLevel2(req.body);

        if (questionChoiceDetails.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", questionChoiceDetails));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getQuestionChoiceLevel3', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        if (!req.body.kind) {
            return res.send(new APIResponse(400, 'Kind is mandatory in body'));
        }

        if (!req.body.for) {
            return res.send(new APIResponse(400, 'For is mandatory in body'));
        }

        if (!req.body.bloom_cat_id) {
            return res.send(new APIResponse(400, 'bloom_cat_id is mandatory in body'));
        }

        const questionChoiceDetails = await global.service.getQuestionChoiceLevel3(req.body);

        if (questionChoiceDetails.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", questionChoiceDetails));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getQuestionChoiceLevel4', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        if (!req.body.kind) {
            return res.send(new APIResponse(400, 'Kind is mandatory in body'));
        }

        if (!req.body.for) {
            return res.send(new APIResponse(400, 'For is mandatory in body'));
        }

        if (!req.body.bloom_cat_id) {
            return res.send(new APIResponse(400, 'bloom_cat_id is mandatory in body'));
        }

        const questionChoiceDetails = await global.service.getQuestionChoiceLevel4(req.body);

        if (questionChoiceDetails.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", questionChoiceDetails));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getQuestionFillBankLevel1', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        if (!req.body.kind) {
            return res.send(new APIResponse(400, 'Kind is mandatory in body'));
        }

        if (!req.body.for) {
            return res.send(new APIResponse(400, 'For is mandatory in body'));
        }

        if (!req.body.bloom_cat_id) {
            return res.send(new APIResponse(400, 'bloom_cat_id is mandatory in body'));
        }

        const questionFillBankDetails = await global.service.getQuestionFillBankLevel1(req.body);

        if (questionFillBankDetails.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", questionFillBankDetails));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getQuestionFillBankLevel2', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        if (!req.body.kind) {
            return res.send(new APIResponse(400, 'Kind is mandatory in body'));
        }

        if (!req.body.for) {
            return res.send(new APIResponse(400, 'For is mandatory in body'));
        }

        if (!req.body.bloom_cat_id) {
            return res.send(new APIResponse(400, 'bloom_cat_id is mandatory in body'));
        }

        const questionFillBank2Details = await global.service.getQuestionFillBankLevel2(req.body);

        if (questionFillBank2Details.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", questionFillBank2Details));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getQuestionFillBankLevel3', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        if (!req.body.kind) {
            return res.send(new APIResponse(400, 'Kind is mandatory in body'));
        }

        if (!req.body.for) {
            return res.send(new APIResponse(400, 'For is mandatory in body'));
        }

        if (!req.body.bloom_cat_id) {
            return res.send(new APIResponse(400, 'bloom_cat_id is mandatory in body'));
        }

        const questionFillBank3Details = await global.service.getQuestionFillBankLevel3(req.body);

        if (questionFillBank3Details.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", questionFillBank3Details));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getQuestionFillBankLevel4', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        if (!req.body.kind) {
            return res.send(new APIResponse(400, 'Kind is mandatory in body'));
        }

        if (!req.body.for) {
            return res.send(new APIResponse(400, 'For is mandatory in body'));
        }

        if (!req.body.bloom_cat_id) {
            return res.send(new APIResponse(400, 'bloom_cat_id is mandatory in body'));
        }

        const questionFillBank4Details = await global.service.getQuestionFillBankLevel4(req.body);

        if (questionFillBank4Details.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", questionFillBank4Details));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getQuestionPassageLevel1', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        if (!req.body.kind) {
            return res.send(new APIResponse(400, 'Kind is mandatory in body'));
        }

        if (!req.body.for) {
            return res.send(new APIResponse(400, 'For is mandatory in body'));
        }

        if (!req.body.level) {
            return res.send(new APIResponse(400, 'Level is mandatory in body'));
        }

        const questionPassage1Details = await global.service.getQuestionPassageLevel1(req.body);

        if (questionPassage1Details.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", questionPassage1Details));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getQuestionPassageLevel2', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        if (!req.body.kind) {
            return res.send(new APIResponse(400, 'Kind is mandatory in body'));
        }

        if (!req.body.for) {
            return res.send(new APIResponse(400, 'For is mandatory in body'));
        }

        if (!req.body.level) {
            return res.send(new APIResponse(400, 'Level is mandatory in body'));
        }

        const questionPassage2Details = await global.service.getQuestionPassageLevel2(req.body);

        if (questionPassage2Details.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", questionPassage2Details));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getQuestionPassageLevel3', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        if (!req.body.kind) {
            return res.send(new APIResponse(400, 'Kind is mandatory in body'));
        }

        if (!req.body.for) {
            return res.send(new APIResponse(400, 'For is mandatory in body'));
        }

        if (!req.body.level) {
            return res.send(new APIResponse(400, 'Level is mandatory in body'));
        }

        const questionPassage3Details = await global.service.getQuestionPassageLevel3(req.body);

        if (questionPassage3Details.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", questionPassage3Details));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getQuestionPassageLevel4', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        if (!req.body.kind) {
            return res.send(new APIResponse(400, 'Kind is mandatory in body'));
        }

        if (!req.body.for) {
            return res.send(new APIResponse(400, 'For is mandatory in body'));
        }

        if (!req.body.level) {
            return res.send(new APIResponse(400, 'Level is mandatory in body'));
        }

        const questionPassage4Details = await global.service.getQuestionPassageLevel4(req.body);

        if (questionPassage4Details.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", questionPassage4Details));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getTeacherEContentLevel1', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, topicId));
        }

        const teacherEContentData = await global.service.getTeacherEContentLevel1(req.body);

        if (teacherEContentData.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", teacherEContentData));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getAiEContentLevel1', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, topicId));
        }

        const aiEContentLevel1Data = await global.service.getAiEContentLevel1(req.body);

        if (aiEContentLevel1Data.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", aiEContentLevel1Data));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getAiEContentLevel2', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, topicId));
        }

        const aiEContentLevel2Data = await global.service.getAiEContentLevel2(req.body);

        if (aiEContentLevel2Data.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", aiEContentLevel2Data));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getAiEContentLevel3', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, topicId));
        }

        const aiEContentLevel3Data = await global.service.getAiEContentLevel3(req.body);

        if (aiEContentLevel3Data.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", aiEContentLevel3Data));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getAiEContentLevel4', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, topicId));
        }

        const aiEContentLevel4Data = await global.service.getAiEContentLevel4(req.body);

        if (aiEContentLevel4Data.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", aiEContentLevel4Data));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/getQuestions', async (req: Request, res: Response, next: NextFunction) => {
    const { subjects, chapters, topics, question_type, limit } = req.body

    try {

        if (question_type && !questionTypes.hasOwnProperty(String(question_type))) {
            return res.send(new APIResponse(415, "Invalid Question Type"));
        }

        if (!subjects.length && !chapters.length && !topics.length) {
            console.log("At least one of subject, chapter, or topics should be provided.");
            return res.send(new APIResponse(400, "At least one of subject, chapter, or topics should be provided."))
        }

        const questionLists = await global.service.getQuestionsInfo(req.body);
        if (!questionLists) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", questionLists));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})


router.get('/getVideoContentLevel1', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        const contentDetails = await global.service.getVideoContentLevel1(req.body);

        if (contentDetails.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", contentDetails));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getExampleLevel', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        const exampleDetails = await global.service.getExampleLevel(req.body);

        if (exampleDetails.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", exampleDetails));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getImportantPointsLevel', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        const importantPointsDetails = await global.service.getImportantPointsLevel(req.body);

        if (importantPointsDetails.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", importantPointsDetails));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getExerciseLevel', async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory in body'));
        }

        const exerciseLevelDetails = await global.service.getExerciseLevel(req.body);

        if (exerciseLevelDetails.status === 404) {
            return res.send(new APIResponse(404, noDataAvail));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", exerciseLevelDetails));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/createVideoTLine', async (req: Request, res: Response, next: NextFunction) => {

    // return "land";
    try {
        const { video_id, user_id, t_id, time } = req.body;
        if (!video_id) {
            return res.send(new APIResponse(400, 'Video Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(video_id)) {
            return res.send(new APIResponse(400, 'Invalid Video Id'));
        }
        if (!user_id) {
            return res.send(new APIResponse(400, 'User Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.send(new APIResponse(400, 'Invalid User Id'));
        }
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!time) {
            return res.send(new APIResponse(400, 'Time Line is mandatory'));
        }
        const createVTL = await global.service.createVideoTLine(req.body);
        console.log("createVTL>>", createVTL)
        if (createVTL.status === 409) {
            return res.send(new APIResponse(409, createVTL.message));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", createVTL.data));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/updateVideoTLine', async (req: Request, res: Response, next: NextFunction) => {

    // return "land";
    try {
        const { video_id, user_id, t_id, time, time_line_id } = req.body;
        if (!video_id) {
            return res.send(new APIResponse(400, 'Video Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(video_id)) {
            return res.send(new APIResponse(400, 'Invalid Video Id'));
        }
        if (!user_id) {
            return res.send(new APIResponse(400, 'User Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.send(new APIResponse(400, 'Invalid User Id'));
        }
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!time) {
            return res.send(new APIResponse(400, 'Time Line is mandatory'));
        }
        if (!time_line_id) {
            return res.send(new APIResponse(400, 'Video Time Line Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(time_line_id)) {
            return res.send(new APIResponse(400, 'Invalid Video Time Line Id'));
        }
        const updateVTL = await global.service.updateVideoTLine(req.body);
        // console.log("updateVTL>>", updateVTL)
        if (updateVTL.status === 409) {
            return res.send(new APIResponse(409, updateVTL.message));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", updateVTL.data));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/deleteVideoTLine', async (req: Request, res: Response, next: NextFunction) => {

    // return "land";
    try {
        const { video_id, t_id, time_line_id } = req.body;
        if (!video_id) {
            return res.send(new APIResponse(400, 'Video Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(video_id)) {
            return res.send(new APIResponse(400, 'Invalid Video Id'));
        }
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!time_line_id) {
            return res.send(new APIResponse(400, 'Video Time Line Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(time_line_id)) {
            return res.send(new APIResponse(400, 'Invalid Video Time Line Id'));
        }
        const deleteVTL = await global.service.deleteVideoTLine(req.body);
        // console.log("deleteVTL>>", deleteVTL)
        if (deleteVTL.status === 404) {
            return res.send(new APIResponse(404, deleteVTL.message));
        } else {
            return res.status(201).send(new ResponseWithObject(201, deleteVTL.message));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/getVideoAndTL', async (req: Request, res: Response, next: NextFunction) => {
    // console.log("req.body", req.body)
    // return "land";
    try {
        const { video_id, user_id, t_id } = req.body;
        if (!video_id) {
            return res.send(new APIResponse(400, 'Video Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(video_id)) {
            return res.send(new APIResponse(400, 'Invalid Video Id'));
        }
        if (!user_id) {
            return res.send(new APIResponse(400, 'User Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.send(new APIResponse(400, 'Invalid User Id'));
        }
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        const getVAndTL = await global.service.getVideoAndTLine(req.body);
        if (getVAndTL.status === 404) {
            return res.send(new APIResponse(404, getVAndTL.message));
        } else {
            return res.status(201).send(new ResponseWithObject(201, "done", getVAndTL.data));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/assignmentLevel1', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const topic = await findTopic(req.body.t_id);
        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }
        const assignmentObj = await global.service.saveAssignments(req.body);
        if (assignmentObj) {
            const assignmentId = assignmentObj['_doc']['_id'];
            const s3URL = await uploadFileIntoS3('assignment_level_1', assignmentId, req.body.file);
            await global.service.updateAssignmentURL(assignmentId, s3URL.url)
            return res.status(200).send(new APIResponse(200, 'Assignment added'));
        } else {
            return res.status(400).send(new APIResponse(400, 'Assignment is not added'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.get('/assignmentLevel1', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { mnt_usr_id, sub_id, t_id } = req.body;
        const assignmentsData = await global.service.getAssignments(mnt_usr_id, sub_id, t_id);
        for( let i = 0; i < assignmentsData.length; i++ ){
            const userResult = await getUserNameProfImg(assignmentsData[i].mnt_usr_id);
            assignmentsData[i]['_doc'].userName = userResult.length > 0 ? userResult[0].userdetails.disp_name : ""
        }
        if (assignmentsData.length) {
            return res.status(200).send(new Status(200, assignmentsData));
        } else {
            return res.status(400).send(new APIResponse(400, 'Assignments not available'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/addingQuestionChoiceLevel1', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { t_id, questions } = req.body;
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!questions) {
            return res.send(new APIResponse(400, 'questions is mandatory'));
        }
        if (!questions.length) {
            return res.send(new APIResponse(400, 'Add atleast one object in questions array'));
        }
        const topic = await findTopic(t_id);

        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        let newQuestionslevel1 = [];
        for (const question of questions) {
            let queslevel1Obj = {
                t_id: t_id,
                question: question.q_name,
                bloom_cat_id: question.bloom_cat_id,
                options: question.options,
                q_typ: question.q_typ,
                hint: question.hint,
                expln: question.expln,
                uld: question.uld,
                kind: question.kind,
                for: question.for,
                marks: question.marks,
                sts: question.sts
            }
            newQuestionslevel1.push(queslevel1Obj)
        }

        const addQuestionChoiceLevel1 = await addQuesChoiceLevel1(newQuestionslevel1);
        if (addQuestionChoiceLevel1.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, "Success", addQuestionChoiceLevel1));
        } else if (addQuestionChoiceLevel1.status === 409) {
            return res.send(new APIResponse(409, "Questions are Already exists in our question Bank"));
        } else {
            return res.send(new APIResponse(400, 'Questions are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/addingQuestionChoiceLevel2', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { t_id, questions } = req.body;
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!questions) {
            return res.send(new APIResponse(400, 'questions is mandatory'));
        }
        if (!questions.length) {
            return res.send(new APIResponse(400, 'Add atleast one object in questions array'));
        }
        const topic = await findTopic(t_id);

        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        let newQuestionslevel2 = [];
        for (const question of questions) {
            let queslevel2Obj = {
                t_id: t_id,
                question: question.q_name,
                bloom_cat_id: question.bloom_cat_id,
                options: question.options,
                q_typ: question.q_typ,
                hint: question.hint,
                expln: question.expln,
                uld: question.uld,
                kind: question.kind,
                for: question.for,
                marks: question.marks,
                sts: question.sts
            }
            newQuestionslevel2.push(queslevel2Obj)
        }

        const addQuestionChoiceLevel2 = await addQuesChoiceLevel2(newQuestionslevel2);
        if (addQuestionChoiceLevel2.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, "Success", addQuestionChoiceLevel2));
        } else if (addQuestionChoiceLevel2.status === 409) {
            return res.send(new APIResponse(409, "Questions are Already exists in our question Bank"));
        } else {
            return res.send(new APIResponse(400, 'Questions are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/addingQuestionChoiceLevel3', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { t_id, questions } = req.body;
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!questions) {
            return res.send(new APIResponse(400, 'questions is mandatory'));
        }
        if (!questions.length) {
            return res.send(new APIResponse(400, 'Add atleast one object in questions array'));
        }
        const topic = await findTopic(t_id);

        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        let newQuestionslevel3 = [];
        for (const question of questions) {
            let queslevel3Obj = {
                t_id: t_id,
                question: question.q_name,
                bloom_cat_id: question.bloom_cat_id,
                options: question.options,
                q_typ: question.q_typ,
                hint: question.hint,
                expln: question.expln,
                uld: question.uld,
                kind: question.kind,
                for: question.for,
                marks: question.marks,
                sts: question.sts
            }
            newQuestionslevel3.push(queslevel3Obj)
        }

        const addQuestionChoiceLevel3 = await addQuesChoiceLevel3(newQuestionslevel3);
        if (addQuestionChoiceLevel3.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, "Success", addQuestionChoiceLevel3));
        } else if (addQuestionChoiceLevel3.status === 409) {
            return res.send(new APIResponse(409, "Questions are Already exists in our question Bank"));
        } else {
            return res.send(new APIResponse(400, 'Questions are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/addingQuestionChoiceLevel4', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { t_id, questions } = req.body;
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!questions) {
            return res.send(new APIResponse(400, 'questions is mandatory'));
        }
        if (!questions.length) {
            return res.send(new APIResponse(400, 'Add atleast one object in questions array'));
        }
        const topic = await findTopic(t_id);

        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        let newQuestionslevel4 = [];
        for (const question of questions) {
            let queslevel4Obj = {
                t_id: t_id,
                question: question.q_name,
                bloom_cat_id: question.bloom_cat_id,
                options: question.options,
                q_typ: question.q_typ,
                hint: question.hint,
                expln: question.expln,
                uld: question.uld,
                kind: question.kind,
                for: question.for,
                marks: question.marks,
                sts: question.sts
            }
            newQuestionslevel4.push(queslevel4Obj)
        }

        const addQuestionChoiceLevel4 = await addQuesChoiceLevel4(newQuestionslevel4);
        if (addQuestionChoiceLevel4.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, "Success", addQuestionChoiceLevel4));
        } else if (addQuestionChoiceLevel4.status === 409) {
            return res.send(new APIResponse(409, "Questions are Already exists in our question Bank"));
        } else {
            return res.send(new APIResponse(400, 'Questions are not created'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/addingQuestionFillBlanksLevel1', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { t_id, questions } = req.body;
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!questions) {
            return res.send(new APIResponse(400, 'questions is mandatory'));
        }
        if (!questions.length) {
            return res.send(new APIResponse(400, 'Add atleast one object in questions array'));
        }
        const topic = await findTopic(t_id);

        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        let newQuestionslevel1 = [];
        for (const question of questions) {
            let queslevel1Obj = {
                t_id: t_id,
                question: question.q_name,
                bloom_cat_id: question.bloom_cat_id,
                ans: question.ans,
                file_url: question.file_url,
                file_typ: question.file_typ,
                q_fill_typ: question.q_fill_typ,
                src: question.src,
                hint: question.hint,
                expln: question.expln,
                level: question.level,
                uld: question.uld,
                kind: question.kind,
                for: question.for,
                marks: question.marks,
                sts: question.sts
            }
            newQuestionslevel1.push(queslevel1Obj)
        }

        const addQuestionChoiceLevel1 = await global.service.addQuesFillBlanksLevel1(newQuestionslevel1);
        if (addQuestionChoiceLevel1.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, "Success", addQuestionChoiceLevel1));
        } else if (addQuestionChoiceLevel1.status === 409) {
            return res.send(new APIResponse(409, "Questions are Already exists in our question Bank"));
        }
        else {
            return res.send(new ResponseWithObject(400, 'Questions are not created', addQuestionChoiceLevel1));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/addingQuestionFillBlanksLevel2', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { t_id, questions } = req.body;
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!questions) {
            return res.send(new APIResponse(400, 'questions is mandatory'));
        }
        if (!questions.length) {
            return res.send(new APIResponse(400, 'Add atleast one object in questions array'));
        }
        const topic = await findTopic(t_id);

        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        let newQuestionslevel2 = [];
        for (const question of questions) {
            let queslevel1Obj = {
                t_id: t_id,
                question: question.q_name,
                bloom_cat_id: question.bloom_cat_id,
                ans: question.ans,
                file_url: question.file_url,
                file_typ: question.file_typ,
                q_fill_typ: question.q_fill_typ,
                src: question.src,
                hint: question.hint,
                expln: question.expln,
                level: question.level,
                uld: question.uld,
                kind: question.kind,
                for: question.for,
                marks: question.marks,
                sts: question.sts
            }
            newQuestionslevel2.push(queslevel1Obj)
        }

        const addQuestionChoiceLevel2 = await global.service.addQuesFillBlanksLevel2(newQuestionslevel2);
        if (addQuestionChoiceLevel2.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, "Success", addQuestionChoiceLevel2));
        } else if (addQuestionChoiceLevel2.status === 409) {
            return res.send(new APIResponse(409, "Questions are Already exists in our question Bank"));
        }
        else {
            return res.send(new ResponseWithObject(400, 'Questions are not created', addQuestionChoiceLevel2));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/addingQuestionFillBlanksLevel3', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { t_id, questions } = req.body;
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!questions) {
            return res.send(new APIResponse(400, 'questions is mandatory'));
        }
        if (!questions.length) {
            return res.send(new APIResponse(400, 'Add atleast one object in questions array'));
        }
        const topic = await findTopic(t_id);

        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        let newQuestionslevel3 = [];
        for (const question of questions) {
            let queslevel1Obj = {
                t_id: t_id,
                question: question.q_name,
                bloom_cat_id: question.bloom_cat_id,
                ans: question.ans,
                file_url: question.file_url,
                file_typ: question.file_typ,
                q_fill_typ: question.q_fill_typ,
                src: question.src,
                hint: question.hint,
                expln: question.expln,
                level: question.level,
                uld: question.uld,
                kind: question.kind,
                for: question.for,
                marks: question.marks,
                sts: question.sts
            }
            newQuestionslevel3.push(queslevel1Obj)
        }

        const addQuestionChoiceLevel3 = await global.service.addQuesFillBlanksLevel3(newQuestionslevel3);
        if (addQuestionChoiceLevel3.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, "Success", addQuestionChoiceLevel3));
        } else if (addQuestionChoiceLevel3.status === 409) {
            return res.send(new APIResponse(409, "Questions are Already exists in our question Bank"));
        }
        else {
            return res.send(new ResponseWithObject(400, 'Questions are not created', addQuestionChoiceLevel3));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/addingQuestionFillBlanksLevel4', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { t_id, questions } = req.body;
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!questions) {
            return res.send(new APIResponse(400, 'questions is mandatory'));
        }
        if (!questions.length) {
            return res.send(new APIResponse(400, 'Add atleast one object in questions array'));
        }
        const topic = await findTopic(t_id);

        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        let newQuestionslevel4 = [];
        for (const question of questions) {
            let queslevel1Obj = {
                t_id: t_id,
                question: question.q_name,
                bloom_cat_id: question.bloom_cat_id,
                ans: question.ans,
                file_url: question.file_url,
                file_typ: question.file_typ,
                q_fill_typ: question.q_fill_typ,
                src: question.src,
                hint: question.hint,
                expln: question.expln,
                level: question.level,
                uld: question.uld,
                kind: question.kind,
                for: question.for,
                marks: question.marks,
                sts: question.sts
            }
            newQuestionslevel4.push(queslevel1Obj)
        }

        const addQuestionChoiceLevel4 = await global.service.addQuesFillBlanksLevel4(newQuestionslevel4);
        if (addQuestionChoiceLevel4.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, "Success", addQuestionChoiceLevel4));
        } else if (addQuestionChoiceLevel4.status === 409) {
            return res.send(new APIResponse(409, "Questions are Already exists in our question Bank"));
        }
        else {
            return res.send(new ResponseWithObject(400, 'Questions are not created', addQuestionChoiceLevel4));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/addingQuestionPassageLevel1', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { t_id, questions } = req.body;
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!questions) {
            return res.send(new APIResponse(400, 'questions is mandatory'));
        }
        if (!questions.length) {
            return res.send(new APIResponse(400, 'Add atleast one object in questions array'));
        }
        const topic = await findTopic(t_id);

        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        let newQuestionslevel1 = [];
        for (const question of questions) {
            let queslevel1Obj = {
                passage: question.passage,
                question: question.ques,
                kind: question.kind,
                for: question.for,
                level: question.level,
            };
            queslevel1Obj.question = queslevel1Obj.question.map((quesObj) => {
                return { ...quesObj, t_id: t_id };
            });
            newQuestionslevel1.push(queslevel1Obj);
        }


        const addQuestionPassageLevel1 = await global.service.addQuesPassageLevel1(newQuestionslevel1);
        if (addQuestionPassageLevel1.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, "Success", addQuestionPassageLevel1));
        } else if (addQuestionPassageLevel1.status === 409) {
            return res.send(new APIResponse(409, "Questions are Already exists in our question Bank"));
        }
        else {
            return res.send(new ResponseWithObject(400, 'Questions are not created', addQuestionPassageLevel1));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/addingQuestionPassageLevel2', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { t_id, questions } = req.body;
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!questions) {
            return res.send(new APIResponse(400, 'questions is mandatory'));
        }
        if (!questions.length) {
            return res.send(new APIResponse(400, 'Add atleast one object in questions array'));
        }
        const topic = await findTopic(t_id);

        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        let newQuestionslevel2 = [];
        for (const question of questions) {
            let queslevel2Obj = {
                t_id: t_id,
                passage: question.passage,
                question: question.ques,
                kind: question.kind,
                for: question.for,
                level: question.level,
            }
            newQuestionslevel2.push(queslevel2Obj)
        }

        const addQuestionPassageLevel2 = await global.service.addQuesPassageLevel2(newQuestionslevel2);
        if (addQuestionPassageLevel2.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, "Success", addQuestionPassageLevel2));
        } else if (addQuestionPassageLevel2.status === 409) {
            return res.send(new APIResponse(409, "Questions are Already exists in our question Bank"));
        }
        else {
            return res.send(new ResponseWithObject(400, 'Questions are not created', addQuestionPassageLevel2));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/addingQuestionFillBlanksLevel3', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { t_id, questions } = req.body;
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!questions) {
            return res.send(new APIResponse(400, 'questions is mandatory'));
        }
        if (!questions.length) {
            return res.send(new APIResponse(400, 'Add atleast one object in questions array'));
        }
        const topic = await findTopic(t_id);

        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        let newQuestionslevel3 = [];
        for (const question of questions) {
            let queslevel3Obj = {
                t_id: t_id,
                passage: question.passage,
                question: question.ques,
                kind: question.kind,
                for: question.for,
                level: question.level,
            }
            newQuestionslevel3.push(queslevel3Obj)
        }

        const addQuestionPassageLevel3 = await global.service.addQuesPassageLevel3(newQuestionslevel3);
        if (addQuestionPassageLevel3.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, "Success", addQuestionPassageLevel3));
        } else if (addQuestionPassageLevel3.status === 409) {
            return res.send(new APIResponse(409, "Questions are Already exists in our question Bank"));
        }
        else {
            return res.send(new ResponseWithObject(400, 'Questions are not created', addQuestionPassageLevel3));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

router.post('/addingQuestionFillBlanksLevel4', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { t_id, questions } = req.body;
        if (!t_id) {
            return res.send(new APIResponse(400, 'Topic Id is mandatory'));
        }
        if (!mongoose.Types.ObjectId.isValid(t_id)) {
            return res.send(new APIResponse(400, 'Invalid Topic Id'));
        }
        if (!questions) {
            return res.send(new APIResponse(400, 'questions is mandatory'));
        }
        if (!questions.length) {
            return res.send(new APIResponse(400, 'Add atleast one object in questions array'));
        }
        const topic = await findTopic(t_id);

        if (topic.status === 404) {
            return res.send(new APIResponse(404, "Data Not Available Or Topic is not Matching"));
        }

        let newQuestionslevel4 = [];
        for (const question of questions) {
            let queslevel4Obj = {
                t_id: t_id,
                passage: question.passage,
                question: question.ques,
                kind: question.kind,
                for: question.for,
                level: question.level,
            }
            newQuestionslevel4.push(queslevel4Obj);
        }

        const addQuestionPassageLevel4 = await global.service.addQuesFillBlanksLevel4(newQuestionslevel4);
        if (addQuestionPassageLevel4.status === 200) {
            return res.status(200).send(new ResponseWithObject(200, "Success", addQuestionPassageLevel4));
        } else if (addQuestionPassageLevel4.status === 409) {
            return res.send(new APIResponse(409, "Questions are Already exists in our question Bank"));
        }
        else {
            return res.send(new ResponseWithObject(400, 'Questions are not created', addQuestionPassageLevel4));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
})

export = router;
