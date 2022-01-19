import userModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
import jwt from "jsonwebtoken";
import { signUpErrors } from "../utils/errors.utils.js";
import { signInErrors } from "../utils/errors.utils.js";

const maxAge = 3 * 24 * 60 * 60 * 1000; //token valid for 1 day

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN, {
    expiresIn: maxAge,
  });
};
//working
async function signUp(req, res) {
  const { email, password, pseudo, firstName, lastName } = req.body;

  if (req.body.admin === "true") {
    const admin = true;

    try {
      const user = await userModel.create({
        email,
        password,
        pseudo,
        firstName,
        lastName,
        admin,
      });
      res.status(201).json({ user: user._id });
    } catch (error) {
      const errors = signUpErrors(error);
      res.status(400).send({ errors });
    }
  } else {
    try {
      const user = await userModel.create({
        email,
        password,
        pseudo,
        firstName,
        lastName,
      });
      res.status(201).json({ user: user._id });
    } catch (error) {
      const errors = signUpErrors(err);
      res.status(400).send({ errors });
    }
  }
}

//working
async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = signInErrors(error);
    res.status(400).json({ errors });
  }
}

async function logOut(req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
}

export { logOut };
export { signIn };
export { signUp };
