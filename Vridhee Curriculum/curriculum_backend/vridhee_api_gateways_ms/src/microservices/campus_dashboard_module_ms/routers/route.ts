import express from 'express';
const router = express.Router();

import defaultNotificationController from "../controllers/defaultControllers/defaultNotificationController"
import campusNotificationController from "../controllers/notificationControllers/campusNotificationConfigController"
import campusDetailsByCampusGroupId from "../controllers/campusControllers/campusDetailsByCampusGroupIdController"
import campusNotificationInfoController from "../controllers/notificationControllers/campusNotificationInfoController";
import campusNotificationEMailYear from "../controllers/notificationControllers/campusNotificationEmailYearController";
import campusNotificationCount from "../controllers/notificationControllers/campusNotificationCountController";
import campusNotificationSmsPushWhatsapp from "../controllers/notificationControllers/campusNotificationSmsPushWhatsappController";
import suggestionConcernCategoryController from "../controllers/queryControllers/suggestionConcernCategoryController";
import suggestionConcernDetailsController from "../controllers/queryControllers/suggestionConcernDetailsController";
import campusStudentController from "../controllers/admission/studentController";
import remarkCategoryController from "../controllers/remarkContollers/remarkCategoryController";
import remarkController from "../controllers/remarkContollers/remarkController";
import enquiryController from "../controllers/admission/enquiryController"

router.use("/users", campusStudentController);
router.use(campusNotificationInfoController);
router.use(defaultNotificationController);
router.use(campusNotificationController);
router.use(campusDetailsByCampusGroupId);
router.use(campusNotificationSmsPushWhatsapp);
router.use(campusNotificationEMailYear);
router.use(campusNotificationCount);
router.use(suggestionConcernCategoryController);
router.use(suggestionConcernDetailsController);
router.use(remarkCategoryController);
router.use(remarkController);
router.use(enquiryController);

export default router;