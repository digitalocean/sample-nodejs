import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    announcement: {
      type: String,
      required: true,
    },
    active:{
      type:Boolean,
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", userSchema);

export default Announcement;
