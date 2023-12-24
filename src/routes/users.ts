import { Router } from "express";
import { User } from "../database/model/user";
import {
  validataUserLogin,
  validataUserRegister,
} from "../middleware/validation";
import { ILogin, IUser } from "../@types/user";
import { createUser, validateUser } from "../service/user_Service";
import { isAdmin } from "../middleware/isAdmin";
import { isAdminOrUser } from "../middleware/isAdminOrUser";
import { isUser } from "../middleware/isUser";
import { hashPassword } from "../service/auth_service";
const usersRouter = Router();

//get all users Admin
usersRouter.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
});

//update full user by user
usersRouter.put(
  "/:id",
  isUser,
  validataUserRegister,
  async (req, res, next) => {
    try {
      req.body.password = await hashPassword(req.body.password);
      const { password, ...saved } = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.json({ saved });
    } catch (e) {
      next(e);
    }
  }
);

//get a specific user by admin or the same user
usersRouter.get("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).lean();
    const { password, ...rest } = user;
    return res.json({ user: rest });
  } catch (e) {
    next(e);
  }
});

//Delete a specific user by  the same user or Admin
usersRouter.delete("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id).lean();
    return res.json({ user: user });
  } catch (e) {
    next(e);
  }
});

//update bizz by user
usersRouter.patch("/:id", isUser, async (req, res, next) => {
  try {
    const isBusiness = !req.user.isBusiness;
    const saved = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isBusiness: isBusiness } },
      {
        new: true,
      }
    );
    res.json({ saved });
  } catch (e) {
    next(e);
  }
});

// register user
usersRouter.post("/", validataUserRegister, async (req, res, next) => {
  try {
    const saved = createUser(req.body as IUser);
    const { password, ...rest } = req.body;
    res.status(201).json({ massege: "Saved", user: rest });
  } catch (err) {
    next(err);
  }
});

//login user
usersRouter.post("/login", validataUserLogin, async (req, res, next) => {
  try {
    const { password, email } = req.body as ILogin;
    const jwt = await validateUser(email, password);
    res.json(jwt);
  } catch (err) {
    next(err);
  }
});
export { usersRouter };
