import { describe, test, expect } from "vitest";
import { config } from "dotenv";

config();

import {
  emailConfig,
  IEmailConfig,
} from "@root/src/infra/services/email/email";

describe("Email config", () => {
  test("Should be the same as the email configuration interface", () => {
    const config = emailConfig();

    expect(config as IEmailConfig);
  });
});
