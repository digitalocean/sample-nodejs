import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    appliedBy:{
      type: String,
      ref: "User"
    },
    dateOfLeave: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
    },
    approval: {
      type: Boolean,
    },
    approvedDate: {
      type: Date,
    },
    notesOfApproval: {
      type: String,
    },
    type: {
      type: String,
      options: ["Full Day", "Half Day"],
      required: true,
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", userSchema);

export default Leave;
