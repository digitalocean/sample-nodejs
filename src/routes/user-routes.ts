import validator from "cape-validator";
import express, { RequestHandler, Router } from "express"
import FileController from "../controller/files-controller";
import UserController from "../controller/user-controller"
import { auth } from "../middlewares/auth-middleware";
import { getCustomValidationResponse } from "../utils";
import { userValidatorSchema } from "../validation-schema/user-validation";


const userController = new UserController();
const fileController = new FileController();
const router: Router = express.Router();

router.post("/add", validator(userValidatorSchema, { customResponse: getCustomValidationResponse(), key: "error" }), userController.adduser as unknown as RequestHandler);
router.get("/getall", auth, userController.getallusers);
router.get("/search", auth, userController.searchUsers);
router.get("/getforgotpasswordlist", userController.getforgotpasswordlist);
router.post("/resetpassword", auth, userController.resetPassword as unknown as RequestHandler);
router.get("/export", auth, userController.exportdata);
router.get("/getNonAdmin", auth, userController.getNonAdmin);
router.post("/update/:_id", auth, validator(userValidatorSchema, { customResponse: getCustomValidationResponse(), key: "error" }), userController.updateUser as unknown as RequestHandler);
router.delete("/delete/:_id", auth, userController.deleteUser as unknown as RequestHandler);
router.get("/getByRole", auth, userController.getByRole as unknown as RequestHandler);
export { router as UserRoutes };

