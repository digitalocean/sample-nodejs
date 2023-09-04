import mongoose from "mongoose";
import { getCurrentDate } from "../utils";

const transactionSchema = new mongoose.Schema(
  {
    invoice: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    for: {
      type: String,
      required: true,
      enum: ["EMP", "SUP", "CLIENT"]
    },
    paid: {
      type: Number,
      required: true,
    },
    recieved: {
      type: Number,
      required: true,
    },
  createdAt: {
      type: Date,
      required: true,
      default: new Date(getCurrentDate()),
    },
    userList:{
      type: [String],
      ref: "User"
    }
  },
  { timestamps: { updatedAt: true, createdAt: false } }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
