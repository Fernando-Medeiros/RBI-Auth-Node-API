import type { ICustomerRepository } from "@app/interfaces/repositories/customer.repository.interface";

export async function getAllCase(repository: ICustomerRepository) {
  return await repository.find();
}
