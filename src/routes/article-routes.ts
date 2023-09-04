import validator from "cape-validator";
import express, { RequestHandler, Router } from "express";
import ArticleController from "../controller/article-controller";
import { auth } from "../middlewares/auth-middleware";

// our import
import { getCustomValidationResponse } from "../utils";
import { articleValidatorSchema } from "../validation-schema/article-validation";

const articleController = new ArticleController();

const router: Router = express.Router();

router.post("/add", auth, validator(articleValidatorSchema, {customResponse: getCustomValidationResponse(),key: "error"}), articleController.addArticle as unknown as RequestHandler);
router.get("/getall", auth, articleController.getallArticle);
router.get("/getmyopen", auth, articleController.getMyOpen);
router.get("/search", auth, articleController.searchArticle);
router.delete("/delete/:_id", auth, articleController.deleteArticle as unknown as RequestHandler);
router.put("/update/:_id", auth, validator(articleValidatorSchema, {customResponse: getCustomValidationResponse(),key: "error"}), articleController.updateArticle as unknown as RequestHandler);
router.get("/export", auth, articleController.exportdata);
router.post("/import", auth, articleController.importArticle as unknown as RequestHandler);
router.post("/close/:_id",auth,articleController.closeArticle as unknown as RequestHandler);
export { router as ArticleRouter };
