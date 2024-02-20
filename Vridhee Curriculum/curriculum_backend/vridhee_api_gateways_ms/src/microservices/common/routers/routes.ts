import express from 'express';
const router = express.Router();

import commonConfigController from "../controllers/commonConfigController";
import uploadImagesController from "../controllers/uploadImagesController"

router.use(commonConfigController);
router.use(uploadImagesController);

export default router;