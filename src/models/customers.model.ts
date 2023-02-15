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
    minlength: 3,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 60,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    required: true,
  },
};

const schema = new Schema(customerSchema);

export const CustomerModel = model("Customers", schema);
