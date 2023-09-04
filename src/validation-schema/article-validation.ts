import { FunctionTypes, ValidatorObject, ValidatorTypes } from "cape-validator";

export const articleValidatorSchema: ValidatorObject[] = [
//   {
//     key: "client",
//     type: ValidatorTypes.String,
//     validators: [FunctionTypes.required, FunctionTypes.notBlank],
//     messages: {
//       required: "Client is required",
//       notBlank: "Client should not be blank",
//     },
//  },
//  {
//   key: "Batch",
//   type: ValidatorTypes.String,
//   validators: [FunctionTypes.required, FunctionTypes.notBlank],
//   messages: {
//     required: "Batch is required",
//     notBlank: "Batch should not be blank",
//   },
// },
// {
//   key: "Date",
//   type: ValidatorTypes.String,
//   validators: [FunctionTypes.required, FunctionTypes.notBlank],
//   messages: {
//     required: "Date is required",
//     notBlank: "Date should not be blank",
//   },
// },
//  {
//     key: "articleTypes",
//     type: ValidatorTypes.String,
//     validators: [FunctionTypes.required, FunctionTypes.notBlank],
//     messages: {
//       required: "Article Type is required",
//       notBlank: "Article Type should not be blank",
//     },
//  },
 {
    key: "article",
    type: ValidatorTypes.String,
    validators: [FunctionTypes.required, FunctionTypes.notBlank],
    messages: {
      required: "article is required",
      notBlank: "article should not be blank",
    },
 },

 {
    key: "processType",
    type: ValidatorTypes.String,
    validators: [FunctionTypes.required, FunctionTypes.notBlank],
    messages: {
      required: "processType is required",
      notBlank: "processType should not be blank",
    },
 },
 {
    key: "status",
    type: ValidatorTypes.String,
    validators: [FunctionTypes.required, FunctionTypes.notBlank],
    messages: {
      required: "status is required",
      notBlank: "status should not be blank",
    },
 },
]; 