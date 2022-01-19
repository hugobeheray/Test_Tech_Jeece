import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    articlePosterId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "./uploads/article/random-article.png",
    },
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },

    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          title: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
    note: {
      type: [
        {
          noterId: String,
          noterPseudo: String,
          note: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const articleModel = mongoose.model("articles", articleSchema);
export default articleModel;
