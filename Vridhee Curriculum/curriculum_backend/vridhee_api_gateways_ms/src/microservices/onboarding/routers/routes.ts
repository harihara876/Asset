import express from 'express';
const router = express.Router();

import userProfileController from '../controllers/userProfileController';
import subjectsController from '../controllers/subjectsController';
import lookupController from '../controllers/lookupController';
import gradedropdownController from '../controllers/gradedropdownController';
import currCategoryController from '../controllers/currCategoryController';
import certificationController from '../controllers/certificationController';
import universityController from '../controllers/universityController';
import companyController from '../controllers/companyController';
import designationController from '../controllers/designationController';
import areaExpertController from '../controllers/areaExpertController';
import institutionController from '../controllers/institutionController'
import awsS3Controller from '../controllers/awsS3Controller';
import syncGmailContactsController from '../controllers/syncGmailContactsController';

router.use(userProfileController);
router.use(subjectsController);
router.use(lookupController);
router.use(gradedropdownController);
router.use(currCategoryController);
router.use(certificationController);
router.use(universityController);
router.use(companyController);
router.use(designationController);
router.use(areaExpertController);
router.use(institutionController);
router.use(awsS3Controller);
router.use(syncGmailContactsController);

export default router;