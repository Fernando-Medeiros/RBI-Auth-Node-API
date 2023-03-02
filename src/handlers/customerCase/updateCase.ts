import type { Request } from "express";
import type { ICustomerRepository } from "../../repositories/customerRepo/interface";
import type { ICustomerRequests } from "./requests/requests.interface";

export async function updateCase(
  req: Request,
  repository: ICustomerRepository,
  customerRequest: ICustomerRequests
) {
  const { sub } = req.headers;

  const dataToUpdate = customerRequest.getRequestToUpdate(req);

  repository.findByIdAndUpdate(sub as string, dataToUpdate);
}
