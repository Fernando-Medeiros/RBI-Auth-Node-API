import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

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

export class CustomerCreateSchema {
  props: object;

  constructor(requestBody: object) {
    this.props = { _id: new ObjectId(), ...requestBody, createdAt: new Date() };
  }
  getData() {
    return this.props;
  }
}

export class CustomerUpdateSchema {
  props: object;

  constructor(requestBody: object) {
    this.props = { ...requestBody };
  }
  getData() {
    return this.props;
  }
  validate() {
    const values = Object.values(this.props).filter((value: string) => value);

    if (values.length <= 0) {
      return false;
    }
    return true;
  }
}
