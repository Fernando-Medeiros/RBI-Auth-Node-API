import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const inventoriesSchema = {
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  gold: {
    type: Number,
    default: 1,
  },
  jewel: {
    type: Number,
    default: 1,
  },
};

const schema = new Schema(inventoriesSchema);

export const InventoriesModel = model("Inventories", schema);
