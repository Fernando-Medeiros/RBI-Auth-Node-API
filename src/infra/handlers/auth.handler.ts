import type { Request } from "express";

import { Crypt } from "@inf/security/crypt/crypt.impl";
import { Token } from "@inf/security/token/token.impl";
import { AuthRepository } from "../repositories/authRepo/auth.repository.impl";

import { AuthRequest } from "@app/useCases/authCase/requests/auth.requests";
import { accessCase } from "@app/useCases/authCase/accessCase";
import { refreshCase } from "@app/useCases/authCase/refreshCase";

export const AuthHandler = {
  async access(req: Request) {
    return await accessCase(
      req,
      new Crypt(),
      new Token(),
      new AuthRepository(),
      new AuthRequest()
    );
  },

  async refresh(req: Request) {
    return await refreshCase(
      req,
      new Token(),
      new AuthRequest()
      );
  },
};
