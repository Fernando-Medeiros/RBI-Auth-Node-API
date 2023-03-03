import type { Customer } from "@dom/interfaces/customer.interface";

export interface ICustomerRepository {
  find(): Promise<Customer[]>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<{ _id: unknown | string } | null>;
  findByIdAndUpdate(id: string, data: PropsUpdate): void;
  findByIdAndDelete(id: string): void;
  save(data: PropsCreate): Promise<Customer>;
}

export type PropsCreate = Omit<Customer, "createdAt" | "id">;
export type PropsUpdate = Partial<Omit<PropsCreate, "password">>;
