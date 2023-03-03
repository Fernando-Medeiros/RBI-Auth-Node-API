import type { Request } from "express";
import type { ICustomerRepository } from "@app/interfaces/repositories/customer.repository.interface";

import { idIsValid } from "@app/validators/auth.validators";

export async function getByIDCase(
  req: Request,
  repository: ICustomerRepository
) {
  const { id } = req.params;

  idIsValid(id);

  const customer = await repository.findById(String(id));

  return customer;
}
