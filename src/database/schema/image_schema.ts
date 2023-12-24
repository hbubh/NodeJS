import { Schema } from "mongoose";
import { IImage } from "../../@types/user";

const imageSchema = new Schema<IImage>({
  url: {
    required: false,
    type: String,
  },
  alt: {
    required: false,
    type: String,
  },
});
export { imageSchema };
