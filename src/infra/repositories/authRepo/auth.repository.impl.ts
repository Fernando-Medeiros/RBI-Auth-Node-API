import type { Types } from "mongoose";
import type { IAuthRepository } from "@app/interfaces/repositories/auth.repository.interface";

import { CustomerModel as model } from "@inf/models/customers.model";

import { isTrue_or_404 } from "@app/validators/validators";

export class AuthRepository implements IAuthRepository {
  async findOne(query: object) {
    const customer = await model.findOne(query);

    isTrue_or_404(customer, "Customer not found!");

    return customer;
  }

  async findByEmail(
    email: string
  ): Promise<{ _id: Types.ObjectId | string } | null> {
    return await model.exists({ email: email });
  }
}
