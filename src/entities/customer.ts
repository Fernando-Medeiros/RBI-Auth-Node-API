import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
  firstName?: string;
  lastName?: string;
  email?: string;
}

export class CustomerCreateSchema {
  private props: PropsCreate;

  get getData(): PropsCreate {
    return this.props;
  }

  get getid(): string {
    return this.props._id.toString();
  }

  async hashPassword(): Promise<string> {
    this.props.password = await bcrypt.hash(this.props.password, 10);
    return this.props.password;
  }

  async compareHashPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.props.password);
  }

  constructor(requestBody: PropsCreate) {
    this.props = requestBody;
    this.props._id = this.props._id || new ObjectId();
    this.props.createdAt = this.props.createdAt || new Date();
  }
}

export class CustomerUpdateSchema {
  private props: PropsUpdate;

  get getData(): PropsUpdate {
    return this.props;
  }

  validateFields(): boolean {
    return Object.values(this.props).length === 0 ?  false : true
  }

  constructor(requestBody: PropsUpdate) {
    this.props = requestBody;
  }
}
