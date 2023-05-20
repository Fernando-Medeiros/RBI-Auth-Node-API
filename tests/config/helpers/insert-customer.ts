import type { AuthorizationSchema } from '../headers/authorization.header';
import type { PropsCreate } from 'domain/interfaces/customer.interface';
import { app, secretHeader } from '../config';

export class Helpers {
    static async insertCustomer(
        data: PropsCreate,
        header: AuthorizationSchema,
    ): Promise<void> {
        await app
            .post('/customers')
            .set({ ...secretHeader, ...header })
            .send(data);
    }

    static async removeCustomer(header: AuthorizationSchema): Promise<void> {
        await app
            .delete(`/customers`)
            .set({ ...secretHeader, ...header })
            .send({});
    }
}
