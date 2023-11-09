import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);

  const existUser = await User.findOne({ username: username });
  const existEmail = await User.findOne({ email: email });

  if (existUser)
    return next(errorHandler(401, "Username Exist, Choose another username!"));
  if (existEmail)
    return next(errorHandler(401, "Email Exist, Choose another email!"));

  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    res.status(201).json("User created Successfully!");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(errorHandler(404, "User is not Found!"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Password is Incorrect!"));
    }
    const { password: pass, ...info } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, { httpOnly: true, maxAge: 1000 * 30 })
      .status(200)
      .json(info);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { pass, ...info } = user._doc;

      console.log(info);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(info);
    } else {
      const createPassword = Math.random().toString(36).slice(-8);
      const hashPassword = bcrypt.hashSync(createPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashPassword,
        avatar: req.body.avatar,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { pass, ...info } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(info);
    }
  } catch (error) {
    next(error);
  }
};
