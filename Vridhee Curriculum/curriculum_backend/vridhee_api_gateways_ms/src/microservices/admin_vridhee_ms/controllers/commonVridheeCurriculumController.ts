import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { Status, ResponseWithObject, APIResponse } from '../utils/status';
import axios from 'axios';
import mongoose from 'mongoose';
import { configData } from '../utils/config'
import { languages } from '../utils/languages';
import { methods } from '../utils/methods';
let language = "";

router.use(async (req, res, next) => {

    //use type if type = languages then language dbs and if type = actor then db_metadata
    let params = req.query;
    let url = req.originalUrl.split('/');

    if (params.langType && languages.hasOwnProperty(String(params.langType))) {
        language = languages[String(params.langType)];
    }
    else if (params.langType && !languages.hasOwnProperty(String(params.langType))) {
        return res.send({ sts: 400, msg: "Bad Request and language is not exist" })
    };

    let collectionName = methods.includes(String(params.collectionName));
    if (language && collectionName) {
        if (collectionName) {
            next();
        } else {
            res.send({ sts: 400, msg: "Bad Request, Please send valid method" })
            return
        }
    } else {
        return next();
    }
});

router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    let commonController = "vridheeCurriculumAdminDashBoard";
    try {
        const { langType, collectionName } = req.query;
        if (!langType) {
            return res.send(new APIResponse(400, 'Language type is mandatory in params'));
        }
        if (!collectionName) {
            return res.send(new APIResponse(400, 'Collection name is mandatory in params'));
        };
        const data = req.body;
        const { flag, subjects, chapters, topics } = data;

        if (!flag) {
            return res.send(new APIResponse(400, 'Flag is mandatory in the body.'));
        };

        if (flag === "subject") {
            if (!subjects || subjects.length === 0) {
                return res.send(new APIResponse(400, 'Subject Id is mandatory in the body.'));
            }
        };

        if (flag === "chapter") {
            if (!chapters || chapters.length === 0) {
                return res.send(new APIResponse(400, "Chapters Id is mandatory in the body."));
            }
        };

        if (flag === "topic") {
            if (!topics || topics.length === 0) {
                return res.send(new APIResponse(400, "Chapters Id is mandatory in the body."));
            }
        };

        try {
            await axios({
                method: 'delete',
                url: `${configData.adminVridheeMsUrl}${language}/${commonController}/${collectionName}`,
                data: req.body
            }).then((curriculum) => {
                language = "";
                return res.send(new ResponseWithObject(curriculum.data.code, curriculum.data.message, curriculum.data.data));
            }).catch(function (error) {
                language = "";
                return res.send(new Status(400, error.message));
            })
        } catch (error) {
            language = "";
            return res.send(new Status(400, error.message));
        }
    } catch (error) {
        language = "";
        return res.send(new Status(400, error.message));
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    let commonController = "vridheeCurriculumAdminDashBoard";
    try {
        const { langType, collectionName, level } = req.query;
        if (!langType) {
            return res.send(new APIResponse(400, 'Language type is mandatory in params'));
        }
        if (!collectionName) {
            return res.send(new APIResponse(400, 'Collection name is mandatory in params'));
        }
        const data = req.body;
        if (!data.subId || !data.gradeId) {
            return res.send(new APIResponse(400, 'Subject & GradeId are mandatory.'));
        };
        if (!mongoose.Types.ObjectId.isValid(data.subId)) {
            return res.send(new APIResponse(400, 'Invalid Subject Id or Category Id.'));
        };

        if (collectionName === "getQuestions") {
            if (!data.questionType && !level) {
                return res.send(new APIResponse(400, 'Atleast level or Type is mandatory'));
            };
            if (data.questionType) {
                if (data.questionType.length < 0 && !level) {
                    return res.send(new APIResponse(400, 'Level or Type is invalid'));
                };
            };
        };

        if (level) {
            const num = Number(level);
            if (isNaN(num) || num < 1 || num > 5) {
                return res.send(new APIResponse(400, "InValid level Type."));
            };
        };

        try {
            await axios({
                method: 'get',
                url: `${configData.adminVridheeMsUrl}${language}/${commonController}/${collectionName}?level=${level}`,
                data: req.body
            }).then((curriculum) => {
                language = "";
                return res.send(new ResponseWithObject(curriculum.data.code, curriculum.data.message, curriculum.data.data));
            }).catch(function (error) {
                language = "";
                return res.send(new Status(400, error.message));
            })
        } catch (error) {
            language = "";
            return res.send(new Status(400, error.message));
        }
    } catch (error) {
        language = "";
        return res.send(new Status(400, error.message));
    }
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    let commonController = "vridheeCurriculumAdminDashBoard";
    try {
        const { langType, collectionName, level, questionType } = req.query;
        if (!langType) {
            return res.send(new APIResponse(400, 'Language type is mandatory in params'));
        };
        if (!collectionName) {
            return res.send(new APIResponse(400, 'Collection name is mandatory in params'));
        };
        const data = req.body.updateContent;
        if (data.length < 1) {
            return res.send(new APIResponse(400, 'updateContent is mandatory in body.'));
        };

        if (collectionName === "updateQuestionsContentData") {
            if (!questionType || !level) {
                return res.send(new APIResponse(400, 'QuestionType and level is mandatory in params'));
            };
        };

        if (level && level !== "undefined") {
            const num = Number(level);
            if (isNaN(num) || num < 1 || num > 5) {
                return res.send(new APIResponse(400, "InValid level Type."));
            };
        };

        try {
            await axios({
                method: 'put',
                url: `${configData.adminVridheeMsUrl}${language}/${commonController}/${collectionName}?level=${level}&questionType=${questionType}`,
                data: req.body
            }).then((curriculum) => {
                language = "";
                return res.send(new ResponseWithObject(curriculum.data.code, curriculum.data.message, curriculum.data.data));
            }).catch(function (error) {
                language = "";
                return res.send(new Status(400, error.message));
            })
        } catch (error) {
            language = "";
            return res.send(new Status(400, error.message));
        }
    } catch (error) {
        language = "";
        return res.send(new Status(400, error.message));
    }
});



export = router;

