import type { Types } from "mongoose";

export interface IPwdRepository {
  findByIdAndUpdate(id: string, data: PropsUpdate): Promise<void>;
  findByEmail(email: string): Promise<Customer | null>;
}

export type PropsUpdate = {
  password: string;
};

type Customer = {
  id?: Types.ObjectId | string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
};
