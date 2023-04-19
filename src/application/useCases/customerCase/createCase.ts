import type { Request } from "express";
import type { ICrypt } from "app/interfaces/security/crypt.interface";
import type { ICustomerRepository } from "app/interfaces/repositories/customer.repository.interface";
import type { ICustomerRequests } from "./requests/requests.interface";

import { Customer } from "domain/entities/customer";
import { isTrue_or_400 } from "app/validators/validators";

export async function createCase(
  req: Request,
  crypt: ICrypt,
  repository: ICustomerRepository,
  customerRequest: ICustomerRequests
) {
  const dataToCreate = customerRequest.getRequestToCreate(req);

  const emailExists = await repository.findByEmail(dataToCreate.email);

  isTrue_or_400(!emailExists, "Email already exists");

  const customer = new Customer(dataToCreate);

  customer.setPassword = await crypt.hash(customer.getPassword);

  await repository.save(customer.getDataToCreate);
}
