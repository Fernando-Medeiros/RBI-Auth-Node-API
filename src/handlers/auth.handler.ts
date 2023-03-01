import type { Request } from "express";

import { Crypt } from "../security/crypt/crypt";
import { Token } from "../security/token/token";
import { AuthRequest } from "./requests/auth/auth.requests";
import { CustomerRepository } from "../repositories/customer/repository";

import { accessCase } from "./authCase/accessCase";
import { refreshCase } from "./authCase/refreshCase";

export const AuthHandler = {
  async access(req: Request) {
    return await accessCase(
      req,
      new Crypt(),
      new Token(),
      new CustomerRepository(),
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
