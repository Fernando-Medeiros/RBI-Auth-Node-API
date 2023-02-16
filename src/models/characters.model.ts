import { Schema, model } from "mongoose";

const characterSchema = {
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 1000,
    default: 1,
  },
  charName: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 20,
    default: `unknown`,
  },
  class: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 25,
    default: "peasant",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
};

const schema = new Schema(characterSchema);

export const CharactersModel = model("Characters", schema);
