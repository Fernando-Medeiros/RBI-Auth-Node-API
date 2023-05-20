import 'tsconfig-paths/register';
import { config } from 'dotenv';
config();

import { DatabasePrimary } from 'infra/services/database/database.connect';
import { emailConfig } from 'infra/services/email/email';
import { Server } from 'infra/server';

async function main() {
    emailConfig();
    await DatabasePrimary.connect();
    Server.connect();
}

main();
