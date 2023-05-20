import type { Customer } from 'domain/interfaces/customer.interface';

export interface IAuthRepository {
    findOne(query: object): Promise<Customer | null>;
    findByEmail(email: string): Promise<{ _id: unknown | string } | null>;
}
