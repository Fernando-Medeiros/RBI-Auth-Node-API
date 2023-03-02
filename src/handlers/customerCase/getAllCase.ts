import type { ICustomerRepository } from "../../repositories/customerRepo/interface";

export async function getAllCase(repository: ICustomerRepository) {
  return await repository.find();
}
