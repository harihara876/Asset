import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { Status, ResponseWithObject, APIResponse, details } from '../utils/status';
import axios from 'axios';
import { configData } from '../utils/config';

router.post('/subjectcounts', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let language = "vridheeCurriculumEnglish";
        try {
            await axios({
                method: 'get',
                url: `${configData.adminVridheeMsUrl}${language}/subjectcounts`,
                data: req.body
            }).then((curriculum) => {
                return res.send(new ResponseWithObject(curriculum.data.code, curriculum.data.message, curriculum.data.data));
            }).catch(function (error) {
                language = "";
                return res.send(new Status(400, error.message));
            })
        } catch (error) {
            return res.send(new Status(400, error.message));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
});

router.post('/getChapterTopicsByGrade', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subId, gradeId } = req.body;
        if (!subId || !gradeId) {
            return res.send(new APIResponse(400, "subject and grade ids are mandatory."));
        };
        await axios({
            method: 'get',
            url: `${configData.adminVridheeMsUrl}getChapterTopicsByGrade`,
            data: req.body
        }).then((curriculum) => {
            return res.send(new details(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.post('/getrelationtopicIds', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chapterId, topicId, gradeId } = req.body;
        if (!chapterId || !topicId || !gradeId) {
            return res.send(new APIResponse(400, "chapter, topic and grade ids are mandatory."));
        };
        await axios({
            method: 'post',
            url: `${configData.adminVridheeMsUrl}getrelationtopicIds`,
            data: req.body
        }).then((curriculum) => {
            return res.send(new details(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.post('/getunitChapterTopics', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subId, gradeId } = req.body;
        if (!subId || !gradeId) {
            return res.send(new APIResponse(400, "subject and grade ids are mandatory."));
        };
        await axios({
            method: 'post',
            url: `${configData.adminVridheeMsUrl}getunitChapterTopics`,
            data: req.body
        }).then((curriculum) => {
            return res.send(new details(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.put('/updateChapTopics', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Object.keys(req.body).length) return res.send(new APIResponse(400, "Body is required"));
        const data = req.body.chapters;
        if (data.length < 1) {
            return res.send(new APIResponse(400, 'updateContent is mandatory in body.'));
        };
        await axios({
            method: 'put',
            url: `${configData.adminVridheeMsUrl}updateChaptersTopics`,
            data: req.body
        }).then((curriculum) => {
            return res.send(new details(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

router.put('/updatecalculatedcounts', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.query.section;
        if (!data) {
            return res.send(new APIResponse(400, 'section is mandatory in query.'));
        };
        await axios({
            method: 'put',
            url: `${configData.adminVridheeMsUrl}updatemarksperiodscalculatedcounts?section=${req.query.section}`,
            data: req.body
        }).then((curriculum) => {
            return res.send(new details(curriculum.data.status, curriculum.data.message, curriculum.data.data));
        }).catch(function (error) {
            return res.send(new APIResponse(400, error.message));
        })
    } catch (error) {
        return res.send(new APIResponse(400, error.message));
    }
});

export = router;


