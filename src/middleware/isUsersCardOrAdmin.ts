import { RequestHandler } from "express";
import { extractToken } from "./isAdmin";
import { verifyJWT } from "../service/auth_service";
import { User } from "../database/model/user";
import { Card } from "../database/model/card";
import { AppError } from "../error/appError";
import { IUser } from "../@types/user";

const isUsersCardOrAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params; //
    const token = extractToken(req);
    const { email } = verifyJWT(token);
    const user = (await User.findOne({ email }).lean()) as IUser;
    req.user = user;
    const card = await Card.findById({ _id: id });
    if (!card) throw new AppError("Card does not exist", 401);
    if (card.userId == user._id) return next();
    if (user.isAdmin) return next();
    else
      throw new AppError(
        "Only the user who created or admin the card can delete the card",
        401
      );
  } catch (e) {
    next(e);
  }
};

export { isUsersCardOrAdmin };
