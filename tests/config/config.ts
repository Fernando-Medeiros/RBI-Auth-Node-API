import { config } from 'dotenv';
process.env['ENV'] = 'test';
process.env['MONGODB_DATABASE'] = 'TEST';
config();

import 'tsconfig-paths/register';
import request from 'supertest';
import { DatabasePrimary } from 'infra/services/database/database.connect';
import { emailConfig } from 'infra/services/email/email';
import { server } from 'infra/server';
import { secretHeader as getSecret } from './headers/api-secret.header';

export const app = request(server);
export const secretHeader = {};

(async function () {
    await Promise.all([
        emailConfig(),

        DatabasePrimary.connect(),

        Object.assign(secretHeader, await getSecret()),
    ]);
})();
