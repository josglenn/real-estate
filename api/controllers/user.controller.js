import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({
    message: "Test Api",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "Unathorize"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...info } = updatedUser._doc;

    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};
