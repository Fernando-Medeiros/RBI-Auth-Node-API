import { Schema, model } from "mongoose";
import mongoose from "mongoose";

export const characterSchema = {
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
  },
  class: {
    type: String,
    required: true,
    minlength: 4,
  },
  createdAt: {
    type: Date,
    required: true,
  },
};

const schema = new Schema(characterSchema);

export const CharactersModel = model("Characters", schema);
