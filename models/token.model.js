import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tokenSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const userModel = mongoose.model("token", tokenSchema);
export default userModel;
