import type { Customer } from 'domain/interfaces/customer.interface';

export interface IPwdRepository {
    findByIdAndUpdate(id: string, data: PropsUpdate): Promise<void>;
    findByEmail(email: string): Promise<Customer | null>;
}

export type PropsUpdate = {
    password: string;
};
