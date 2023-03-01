import type { Request } from "express";
import type { ICustomerRepository } from "../../repositories/customer/repository.interface";

export async function deleteCase(
  req: Request,
  repository: ICustomerRepository
) {
  const { sub } = req.headers;

  repository.findByIdAndDelete(sub as string);
}
