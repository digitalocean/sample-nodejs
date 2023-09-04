import validator from "cape-validator";
import express, { RequestHandler, Router } from "express"
import LeaveController from "../controller/leave-controller"
import { auth } from "../middlewares/auth-middleware";
import { getCustomValidationResponse } from "../utils";
import { leaveValidatorSchema } from "../validation-schema/leave-validation";


const leaveController = new LeaveController();

const router: Router = express.Router();

router.post("/add", auth, validator(leaveValidatorSchema, { customResponse: getCustomValidationResponse(), key: "error" }), leaveController.addLeave as unknown as RequestHandler);
router.get("/getall", auth, leaveController.getallleaves);
router.post("/update/:_id", auth, validator(leaveValidatorSchema, { customResponse: getCustomValidationResponse(), key: "error" }), leaveController.updateLeave as unknown as RequestHandler);
router.delete("/delete/:_id", auth, leaveController.deleteLeave as unknown as RequestHandler);
router.get("/approve/:_id", auth, leaveController.ApproveLeave);
router.get("/export", auth, leaveController.exportdata);
export { router as LeaveRoutes };

