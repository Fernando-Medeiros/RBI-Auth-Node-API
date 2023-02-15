import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const statusSchema = {
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 15,
  },
  experience: {
    type: Number,
    required: true,
    default: 1,
  },
  strength: {
    type: Number,
    required: true,
    default: 1,
  },
  intelligence: {
    type: Number,
    required: true,
    default: 1,
  },
  dexterity: {
    type: Number,
    required: true,
    default: 1,
  },
  vitality: {
    type: Number,
    required: true,
    default: 1,
  },
  health: {
    type: Number,
    required: true,
    default: 1,
  },
  energy: {
    type: Number,
    required: true,
    default: 1,
  },
  currentHealth: {
    type: Number,
    required: true,
    default: 1,
  },
  currentEnergy: {
    type: Number,
    required: true,
    default: 1,
  },
};

const schema = new Schema(statusSchema);

export const StatusModel = model("Status", schema);
