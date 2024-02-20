import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import axios from 'axios';
import mongoose from 'mongoose';
import { APIResponse, ResponseWithObject } from '../utils/status';
import { configData } from '../utils/config';

const dashboardURL = configData.curriculumDashboardModuleMS;

router.post('/insertSubjects', async (req: Request, res: Response, next: NextFunction) => {
    const { name, type, curriculum } = req.body;
    if (!name) {
        return res.send(new APIResponse(400, 'Name is mandatory'));
    }
    if (!curriculum.length) {
        return res.send(new APIResponse(400, 'Send atleast one category'));
    }
    const subNameObj = { name, type, curriculum };
    try {
        await axios.post(dashboardURL + 'insertSubjectData', subNameObj).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})


router.get('/getSubjectsList', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios.get(dashboardURL + 'getSubjectData').then(async result => {
            let response = result.data;
            if (response.status == 200) {
                return res.status(200).send(result.data)
            }
            else {
                return res.status(response.code).send(result.data);
            }
        }).catch(error => {
            console.log(error)
            if (error.response == undefined) {
                return res.status(502).send(new APIResponse(502, error.message))
            }
            else {
                return res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
            }
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.post('/addSubjectChapter', async (req: Request, res: Response, next: NextFunction) => {
    const { subId, chapters } = req.body;
    if (!subId) {
        return res.send(new APIResponse(400, 'Subject id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(subId)) {
        return res.send(new APIResponse(400, 'Invalid subject id'));
    }
    if (!chapters) {
        return res.send(new APIResponse(400, 'Chapters is required field'));
    }
    if (!chapters.length) {
        return res.send(new APIResponse(400, 'Atleast one chapter object is required.'));
    }
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}addSubjectChapter`,
            data: req.body
        }).then((subChapter) => {
            return res.send(new ResponseWithObject(subChapter.data.status, subChapter.data.message, subChapter.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.put('/addTopics/:chapterId', async (req: Request, res: Response, next: NextFunction) => {
    const { chapterId } = req.params;
    const { topics } = req.body;
    if (!chapterId) {
        return res.send(new APIResponse(400, 'Chapter id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
        return res.send(new APIResponse(400, 'Invalid chapter id'));
    }
    if (!topics.length) {
        return res.send(new APIResponse(400, 'Atleast one topic object is required'));
    }
    try {
        await axios({
            method: 'put',
            url: `${dashboardURL}addTopics/${chapterId}`,
            data: req.body
        }).then((topics) => {
            return res.send(new ResponseWithObject(topics.data.status, topics.data.message, topics.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.get('/getTopics/:chapterId', async (req: Request, res: Response, next: NextFunction) => {
    const { chapterId } = req.params;
    if (!chapterId) {
        return res.send(new APIResponse(400, 'Chapter id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
        return res.send(new APIResponse(400, 'Invalid chapter id'));
    }
    try {
        await axios({
            method: 'get',
            url: `${dashboardURL}getTopics/${chapterId}`,
        }).then((topics) => {
            return res.send(new ResponseWithObject(topics.data.status, topics.data.message, topics.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.get('/getSubjectChapter', async (req: Request, res: Response, next: NextFunction) => {
    // console.log("params", req.query)
    try {

        if (!req.query.subject_id) {
            return res.send(new APIResponse(400, 'Subject id is mandatory in params'));
        }

        await axios({
            method: 'get',
            url: `${configData.curriculumDashboardModuleMS}getSubjectChapter`,
            data: req.query
        }).then((curriculum) => {
            return res.send(new ResponseWithObject(curriculum.data.code, curriculum.data.message, curriculum.data.data));
        }).catch(error => {
            if (error.response == undefined) {
                return res.status(502).send(new APIResponse(502, error.message))
            }
            else {
                console.log("hjshc>>")
                return res.status(error.response.status).send(new APIResponse(error.response.status, error.response.statusText))
            }
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.put('/addCurTag', async (req: Request, res: Response, next: NextFunction) => {
    // const { chapterId, topicId } = req.params;
    const curTag = req.body;
    // console.log("curTag>>", curTag)
    if (!curTag.chapter_id) {
        return res.send(new APIResponse(400, 'Chapter id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(curTag.chapter_id)) {
        return res.send(new APIResponse(400, 'Invalid chapter id'));
    }
    if (!curTag.t_id) {
        return res.send(new APIResponse(400, 'Topic id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(curTag.t_id)) {
        return res.send(new APIResponse(400, 'Invalid Topic id'));
    }
    if (!curTag.cur_tag.length) {
        return res.send(new APIResponse(400, 'Atleast one object is required'));
    }
    try {
        await axios({
            method: 'put',
            url: `${dashboardURL}addCurTag`,
            data: req.body
        }).then((topics) => {
            return res.send(new ResponseWithObject(topics.data.status, topics.data.message, topics.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.put('/addTtlCount', async (req: Request, res: Response, next: NextFunction) => {
    // const { chapterId, topicId } = req.params;
    const curTag = req.body;
    // console.log("curTag>>", curTag)
    if (!curTag.chapter_id) {
        return res.send(new APIResponse(400, 'Chapter id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(curTag.chapter_id)) {
        return res.send(new APIResponse(400, 'Invalid chapter id'));
    }
    if (!curTag.t_id) {
        return res.send(new APIResponse(400, 'Topic id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(curTag.t_id)) {
        return res.send(new APIResponse(400, 'Invalid Topic id'));
    }
    try {
        await axios({
            method: 'put',
            url: `${dashboardURL}addTtlCount`,
            data: req.body
        }).then((topics) => {
            return res.send(new ResponseWithObject(topics.data.status, topics.data.message, topics.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.post('/addCurrCategory', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios({
            method: 'post',
            url: `${dashboardURL}addCurrCategory`,
            data: req.body
        }).then((subChapter) => {
            return res.send(new ResponseWithObject(subChapter.data.status, subChapter.data.message, subChapter.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})

router.put('/updateCurrCategory', async (req: Request, res: Response, next: NextFunction) => {
    const requestData = req.body.data;
    const errorMessage = validateData(requestData);
    if (errorMessage) {
        return errorMessage;
    } else {
        try {
            await axios({
                method: 'put',
                url: `${dashboardURL}updateCurrCategory`,
                data: requestData
            }).then((result) => {
                return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
            }).catch(function (error) {
                return res.send(new APIResponse(400, error.message));
            })
        } catch (error) {
            return res.send(new APIResponse(400, error.message));
        }
    }
});

// Check if updateCurrCategory requestData is an array and not empty
const validateData = (data) => {
    for (const entry of data) {
        if (!entry.category || !entry.grade || !entry.sub_id) {
            return "Error: Missing required fields (category, grade, or sub_id) in one or more entries.";
        }
    }
    return null; // No error, data is valid
};

router.put('/addEbooks/:chapterId', async (req: Request, res: Response, next: NextFunction) => {
    const { chapterId } = req.params;
    const { e_book } = req.body;
    if (!chapterId) {
        return res.send(new APIResponse(400, 'Chapter id is mandatory'));
    }
    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
        return res.send(new APIResponse(400, 'Invalid chapter id'));
    }
    if (!e_book.length) {
        return res.send(new APIResponse(400, 'Atleast one e_book object is required'));
    }
    try {
        await axios({
            method: 'put',
            url: `${dashboardURL}addEbook/${chapterId}`,
            data: req.body
        }).then((topics) => {
            return res.send(new ResponseWithObject(topics.data.status, topics.data.message, topics.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
})


router.get('/getCourseContent', async (req: Request, res: Response, next: NextFunction) => {
    let getSub_id = req.query.sub_id
    if (!getSub_id) {
        return res.send(new APIResponse(400, 'Subject id is mandatory in params'));
    }
    try {
        await axios.get(
            dashboardURL + 'getCourseContent?sub_id=' + getSub_id
        ).then(async result => {
            return res.send(new ResponseWithObject(result.data.status, result.data.message, result.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    }
    catch (error) {
        res.send(new APIResponse(400, error.message));
    }
})

router.put('/updateTopicDescr', async (req: Request, res: Response, next: NextFunction) => {
    const requestData = req.body

    try {
        await axios({
            method: 'put',
            url: `${dashboardURL}updateTopicDescr`,
            data: requestData
        }).then((topicDescr) => {
            return res.send(new ResponseWithObject(topicDescr.data.status, topicDescr.data.message, topicDescr.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.put('/updateChapter', async (req: Request, res: Response, next: NextFunction) => {
    const requestData = req.body

    try {
        await axios({
            method: 'put',
            url: `${dashboardURL}updateChapter`,
            data: requestData
        }).then((chapter) => {
            return res.send(new ResponseWithObject(chapter.data.status, chapter.data.message, chapter.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.put('/addingTyBrdGrd', async (req: Request, res: Response, next: NextFunction) => {
    const requestData = req.body

    try {
        await axios({
            method: 'put',
            url: `${dashboardURL}addingTyBrdGrd`,
            data: requestData
        }).then((tyBrdGrd) => {
            return res.send(new ResponseWithObject(tyBrdGrd.data.status, tyBrdGrd.data.message, tyBrdGrd.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.put('/updatingTyBrdGrd', async (req: Request, res: Response, next: NextFunction) => {
    const requestData = req.body

    try {
        await axios({
            method: 'put',
            url: `${dashboardURL}updatingTyBrdGrd`,
            data: requestData
        }).then((tyBrdGrd) => {
            return res.send(new ResponseWithObject(tyBrdGrd.data.status, tyBrdGrd.data.message, tyBrdGrd.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.put('/updateEbook', async (req: Request, res: Response, next: NextFunction) => {
    const requestData = req.body

    try {
        await axios({
            method: 'put',
            url: `${dashboardURL}updateEBook`,
            data: requestData
        }).then((eBook) => {
            return res.send(new ResponseWithObject(eBook.data.status, eBook.data.message, eBook.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.put('/updateTopic', async (req: Request, res: Response, next: NextFunction) => {
    const requestData = req.body

    try {
        await axios({
            method: 'put',
            url: `${dashboardURL}updateTopic`,
            data: requestData
        }).then((topic) => {
            return res.send(new ResponseWithObject(topic.data.status, topic.data.message, topic.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.put('/updateCurTag', async (req: Request, res: Response, next: NextFunction) => {
    const requestData = req.body

    try {
        await axios({
            method: 'put',
            url: `${dashboardURL}updatingCurTag`,
            data: requestData
        }).then((curTag) => {
            return res.send(new ResponseWithObject(curTag.data.status, curTag.data.message, curTag.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

export = router;