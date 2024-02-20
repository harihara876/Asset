import { Request, Response, NextFunction } from 'express'
import {
    getSubject, findSubject, insertSubject, findChapters, addChapters, addChapter, addtopics, gettopics,
    getSubjectChapterById, addCurTags, addSubjectInCurrCategory, addCurriculum, insertSubjectAndCurriculum,
    updateCurriculumCategory,
    addebooks, addTotalCount, getCourse, updateDescr, getchaptertopics, updateChap, addTyBrdGrd, updateTyBrdGrd, updateEbooks, updateTopics, updateCurTag
} from "../services/curriculamService";
import { noDataAvail, noDataAvailDelete } from "../utils/errormsg";
import { ResponseWithObject, APIResponse, APIResponseWithdetails, Status } from "../utils/status";
// import { ISubInsertQuery } from '../models/interface';

export async function insertSubjectData(req: Request, res: Response, next: NextFunction) {
    const { name, type, curriculum } = req.body
    try {
        const subjectInsert = await insertSubjectAndCurriculum(name, type, curriculum);
        if (subjectInsert) {
            return res.status(201).send(new ResponseWithObject(200, "Subject and curriculum created"));
        } else {
            return res.status(400).send(new APIResponse(400, 'Subject not created'));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function getSubjectData(req, res, next) {
    try {
        let user = await getSubject();
        if (user) {
            return res.status(200).send(new ResponseWithObject(200, "done", user));
        } else {
            return res.status(200).send(new ResponseWithObject(200, "done", { message: noDataAvail }));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function addSubjectChapter(req, res, next) {
    try {
        const { subId, seq, chapters } = req.body;
        const existingChapters = await findChapters(subId);
        let newChapters = []
        if (existingChapters.length) {
            let chapter: any
            for (chapter of chapters) {
                let newChapterName = chapter.name;
                let newChapterNum = chapter.num;
                let found = existingChapters.some(existingChapter =>
                    existingChapter.chapter.name === newChapterName &&
                    +existingChapter.chapter.num === +newChapterNum
                )
                if (!found) {
                    let chapterObj = {
                        sub_id: subId,
                        chapter: chapter
                    }
                    newChapters.push(chapterObj);
                }
            }
        } else {
            newChapters = chapters.map(chapter => {
                return {
                    sub_id: subId,
                    seq: seq,
                    cr_usr: "AI",
                    up_usr: "AI",
                    chapter: chapter
                }
            })
        }
        if (newChapters.length) {
            const addchapters = await addChapters(newChapters);
            return res.status(201).send(new APIResponseWithdetails(201, "done", addchapters));
        } else {
            return res.send(new APIResponse(400, 'chapters are already exists'));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function addTopics(req, res, next) {
    try {
        const { chapterId } = req.params;
        const { topics } = req.body;
        const topicsResponse = await addtopics(chapterId, topics);
        if (topicsResponse) {
            return res.status(200).send(new ResponseWithObject(200, "done", topicsResponse));
        } else {
            return res.send(new APIResponse(400, `Topics are not added`));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function getTopics(req, res, next) {
    try {
        const { chapterId } = req.params;
        const topicsResponse = await gettopics(chapterId);
        if (topicsResponse) {
            return res.status(200).send(new ResponseWithObject(200, "done", topicsResponse));
        } else {
            return res.send(new APIResponse(400, `Topics are not added`));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function getSubjectChapter(req: Request, res: Response, next: NextFunction) {
    // console.log("getSubjectChapter>>>",req.body)
    try {
        let getSubChapter: any = await getSubjectChapterById(req.body);
        if (getSubChapter.length > 0) {
            return res.status(200).send(new ResponseWithObject(200, "done", getSubChapter));
        } else {
            return res.status(200).send(new ResponseWithObject(403, "done", { message: noDataAvail }));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function addCurTag(req, res, next) {
    try {
        const curTagResponse = await addCurTags(req.body);
        // console.log("curTagResponse>>", curTagResponse)
        if (curTagResponse) {
            return res.status(200).send(new ResponseWithObject(200, "done", curTagResponse));
        } else {
            return res.send(new APIResponse(400, `Cur Tag are not added`));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function addTtlCount(req, res, next) {
    try {
        const curTagResponse = await addTotalCount(req.body);
        // console.log("curTagResponse>>", curTagResponse)
        if (curTagResponse) {
            return res.status(200).send(new ResponseWithObject(200, "done", curTagResponse));
        } else {
            return res.send(new APIResponse(400, `Total Count are not Updated`));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function addCurrCategory(req, res, next) {
    try {
        const curriculumResponse = await addCurriculum(req.body);
        if (curriculumResponse) {
            return res.status(200).send(new ResponseWithObject(200, "done", curriculumResponse));
        } else {
            return res.send(new APIResponse(400, `curriculum not added`));
        }
    } catch (error) {
        return res.send(new APIResponse(500, error.message));
    }
}

export async function updateCurrCategory(req: Request, res: Response, next: NextFunction) {
    // console.log("req>>", req.body);
    try {
        let curCategoryObj = {}

        const catUpdateInfo = await updateCurriculumCategory(req.body);
        // console.log("catUpdateInfo>>", catUpdateInfo);
        if (catUpdateInfo) {
            return res.status(201).send(new ResponseWithObject(201, "done", catUpdateInfo));
        } else {
            return res.send(new APIResponse(400, 'Category are not updated'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
}

export async function addEBook(req, res, next) {
    try {
        const { chapterId } = req.params;
        const { e_book } = req.body;
        const eBookResponse = await addebooks(chapterId, e_book);
        if (eBookResponse) {
            return res.status(200).send(new ResponseWithObject(200, "done", eBookResponse));
        } else {
            return res.send(new APIResponse(400, `eBooks are not added`));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function getCourseContent(req: Request, res: Response, next: NextFunction) {
    try {
        let getSub_id = req.query.sub_id
        const courseContent = await getCourse(getSub_id)
        if (courseContent) {
            return res.status(200).send(new ResponseWithObject(200, "done", courseContent));
        } else {
            return res.send(new APIResponse(400, noDataAvail));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function updateTopicDescr(req: Request, res: Response, next: NextFunction) {
    try {
        const topicDescr = await updateDescr(req.body)
        if (topicDescr && topicDescr.modifiedCount === 1) {
            return res.status(200).send(new ResponseWithObject(200, "Update Success", topicDescr));
        } else {
            return res.send(new APIResponse(400, "No data Available to Update"));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function getChapterTopicByGrade(req: Request, res: Response, next: NextFunction) {
    try {


        return res.send(new APIResponse(204, noDataAvail));
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function getChapterTopics(req, res, next) {
    try {
        const { subId, gradeId } = req.params;
        const topicsResponse = await getchaptertopics(subId, gradeId);
        if (topicsResponse) {
            return res.status(200).send(new ResponseWithObject(200, "done", topicsResponse));
        } else {
            return res.send(new APIResponse(400, noDataAvail));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function updateChapter(req: Request, res: Response, next: NextFunction) {
    try {
        const chapterObj = req.body;
        const chapterUpdation = await updateChap(chapterObj)
        if (chapterUpdation && chapterUpdation.modifiedCount === 1) {
            return res.status(200).send(new ResponseWithObject(200, "Update Success", chapterUpdation));
        } else {
            return res.send(new APIResponse(400, "No data Available to Update"));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function addingTyBrdGrd(req: Request, res: Response, next: NextFunction) {
    try {
        const brdGrdObj = req.body;
        const tyBrdGrd = await addTyBrdGrd(brdGrdObj)
        if (tyBrdGrd && tyBrdGrd.modifiedCount === 1) {
            return res.status(200).send(new ResponseWithObject(200, "ty_brd_grd added", tyBrdGrd));
        } else {
            return res.send(new APIResponse(400, "Requested Data already exists"));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function updatingTyBrdGrd(req: Request, res: Response, next: NextFunction) {
    try {
        const brdGrdObj = req.body;
        const tyBrdGrd = await updateTyBrdGrd(brdGrdObj)
        if (tyBrdGrd && tyBrdGrd.modifiedCount === 1) {
            return res.status(200).send(new ResponseWithObject(200, "ty_brd_grd updated", tyBrdGrd));
        } else {
            return res.send(new APIResponse(400, "No data Available to Update"));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function updateEBook(req: Request, res: Response, next: NextFunction) {
    try {
        const e_book = req.body;
        const eBookResponse = await updateEbooks(e_book);
        if (eBookResponse && eBookResponse.modifiedCount === 1) {
            return res.status(200).send(new ResponseWithObject(200, "EBook updated", eBookResponse));
        } else {
            return res.send(new APIResponse(400, "No data Available to Update"));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function updateTopic(req: Request, res: Response, next: NextFunction) {
    try {
        const topic = req.body;
        const topicResponse = await updateTopics(topic);
        if (topicResponse && topicResponse.modifiedCount === 1) {
            return res.status(200).send(new ResponseWithObject(200, "Topics updated", topicResponse));
        } else {
            return res.send(new APIResponse(400, "No data Available to Update"));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function updatingCurTag(req: Request, res: Response, next: NextFunction) {
    try {
        const curTag = req.body;
        const curTagResponse = await updateCurTag(curTag);
        if (curTagResponse && curTagResponse.modifiedCount === 1) {
            return res.status(200).send(new ResponseWithObject(200, "CurTag updated", curTagResponse));
        } else {
            return res.send(new APIResponse(400, "No data Available to Update"));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}