import type { Request } from "express";

import { Crypt } from "infra/security/crypt/crypt.impl";
import { Token } from "infra/security/token/token.impl";
import { PasswordRepository } from "infra/repositories/passwordRepo/password.repository.impl";
import { EmailService } from "infra/security/email/email.impl";

import { PwdRequests } from "app/useCases/passwordCase/requests/password.requests";
import { recoverCase } from "app/useCases/passwordCase/recoverCase";
import { resetCase } from "app/useCases/passwordCase/resetCase";
import { updateCase } from "app/useCases/passwordCase/updateCase";

export const PasswordHandler = {
  async recover(req: Request) {
    return await recoverCase(
      req,
      new Token(),
      new PwdRequests(),
      new PasswordRepository(),
      new EmailService()
    );
  },

  async reset(req: Request) {
    await resetCase(
      req,
      new Crypt(),
      new Token(),
      new PwdRequests(),
      new PasswordRepository()
    );
  },

  async update(req: Request) {
    await updateCase(
      req,
      new Crypt(),
      new PwdRequests(),
      new PasswordRepository()
    );
  },
};
