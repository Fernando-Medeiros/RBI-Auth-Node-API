import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const skillsSchema = {
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  slash: {
    type: Object,
  },
  magicHand: {
    type: Object,
  },
};

const schema = new Schema(skillsSchema);

export const SkillsModel = model("Skills", schema);
