import type { Request } from 'express';
import type { IToken } from 'app/interfaces/security/token.interface';
import type { IAuthRequests } from './requests/requests.interface';

import { isTrue_or_400 } from 'app/validators/validators';

export async function refreshCase(
    req: Request,
    jwt: IToken,
    authRequest: IAuthRequests,
): Promise<refreshResponse> {
    const token = authRequest.getRequestToRefresh(req);

    const { sub, scope } = await jwt.decode(token);

    isTrue_or_400(scope === 'refresh', 'Use refresh scope tokens only!');

    return {
        pubId: sub,
        access: await jwt.createAccess({ sub: sub }),
        refresh: await jwt.createRefresh({ sub: sub }),
        type: 'bearer',
    };
}

interface refreshResponse {
    pubId: string;
    access: string;
    refresh: string;
    type: string;
}
