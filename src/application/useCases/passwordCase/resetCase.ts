import type { Request } from 'express';

import type { ICrypt } from 'app/interfaces/security/crypt.interface';
import type { IToken } from 'app/interfaces/security/token.interface';
import type { IPwdRepository } from 'app/interfaces/repositories/password.repository.interface';
import type { IPwdRequests } from './requests/requests.interface';

import { isTrue_or_400 } from 'app/validators/validators';

export async function resetCase(
    req: Request,
    crypt: ICrypt,
    jwt: IToken,
    pwdRequest: IPwdRequests,
    pwdRepository: IPwdRepository,
): Promise<void> {
    const { token, password } = pwdRequest.getRequestToReset(req);

    const { sub, scope } = await jwt.decode(token);

    isTrue_or_400(scope === 'recover', 'Use recover scope tokens only!');

    const hashPassword = await crypt.hash(password);

    await pwdRepository.findByIdAndUpdate(sub, { password: hashPassword });
}
