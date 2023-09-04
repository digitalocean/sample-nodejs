import express, { RequestHandler } from "express";
import FileController from "../controller/files-controller";

const router = express.Router();

const fileController = new FileController();

// routes
router.post("/upload", fileController.upload as unknown as RequestHandler);
router.get("/load", fileController.load as unknown as RequestHandler);


export { router as filesRouter };
