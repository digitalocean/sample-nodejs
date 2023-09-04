import validator from "cape-validator";
import express, { RequestHandler, Router } from "express"
import TransactionController from "../controller/transaction-controller"
import { auth } from "../middlewares/auth-middleware";
import { getCustomValidationResponse } from "../utils";
import { transactionValidatorSchema } from "../validation-schema/transaction-validation";

const transactionController = new TransactionController();

const router: Router = express.Router();

router.post("/add", auth,validator(transactionValidatorSchema, {customResponse: getCustomValidationResponse(),key: "error"}), transactionController.addtransaction as unknown as RequestHandler);
router.get("/getall", auth, transactionController.getalltransactions)
router.get("/search", auth, transactionController.searchtransaction)
router.delete("/delete/:_id", auth, transactionController.deletetransaction as unknown as RequestHandler);
router.put("/update/:_id", auth,validator(transactionValidatorSchema, {customResponse: getCustomValidationResponse(),key: "error"}), transactionController.updatetransaction as unknown as RequestHandler);
router.get("/export", auth, transactionController.exportdata);

export { router as TransactionRouter };