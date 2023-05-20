import type { Request } from 'express';
import type { ICustomerRepository } from 'app/interfaces/repositories/customer.repository.interface';

export async function deleteCase(
    req: Request,
    repository: ICustomerRepository,
) {
    const { sub } = req.headers;

    await repository.findByIdAndDelete(sub as string);
}
