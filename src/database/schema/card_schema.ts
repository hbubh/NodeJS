import { Schema } from "mongoose";
import { addressSchema } from "./address_schema";
import { imageSchema } from "./image_schema";
import { ICardS } from "../../@types/card";

const cardSchema = new Schema<ICardS>({
  title: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 20,
  },
  subtitle: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 20,
  },
  description: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 13,
  },
  email: {
    required: true,
    unique: true,
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  web: {
    type: String,
    required: false,
  },
  image: {
    type: imageSchema,
    required: false,
    default: {
      alt: "user profile",
      url: "https://picsum.photos/id/237/200/300",
    },
  },
  address: {
    type: addressSchema,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  bizNumber: {
    type: Number,
    required: false,
    default: () => Math.round(Math.random() * 1_000_000),
    unique: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
  likes: [
    {
      type: String,
    },
  ],
});

export { cardSchema };
