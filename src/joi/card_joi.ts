import Joi from "joi";
import { IAddress, IImage } from "../@types/user";
import { ICardS } from "../@types/card";
import { phoneRegex } from "./patterns";

const cardSchemaJoi = Joi.object<ICardS>({
  title: Joi.string().min(2).max(20).required(),
  subtitle: Joi.string().min(2).max(20).required(),
  description: Joi.string().min(2).max(200).required(),
  phone: Joi.string().pattern(phoneRegex).min(9).max(13).required(),
  email: Joi.string().email().min(5).max(255).required(),
  web: Joi.string().allow(""),
  image: Joi.object<IImage>({
    alt: Joi.string().allow(""),
    url: Joi.string().allow(""),
  }),
  address: Joi.object<IAddress>({
    state: Joi.string().allow(""),
    country: Joi.string().min(2).max(20).required(),
    city: Joi.string().min(2).max(20).required(),
    street: Joi.string().min(2).max(20).required(),
    houseNumber: Joi.number().min(1).max(20).required(),
    zip: Joi.number().allow(""),
  }),
});

export { cardSchemaJoi };
