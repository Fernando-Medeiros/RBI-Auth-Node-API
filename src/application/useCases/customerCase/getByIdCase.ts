import type { Request } from 'express';
import type { ICustomerRepository } from 'app/interfaces/repositories/customer.repository.interface';

import { idIsValid_or_400 } from 'app/validators/auth.validators';

export async function getByIDCase(
    req: Request,
    repository: ICustomerRepository,
) {
    const { id } = req.params;

    idIsValid_or_400(id);

    const customer = await repository.findById(String(id));

    return {
        pubId: customer?.pubId,
        firstName: customer?.firstName,
        lastName: customer?.lastName,
        createdAt: customer?.createdAt,
    };
}
