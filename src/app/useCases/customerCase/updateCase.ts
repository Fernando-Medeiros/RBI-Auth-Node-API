import type { Request } from "express";
import type { ICustomerRepository } from "@app/interfaces/repositories/customer.repository.interface";
import type { ICustomerRequests } from "./requests/requests.interface";

export async function updateCase(
  req: Request,
  repository: ICustomerRepository,
  customerRequest: ICustomerRequests
) {
  const { sub } = req.headers;

  const dataToUpdate = customerRequest.getRequestToUpdate(req);

  await repository.findByIdAndUpdate(sub as string, dataToUpdate);
}
