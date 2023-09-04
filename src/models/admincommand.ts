import mongoose from "mongoose";

const AdminCommandSchema = new mongoose.Schema(
  {
    admincommand: {
      type: String,
      required: true,
    },
    active:{
      type:Boolean,
    },
  },
  { timestamps: true }
);

const AdminCommand = mongoose.model("AdminCommand", AdminCommandSchema);

export default AdminCommand;
