import type { ICustomerRepository } from "@app/interfaces/repositories/customer.repository.interface";

export async function getAllCase(repository: ICustomerRepository) {
  const customers = await repository.find();

  const response = [];

  for (const C of customers) {
    response.push({
      pubId: C?.pubId,
      firstName: C?.firstName,
      lastName: C?.lastName,
      createdAt: C?.createdAt,
    });
  }
  return response;
}
