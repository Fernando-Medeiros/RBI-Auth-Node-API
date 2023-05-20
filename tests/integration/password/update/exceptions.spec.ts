import { expect, it, describe, beforeAll, afterAll } from 'vitest';
import { app, secretHeader } from 'tests/config/config';
import { CustomerMock } from 'tests/config/customer';
import { Helpers } from 'tests/config/helpers/insert-customer';
import { getAuthorizationHeader } from 'tests/config/helpers/get-token-by-scope';

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: '' };

describe('Update - Password - Exceptions', async () => {
    afterAll(async () => await Helpers.removeCustomer(headers));

    beforeAll(async () => {
        await Helpers.insertCustomer(mock.dataToCreate, headers);

        Object.assign(
            headers,
            await getAuthorizationHeader('refresh', mock.dataToLogin, headers),
        );
    });

    it('Should return 400 when sending password in invalid format', async () => {
        const newPwd = '<Z======Z>';

        const resp = await app
            .patch(`/password`)
            .set(headers)
            .send({ password: newPwd });

        expect(resp.statusCode).toEqual(400);
        expect(resp.body).toBeTypeOf('object');
    });

    it('Should return 401 when trying to update the password without authentication in the header', async () => {
        const newPwd = 'NNttPWd@@##00';

        const resp = await app
            .patch(`/password`)
            .set(secretHeader)
            .send({ password: newPwd });

        expect(resp.statusCode).toEqual(401);
        expect(resp.body).toBeTypeOf('object');
    });

    it('Should return 401 when sending invalid token in header', async () => {
        const newPwd = 'NNttPWd@@##00';

        const resp = await app
            .patch(`/password`)
            .set({
                ...secretHeader,
                Authorization: 'bearer 00000',
            })
            .send({ password: newPwd });

        expect(resp.statusCode).toEqual(401);
        expect(resp.body).toBeTypeOf('object');
    });
});
