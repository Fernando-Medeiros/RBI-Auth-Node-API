import { Schema, model } from "mongoose";

const statusSchema = {
  points: {
    type: Number,
    min: 1,
    default: 15,
  },
  experience: {
    type: Number,
    min: 1,
    default: 1,
  },
  strength: {
    type: Number,
    min: 1,
    default: 1,
  },
  intelligence: {
    type: Number,
    min: 1,
    default: 1,
  },
  dexterity: {
    type: Number,
    min: 1,
    default: 1,
  },
  vitality: {
    type: Number,
    min: 1,
    default: 1,
  },
  health: {
    type: Number,
    min: 1,
    default: 1,
  },
  energy: {
    type: Number,
    min: 1,
    default: 1,
  },
  currentHealth: {
    type: Number,
    min: 1,
    default: 1,
  },
  currentEnergy: {
    type: Number,
    min: 1,
    default: 1,
  },
};

const schema = new Schema(statusSchema);

export const StatusModel = model("Status", schema);
