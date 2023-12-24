import { cards } from "./cards";
import { Card } from "./model/card";
import { User } from "./model/user";
import { users } from "./users";

const initDBUsers = async () => {
  const usersCount = await User.countDocuments();
  if (usersCount != 0) return;

  for (let user of users) {
    const saved = await new User(user).save();
  }
};

const initDBCards = async () => {
  const cardsCount = await Card.countDocuments();
  if (cardsCount != 0) return;

  for (let card of cards) {
    const saved = await new Card(card).save();
  }
};

export { initDBUsers, initDBCards };
