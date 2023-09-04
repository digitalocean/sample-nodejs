export const userExcelSchema = {
  email: {
    prop: "email",
    type: String,
    required: true,
  },
  address: {
    prop: "address",
    type: String,
    required: true,
  },
  employeeId: {
    prop: "employeeId",
    type: String,
    required: true,
  },
  mobileNo: {
    prop: "mobileNo",
    type: String,
    required: true,
    unique: true,
  },
  contactPerson: {
    prop: "contactPerson",
    type: {
      name: {
        prop: "contactPersonName",
        type: String,
        required: true,
      },
      email: {
        prop: "contactPersonEmail",
        type: String,
        required: true,
      },
      mobileNo: {
        prop: "contactPersonMobileNo",
        type: String,
        required: true,
      },
    },
  },
  type: {
    prop: "type",
    type: String,
    required: true,
  },
  password: {
    prop: "password",
    type: String,
    required: true,
  },
  username: {
    prop: "username",
    type: String,
    required: true,
  },
  name: {
    prop: "name",
    type: String,
    required: true,
  },
};
