import type { ICustomerRepository } from "../../repositories/customer/repository.interface";

export async function getAllCase(repository: ICustomerRepository) {
  return await repository.find();
}
