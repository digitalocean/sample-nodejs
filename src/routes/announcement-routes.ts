import validator from "cape-validator";
import express, { RequestHandler, Router } from "express"
import AnnouncementController from "../controller/announcement-controller"
import { auth } from "../middlewares/auth-middleware";
import { getCustomValidationResponse } from "../utils";
import { announcementValidatorSchema } from "../validation-schema/announcement-validation";


const announcementController = new AnnouncementController();

const router: Router = express.Router();

router.post("/add", auth, validator(announcementValidatorSchema, {customResponse: getCustomValidationResponse(),key: "error"}) , announcementController.addAnnouncement as unknown as RequestHandler);
router.get("/getall", auth, announcementController.getallannouncements);
router.post("/update/:_id", auth, validator(announcementValidatorSchema, {customResponse: getCustomValidationResponse(),key: "error"}) , announcementController.updateAnnouncement as unknown as RequestHandler);
router.delete("/delete/:_id", auth, announcementController.deleteAnnouncement as unknown as RequestHandler);
export { router as AnnouncementRoutes };

