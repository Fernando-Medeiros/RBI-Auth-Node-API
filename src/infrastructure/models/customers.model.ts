import { Schema, model } from "mongoose";
import { v4 } from "uuid";

const customerSchema = {
  pubId: {
    type: String,
    default: v4,
    index: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 4,
    maxlength: 24,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 4,
    maxlength: 24,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    minlength: 10,
    maxlength: 60,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 200,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

const schema = new Schema(customerSchema);

export const CustomerModel = model("Customers", schema);
