import { Schema, model } from "mongoose";
import mongoose from "mongoose";

export const customerSchema = {
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 4,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    minlength: 9,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    required: true,
  },
};

const schema = new Schema(customerSchema);

export const CustomerModel = model("Customers", schema);
