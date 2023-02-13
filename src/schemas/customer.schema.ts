import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

interface PropsCreate {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
}

interface PropsUpdate {
  firstName: string;
  lastName: string;
  email: string;
}

export class CustomerCreateSchema {
  private props: PropsCreate;

  get getData(): PropsCreate {
    return this.props;
  }

  get getid(): string {
    return this.props._id.toString();
  }

  constructor(requestBody: PropsCreate) {
    this.props = { ...requestBody, createdAt: new Date() };
    this.props._id = this.props._id || new ObjectId();
  }
}

export class CustomerUpdateSchema {
  private props: PropsUpdate;

  get getData(): PropsUpdate {
    return this.props;
  }

  validate(): boolean {
    const values = Object.values(this.props).filter((value: string) => value);
    if (values.length <= 0) {
      return false;
    }
    return true;
  }

  constructor(requestBody: PropsUpdate) {
    this.props = requestBody;
  }
}
