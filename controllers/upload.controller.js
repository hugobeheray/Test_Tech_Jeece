import userModel from "../models/user.model.js";
import articleModel from "../models/article.model.js";
import fs from "fs";
import { promisify } from "util";
import path from "path";
const __dirname = path.resolve();
import { Stream } from "stream";
import { uploadErrors } from "../utils/errors.utils.js";

const pipeline = promisify(Stream.pipeline);
//fonctionne
async function uploadProfil(req, res) {
  try {
    if (
      req.file.detectedMimeType !== "image/jpg" &&
      req.file.detectedMimeType !== "image/png" &&
      req.file.detectedMimeType !== "image/jpeg"
    ) {
      throw Error("Invalid file");
    }

    if (req.file.size > 2000000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json(errors);
  }

  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/client/public/uploads/profil/${fileName}`
    )
  );

  try {
    await userModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

async function uploadArticlePic(req, res) {
  console.log("laaa");
  try {
    if (
      req.file.detectedMimeType !== "image/jpg" &&
      req.file.detectedMimeType !== "image/png" &&
      req.file.detectedMimeType !== "image/jpeg"
    ) {
      throw Error("Invalid file");
    }

    if (req.file.size > 2000000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json(errors);
  }

  const fileName = req.body.articlePosterId + Date.now() + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/client/public/uploads/article/${fileName}`
    )
  );

  try {
    await articleModel.findByIdAndUpdate(
      req.body.articleId,
      { $set: { image: "./uploads/article/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

export { uploadProfil };
export { uploadArticlePic };
