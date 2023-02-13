import { Schema, model } from "mongoose";
import mongoose from "mongoose";

export const inventoriesSchema = {
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  gold: {
    type: Number,
    default: 0,
  },
  jewel: {
    type: Number,
    default: 0,
  },
};

const schema = new Schema(inventoriesSchema);

export const InventoriesModel = model("Inventories", schema);
