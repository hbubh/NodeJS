import { RequestHandler, Request } from "express";
import { Card } from "../database/model/card";

const likesRepeat: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cardId = req.params.id;
    const { likes } = await Card.findById(cardId);

    // Check if userId is in the likes array
    if (likes.includes(userId)) {
      const card = await Card.findOneAndUpdate(
        { _id: cardId },
        { $pull: { likes: userId } },
        { new: true }
      );
      res.json({ card });
    } else {
      // Continue to the next middleware
      next();
    }
  } catch (e) {
    next(e);
  }
};
export { likesRepeat };
