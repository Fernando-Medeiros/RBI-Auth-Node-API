import "tsconfig-paths/register";
import { config } from "dotenv";
config();

import { DatabasePrimary } from "@inf/services/database/database.connect";
import { emailConfig } from "@inf/services/email/email";
import { Server } from "@inf/server";

async function main() {
  emailConfig();
  await DatabasePrimary.connect();
  Server.connect();
}

main();
