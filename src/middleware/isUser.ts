import { RequestHandler, Request } from "express";
import { AppError } from "../error/appError";
import { verifyJWT } from "../service/auth_service";
import { User } from "../database/model/user";
import { extractToken } from "./isAdmin";
import { IUser } from "../@types/user";

const isUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = verifyJWT(token);
    const user = (await User.findOne({ email }).lean()) as IUser;
    req.user = user;
    if (!user) throw new AppError("User does not exist", 401);
    if (id == user?._id) return next();
    else throw new AppError("Token doesn't Match the useId", 401);
  } catch (e) {
    next(e);
  }
};

export { isUser };
