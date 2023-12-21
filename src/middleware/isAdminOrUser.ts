import { RequestHandler, Request } from "express";
import { AppError } from "../error/appError";
import { verifyJWT } from "../service/auth_service";
import { User } from "../database/model/user";
import { extractToken } from "./isAdmin";

const isAdminOrUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = verifyJWT(token);
    const user = await User.findOne({ email });
    if (!user) throw new AppError("User does not exist", 401);
    req.user = user;
    if (id == user.id) return next();
    if (user.isAdmin == true) return next();
    else
      throw new AppError("Token doesn't Match the useId or invalid Token", 401);
  } catch (e) {
    next(e);
  }
};

export { isAdminOrUser };
