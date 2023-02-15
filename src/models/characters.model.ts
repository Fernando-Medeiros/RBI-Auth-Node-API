import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const characterSchema = {
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  charName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
    default: `unknown`,
  },
  class: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 25,
    default: "peasant",
  },
  createdAt: {
    type: Date,
    required: true,
  },
};

const schema = new Schema(characterSchema);

export const CharactersModel = model("Characters", schema);
