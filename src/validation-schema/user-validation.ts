import { FunctionTypes, ValidatorObject, ValidatorTypes } from "cape-validator";

export const userValidatorSchema: ValidatorObject[] = [
  {
    key: "email",
    type: ValidatorTypes.String,
    validators: [FunctionTypes.required, FunctionTypes.notBlank],
    messages: {
      required: "Email is required",
      notBlank: "Email should not be blank",
    },
  },
  {
    key: "username",
    type: ValidatorTypes.String,
    validators: [FunctionTypes.required, FunctionTypes.notBlank],
    messages: {
      required: "username is required",
      notBlank: "username should not be blank",
    },
  },

  {
    key: "password",
    type: ValidatorTypes.String,
    validators: [FunctionTypes.required, FunctionTypes.notBlank],
    messages: {
      required: "password is required",
      notBlank: "password should not be blank",
    },
  },
  {
    key: "employeeId",
    type: ValidatorTypes.String,
    validators: [FunctionTypes.required, FunctionTypes.notBlank],
    messages: {
      required: "employeeId is required",
      notBlank: "employeeId should not be blank",
    },
  },
  {
    key: "mobileNo",
    type: ValidatorTypes.String,
    validators: [
      FunctionTypes.required,
      FunctionTypes.notBlank,
      { min: 10 },
      { max: 10 },
    ],
    messages: {
      required: "mobileNo is required",
      notBlank: "mobileNo should not be blank",
      min: "MobileNo is not valid",
      max: "MobileNo is not valid",
    },
  },

  {
    key: "type",
    type: ValidatorTypes.String,
    validators: [FunctionTypes.required, FunctionTypes.notBlank],
    messages: {
      required: "type is required",
      notBlank: "type should not be blank",
    },
  },

  {
    key: "contactPerson.name",
    type: ValidatorTypes.String,
    validators: [FunctionTypes.required, FunctionTypes.notBlank],
    messages: {
      required: "Name is required",
      notBlank: "Name should not be blank",
    },
  },

  {
    key: "contactPerson.mobileNo",
    type: ValidatorTypes.String,
    validators: [
      FunctionTypes.required,
      FunctionTypes.notBlank,
      { min: 10 },
      { max: 10 },
    ],
    messages: {
      required: "Contact person mobile is required",
      notBlank: "Contact person mobile should not be blank",
      min: "Contact person mobile is not valid",
      max: "Contact person mobile is not valid"
    },
  },

  // {
  //   key: "contactPerson.email",
  //   type: ValidatorTypes.String,
  //   validators: [FunctionTypes.required, FunctionTypes.notBlank],
  //   messages: {
  //     required: "email is required",
  //     notBlank: "email should not be blank",
  //   },
  // },
  {
    key: "joiningDate",
    type: ValidatorTypes.String,
    validators: [FunctionTypes.required, FunctionTypes.notBlank],
    messages: {
      required: "Joining Date is required",
      notBlank: "Joining Date should not be blank",
    },
 },
];
