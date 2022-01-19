import UserModel from "../models/user.model.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

async function getAllUsers(req, res) {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
}

function userInfo(req, res) {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID Unknown: " + err);
  }).select("-password");
}

//fonctionne
async function updateUser(req, res) {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          preference: req.body.preference,
          pseudo: req.body.pseudo.toString(),
          firstName: req.body.firstName.toString(),
          lastName: req.body.lastName.toString(),
        },
      },
      (err, docs) => {
        if (!err) res.send(docs);
        else console.log("update error " + err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

async function deleteUser(req, res) {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Sucessfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export { deleteUser };
export { updateUser };
export { getAllUsers };
export { userInfo };
