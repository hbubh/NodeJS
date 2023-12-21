import { RequestHandler } from "express";
import { Card } from "../database/model/card";

const isCardId: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params; //

    const card = (await Card.findById({ _id: id }).lean()) as ICardS;
    req.card = card;
  } catch (e) {
    next(e);
  }
};

export { isCardId };
