import { Schema, model } from "mongoose";

const skillsSchema = {
  slash: {
    type: Object,
  },
  magicHand: {
    type: Object,
  },
};

const schema = new Schema(skillsSchema);

export const SkillsModel = model("Skills", schema);
