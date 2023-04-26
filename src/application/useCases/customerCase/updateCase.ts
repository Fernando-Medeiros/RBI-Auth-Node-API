import type { Request } from "express";
import type { ICustomerRepository } from "app/interfaces/repositories/customer.repository.interface";
import type { ICustomerRequests } from "./requests/requests.interface";
import { BadRequest } from "utils/http.exceptions";

export async function updateCase(
  req: Request,
  repository: ICustomerRepository,
  customerRequest: ICustomerRequests
) {
  const { sub } = req.headers;

  const dataToUpdate = customerRequest.getRequestToUpdate(req);

  if (dataToUpdate?.email) {
    if (await repository.findByEmail(dataToUpdate.email)) {
      throw new BadRequest("Email is already in use!");
    }
  }

  await repository.findByIdAndUpdate(String(sub), dataToUpdate);
}
