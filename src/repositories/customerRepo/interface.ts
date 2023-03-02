import type { Types } from "mongoose";
import type {
  PropsUpdate,
  PropsCreate,
} from "../../entities/interfaces/customer.interface";

export interface ICustomerRepository {
  find(): Promise<Customer[]>;
  findOne(query: object): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<ObjectId | null>;
  findByIdAndUpdate(id: string, data: PropsUpdate): void;
  findByIdAndDelete(id: string): void;
  save(data: PropsCreate): Promise<Customer>;
}

type ObjectId = {
  _id: Types.ObjectId | string;
};

type Customer = {
  id?: Types.ObjectId | string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
};
