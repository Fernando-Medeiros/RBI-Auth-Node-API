import type { Request } from "express";
import type { ICrypt } from "../../security/crypt/crypt.interface";
import type { ICustomerRepository } from "../../repositories/customer/repository.interface";
import type { ICustomerRequests } from "../requests/customer/requests.interface";

import { Customer } from "../../entities/customer";
import { isTrue_or_400 } from "../validators/validators";

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
