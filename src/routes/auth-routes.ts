import express from "express";
import { AuthController } from "../controller/auth-controller";
import { auth } from "../middlewares/auth-middleware";
import { checkRefreshToken } from "../middlewares/refresh-middleware";

const router = express.Router();

const authController = new AuthController();

// routes
router.post('/login', authController.login);
router.get('/refresh', checkRefreshToken, authController.getAccessToken);
router.get('/logout', auth, authController.logout);
router.post('/passwordresetrequest', authController.passwordResetRequest);


export { router as AuthRouter };
