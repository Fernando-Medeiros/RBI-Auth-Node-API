import { Schema, model } from "mongoose";

const customerSchema = {
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 11,
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
