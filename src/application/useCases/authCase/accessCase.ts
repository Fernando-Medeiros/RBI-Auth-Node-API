import type { Request } from 'express';

import type { ICrypt } from 'app/interfaces/security/crypt.interface';
import type { IToken } from 'app/interfaces/security/token.interface';
import type { IAuthRequests } from './requests/requests.interface';
import type { IAuthRepository } from 'app/interfaces/repositories/auth.repository.interface';

import { isTrue_or_400, isTrue_or_404 } from 'app/validators/validators';

export async function accessCase(
    req: Request,
    crypt: ICrypt,
    jwt: IToken,
    repository: IAuthRepository,
    authRequest: IAuthRequests,
): Promise<accessResponse> {
    const { email, password } = authRequest.getRequestToAccess(req);

    const emailExists = await repository.findByEmail(email);

    isTrue_or_404(emailExists, 'Email not found!');

    const customer = await repository.findOne({
        email: email,
    });

    const isEqualTo = await crypt.compare(
        password,
        customer?.password as string,
    );

    isTrue_or_400(isEqualTo, 'Invalid password!');

    return {
        pubId: String(customer?.pubId),
        access: await jwt.createAccess({ sub: String(customer?.pubId) }),
        refresh: await jwt.createRefresh({ sub: String(customer?.pubId) }),
        type: 'bearer',
    };
}

interface accessResponse {
    pubId: string;
    access: string;
    refresh: string;
    type: string;
}
