import { FunctionTypes, ValidatorObject, ValidatorTypes } from "cape-validator";

export const admincommandValidatorSchema: ValidatorObject[] = [
  {
    key: "admincommand",
    type: ValidatorTypes.String,
    validators: [FunctionTypes.required, FunctionTypes.notBlank],
    messages: {
      required: "Admin command is required",
      notBlank: "Admin command should not be blank",
    },
  },
];
