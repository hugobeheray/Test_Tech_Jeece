import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const genreModel = mongoose.model("genres", genreSchema);
export default genreModel;
