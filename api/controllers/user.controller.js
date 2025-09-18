import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Listing from "../models/room.model.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "You can only update your account!"));
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.bodyemail,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "You can only delete your account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({
        message: "User has been deleted.",
        redirectTo: "/sign-in",
      })
      .clearCookie("access_token");
  } catch (err) {
    next(err);
  }
};
export const getUserListings = async (req, res, next) => {
  if (req.user.id == req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      if (!listings)
        return next(errorHandler(404, "No listings found for this user!"));
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "you can only view your own listings!"));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found!"));
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};
