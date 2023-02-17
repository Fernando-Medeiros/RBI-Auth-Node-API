import type { Request, Response } from "express";
import { Token } from "../security/token";

const jwt = new Token();

export const session = async (
  req: Request,
  res: Response,
  next: CallableFunction
) => {
  try {
    const { authorization } = req.headers;

    const token = authorization?.replace("bearer ", "");

    await jwt.decode(token);

    next(req, res);
  } catch {
    res.status(401).json({
      detail: "Could not validate credentials",
      headers: { "WWW-Authenticate": "Bearer" },
    });
  }
};
