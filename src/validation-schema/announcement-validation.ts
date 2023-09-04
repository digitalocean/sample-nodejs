import { FunctionTypes, ValidatorObject, ValidatorTypes } from "cape-validator";

export const announcementValidatorSchema: ValidatorObject[] = [
  {
    key: "announcement",
    type: ValidatorTypes.String,
    validators: [FunctionTypes.required, FunctionTypes.notBlank],
    messages: {
      required: "Announcement is required",
      notBlank: "Announcement should not be blank",
    },
  },
];
