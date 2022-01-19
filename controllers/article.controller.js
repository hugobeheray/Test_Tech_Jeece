import articleModel from "../models/article.model.js";
import mongoose from "mongoose";
import { promisify } from "util";
import path from "path";
const __dirname = path.resolve();
import { Stream } from "stream";
import { uploadErrors } from "../utils/errors.utils.js";
import fs from "fs";

const pipeline = promisify(Stream.pipeline);

const ObjectId = mongoose.Types.ObjectId;

function readArticle(req, res) {
  articleModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("error to get data " + err);
    })
    .sort({ createdAt: -1 });
}

function articleInfo(req, res) {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  articleModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID Unknown: " + err);
  });
}

function noteAverage(req, res) {
  let average = 0;
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  articleModel
    .findById(req.params.id, (err, docs) => {
      if (!err) {
        for (let index = 0; index < docs.note.length; index++) {
          average = average + docs.note[index].note;
        }
        average = average / docs.note.length;
        res.send(average.toString());
      } else console.log("ID Unknown: " + err);
    })
    .select("note");
}

async function createArticle(req, res) {
  //fonctionne

  // try {
  //   if (
  //     req.file.detectedMimeType !== "image/jpg" &&
  //     req.file.detectedMimeType !== "image/png" &&
  //     req.file.detectedMimeType !== "image/jpeg"
  //   ) {
  //     throw Error("Invalid file");
  //   }

  //   if (req.file.size > 2000000) throw Error("max size");
  // } catch (err) {
  //   const errors = uploadErrors(err);
  //   return res.status(201).json(errors);
  // }

  // const fileName = req.body.articlePosterId + Date.now() + ".jpg";

  // await pipeline(
  //   req.file.stream,
  //   fs.createWriteStream(
  //     `${__dirname}/client/public/uploads/article/${fileName}`
  //   )
  // );

  const newArticle = new articleModel({
    articlePosterId: req.body.articlePosterId,
    // image: "./uploads/article/" + fileName,
    title: req.body.title,
    genre: req.body.genre,
    contents: req.body.contents,
    comments: [],
  });

  try {
    const article = await newArticle.save();
    return res.status(201).json(article);
  } catch (err) {
    return res.status(400).send(err);
  }
}
function updateArticle(req, res) {
  // fonctionne
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  const updatedRecord = {
    title: req.body.title,
    contents: req.body.contents,
    genre: req.body.genre,
  };

  articleModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("update error " + err);
    }
  );
}
function deleteArticle(req, res) {
  // fonctionne
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  articleModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("delete error " + err);
  });
}

//fonctionne
function noteArticle(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    return articleModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          note: {
            noterId: req.body.noterId,
            noterPseudo: req.body.noterPseudo,
            note: req.body.note,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (error) {
    return res.status(400).send(error);
  }
}

//fonctionne
function editNoteArticle(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    return articleModel.findById(req.params.id, (err, docs) => {
      const theNote = docs.note.find((note) =>
        note._id.equals(req.body.noteId)
      );
      if (!theNote) return res.status(400).send("note not found");
      theNote.note = req.body.note;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        else return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
}

//fonctionne
function deleteNoteArticle(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    return articleModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          note: {
            _id: req.body.noteId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
}

//fonctionne
function commentArticle(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    return articleModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            title: req.body.title,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
}

//fonctionne
function editCommentArticle(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    return articleModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      if (!theComment) return res.status(400).send("comment not found");
      theComment.text = req.body.text;
      theComment.title = req.body.title;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        else return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
}

//fonctionne
function deleteCommentArticle(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    return articleModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
}

function getUserNote(req, res) {
  console.log("iduser" + req.param.id);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  articleModel
    .find({ note: { $elemMatch: { noterId: req.params.id } } }, (err, docs) => {
      if (!err) {
        res.send(docs);
      } else console.log("ID Unknown: " + err);
    })
    .sort({ note: "desc" });
}

function getUserComment(req, res) {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  articleModel.find(
    { comments: { $elemMatch: { commenterId: req.params.id } } },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else console.log("ID Unknown: " + err);
    }
  );
}

function searchbar(req, res) {
  let searchedTitle = req.params.id;
  articleModel.find(
    { title: { $regex: searchedTitle, $options: "i" } },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else console.log("ID Unknown: " + err);
    }
  );
}

//fonctionne
function getArticleByGenre(req, res) {
  let givenGenre = req.body.genre;
  articleModel.find({ genre: { $in: givenGenre } }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log(err);
  });
}

export { readArticle };
export { createArticle };
export { updateArticle };
export { deleteArticle };
export { commentArticle };
export { deleteCommentArticle };
export { editCommentArticle };
export { noteArticle };
export { deleteNoteArticle };
export { editNoteArticle };
export { articleInfo };
export { noteAverage };
export { getUserNote };
export { getUserComment };
export { searchbar };
export { getArticleByGenre };
