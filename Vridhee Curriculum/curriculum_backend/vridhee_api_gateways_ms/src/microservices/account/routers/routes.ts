import express from 'express';
const router = express.Router();

import actorController from '../controllers/actorController';
import actorProfileController from '../controllers/actorProfileController';
import userDetailController from '../controllers/userDetailController';
import loginrouter from '../controllers/loginController';
import verificationController from '../controllers/verificationController';
import oAuthController from '../controllers/oAuthController';
import checkEmailAndContactNumberController from '../controllers/checkEmailAndContactNumberController';
import logoutController from '../controllers/logoutController';

router.use(actorController);
router.use(actorProfileController);
router.use(userDetailController);
router.use(loginrouter);
router.use(verificationController);
router.use(oAuthController);
router.use(checkEmailAndContactNumberController);
router.use(logoutController)

export default router;