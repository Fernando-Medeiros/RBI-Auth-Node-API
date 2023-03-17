import type { NextFunction, Request, Response } from "express";
import { Token } from "@inf/security/token/token.impl";
import { SessionRepository } from "@inf/repositories/sessionRepo/session.repository.impl";
import { Unauthorized } from "@src/helpers/http.exceptions";
import {
  subIsValid_or_500,
  tokenIsValid_or_401,
} from "@app/validators/auth.validators";

const JWT = new Token();

export const sessionMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  const token = authorization?.substring(authorization.indexOf(" ") + 1);

  tokenIsValid_or_401(token, "Missing Authorization header with token");

  const { sub } = await JWT.decode(String(token));

  subIsValid_or_500(sub);

  if ((await SessionRepository.findByIdCache(sub)) === null) {
    if ((await SessionRepository.customerExists(sub)) === null) {
      throw new Unauthorized("Invalid session, unauthorized token!");
    } else {
      await SessionRepository.setCache(sub, sub);
    }
  }

  req.headers = { sub: sub };

  next();
};
