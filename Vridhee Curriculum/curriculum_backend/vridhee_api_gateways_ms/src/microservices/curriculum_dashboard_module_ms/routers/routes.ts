import express from 'express';
const router = express.Router();

import commonVridheeCurriculumController from "../controllers/commonVridheeCurriculumController"
import curriculamController from "../controllers/curriculamController";
import dashboardSummaryController from "../controllers/dashboardSummaryController";
import userActivityController from "../controllers/userActivityController";
import curriculumSubjectsController from "../controllers/curriculumSubjectsController";
import actorCurrActivityController from "../controllers/actorCurrActivityController";
import rewardActivityController from "../controllers/rewardActivityController";
import analyticsController from "../controllers/analyticsController";

// router.post('/createActorContentComments', commentController)
router.use(commonVridheeCurriculumController);
router.use(curriculamController);
router.use(dashboardSummaryController);
router.use(userActivityController);
router.use(curriculumSubjectsController);
router.use(actorCurrActivityController);
router.use(rewardActivityController);
router.use(analyticsController);

export default router;