import { noDataAvail } from "../utils/errormsg";
import { ResponseWithObject, APIResponse } from "../utils/status";
import { getDashboard, addcurriculumTopicSummary, getCurriculumTopicSummaryByTIdAsync, 
    getActorDashboard, addActordashboardSummary, getUserNeedToJoinSubjects,
    getUserDashboard
} from '../services/dashboardSummaryService';
import { Request, Response, NextFunction } from "express";

export async function getDashboardSummary(req, res, next) {
    try {
        let dashboard = await getDashboard(req.body);
        if (dashboard) {
            return res.status(200).send(new ResponseWithObject(200, "done", dashboard));
        } else {
            return res.status(200).send(new ResponseWithObject(200, "done", { message: noDataAvail }));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function addCurriculamTopicSummary(req, res, next) {
    try {
        let { t_id, t_header, t_content, t_body, t_includes } = req.body;
        let curriculumSummaryObj = { t_id, t_header, t_content, t_body, t_includes };
        let curriculumSummary = await addcurriculumTopicSummary(curriculumSummaryObj);
        if (curriculumSummary) {
            return res.status(200).send(new ResponseWithObject(200, "done", curriculumSummary));
        } else {
            return res.status(400).send(new APIResponse(400, 'curriculumSummary not created'));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export const getCurriculumTopicSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let getTopicSummary = await getCurriculumTopicSummaryByTIdAsync(req.body)
        // console.log("controller>>", getTopicSummary)
        if (getTopicSummary.length) {
            return res.send(new ResponseWithObject(200, "success", getTopicSummary))
        } else {
            return res.send(new APIResponse(204, noDataAvail))
        }
    } catch (error) {
        console.log(error.message);
        res.send(new APIResponse(500, error.message))
    }
}

export async function getActorDashboardSummary(req, res, next) {
    try {
        let actorDashboard = await getActorDashboard(req.query);
        if (actorDashboard.length > 0) {
            return res.status(200).send(new ResponseWithObject(200, "done", actorDashboard));
        } else {
            return res.status(200).send(new ResponseWithObject(200, "done", noDataAvail ));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export const addActorDashboardSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { actorType } = req.query;
        const { user_id, ttl_cnt, curr_body, ttl_buddy_cnt, hrs_sts, studyplan, activities, collaboration, header, body } = req.body;
        const actorSummaryObj = { user_id, ttl_cnt, curr_body, ttl_buddy_cnt, hrs_sts, studyplan, activities, collaboration, header, body };
        let actorSummary = await addActordashboardSummary(actorType, actorSummaryObj);
        if (actorSummary) {
            return res.status(200).send(new ResponseWithObject(200, "done", actorSummary));
        } else {
            return res.status(400).send(new APIResponse(400, 'actorSummary not created'));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export const subjectNeedToJoin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let subjectLists = await getUserNeedToJoinSubjects(req.body.user_id);
        if (subjectLists) {
            return res.status(200).send(new ResponseWithObject(200, "done", subjectLists));
        } else {
            return res.status(400).send(new APIResponse(400, 'No data Found'));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}

export async function getUserDashboardSummary(req, res, next) {
    try {
        let userDashboard = await getUserDashboard(req.query);
        if (userDashboard.length > 0) {
            return res.status(200).send(new ResponseWithObject(200, "done", userDashboard));
        } else {
            return res.status(200).send(new ResponseWithObject(200, "done", noDataAvail ));
        }
    } catch (error) {
        res.send(new APIResponse(500, error.message));
    }
}
