import type { Request } from "express";

import { Crypt } from "../security/crypt/crypt.impl";
import { Token } from "../security/token/token.impl";
import { PwdRequests } from "./passwordCase/requests/password.requests";
import { PasswordRepository } from "../repositories/passwordRepo/repository.impl";
import { EmailService } from "../security/email/email.impl";

import { recoverCase } from "./passwordCase/recoverCase";
import { resetCase } from "./passwordCase/resetCase";
import { updateCase } from "./passwordCase/updateCase";

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
