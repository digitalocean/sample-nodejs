import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNo: {
      type: String,
      required: true,
      unique: true,
    },
    contactPerson: {
      name: {
        type: String,
        required: true,
      },
      mobileNo: {
        type: String,
        required: true,
      },
      //email: { type: String, required: true },
    },
    type: {
      type: String,
      options: ["ADMIN", "EMP", "CLIENT", "SUP"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    forgotPassword: {
      type: Boolean,
      default: false
    },
    joiningDate: {
      type: Date,
    },
    photo: {
      type: Buffer,
    },
    lastLoggedToken:{
      type:String
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
