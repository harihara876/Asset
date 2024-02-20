import express from 'express';
const router = express.Router();

import vridheeCurriculumDashboardController from '../controllers/vridheeCurriculumDahboardController';

router.use(vridheeCurriculumDashboardController);

export default router;