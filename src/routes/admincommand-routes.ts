import validator from "cape-validator";
import express, { RequestHandler, Router } from "express"
import AdminCommandController from "../controller/admincommand-controller"
import { auth } from "../middlewares/auth-middleware";
import { getCustomValidationResponse } from "../utils";
import { admincommandValidatorSchema } from "../validation-schema/admincommand-validation";


const admincommandController = new AdminCommandController();

const router: Router = express.Router();

router.post("/add", auth, validator(admincommandValidatorSchema, {customResponse: getCustomValidationResponse(),key: "error"}) , admincommandController.addAdminCommand as unknown as RequestHandler);
router.get("/getall", auth, admincommandController.getalladmincommands);
router.post("/update/:_id", auth, validator(admincommandValidatorSchema, {customResponse: getCustomValidationResponse(),key: "error"}) , admincommandController.updateAdminCommand as unknown as RequestHandler);
router.delete("/delete/:_id", auth, admincommandController.deleteAdminCommand as unknown as RequestHandler);
export { router as AdminCommandRoutes };

