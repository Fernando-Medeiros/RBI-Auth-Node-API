import { expect, it, describe, beforeAll, afterAll } from 'vitest';
import { app, secretHeader } from 'tests/config/config';
import { Token } from 'infra/security/token/token.impl';
import { CustomerMock } from 'tests/config/customer';
import { Helpers } from 'tests/config/helpers/insert-customer';
import { getOneCustomer } from 'tests/config/helpers/get-one-customer';
import { getAuthorizationHeader } from 'tests/config/helpers/get-token-by-scope';

const jwt = new Token();
const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: '' };
const pubId = { id: '' };

describe('Reset - Password - Success', () => {
    afterAll(async () => await Helpers.removeCustomer(headers));

    beforeAll(async () => {
        await Helpers.insertCustomer(mock.dataToCreate, headers);

        Object.assign(
            headers,
            await getAuthorizationHeader('access', mock.dataToLogin, headers),
        );
        Object.assign(pubId, { id: await getOneCustomer(headers) });
    });

    it('Should return 204 when sending recover scope token and a new valid password', async () => {
        const newPwd = 'Test@1234';
        const RToken = await jwt.createRecover({ sub: pubId.id });

        const resp = await app
            .patch(`/password/${RToken}`)
            .set(headers)
            .send({ password: newPwd });

        expect(resp.statusCode).toEqual(204);
        expect(resp.body).toBeNull;
    });
});
