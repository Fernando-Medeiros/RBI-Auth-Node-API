import type { Customer } from "@dom/interfaces/customer.interface";

export interface IAuthRepository {
  findOne(query: object): Promise<Customer | null>;
  findByEmail(email: string): Promise<{ _id: unknown | string } | null>;
}
