import type { NextFunction, Request, Response } from "express";
import { Token } from "infra/security/token/token.impl";
import { SessionRepository as session } from "infra/repositories/sessionRepo/session.repository.impl";
import { InternalServerError, Unauthorized } from "utils/http.exceptions";
import { validate } from "uuid";

const JWT = new Token();

export const sessionMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  const token = authorization?.split(" ")[1];

  if (!token || token.length < 150)
    throw new Unauthorized("Missing Authorization header with token");

  const { sub } = await JWT.decode(token);

  if (!sub || !validate(sub))
    throw new InternalServerError(
      "Could not verify credentials, please sign in again to refresh session!"
    );

  if (!(await session.findById(sub))) {
    if (!(await session.customerExists(sub))) {
      throw new Unauthorized("Invalid session, unauthorized token!");
    } else {
      await session.setCache(sub, sub);
    }
  }

  req.headers = { sub: sub };

  next();
};
