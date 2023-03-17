import "tsconfig-paths/register";

import request from "supertest";
import { config } from "dotenv";
import { env } from "process";

env["ENV"] = "test";
env["MONGODB_DATABASE"] = "TEST";
config();

import { DatabasePrimary } from "@inf/services/database/database.connect";
import { emailConfig } from "@inf/services/email/email";
import { server } from "@inf/server";

async function main() {
  emailConfig();
  await DatabasePrimary.connect();
}

main();

export const app = request(server);
