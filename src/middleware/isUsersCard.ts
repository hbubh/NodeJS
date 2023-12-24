import { RequestHandler } from "express";
import { extractToken } from "./isAdmin";
import { verifyJWT } from "../service/auth_service";
import { User } from "../database/model/user";

import { Card } from "../database/model/card";
import { AppError } from "../error/appError";
import { IUser } from "../@types/user";
import { isValidObjectId } from "mongoose";

const isUsersCard: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params; //
    const valid = isValidObjectId(id);
    if (!valid) {
      throw new AppError("The Id is not type of ObjectId", 401);
    }
    const cardExist = await Card.findById(id);
    if (!cardExist) throw new AppError("Card does not exist", 401);
    const token = extractToken(req);
    const { email } = verifyJWT(token);

    //get user from database
    const user = (await User.findOne({ email }).lean()) as IUser;
    req.user = user;
    const card = await Card.findById({ _id: id });
    if (!card) throw new AppError("Card does not exist", 401);

    if (card.userId == user._id) return next();
    else
      throw new AppError(
        "Only the user who created the card can edit the card",
        401
      );
  } catch (e) {
    next(e);
  }
};

export { isUsersCard };
