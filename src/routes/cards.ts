import { Router } from "express";
import { User } from "../database/model/user";
import { validataCardAdd } from "../middleware/validation";
import { isAdminOrUser } from "../middleware/isAdminOrUser";
import { isUser } from "../middleware/isUser";
import { Card } from "../database/model/card";
import { ICard } from "../@types/card";
import { createCard } from "../service/card_Service";
import { isBusiness } from "../middleware/isBusiness";
import { validateToken } from "../middleware/validateJWT";
import { likesRepeat } from "../middleware/likesRepeat";
import { isUsersCard } from "../middleware/isUsersCard";
import { isUsersCardOrAdmin } from "../middleware/isUsersCardOrAdmin";

const cardsRouter = Router();

//get all cards
cardsRouter.get("/", async (req, res, next) => {
  try {
    const allCards = await Card.find();
    return res.json(allCards);
  } catch (err) {
    next(err);
  }
});

//get my cards
cardsRouter.get("/my-cards", validateToken, async (req, res, next) => {
  try {
    const userId = req.user?._id;

    const cards = await Card.find({ userId });
    if (!cards.length) {
      return res.json({ message: "No Cards for this user", cards });
    }
    return res.json(cards);
  } catch (e) {
    next(e);
  }
});

//GET card by id
cardsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = (await Card.findById(id)) as ICard;
    res.json(card);
  } catch (e) {
    next(e);
  }
});

//get a specific card
cardsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    return res.json({ card: card });
  } catch (e) {
    next(e);
  }
});

//Delete a specific card by  the same user or Admin
cardsRouter.delete("/:id", isUsersCardOrAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);
    return res.json({ user: card });
  } catch (e) {
    next(e);
  }
});

//update full card by user
cardsRouter.put("/:id", isUsersCard, async (req, res, next) => {
  try {
    const savedCard = await Card.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(savedCard);
  } catch (err) {
    next(err);
  }
});

//update liked by user
cardsRouter.patch(
  "/:id",
  validateToken,
  likesRepeat,
  async (req, res, next) => {
    try {
      const userId = req.user._id;
      const saved = await Card.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { likes: userId } },
        {
          new: true,
        }
      );
      res.json({ saved });
    } catch (e) {
      next(e);
    }
  }
);

// register card
cardsRouter.post("/", isBusiness, validataCardAdd, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const saved = await createCard(req.body as ICard, userId);
    res.status(201).json({ massege: "Saved", card: saved });
  } catch (err) {
    next(err);
  }
});

export { cardsRouter };
