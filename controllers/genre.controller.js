import genreModel from "../models/genre.model.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

async function createGenre(req, res) {
  console.log("on est");
  const newGenre = new genreModel({
    name: req.body.name,
  });

  try {
    const genre = await newGenre.save();
    return res.status(201).json(genre);
  } catch (err) {
    return res.status(400).send(err);
  }
}

function deleteGenre(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  genreModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("delete error " + err);
  });
}

function updateGenre(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  const updatedRecord = {
    name: req.body.name,
  };

  genreModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("update error " + err);
    }
  );
}

function getGenre(req, res) {
  genreModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("error to get data " + err);
    })
    .sort({ createdAt: -1 });
}

export { createGenre };
export { deleteGenre };
export { updateGenre };
export { getGenre };
