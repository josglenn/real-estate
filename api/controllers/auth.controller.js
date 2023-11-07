import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    res.status(201).json("User created Successfully!");
  } catch (error) {
    next(error);
  }
};
