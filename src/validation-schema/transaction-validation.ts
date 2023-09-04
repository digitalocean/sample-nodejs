import { FunctionTypes, ValidatorObject, ValidatorTypes } from "cape-validator";

export const transactionValidatorSchema: ValidatorObject[] = [
    {
       key: "invoice",
       type: ValidatorTypes.String,
       validators: [FunctionTypes.required, FunctionTypes.notBlank],
       messages: {
         required: "Invoice is required",
         notBlank: "Invoice should not be blank",
       },
    },
    {
       key: "description",
       type: ValidatorTypes.String,
       validators: [FunctionTypes.required, FunctionTypes.notBlank],
       messages: {
         required: "description is required",
         notBlank: "description should not be blank",
       },
    },
   
    {
       key: "date",
       type: ValidatorTypes.String,
       validators: [FunctionTypes.required, FunctionTypes.notBlank],
       messages: {
         required: "date is required",
         notBlank: "date should not be blank",
       },
    },
    {
       key: "for",
       type: ValidatorTypes.String,
       validators: [FunctionTypes.required, FunctionTypes.notBlank],
       messages: {
         required: "for is required",
         notBlank: "for should not be blank",
       },
    },
    {
       key: "paid",
       type: ValidatorTypes.Number,
       validators: [FunctionTypes.required, FunctionTypes.notBlank],
       messages: {
         required: "paid is required",
         notBlank: "paid should not be blank",
       },
    },
   
    {
       key: "recieved",
       type: ValidatorTypes.Number,
       validators: [FunctionTypes.required, FunctionTypes.notBlank],
       messages: {
         required: "amount is required",
         notBlank: "amount should not be blank",
       },
    },
   ]; 